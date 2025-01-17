package ru.arsentiev.backshortlink.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.arsentiev.backshortlink.entity.Token;

import java.util.Optional;

public interface TokenRepository extends JpaRepository<Token, Integer> {
    Optional<Token> findByToken(String token);

    boolean existsByToken(String token);
}
