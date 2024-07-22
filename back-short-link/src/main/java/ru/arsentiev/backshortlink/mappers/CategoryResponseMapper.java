package ru.arsentiev.backshortlink.mappers;

import org.mapstruct.Mapper;
import ru.arsentiev.backshortlink.dto.CategoryResponse;
import ru.arsentiev.backshortlink.entity.Category;

@Mapper(componentModel = "spring")
public interface CategoryResponseMapper {
    CategoryResponse categoryToDto(Category category);

    Category dtoToCategory(CategoryResponse category);
}
