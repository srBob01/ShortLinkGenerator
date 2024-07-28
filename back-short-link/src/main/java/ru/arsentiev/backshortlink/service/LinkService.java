package ru.arsentiev.backshortlink.service;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.arsentiev.backshortlink.dsl.LinkFilter;
import ru.arsentiev.backshortlink.dsl.QPredicates;
import ru.arsentiev.backshortlink.dto.LinkRequest;
import ru.arsentiev.backshortlink.dto.LinkResponse;
import ru.arsentiev.backshortlink.dto.LongLinkRedirect;
import ru.arsentiev.backshortlink.dto.LongLinkRedirectResponse;
import ru.arsentiev.backshortlink.entity.Link;
import ru.arsentiev.backshortlink.entity.Role;
import ru.arsentiev.backshortlink.entity.User;
import ru.arsentiev.backshortlink.mappers.LinkRequestMapper;
import ru.arsentiev.backshortlink.mappers.LinkResponseMapper;
import ru.arsentiev.backshortlink.page.PageResponse;
import ru.arsentiev.backshortlink.repository.LinkRepository;

import java.util.List;

import static ru.arsentiev.backshortlink.dsl.LinkSpecification.withUserId;
import static ru.arsentiev.backshortlink.entity.QCategory.category;
import static ru.arsentiev.backshortlink.entity.QLink.link;
import static ru.arsentiev.backshortlink.entity.QUser.user;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class LinkService {
    private final LinkRepository linkRepository;
    private final LinkResponseMapper linkResponseMapper;
    private final LinkRequestMapper linkRequestMapper;

    @Value("${application.start-url}")
    private String startUrl;

    @Transactional
    public Long save(LinkRequest request, Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        Link link = linkRequestMapper.dtoToLink(request, user);
        log.info("Saving link: {}", link);
        return linkRepository.save(link).getId();
    }

    public LinkResponse findById(Long id) {
        log.info("Finding link by id: {}", id);
        return linkRepository.findById(id)
                .map(link -> linkResponseMapper.linkToDto(link, startUrl))
                .orElseThrow(() -> {
                    log.error("No link found with id: {}", id);
                    return new EntityNotFoundException("No link with id: " + id);
                });
    }

    public LinkResponse findByLinkName(String linkName) {
        log.info("Finding link by linkName: {}", linkName);
        return linkRepository.findByLinkName(linkName)
                .map(link -> linkResponseMapper.linkToDto(link, startUrl))
                .orElseThrow(() -> {
                    log.error("No link found with linkName: {}", linkName);
                    return new EntityNotFoundException("No link with linkName: " + linkName);
                });
    }

    @Transactional
    public Long update(Long id, LinkRequest request, Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        log.info("Updating link with id: {}", id);
        Link link = linkRepository.findById(id)
                .orElseThrow(() -> {
                    log.error("No link found with id: {}", id);
                    return new EntityNotFoundException("No link with id: " + id);
                });
        if (link.getUser().getId().equals(user.getId()) || user.getRole().equals(Role.ADMIN)) {
            linkRequestMapper.updateLinkFromDto(request, link);
            log.info(link.toString());
            linkRepository.saveAndFlush(link);
            log.info("Link updated: {}", link);
        } else {
            log.error("User is not authorized to update this link. User ID: {}, Link ID: {}", user.getId(), id);
            throw new SecurityException("User is not authorized to update this link");
        }
        return id;
    }

    @Transactional
    public Long delete(Long id, Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        log.info("Deleting link with id: {}", id);
        Link link = linkRepository.findById(id)
                .orElseThrow(() -> {
                    log.error("No link found with id: {}", id);
                    return new EntityNotFoundException("No link with id: " + id);
                });
        if (link.getUser().getId().equals(user.getId()) || user.getRole().equals(Role.ADMIN)) {
            linkRepository.delete(link);
            linkRepository.flush();
            log.info("Link deleted: {}", link);
        } else {
            log.error("User is not authorized to delete this link. User ID: {}, Link ID: {}", user.getId(), id);
            throw new SecurityException("User is not authorized to delete this link");
        }
        return id;
    }

    public PageResponse<LinkResponse> findAll(int page, int size, Authentication authentication) {
        if (authentication == null) {
            log.info("Finding all links for");
            Pageable pageable = PageRequest.of(page, size, Sort.by("createdDate").descending());
            Page<Link> links = linkRepository.findAll(pageable);
            return createPageResponse(links);
        } else {
            User user = (User) authentication.getPrincipal();
            log.info("Finding all links for user with id: {}", user.getId());
            Pageable pageable = PageRequest.of(page, size, Sort.by("createdDate").descending());
            Page<Link> links = linkRepository.findAllDisplayedLinks(pageable, user.getId());
            return createPageResponse(links);
        }
    }

    public PageResponse<LinkResponse> findAllLinkByUser(int page, int size, Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        log.info("Finding all links by user with id: {}", user.getId());
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdDate").descending());
        Page<Link> links = linkRepository.findAll(withUserId(user.getId()), pageable);
        return createPageResponse(links);
    }

    public PageResponse<LinkResponse> findAllLinkByFilter(int page, int size, LinkFilter filter) {
        log.info("Finding all links by filter: {}", filter);
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdDate").descending());
        var predicate = QPredicates.builder()
                .add(filter.getUsername(), user.username::equalsIgnoreCase)
                .add(filter.getEmail(), user.email::containsIgnoreCase)
                .add(filter.getTitleCategory(), category.title::equalsIgnoreCase)
                .add(filter.getLinkName(), link.linkName::equalsIgnoreCase)
                .buildAnd();
        Page<Link> links = linkRepository.findAll(predicate, pageable);
        return createPageResponse(links);
    }

    public LongLinkRedirectResponse findLongLinkByShortLink(String shortLink) {
        log.info("Finding long link by short link: {}", shortLink);
        return LongLinkRedirectResponse.builder()
                .longLink(linkRepository.findByShortLink(shortLink)
                        .map(LongLinkRedirect::getLongLink)
                        .orElseThrow(() -> {
                            log.error("No link found for short link: {}", shortLink);
                            return new EntityNotFoundException("No link found for short link: " + shortLink);
                        }))
                .build();
    }

    private PageResponse<LinkResponse> createPageResponse(Page<Link> links) {
        List<LinkResponse> linkResponse = links.stream()
                .map(link -> linkResponseMapper.linkToDto(link, startUrl))
                .toList();
        return new PageResponse<>(
                linkResponse,
                links.getNumber(),
                links.getSize(),
                links.getTotalElements(),
                links.getTotalPages(),
                links.isFirst(),
                links.isLast());
    }
}
