package ru.arsentiev.backshortlink.dto;

import lombok.*;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class LongLinkRedirectResponse {
    private String longLink;
}
