package com.example.randevusistemi.mapper;

import com.example.randevusistemi.dto.LoggedUserDto;
import com.example.randevusistemi.entity.LoggedUser;

public class LoggedUserMapper {

    public static LoggedUserDto mapToLoggedUserDto(LoggedUser loggedUser){
        return new LoggedUserDto(
                loggedUser.getId(),
                loggedUser.getLoggedUserEmail(),
                loggedUser.getLoggedUserType()
        );
    }

    public static LoggedUser mapToLoggedUser(LoggedUserDto loggedUserDto){
        return new LoggedUser(
                loggedUserDto.getId(),
                loggedUserDto.getLoggedUserEmail(),
                loggedUserDto.getLoggedUserType()
        );
    }
}
