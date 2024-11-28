package com.schedule.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.schedule.domain.Role;
import com.schedule.dto.request.UserLoginRequest;
import com.schedule.dto.request.UserSignupRequest;
import com.schedule.dto.response.UserLoginResponse;
import com.schedule.dto.response.UserResponse;
import com.schedule.service.UserService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.hamcrest.Matchers.greaterThan;
import static org.hamcrest.Matchers.hasSize;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(UserController.class) // UserController 테스트
@AutoConfigureMockMvc(addFilters = false) // 시큐리티 필터 비활성화
public class UserControllerTest {

    @Autowired
    private MockMvc mockMvc; // API 요청 테스트용

    @Autowired
    private ObjectMapper objectMapper; // JSON 변환용

    @MockBean
    private UserService userService; // Service 모의 객체

    @Test
    @DisplayName("회원가입 API 성공")
    void signupSuccess() throws Exception {
        // given
        UserSignupRequest request = new UserSignupRequest();
        request.setEmail("test@test.com");
        request.setPassword("qor1234567!");
        request.setName("홍길동");

        UserResponse response = new UserResponse();
        response.setId(1L);
        response.setEmail(request.getEmail());
        response.setName(request.getName());
        response.setRole(Role.USER);

        // userService 동작 정의
        when(userService.signup(any())).thenReturn(response);

        // when & then
        mockMvc.perform(post("/users/signup")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isCreated()) // 201 상태 코드 검증
                .andExpect(header().exists("Location")) // Location 헤더 존재 검증
                .andExpect(jsonPath("$.id").value(response.getId()))
                .andExpect(jsonPath("$.email").value(response.getEmail()))
                .andExpect(jsonPath("$.name").value(response.getName()))
                .andExpect(jsonPath("$.role").value("USER"))
                .andDo(print()); // 테스트 결과 출력
    }

    @Test
    @DisplayName("회원가입 API 실패 - 잘못된 입력")
    void signupFailInvalidInput() throws Exception {
        // given
        UserSignupRequest request = new UserSignupRequest();
        request.setEmail("testEmail"); // 잘못된 이메일 형식
        request.setPassword("421");
        request.setName("테스터어");

        // when & then
        mockMvc.perform(post("/users/signup")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest()) // 400 상태 코드 검증
                .andExpect(jsonPath("$.code").value("INVALID_INPUT"))
                .andExpect(jsonPath("$.message").value("잘못된 입력값입니다."))
                .andExpect(jsonPath("$.errors").isArray()) // errors 필드가 배열인지 검증
                .andExpect(jsonPath("$.errors", hasSize(greaterThan(0))))  // 에러가 하나 이상 있는지 검증
                .andDo(print());
    }

    @Test
    @DisplayName("회원가입 실패 - 이메일 중복")
    void signupFailDuplicateEmail() throws Exception {
        // given
        UserSignupRequest request = new UserSignupRequest();
        request.setEmail("test@test.com");
        request.setPassword("qor1234567!");
        request.setName("테스터");

        // userService 가 던질 예외 정의
        when(userService.signup(any()))
                .thenThrow(new IllegalStateException("이미 존재하는 이메일입니다."));

        // when & then
        mockMvc.perform(post("/users/signup")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest()) // 400 상태 코드
                .andExpect(jsonPath("$.code").value("DUPLICATE_EMAIL"))
                .andExpect(jsonPath("$.message").value("이미 존재하는 이메일입니다."))
                .andExpect(jsonPath("$.errors").isArray())
                .andDo(print());
    }

    @Test
    @DisplayName("로그인 API 성공")
    void loginSuccess() throws Exception {
        // given
        UserLoginRequest request = new UserLoginRequest();
        request.setEmail("test@test.com");
        request.setPassword("qor1234567!");

        UserLoginResponse response = UserLoginResponse.builder()
                .id(1L)
                .email("test@test.com")
                .name("테스터")
                .build();

        when(userService.login(any(UserLoginRequest.class)))
                .thenReturn(response);

        // when & then
        mockMvc.perform(post("/users/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1L))
                .andExpect(jsonPath("$.email").value("test@test.com"))
                .andExpect(jsonPath("$.name").value("테스터"))
                .andExpect(jsonPath("$.password").doesNotExist()) // password 필드가 없는지 확인
                .andDo(print());
    }

    @Test
    @DisplayName("API 요청 시 필수 필드 누락")
    void requiredFieldMissing() throws Exception {
        UserSignupRequest request = new UserSignupRequest();
        // email 만 설정
        request.setEmail("test@test.com");

        mockMvc.perform(post("/users/signup")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.code").value("INVALID_INPUT"))
                .andExpect(jsonPath("$.errors").isNotEmpty());
    }
}
