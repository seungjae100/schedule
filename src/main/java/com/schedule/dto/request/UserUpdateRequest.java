package com.schedule.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Builder;
import lombok.Data;

@Data
public class UserUpdateRequest {
    @NotBlank(message = "이름은 필수입니다.")
    private String name;

    @NotBlank(message = "비밀번호는 필수입니다.")
    private String password;

    @Builder
    public UserUpdateRequest(String name, String password) {
        this.name = name;
        this.password = password;
    }
}
