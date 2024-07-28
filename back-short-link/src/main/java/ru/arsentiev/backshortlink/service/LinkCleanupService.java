package ru.arsentiev.backshortlink.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.arsentiev.backshortlink.repository.LinkRepository;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
@Slf4j
public class LinkCleanupService {
    private final LinkRepository linkRepository;

    @Scheduled(cron = "10 0 * * * *") // запуск каждый час в 10-ю секунду
    @Transactional
    public void deleteExpiredLinks() {
        log.info("try to delete");
        linkRepository.deleteByRemoveDateBefore(LocalDateTime.now());
    }
}
