package com.schedule.controller;

import com.schedule.domain.schedule.ScheduleCategory;
import com.schedule.dto.request.ScheduleCreateRequest;
import com.schedule.dto.request.ScheduleUpdateRequest;
import com.schedule.dto.response.ScheduleResponse;
import com.schedule.repository.UserRepository;
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

@RestController
@RequestMapping("/schedules")
@RequiredArgsConstructor
public class ScheduleController {

    private final ScheduleService scheduleService;
    private final UserRepository userRepository;

    // 일정 생성
    @PostMapping
    public ResponseEntity<Long> createSchedule(
            @AuthenticationPrincipal UserDetails userDetails,
            @RequestBody @Valid ScheduleCreateRequest request) {
        return ResponseEntity.ok(scheduleService.createSchedule(userDetails, request));
    }

    // 일정 수정
    @PutMapping("/{scheduleId}")
    public ResponseEntity<Void> updateSchedule(
            @AuthenticationPrincipal UserDetails userDetails,
            @PathVariable Long scheduleId,
            @RequestBody @Valid ScheduleUpdateRequest request) {
        scheduleService.updateSchedule(userDetails, scheduleId, request);
        return ResponseEntity.ok().build();
    }

    // 일정 삭제
    @DeleteMapping("/{scheduleId}")
    public ResponseEntity<Void> deleteSchedule(
            @AuthenticationPrincipal UserDetails userDetails,
            @PathVariable Long scheduleId) {
        scheduleService.deleteSchedule(userDetails, scheduleId);
        return ResponseEntity.ok().build();
    }

    // 일정 전체 조회
    @GetMapping("/all")
    public ResponseEntity<List<ScheduleResponse>> getAllSchedules(
            @AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(scheduleService.getAllSchedules(userDetails));
    }

    @GetMapping("/{scheduleId}")
    public ResponseEntity<ScheduleResponse> getSchedule(
            @AuthenticationPrincipal UserDetails userDetails,
            @PathVariable Long scheduleId) {
        return ResponseEntity.ok(scheduleService.getSchedule(userDetails, scheduleId));
    }

    // 기간별 일정 조회
    @GetMapping("/period")
    public ResponseEntity<List<ScheduleResponse>> getScheduleByPeriod(
            @AuthenticationPrincipal UserDetails userDetails,
            @RequestParam("startDate") @DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'") LocalDateTime startDate,
            @RequestParam("endDate") @DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'") LocalDateTime endDate) {
        return ResponseEntity.ok(scheduleService.getScheduleByPeriod(userDetails, startDate, endDate));
    }
    // 일정 검색
    @GetMapping("/search")
    public ResponseEntity<List<ScheduleResponse>> searchSchedules(
            @AuthenticationPrincipal UserDetails userDetails,
            @RequestParam String keyword) {
        return ResponseEntity.ok(scheduleService.searchSchedules(userDetails, keyword));
    }

    // 카테고리별 일정 조회
    @GetMapping("/category/{category}")
    public ResponseEntity<List<ScheduleResponse>> getSchedulesByCategory(
            @AuthenticationPrincipal UserDetails userDetails,
            @PathVariable ScheduleCategory category) {
        return ResponseEntity.ok(scheduleService.getSchedulesByCategory(userDetails, category));
    }
}
