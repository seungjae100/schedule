package com.schedule.security;

import com.schedule.domain.ErrorCode;
import com.schedule.global.exception.ErrorResponse;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.List;

@RestControllerAdvice
@Slf4j
public class SecurityExceptionHandler {

    // JWT 토큰 만료
    @ExceptionHandler(ExpiredJwtException.class)
    public ResponseEntity<ErrorResponse> handleExpiredJwtException(ExpiredJwtException ex) {
        log.error("Token has expired: {}", ex.getMessage());

        return ResponseEntity
                .status(ErrorCode.TOKEN_EXPIRED.getStatus())
                .body(ErrorResponse.builder()
                        .errorCode(ErrorCode.TOKEN_EXPIRED)
                        .errors(List.of("토큰이 만료되었습니다."))
                        .build());
    }

    // JWT 토큰 유효성 검증 실패
    @ExceptionHandler(JwtException.class)
    public ResponseEntity<ErrorResponse> handleJwtException(JwtException ex) {
        log.error("Invalid Token: {}", ex.getMessage());

        return ResponseEntity
                .status(ErrorCode.TOKEN_INVALID.getStatus())
                .body(ErrorResponse.builder()
                        .errorCode(ErrorCode.TOKEN_INVALID)
                        .errors(List.of("유효하지 않은 토큰입니다."))
                        .build());
    }

    // 인증 실패
    @ExceptionHandler(AuthenticationException.class)
    public ResponseEntity<ErrorResponse> handleAuthenticationException(
            AuthenticationException ex) {
        log.error("Authentication Failed: {}", ex.getMessage());

        return ResponseEntity
                .status(ErrorCode.UNAUTHORIZED.getStatus())
                .body(ErrorResponse.builder()
                        .errorCode(ErrorCode.UNAUTHORIZED)
                        .errors(List.of("인증에 실패했습니다."))
                        .build());
    }

    // 권한 없음
    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<ErrorResponse> handleAccessDeniedException(
            AccessDeniedException ex) {
        log.error("Access Denied: {}", ex.getMessage());

        return ResponseEntity
                .status(ErrorCode.ACCESS_DENIED.getStatus())
                .body(ErrorResponse.builder()
                        .errorCode(ErrorCode.ACCESS_DENIED)
                        .errors(List.of("접근 권한이 없습니다."))
                        .build());
    }


}
