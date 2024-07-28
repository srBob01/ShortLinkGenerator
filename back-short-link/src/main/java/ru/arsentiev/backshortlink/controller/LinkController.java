package ru.arsentiev.backshortlink.controller;

import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import ru.arsentiev.backshortlink.dsl.LinkFilter;
import ru.arsentiev.backshortlink.dto.LinkRequest;
import ru.arsentiev.backshortlink.dto.LinkResponse;
import ru.arsentiev.backshortlink.dto.LongLinkRedirectResponse;
import ru.arsentiev.backshortlink.page.PageResponse;
import ru.arsentiev.backshortlink.service.LinkService;

@RestController
@RequestMapping("/links")
@RequiredArgsConstructor
@Slf4j
@Tag(name = "Link")
public class LinkController {
    private final LinkService service;

    @PostMapping
    public ResponseEntity<Long> saveLink(
            @Valid @RequestBody LinkRequest request,
            Authentication authentication
    ) {
        return ResponseEntity.ok(service.save(request, authentication));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Long> updateLink(
            @PathVariable("id") Long id,
            @Valid @RequestBody LinkRequest request,
            Authentication authentication
    ) {
        return ResponseEntity.ok(service.update(id, request, authentication));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Long> deleteLink(
            @PathVariable("id") Long id,
            Authentication authentication
    ) {
        return ResponseEntity.ok(service.delete(id, authentication));
    }

    @GetMapping("/{id}")
    public ResponseEntity<LinkResponse> findLinkById(@PathVariable("id") Long id) {
        return ResponseEntity.ok(service.findById(id));
    }

    @GetMapping("/name/{linkname}")
    public ResponseEntity<LinkResponse> findLinkByName(@PathVariable("linkname") String linkName) {
        return ResponseEntity.ok(service.findByLinkName(linkName));
    }

    @GetMapping("/all")
    public ResponseEntity<PageResponse<LinkResponse>> findAllLink(
            @RequestParam(name = "page", defaultValue = "0", required = false) int page,
            @RequestParam(name = "size", defaultValue = "10", required = false) int size,
            Authentication authentication
    ) {
        return ResponseEntity.ok(service.findAll(page, size, authentication));
    }

    @GetMapping("/user")
    public ResponseEntity<PageResponse<LinkResponse>> findAllLinkByUser(
            @RequestParam(name = "page", defaultValue = "0", required = false) int page,
            @RequestParam(name = "size", defaultValue = "10", required = false) int size,
            Authentication authentication
    ) {
        return ResponseEntity.ok(service.findAllLinkByUser(page, size, authentication));
    }

    @GetMapping("/filter")
    public ResponseEntity<PageResponse<LinkResponse>> findAllLinkByFilter(
            @RequestParam(name = "page", defaultValue = "0", required = false) int page,
            @RequestParam(name = "size", defaultValue = "10", required = false) int size,
            LinkFilter filter
    ) {
        return ResponseEntity.ok(service.findAllLinkByFilter(page, size, filter));
    }

    @GetMapping("/redirect/{shortLink}")
    public ResponseEntity<LongLinkRedirectResponse> getLongLink(@PathVariable String shortLink) {
        log.info("Received request to get long link for shortLink: {}", shortLink);
        return ResponseEntity.ok(service.findLongLinkByShortLink(shortLink));
    }

}
