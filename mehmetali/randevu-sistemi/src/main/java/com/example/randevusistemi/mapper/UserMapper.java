package com.example.randevusistemi.mapper;

import com.example.randevusistemi.dto.UserDto;
import com.example.randevusistemi.entity.User;

public class UserMapper {
    public static UserDto mapToUserDto(User user){
        return new UserDto(
                user.getId(),
                user.getUserAd(),
                user.getUserSoyad(),
                user.getUserEmail(),
                user.getUserPassword(),
                user.getLoggedEmail(),
                user.isLoggedIn(),
                user.isAdmin(),
                user.isKuafor(),
                user.isMusteri()
        );
    }
    public static User mapToUser(UserDto userDto){
        return new User(
                userDto.getId(),
                userDto.getUserAd(),
                userDto.getUserSoyad(),
                userDto.getUserEmail(),
                userDto.getUserPassword(),
                userDto.getLoggedEmail(),
                userDto.isLoggedIn(),
                userDto.isAdmin(),
                userDto.isKuafor(),
                userDto.isMusteri()
        );
    }
}
