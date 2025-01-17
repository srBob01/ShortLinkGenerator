package ru.arsentiev.backshortlink.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.stereotype.Repository;
import ru.arsentiev.backshortlink.dto.LongLinkRedirect;
import ru.arsentiev.backshortlink.entity.Link;

import java.time.LocalDateTime;
import java.util.Optional;

@Repository
public interface LinkRepository extends JpaRepository<Link, Long>,
        JpaSpecificationExecutor<Link>, QuerydslPredicateExecutor<Link> {
    @Query(value = "SELECT COUNT(*) FROM links WHERE long_link = :longLink", nativeQuery = true)
    int countByLongLink(String longLink);

    @Query(value = "SELECT EXISTS(SELECT 1 FROM links WHERE short_link = :shortLink)", nativeQuery = true)
    boolean existsByShortLink(String shortLink);

    @Query("select link " +
           "from Link link " +
           "where link.user.id != :userId")
    Page<Link> findAllDisplayedLinks(Pageable pageable, Integer userId);

    Optional<LongLinkRedirect> findByShortLink(String shortLink);

    Optional<Link> findByLinkName(String linkName);

    void deleteByRemoveDateBefore(LocalDateTime dateTime);
}
