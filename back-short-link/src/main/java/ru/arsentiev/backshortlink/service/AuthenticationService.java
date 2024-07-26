package ru.arsentiev.backshortlink.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.arsentiev.backshortlink.configuration.JwtService;
import ru.arsentiev.backshortlink.dto.AuthenticationResponse;
import ru.arsentiev.backshortlink.dto.UserAuthenticationRequest;
import ru.arsentiev.backshortlink.dto.UserRegisterRequest;
import ru.arsentiev.backshortlink.email.EmailSendConfirmationService;
import ru.arsentiev.backshortlink.email.EmailTemplateName;
import ru.arsentiev.backshortlink.entity.Token;
import ru.arsentiev.backshortlink.entity.User;
import ru.arsentiev.backshortlink.handler.DuplicateFieldException;
import ru.arsentiev.backshortlink.handler.EmailException;
import ru.arsentiev.backshortlink.mappers.UserRegisterRequestMapper;
import ru.arsentiev.backshortlink.repository.TokenRepository;
import ru.arsentiev.backshortlink.repository.UserRepository;

import java.time.LocalDateTime;
import java.util.HashMap;


@Slf4j
@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final UserRegisterRequestMapper userRegisterRequestMapper;
    private final UserRepository userRepository;
    private final TokenRepository tokenRepository;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final EmailSendConfirmationService emailSendConfirmationService;
    @Value("${application.mailing.length-code}")
    public int lengthCode;

    @Value("${application.mailing.valid-code-minute}")
    public int validCodeMinute;

    @Value("${application.mailing.frontend.activation-url}")
    private String activationUrl;

    @Transactional
    public void register(UserRegisterRequest request) {
        log.info("Registering user with email: {}", request.getEmail());
        User user = userRegisterRequestMapper.reqToUser(request);
        try {
            userRepository.save(user);
            sendValidationEmail(user);
        } catch (DataIntegrityViolationException ex) {
            String errorMessage = ex.getMessage();
            if (errorMessage.contains("users_email_key")) {
                throw new DuplicateFieldException("Email already exists", request.getEmail());
            } else if (errorMessage.contains("users_username_key")) {
                throw new DuplicateFieldException("Username already exists", request.getUsername());
            } else {
                throw ex;
            }
        } catch (Exception e) {
            throw new EmailException();
        }
    }

    private void sendValidationEmail(User user) throws Exception {
        log.info("Sending validation email to user with email: {}", user.getEmail());
        var newToken = generateAndSaveActivationToken(user);
        emailSendConfirmationService.sendConfirmation(
                user.getEmail(),
                user.getUsername(),
                EmailTemplateName.ACTIVATE_ACCOUNT,
                activationUrl,
                newToken,
                "Account activation"
        );
    }

    private String generateAndSaveActivationToken(User user) {
        log.info("Generating activation token for user with email: {}", user.getEmail());
        String generatedToken;
        do {
            generatedToken = generateActivationCode(lengthCode);
        } while (tokenRepository.existsByToken(generatedToken));

        var token = Token.builder()
                .token(generatedToken)
                .createdAt(LocalDateTime.now())
                .expiresAt(LocalDateTime.now().plusMinutes(validCodeMinute))
                .user(user)
                .build();
        tokenRepository.save(token);
        return generatedToken;
    }

    private String generateActivationCode(int length) {
        return RandomStringUtils.randomAlphanumeric(length);
    }

    public AuthenticationResponse authenticate(UserAuthenticationRequest request) {
        log.info("Authenticating user with email: {}", request.getUsername());
        var auth = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getUsername(), request.getPassword()
                )
        );
        var claims = new HashMap<String, Object>();
        var user = ((User) auth.getPrincipal());
        claims.put("username", user.getUsername());
        var jwtToken = jwtService.generateToken(claims, user);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }

    public void activateAccount(String token) {
        log.info("Activating account with token: {}", token);
        Token savedToken = tokenRepository.findByToken(token)
                .orElseThrow(() -> {
                    log.error("Invalid token: {}", token);
                    return new RuntimeException("Invalid token");
                });

        if (LocalDateTime.now().isAfter(savedToken.getExpiresAt())) {
            log.warn("Activation token has expired: {}", token);
            try {
                sendValidationEmail(savedToken.getUser());
            } catch (Exception e) {
                throw new EmailException();
            }
            throw new RuntimeException("Activation token has expired. A new token has been sent to the email");
        }

        var user = userRepository.findById(savedToken.getUser().getId())
                .orElseThrow(() -> {
                    log.error("User not found with id: {}", savedToken.getUser().getId());
                    return new UsernameNotFoundException("User " + savedToken.getUser().getId() + " not found");
                });

        user.setEnabled(true);
        userRepository.saveAndFlush(user);

        savedToken.setValidatedAt(LocalDateTime.now());
        tokenRepository.saveAndFlush(savedToken);
        log.info("Account activated for user with email: {}", user.getEmail());
    }
}
