package com.schedule.repository;

import com.schedule.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {

    boolean existsByEmail(String email); // 이메일 중복 유효성 검사
}
