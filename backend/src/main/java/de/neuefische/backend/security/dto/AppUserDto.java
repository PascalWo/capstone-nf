package de.neuefische.backend.security.dto;

import lombok.Data;
import lombok.Getter;

@Data
@Getter
public class AppUserDto {

    private String username;
    private String password;
}
