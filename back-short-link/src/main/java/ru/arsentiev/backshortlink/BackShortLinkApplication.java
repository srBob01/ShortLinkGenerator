package ru.arsentiev.backshortlink;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class BackShortLinkApplication {

    public static void main(String[] args) {
        SpringApplication.run(BackShortLinkApplication.class, args);
    }

}
