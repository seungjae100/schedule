package com.schedule.repository;

import com.schedule.domain.User;
import com.schedule.domain.schedule.Schedule;
import com.schedule.domain.schedule.ScheduleCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface ScheduleRepository extends JpaRepository<Schedule, Long> {
    // 1. 기본 조회 (메서드명으로 구현)
    // 사용자의 전체 일정 조회
    List<Schedule> findByUser(User user);

    // 카테고리별 일정 조회
    List<Schedule> findByUserAndCategory(User user, ScheduleCategory category);

    // 2. 기간별 일정 조회 (월간, 주간, 일간)
    @Query("SELECT s FROM Schedule s " +
            "WHERE s.user = :user " +
            "AND s.startDate BETWEEN :startDate AND :endDate " +
            "ORDER BY s.startDate ASC")
    List<Schedule> findSchedulesByPeriod(
            @Param("user") User user,
            @Param("startDate") LocalDateTime startDate,
            @Param("endDate") LocalDateTime endDate
    );

    // 3. 일정 검색 (제목, 내용 검색)
    @Query("SELECT s FROM Schedule s " +
            "WHERE s.user = :user " +
            "AND (s.title LIKE %:keyword% OR s.description LIKE %:keyword%)")
    List<Schedule> searchSchedules(
            @Param("user") User user,
            @Param("keyword") String keyword
    );

    // 4. 알림이 필요한 일정 조회 (현재 시간 기준으로 곧 시작하는 일정)
    @Query("SELECT s FROM Schedule s " +
            "WHERE s.user = :user " +
            "AND s.startDate BETWEEN :now AND :future " +
            "AND s.status = 'RESERVED'")
    List<Schedule> findUpcomingSchedules(
            @Param("user") User user,
            @Param("now") LocalDateTime now,
            @Param("future") LocalDateTime future
    );
}
