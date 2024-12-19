package com.schedule.dto.response;

import com.schedule.domain.Role;
import com.schedule.domain.User;
import lombok.Data;

@Data
public class UserResponse {
// 서버 -> 클라이언트 응답 데이터
// 서버가 클라이언트에게 반환하는 데이터
    private Long id;        // DB에 생성된 아이디
    private String email;   // 이메일 정보
    private String name;    // 이름 정보
    private Role role;      // 권한 정보
    // 비밀번호는 민감한 정보이므로 응답에 포함하지 않는다.


    // Entity -> DTO 변환
    public static UserResponse from(User user) {
        UserResponse response = new UserResponse();
        response.setId(user.getId());
        response.setEmail(user.getEmail());
        response.setName(user.getName());
        response.setRole(user.getRole());
        return response;
    }
}
