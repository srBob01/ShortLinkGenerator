package ru.arsentiev.backshortlink.dsl;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
@ToString
public class UserFilter {
    private String firstName;
    private String lastName;
    private String email;
    private String username;
}
