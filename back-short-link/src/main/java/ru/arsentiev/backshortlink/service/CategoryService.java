package ru.arsentiev.backshortlink.service;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.arsentiev.backshortlink.dto.CategoryResponse;
import ru.arsentiev.backshortlink.mappers.CategoryResponseMapper;
import ru.arsentiev.backshortlink.repository.CategoryRepository;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class CategoryService {
    private final CategoryRepository categoryRepository;
    private final CategoryResponseMapper categoryResponseMapper;

    public CategoryResponse findById(Short id) {
        log.info("Finding Category by id: {}", id);
        return categoryRepository.findById(id)
                .map(categoryResponseMapper::categoryToDto)
                .orElseThrow(() -> {
                    log.error("No Category found with id: {}", id);
                    return new EntityNotFoundException("No Category with id: " + id);
                });
    }

    public List<CategoryResponse> findAll() {
        log.info("Finding all Categories by id");
        return categoryRepository.findAll(Sort.by("title").descending()).stream()
                .map(categoryResponseMapper::categoryToDto)
                .toList();
    }
}
