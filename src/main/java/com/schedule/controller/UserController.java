package com.schedule.controller;

import com.schedule.domain.User;
import com.schedule.dto.request.UserLoginRequest;
import com.schedule.dto.request.UserSignupRequest;
import com.schedule.dto.request.UserUpdateRequest;
import com.schedule.dto.response.UserLoginResponse;
import com.schedule.dto.response.UserResponse;
import com.schedule.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.net.URI;

@RestController // REST api 용 컨트롤러
@RequestMapping("/users")
@RequiredArgsConstructor // 생성자 주입
public class UserController {

    private final UserService userService;

    // 회원가입
    @PostMapping("/signup")
    public ResponseEntity<UserResponse> signup(@Valid @RequestBody UserSignupRequest request) {
        UserResponse response = userService.signup(request);
        return ResponseEntity
                .created(URI.create("/users" + response.getId()))
                .body(response);
    }

    // 회원 정보 조회
    @GetMapping("/me")
    public ResponseEntity<UserResponse> getCurrentUser(@AuthenticationPrincipal User user) {
        UserResponse response = userService.getCurrentUser(user.getEmail());
        return ResponseEntity.ok(response);
    }

    // 회원 정보 수정
    @PutMapping("/me")
    public ResponseEntity<UserResponse> updateUser(
            @PathVariable Long id,
            @Valid @RequestBody UserUpdateRequest request) {
        UserResponse response = userService.updateUser(id, request);
        return ResponseEntity.ok(response);
    }

    // 회원 삭제
    @DeleteMapping("/me")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }

    // 로그인
    @PostMapping("/login")
    public ResponseEntity<UserLoginResponse> login(@Valid @RequestBody UserLoginRequest request) {
        UserLoginResponse response = userService.login(request);
        return ResponseEntity.ok(response);
    }

    // 토큰 검증
    @PostMapping("/token")
    public  ResponseEntity<UserLoginResponse> token(
            @RequestHeader("Authorization") String accessToken,
            @RequestHeader("Refresh-Token") String refreshToken) {
        UserLoginResponse response = userService.token(accessToken, refreshToken);
        return ResponseEntity.ok(response);
    }

}
