package com.schedule.dto.response;

import com.schedule.domain.User;
import lombok.Data;

@Data
public class UserLoginResponse {

    private Long id;
    private String email;
    private String name;
    private String password;

    public static UserLoginResponse from(User user) {
        UserLoginResponse response = new UserLoginResponse();
        response.setId(user.getId());
        response.setEmail(user.getEmail());
        response.setName(user.getName());
        response.setPassword(user.getPassword());
        return response;
    }
}
