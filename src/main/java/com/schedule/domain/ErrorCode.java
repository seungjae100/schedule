package com.schedule.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ErrorCode {

    // 400번 잘못된 요청
    INVALID_INPUT(400, "INVALID_INPUT", "잘못된 입력값입니다."),
    DUPLICATE_EMAIL(400, "DUPLICATE_EMAIL", "이미 존재하는 이메일입니다."),
    INVALID_PASSWORD(400, "INVALID_PASSWORD", "잘못된 비밀번호입니다."),

    // 401 인증되지 않은 사용자
    UNAUTHORIZED(401, "UNAUTHORIZED", "로그인이 필요합니다."),

    // 401 JWT 관련 에러
    TOKEN_EXPIRED(401, "TOKEN_EXPIRED", "만료된 토큰입니다."),
    TOKEN_INVALID(401, "TOKEN_INVALID", "유효하지 않은 토큰입니다."),
    TOKEN_MALFORMED(401, "TOKEN_MALFORMED", "잘못된 형식의 토큰입니다."),

    // 403 권한 관련 에러
    ACCESS_DENIED(403, "ACCESS_DENIED", "접근 권한이 없습니다."),

    // 404 리소스를 찾을 수 없음
    USER_NOT_FOUND(404, "USER_NOT_FOUND", "사용자를 찾을 수 없 습니다."),

    // 500 Internal Server Error
    INTERNAL_SERVER_ERROR(500, "INTERNAL_SERVER_ERROR", "서버 오류가 발생했습니다");

    private final int status; // HTTP 상태 코드
    private final String code; // 에러 코드
    private final String message; // 에러 메세지
}
