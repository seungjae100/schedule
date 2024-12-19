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

    private String secretKey; // 시크릿 키
    private long accessTokenExpiration; // 엑서스 토큰 만료 시간
    private long refreshTokenExpiration; // 리프레시 토큰 만료 시간
}
