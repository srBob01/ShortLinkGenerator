package ru.arsentiev.backshortlink.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.springframework.beans.factory.annotation.Autowired;
import ru.arsentiev.backshortlink.dto.LinkRequest;
import ru.arsentiev.backshortlink.entity.Link;
import ru.arsentiev.backshortlink.entity.User;
import ru.arsentiev.backshortlink.url.UrlShortenerService;

import java.security.NoSuchAlgorithmException;
import java.time.LocalDateTime;

@Mapper(componentModel = "spring", uses = {CategoryResponseMapper.class})
public abstract class LinkRequestMapper {
    @Autowired
    private UrlShortenerService urlShortenerService;

    @Mapping(source = "linkRequest.categoryResponse", target = "category")
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "createdDate", expression = "java(nowTime())")
    @Mapping(target = "lastModifiedDate", ignore = true)
    @Mapping(source = "user", target = "user")
    @Mapping(target = "shortLink", expression = "java(generateShortLink(linkRequest))")
    public abstract Link dtoToLink(LinkRequest linkRequest, User user);

    @Mapping(source = "linkRequest.categoryResponse", target = "category")
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "shortLink", ignore = true)
    @Mapping(target = "createdDate", ignore = true)
    @Mapping(target = "lastModifiedDate", ignore = true)
    public abstract void updateLinkFromDto(LinkRequest linkRequest, @MappingTarget Link link);

    protected String generateShortLink(LinkRequest linkRequest) {
        try {
            return urlShortenerService.shortenUrl(linkRequest.getLongLink());
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException("Error generating short link", e);
        }
    }

    protected LocalDateTime nowTime() {
        return LocalDateTime.now();
    }
}
