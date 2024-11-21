package com.schedule.global.exception;

import com.schedule.domain.ErrorCode;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ErrorResponse {

    private String code;         // 에러 코드
    private String message;      // 에러 메세지
    private List<String> errors;  // 상세 에러 내용

    @Builder
    public ErrorResponse(ErrorCode errorCode, List<String> errors) {
        this.code = errorCode.getCode();
        this.message = errorCode.getMessage();
        this.errors = errors;
    }
}
