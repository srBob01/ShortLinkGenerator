package ru.arsentiev.backshortlink.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import ru.arsentiev.backshortlink.dto.UserRequest;
import ru.arsentiev.backshortlink.entity.User;

@Mapper(componentModel = "spring")
public interface UserRequestMapper {
    void updateUserFromDto(UserRequest userRequest, @MappingTarget User user);
}