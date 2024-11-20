package com.schedule.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

@Data
public class UserSignupRequest {
// 클라이언트 -> 서버 요청 데이터
// 회원가입 시 필요한 데이터
    @NotEmpty(message = "이메일은 필수입니다.")
    @Email(message = "이메일 형식이 아닙니다.")
    private String email;

    @NotEmpty(message = "비밀번호는 필수입니다.")
    @Pattern(regexp = "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,}$",
            message = "비밀번호는 8자 이상, 숫자, 특수문자를 포함해야합니다.")
    private String password;

    @NotEmpty(message = "이름은 필수입니다.")
    private String name;
}
