package ru.arsentiev.backshortlink.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.time.LocalDateTime;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
@ToString
public class LinkRequest {
    @NotBlank
    @NotNull
    private String longLink;
    @NotBlank
    @NotNull
    private String linkName;
    @NotNull
    private CategoryResponse categoryResponse;
    @NotNull
    private LocalDateTime removeDate;
}
