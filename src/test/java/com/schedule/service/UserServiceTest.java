package com.schedule.service;

import com.schedule.domain.Role;
import com.schedule.domain.User;
import com.schedule.dto.request.UserSignupRequest;
import com.schedule.dto.response.UserResponse;
import com.schedule.repository.UserRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class) // Mockito 확장 기능 사용
public class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @InjectMocks // Mock 들을 주입받는 UserService 생성
    private UserService userService;

    @Test
    @DisplayName("회원가입 성공")
    void signupSuccess() {
        // given (테스트 데이터 준비)
        UserSignupRequest request = new UserSignupRequest();
        request.setEmail("test@test.com");
        request.setPassword("1234");
        request.setName("홍길동");

        // savedUser 준비 (DB 저장 후 반환될 User 엔티티)
        User savedUser = new User();
        savedUser.setId(1L);
        savedUser.setEmail(request.getEmail());
        savedUser.setPassword(request.getPassword());
        savedUser.setName(request.getName());
        savedUser.setRole(Role.USER);

        // userRepository 동작 정의
        when(userRepository.existsByEmail(any())).thenReturn(false); // 이메일 중복
        when(userRepository.save(any(User.class))).thenReturn(savedUser); // 저장 시 savedUser 반환


        // when (테스트 실행)
        UserResponse response = userService.signup(request);

        // then (결과 검증)
        assertNotNull(response); // 응답이 null 이 아님
        assertEquals(request.getEmail(), response.getEmail()); // 이메일 일치
        assertEquals(request.getName(), response.getName());   // 이름 일치
        assertEquals(Role.USER, response.getRole());           // 역할 일치

        // Repository 메서드 호출 검증
        verify(userRepository).existsByEmail(request.getEmail()); // existsEmail 호출 확인
        verify(userRepository).save(any(User.class));             // save 호출 확인
    }

    @Test
    @DisplayName("회원가입 실패 - 이메일 중복")
    void signupFailDuplicateEmail() {
        // given
        UserSignupRequest request = new UserSignupRequest();
        request.setEmail("test@test.com");
        request.setPassword("1234");
        request.setName("홍길동");

        // 이메일 중복 상황 설정
        when(userRepository.existsByEmail(any())).thenReturn(true);

        // when & then
        IllegalStateException exception = assertThrows(IllegalStateException.class, () -> {
                userService.signup(request);
        });

        // 예외 메세지 검증
        assertEquals("이미 존재하는 이메일입니다.", exception.getMessage());

        // save 메서드가 호출되지 않았는지 검증
        verify(userRepository, never()).save(any());

    }
}
