package com.schedule.security.jwt;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Getter
@Setter
@Configuration
@ConfigurationProperties(prefix = "jwt")
public class JwtProperties {

    // JWT 토큰 생성에 사용되는 비밀키
    private String secretKey; // 시크릿 키

    // Access Token의 유효기간 ( 밀리초 단위 )
    private long accessTokenExpiration; // 엑서스 토큰 만료 시간

    // Refresh Token의 유효기간 ( 밀리초 단위 )
    private long refreshTokenExpiration; // 리프레시 토큰 만료 시간
}
