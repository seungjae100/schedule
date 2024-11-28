package com.schedule.security.jwt;

import java.security.SecureRandom;
import java.util.Base64;

// JWT 시크릿 키 생성
public class GenerateJwtSecretKey {
    public static void main(String[] args) {
        // 안전한 랜덤 키 생성
        SecureRandom secureRandom = new SecureRandom();
        byte[] key = new byte[64]; // 512 bit
        secureRandom.nextBytes(key);
        String secretKey = Base64.getEncoder().encodeToString(key);

        System.out.println("Generated Secret Key: " + secretKey);
    }
}
