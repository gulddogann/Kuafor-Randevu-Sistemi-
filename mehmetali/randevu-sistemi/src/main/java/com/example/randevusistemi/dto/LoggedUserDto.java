package com.example.randevusistemi.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class LoggedUserDto {

    private Long id;
    private String loggedUserEmail;
    private String loggedUserType;
}
