package ru.arsentiev.backshortlink.mappers;

import org.mapstruct.Context;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import ru.arsentiev.backshortlink.dto.LinkResponse;
import ru.arsentiev.backshortlink.entity.Link;

@Mapper(componentModel = "spring")
public interface LinkResponseMapper {
    @Mapping(source = "category.title", target = "titleCategory")
    @Mapping(source = "user.username", target = "username")
    @Mapping(target = "shortLink", expression = "java(startUrl + link.getShortLink())")
    LinkResponse linkToDto(Link link, @Context String startUrl);
}
