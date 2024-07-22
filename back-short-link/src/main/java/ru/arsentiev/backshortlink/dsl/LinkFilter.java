package ru.arsentiev.backshortlink.dsl;

import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
@ToString
public class LinkFilter {
    private String username;
    private String email;
    private String linkName;
    private String titleCategory;
}
