package com.schedule.service;

import com.schedule.domain.Role;
import com.schedule.domain.User;
import com.schedule.dto.request.UserLoginRequest;
import com.schedule.dto.request.UserSignupRequest;
import com.schedule.dto.request.UserUpdateRequest;
import com.schedule.dto.response.UserLoginResponse;
import com.schedule.dto.response.UserResponse;
import com.schedule.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true) // 읽기 전용이 기본
public class UserService {

    private final UserRepository userRepository;

    // 회원가입
    @Transactional // 쓰기 작업에는 @Transactional 사용
    public UserResponse signup(UserSignupRequest request) {
        // 이메일 중복 검사
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new IllegalArgumentException("이미 존재하는 이메일입니다.");
        }

        // 새로운 회원 생성
        User user = new User();
        user.setEmail(request.getEmail());
        user.setPassword(request.getPassword());
        user.setName(request.getName());
        user.setRole(Role.USER);

        User savedUser = userRepository.save(user);
        return UserResponse.from(savedUser);
    }

    // 회원 조회
    public UserResponse getUser(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 회원입니다."));

        return UserResponse.from(user);
    }

    // 회원 정보 수정
    @Transactional
    public UserResponse updateUser(Long id, UserUpdateRequest request) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 회원입니다."));

        user.setName(request.getName());
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
        // 1. 이메일로 사용자 찾기
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 이메일입니다."));

        // 2. 비밀번호 확인
        if (!user.getPassword().equals(request.getPassword())) {
            throw new IllegalArgumentException("비밀번호가 일치하지 않습니다.");
        }

        // 3. 로그인 성공 응답
        return UserLoginResponse.from(user);
    }
}
