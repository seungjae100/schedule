package com.schedule.dto.response;

import com.schedule.domain.User;
import lombok.Data;

@Data
public class UserLoginResponse {

    private Long id;
    private String email;
    private String name;


    public static UserLoginResponse from(User user) {
        UserLoginResponse response = new UserLoginResponse();
        response.setId(user.getId());
        response.setEmail(user.getEmail());
        response.setName(user.getName());
        return response;
    }
}
