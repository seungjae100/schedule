package com.schedule.service;

import com.schedule.domain.User;
import com.schedule.domain.schedule.Schedule;
import com.schedule.domain.schedule.ScheduleCategory;
import com.schedule.dto.request.ScheduleCreateRequest;
import com.schedule.dto.request.ScheduleUpdateRequest;
import com.schedule.dto.response.ScheduleResponse;
import com.schedule.repository.ScheduleRepository;
import com.schedule.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
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

    private User getUserFromUserDetails(UserDetails userDetails) {
        return userRepository.findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new EntityNotFoundException("사용자를 찾을 수 없습니다."));
    }

    private User getUserById(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("사용자를 찾을 수 없습니다."));
    }

    // 일정 생성
    @Transactional
    public Long createSchedule(UserDetails userDetails, ScheduleCreateRequest request) {
        User user = getUserFromUserDetails(userDetails);
        Schedule schedule = Schedule.builder()
                .user(user)
                .title(request.getTitle())
                .description(request.getDescription())
                .startDate(request.getStartDate())
                .endDate(request.getEndDate())
                .category(request.getCategory())
                .build();
        return scheduleRepository.save(schedule).getId();
    }

    // 일정 수정
    @Transactional
    public void updateSchedule(UserDetails userDetails, Long scheduleId, ScheduleUpdateRequest request) {
        User user = getUserFromUserDetails(userDetails);
        Schedule schedule = scheduleRepository.findById(scheduleId)
                .orElseThrow(() -> new EntityNotFoundException("스케줄을 찾을 수 없습니다."));

        // 해당 일정의 소유자인지 확인
        if (!schedule.getUser().getId().equals(user.getId())) {
            throw new IllegalArgumentException("해당 일정에 대한 권한이 없습니다.");
        }

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
    public void deleteSchedule(UserDetails userDetails, Long scheduleId) {
        User user = getUserFromUserDetails(userDetails);
        Schedule schedule = scheduleRepository.findById(scheduleId)
                .orElseThrow(() -> new EntityNotFoundException("스케줄을 찾을 수 없습니다."));

        // 해당 일정의 소유자인지 확인
        if (!schedule.getUser().getId().equals(user.getId())) {
            throw new IllegalStateException("해당 일정에 대한 권한이 없습니다.");
        }

        scheduleRepository.deleteById(scheduleId);
    }

    // 전체 일정 조회
    public List<ScheduleResponse> getAllSchedules(UserDetails userDetails) {
        User user = getUserFromUserDetails(userDetails);
        return scheduleRepository.findByUser(user)
                .stream()
                .map(ScheduleResponse::new)
                .collect(Collectors.toList());
    }

    // 일정 상세 조회
    public ScheduleResponse getSchedule(UserDetails userDetails, Long scheduleId) {
        User user = getUserFromUserDetails(userDetails);
        Schedule schedule = scheduleRepository.findById(scheduleId)
                .orElseThrow(() -> new EntityNotFoundException("스케줄을 찾을 수 없습니다."));

        // 해당 일정의 소유자인지 확인
        if (!schedule.getUser().getId().equals(user.getId())) {
            throw new IllegalStateException("해당 일정에 대한 권한이 없습니다.");
        }

        return new ScheduleResponse(schedule);
    }

    // 기간별 일정 조회
    public List<ScheduleResponse> getScheduleByPeriod(UserDetails userDetails, LocalDateTime startDate, LocalDateTime endDate) {
        User user = getUserFromUserDetails(userDetails);
        return scheduleRepository.findSchedulesByPeriod(user, startDate, endDate)
                .stream()
                .map(ScheduleResponse::new)
                .collect(Collectors.toList());
    }

    // 일정 검색
    public List<ScheduleResponse> searchSchedules(UserDetails userDetails, String keyword) {
        User user = getUserFromUserDetails(userDetails);
        return scheduleRepository.searchSchedules(user, keyword)
                .stream()
                .map(ScheduleResponse::new)
                .collect(Collectors.toList());
    }

    // 카테고리별 일정 조회
    public List<ScheduleResponse> getSchedulesByCategory(UserDetails userDetails, ScheduleCategory category) {
        User user = getUserFromUserDetails(userDetails);
        return scheduleRepository.findByUserAndCategory(user, category)
                .stream()
                .map(ScheduleResponse::new)
                .collect(Collectors.toList());
    }

}
