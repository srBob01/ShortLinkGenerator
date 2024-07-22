package ru.arsentiev.backshortlink.mappers;

import org.mapstruct.Mapper;
import ru.arsentiev.backshortlink.dto.UserResponse;
import ru.arsentiev.backshortlink.entity.User;

@Mapper(componentModel = "spring")
public interface UserResponseMapper {
    UserResponse userToDto(User user);
}

