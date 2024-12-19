package com.schedule.dto.response;

import com.schedule.domain.User;
import lombok.Builder;
import lombok.Getter;

import java.awt.*;

@Getter
@Builder
public class UserLoginResponse {

    private Long id;
    private String email;
    private String name;
    private String accessToken; // JWT 토큰
    private String refreshToken;
    private String tokenType;


    public static UserLoginResponse from(User user, String accessToken, String refreshToken) {
        return UserLoginResponse.builder()
                .id(user.getId())
                .email(user.getEmail())
                .name(user.getName())
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .tokenType("Bearer")
                .build();
    }
}
