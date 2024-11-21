package com.schedule.global.exception;

import com.schedule.domain.ErrorCode;
import jakarta.persistence.EntityNotFoundException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.List;
import java.util.stream.Collectors;

@RestControllerAdvice
@Slf4j
public class GlobalExceptionHandler {

    // ValidateFiled 시 발생하는 예외처리
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponse> handleValidationExceptions(
            MethodArgumentNotValidException ex) {
        log.error("handleValidationExceptions", ex);
        List<String> errors = ex.getBindingResult()
                .getFieldErrors()
                .stream()
                .map(error -> error.getField() + ": " + error.getDefaultMessage())
                .collect(Collectors.toList());

        return ResponseEntity
                .status(ErrorCode.INVALID_INPUT.getStatus())
                .body(ErrorResponse.builder()
                        .errorCode(ErrorCode.INVALID_INPUT)
                        .errors(errors)
                        .build());

    }

    // 이메일 중복 예외처리
    @ExceptionHandler(IllegalStateException.class)
    public ResponseEntity<ErrorResponse> handleIllegalStateException(
            IllegalStateException ex) {
        log.error("handleIllegalStateException", ex);

        return ResponseEntity
                .status(ErrorCode.DUPLICATE_EMAIL.getStatus())
                .body(ErrorResponse.builder()
                        .errorCode(ErrorCode.DUPLICATE_EMAIL)
                        .errors(List.of(ex.getMessage()))
                        .build());
    }

    // 사용자를 찾을 수 없을 때 예외처리
    @ExceptionHandler(EntityNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleEntityNotFoundException(
            EntityNotFoundException ex) {
        log.error("handleEntityNotFoundException", ex);

        return ResponseEntity
                .status(ErrorCode.USER_NOT_FOUND.getStatus())
                .body(ErrorResponse.builder()
                        .errorCode(ErrorCode.USER_NOT_FOUND)
                        .errors(List.of(ex.getMessage()))
                        .build());
    }

    // 그 외 모든 예외처리
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleException(
            Exception ex) {
        log.error("handleException", ex);

        return ResponseEntity
                .status(ErrorCode.INTERNAL_SERVER_ERROR.getStatus())
                .body(ErrorResponse.builder()
                        .errorCode(ErrorCode.INTERNAL_SERVER_ERROR)
                        .errors(List.of(ex.getMessage()))
                        .build());
    }
}
