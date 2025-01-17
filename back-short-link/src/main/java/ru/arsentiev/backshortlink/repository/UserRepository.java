package ru.arsentiev.backshortlink.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.stereotype.Repository;
import ru.arsentiev.backshortlink.entity.User;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Integer>,
        QuerydslPredicateExecutor<User> {
    Optional<User> findUserByUsername(String username);
}
