package com.schedule.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Builder;
import lombok.Data;

@Data
public class UserUpdateRequest {

    private String name;
    private String password;

    @Builder
    public UserUpdateRequest(String name, String password) {
        this.name = name;
        this.password = password;
    }
}
