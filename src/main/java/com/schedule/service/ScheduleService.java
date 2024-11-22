package com.schedule.service;

import com.schedule.domain.User;
import com.schedule.domain.schedule.Schedule;
import com.schedule.domain.schedule.ScheduleCategory;
import com.schedule.domain.schedule.ScheduleStatus;
import com.schedule.dto.request.ScheduleCreateRequest;
import com.schedule.dto.request.ScheduleUpdateRequest;
import com.schedule.dto.response.ScheduleResponse;
import com.schedule.repository.ScheduleRepository;
import com.schedule.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ScheduleService {

    private final ScheduleRepository scheduleRepository;
    private final UserRepository userRepository;

    // 일정 생성
    @Transactional
    public Long createSchedule(Long userId, ScheduleCreateRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("사용자를 찾을 수 없습니다."));

        Schedule schedule = Schedule.builder()
                .user(user)
                .title(request.getTitle())
                .description(request.getDescription())
                .startDate(request.getStartDate())
                .endDate(request.getEndDate())
                .category(request.getCategory())
                .status(ScheduleStatus.RESERVED)
                .build();
        return scheduleRepository.save(schedule).getId();
    }

    // 일정 수정
    @Transactional
    public void updateSchedule(Long ScheduleId, ScheduleUpdateRequest request) {
        Schedule schedule = scheduleRepository.findById(ScheduleId)
                .orElseThrow(() -> new EntityNotFoundException("스케줄을 찾을 수 없습니다."));

        schedule.update(
                request.getTitle(),
                request.getDescription(),
                request.getStartDate(),
                request.getEndDate(),
                request.getCategory()
        );
    }

    // 일정 삭제
    @Transactional
    public void deleteSchedule(Long scheduleId) {
        scheduleRepository.deleteById(scheduleId);
    }

    // 일정 상세 조회
    public ScheduleResponse getSchedule(Long scheduleId) {
        Schedule schedule = scheduleRepository.findById(scheduleId)
                .orElseThrow(() -> new EntityNotFoundException("스케줄을 찾을 수 없습니다."));
        return new ScheduleResponse(schedule);
    }

    // 기간별 일정 조회
    public List<ScheduleResponse> getScheduleByPeriod(Long userId, LocalDateTime startDate, LocalDateTime endDate) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("사용자를 찾을 수 없습니다."));

        return scheduleRepository.findSchedulesByPeriod(user, startDate, endDate)
                .stream()
                .map(ScheduleResponse::new)
                .collect(Collectors.toList());
    }

    // 일정 검색
    public List<ScheduleResponse> searchSchedules(Long userId, String keyword) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("사용자를 찾을 수 없습니다."));

        return scheduleRepository.searchSchedules(user, keyword)
                .stream()
                .map(ScheduleResponse::new)
                .collect(Collectors.toList());
    }

    // 카테고리별 일정 조회
    public List<ScheduleResponse> getSchedulesByCategory(Long userId, ScheduleCategory category) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("사용자를 찾을 수 없습니다."));

        return scheduleRepository.findByUserAndCategory(user, category)
                .stream()
                .map(ScheduleResponse::new)
                .collect(Collectors.toList());
    }

}
