package ru.arsentiev.backshortlink.controller;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.arsentiev.backshortlink.service.LinkService;

@RestController
@RequestMapping("/")
@RequiredArgsConstructor
@Tag(name = "Redirect")
public class RedirectController {
    private final LinkService service;

    @GetMapping("{shortLink}")
    public ResponseEntity<Void> redirectToLongLink(@PathVariable String shortLink) {
        String longLink = service.findLongLinkByShortLink(shortLink).getLongLink();
        return ResponseEntity.status(302)
                .header(HttpHeaders.LOCATION, longLink)
                .build();
    }
}
