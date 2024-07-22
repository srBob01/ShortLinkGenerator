package ru.arsentiev.backshortlink.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.arsentiev.backshortlink.entity.Category;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Short> {
}
