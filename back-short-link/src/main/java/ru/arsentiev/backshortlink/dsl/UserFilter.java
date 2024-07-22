package ru.arsentiev.backshortlink.dsl;

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
