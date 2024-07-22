package ru.arsentiev.backshortlink.dsl;

import org.springframework.data.jpa.domain.Specification;
import ru.arsentiev.backshortlink.entity.Link;

public class LinkSpecification {
    public static Specification<Link> withUserId(Integer userId) {
        return ((root, query, criteriaBuilder) -> criteriaBuilder.equal(
                root.get("user").get("id"), userId
        ));
    }
}
