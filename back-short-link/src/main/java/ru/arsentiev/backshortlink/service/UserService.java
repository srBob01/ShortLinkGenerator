package ru.arsentiev.backshortlink.service;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.arsentiev.backshortlink.dsl.QPredicates;
import ru.arsentiev.backshortlink.dsl.UserFilter;
import ru.arsentiev.backshortlink.dto.UserRequest;
import ru.arsentiev.backshortlink.dto.UserResponse;
import ru.arsentiev.backshortlink.entity.Role;
import ru.arsentiev.backshortlink.entity.User;
import ru.arsentiev.backshortlink.mappers.UserRequestMapper;
import ru.arsentiev.backshortlink.mappers.UserResponseMapper;
import ru.arsentiev.backshortlink.page.PageResponse;
import ru.arsentiev.backshortlink.repository.UserRepository;

import java.util.List;

import static ru.arsentiev.backshortlink.entity.QUser.user;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class UserService implements UserDetailsService {
    private final UserRepository userRepository;
    private final UserRequestMapper userRequestMapper;
    private final UserResponseMapper userResponseMapper;

    public UserResponse findUserByNickName(String username, Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        if (user.getUsername().equals(username) || user.getRole().equals(Role.ADMIN)) {
            log.info("Finding user by username: {}", username);
            return userRepository.findUserByUsername(username)
                    .map(userResponseMapper::userToDto)
                    .orElseThrow(() -> {
                        log.error("No user found with username: {}", username);
                        return new EntityNotFoundException("No user with username:" + username);
                    });
        } else {
            log.error("User is not authorized to find this user. User username: {}, Find username: {}", user.getUsername(), username);
            throw new SecurityException("User is not authorized to update this link");
        }
    }

    public UserResponse findUserById(Integer id) {
        log.info("Finding user by id: {}", id);
        return userRepository.findById(id)
                .map(userResponseMapper::userToDto)
                .orElseThrow(() -> {
                    log.error("No user found with id: {}", id);
                    return new EntityNotFoundException("No user with id:" + id);
                });
    }

    @Transactional
    public void deleteUserById(Integer id) {
        log.info("Deleting user by id: {}", id);
        if (!userRepository.existsById(id)) {
            log.error("No user found with id: {}", id);
            throw new EntityNotFoundException("No user with id:" + id);
        }
        userRepository.deleteById(id);
        log.info("User with id: {} has been deleted", id);
    }

    @Transactional
    public UserResponse updateUser(Integer id, UserRequest userRequest, Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        if (user.getId().equals(id) || user.getRole().equals(Role.ADMIN)) {
            log.info("Updating user with id: {}", id);
            return userRepository.findById(id)
                    .map(existingUser -> {
                        userRequestMapper.updateUserFromDto(userRequest, existingUser);
                        userRepository.saveAndFlush(existingUser);
                        log.info("User with id: {} has been updated", id);
                        return userResponseMapper.userToDto(existingUser);
                    })
                    .orElseThrow(() -> {
                        log.error("No user found with id: {}", id);
                        return new EntityNotFoundException("No user with id:" + id);
                    });
        } else {
            log.error("User is not authorized to update this user. User id: {}, Update id: {}", user.getId(), id);
            throw new SecurityException("User is not authorized to update this link");
        }

    }

    private PageResponse<UserResponse> createPageResponse(Page<User> users) {
        List<UserResponse> userResponses = users.stream()
                .map(userResponseMapper::userToDto)
                .toList();
        return new PageResponse<>(
                userResponses,
                users.getNumber(),
                users.getSize(),
                users.getTotalElements(),
                users.getTotalPages(),
                users.isFirst(),
                users.isLast());
    }

    public PageResponse<UserResponse> findAllUsers(int page, int size) {
        log.info("Finding all users with page: {} and size: {}", page, size);
        Pageable pageable = PageRequest.of(page, size);
        Page<User> users = userRepository.findAll(pageable);
        return createPageResponse(users);
    }

    public PageResponse<UserResponse> findAllUserByFilter(int page, int size, UserFilter filter) {
        log.info("Finding all users by filter: {}", filter);
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdDate").descending());
        var predicate = QPredicates.builder()
                .add(filter.getFirstName(), user.firstName::equalsIgnoreCase)
                .add(filter.getLastName(), user.lastName::equalsIgnoreCase)
                .add(filter.getEmail(), user.email::containsIgnoreCase)
                .add(filter.getUsername(), user.username::equalsIgnoreCase)
                .add(Role.USER, user.role::eq)
                .buildAnd();
        Page<User> users = userRepository.findAll(predicate, pageable);
        return createPageResponse(users);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        log.info("Loading user by username: {}", username);
        return userRepository.findUserByUsername(username)
                .orElseThrow(() -> {
                    log.error("Failed to retrieve user: {}", username);
                    return new UsernameNotFoundException("Failed to retrieve user:" + username);
                });
    }
}