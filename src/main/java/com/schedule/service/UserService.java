package com.schedule.service;

import com.schedule.domain.Role;
import com.schedule.domain.User;
import com.schedule.dto.request.UserLoginRequest;
import com.schedule.dto.request.UserSignupRequest;
import com.schedule.dto.request.UserUpdateRequest;
import com.schedule.dto.response.UserLoginResponse;
import com.schedule.dto.response.UserResponse;
import com.schedule.repository.UserRepository;
import com.schedule.security.jwt.service.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true) // 읽기 전용이 기본
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder; // 비밀번호 암호화
    private final JwtService jwtService; // JWT 토큰 생성
    private final AuthenticationManager authenticationManager; // 인증 관리자

    // 회원가입
    @Transactional // 쓰기 작업에는 @Transactional 사용
    public UserResponse signup(UserSignupRequest request) {
        // 이메일 중복 검사
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new IllegalStateException("이미 존재하는 이메일입니다.");
        }

        // 새로운 회원 생성
        User user = User.builder()
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword())) // 비밀번호 암호화
                .name(request.getName())
                .role(Role.USER)
                .build();

        User savedUser = userRepository.save(user);
        return UserResponse.from(savedUser);
    }

    // 인증된 사용자 정보 조회
    @Transactional(readOnly = true)
    public UserResponse getCurrentUser(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 회원입니다."));
        return UserResponse.from(user);
    }

    // 회원 정보 수정
    @Transactional
    public UserResponse updateUser(Long id, UserUpdateRequest request) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 회원입니다."));

        user.updateUserInfo(
                request.getName(),
                request.getPassword() != null ?
                    passwordEncoder.encode(request.getPassword()) :
                    user.getPassword()
        ); // 비밀번호 암호화
        return UserResponse.from(user);
    }

    // 회원 삭제
    @Transactional
    public void deleteUser(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 회원입니다."));
        userRepository.delete(user);
    }

    // 로그인
    public UserLoginResponse login(UserLoginRequest request) {
        // Spring Security
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );

        // 이메일로 사용자 찾기
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 이메일입니다."));

        // JWT 토큰 생성
        String accessToken = jwtService.generateToken(user);
        String refreshToken = jwtService.generateRefreshToken(user);

        // 응답 반환
        return UserLoginResponse.from(user, accessToken, refreshToken);
    }

    @Transactional
    public UserLoginResponse token(String accessToken ,String refreshToken) {
        String userEmail = jwtService.extractUsername(refreshToken);

        if (!jwtService.isRefreshTokenValid(refreshToken)) {
            throw new IllegalArgumentException("유효하지 않은 리프레시 토큰입니다.");
        }

        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 사용자입니다."));

        return UserLoginResponse.from(user, accessToken, refreshToken);
    }
}
