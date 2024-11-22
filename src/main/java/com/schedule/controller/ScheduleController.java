package com.schedule.controller;

import com.schedule.domain.schedule.ScheduleCategory;
import com.schedule.dto.request.ScheduleCreateRequest;
import com.schedule.dto.request.ScheduleUpdateRequest;
import com.schedule.dto.response.ScheduleResponse;
import com.schedule.service.ScheduleService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestControllerAdvice
@RequestMapping("/schedules")
@RequiredArgsConstructor
public class ScheduleController {

    private final ScheduleService scheduleService;

    // 일정 생성
    @PostMapping
    public ResponseEntity<Long> createSchedule(@AuthenticationPrincipal UserDetails userDetails,
                                               @RequestBody @Valid ScheduleCreateRequest request) {
        Long userId = Long.parseLong(userDetails.getUsername());
        Long scheduleId = scheduleService.createSchedule(userId, request);
        return ResponseEntity.ok(scheduleId);
    }

    // 일정 수정
    @PutMapping("/{scheduleId}")
    public ResponseEntity<Void> updateSchedule(
            @PathVariable Long scheduleId,
            @RequestBody @Valid ScheduleUpdateRequest request) {
        scheduleService.updateSchedule(scheduleId, request);
        return ResponseEntity.ok().build();
    }

    // 일정 삭제
    @DeleteMapping("/{scheduleId}")
    public ResponseEntity<Void> deleteSchedule(@PathVariable Long scheduleId) {
        scheduleService.deleteSchedule(scheduleId);
        return ResponseEntity.ok().build();
    }

    // 일정 상세 조회
    @GetMapping("/{scheduleId}")
    public ResponseEntity<ScheduleResponse> getSchedule(@PathVariable Long scheduleId) {
        return ResponseEntity.ok(scheduleService.getSchedule(scheduleId));
    }

    // 기간별 일정 조회
    @GetMapping("/period")
    public ResponseEntity<List<ScheduleResponse>> getScheduleByPeriod(
            @AuthenticationPrincipal UserDetails userDetails,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDateTime startDate,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDateTime endDate) {
        Long userId = Long.parseLong(userDetails.getUsername());
        return ResponseEntity.ok(scheduleService.getScheduleByPeriod(userId, startDate ,endDate));
    }

    // 일정 검색
    @GetMapping("/search")
    public ResponseEntity<List<ScheduleResponse>> searchSchedules(
            @AuthenticationPrincipal UserDetails userDetails,
            @RequestParam String keyword) {
        Long userId = Long.parseLong(userDetails.getUsername());
        return ResponseEntity.ok(scheduleService.searchSchedules(userId, keyword));
    }

    // 카테고리별 일정 조회
    @GetMapping("/category/{category}")
    public ResponseEntity<List<ScheduleResponse>> getSchedulesByCategory(
            @AuthenticationPrincipal UserDetails userDetails,
            @PathVariable ScheduleCategory category) {
        Long userId = Long.parseLong(userDetails.getUsername());
        return ResponseEntity.ok(scheduleService.getSchedulesByCategory(userId, category));
    }
}
