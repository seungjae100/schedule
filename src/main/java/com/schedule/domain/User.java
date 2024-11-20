package com.schedule.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // 고유키

    @Column(nullable = false, unique = true)
    private String email; // 이메일(아이디)

    @Column(nullable = false)
    private String password; // 비밀번호

    @Column(nullable = false)
    private String name; // 사용자 이름

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role; // 권한 (관리자 , 일반)

}
