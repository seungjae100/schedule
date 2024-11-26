package com.schedule.service;

import com.schedule.domain.Role;
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
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ScheduleServiceTest {

    @Mock
    private ScheduleRepository scheduleRepository;

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private ScheduleService scheduleService;

    @Test
    @DisplayName("일정 생성 성공")
    void createScheduleSuccess() {
        // given
        User user = User.builder()
                .email("test@test.com")
                .password("password!!231")
                .name("테스터")
                .role(Role.USER)
                .build();

        ScheduleCreateRequest request = ScheduleCreateRequest.builder()
                .title("일정 테스트")
                .description("일정 테스트 내용")
                .startDate(LocalDateTime.now())
                .endDate(LocalDateTime.now().plusHours(2))
                .category(ScheduleCategory.WORK)
                .build();

        Schedule schedule = Schedule.builder()
                .user(user)
                .title(request.getTitle())
                .description(request.getDescription())
                .startDate(request.getStartDate())
                .endDate(request.getEndDate())
                .category(request.getCategory())
                .status(ScheduleStatus.RESERVED)
                .build();

        when(userRepository.findById(any())).thenReturn(Optional.of(user));
        when(scheduleRepository.save(any(Schedule.class))).thenReturn(schedule);

        // when
        scheduleService.createSchedule(1L, request);

        // then
        verify(userRepository).findById(1L);
        verify(scheduleRepository).save(any(Schedule.class));
    }

    @Test
    @DisplayName("일정 생성 실패 - 사용자 없음")
    void createScheduleFailUserNotFound() {
        // given
        when(userRepository.findById(any())).thenReturn(Optional.empty());

        ScheduleCreateRequest request = ScheduleCreateRequest.builder()
                .title("일정 테스트")
                .build();

        // when & then
        assertThrows(EntityNotFoundException.class, () ->
                scheduleService.createSchedule(1L, request));
        verify(scheduleRepository, never()).save(any());
    }

    @Test
    @DisplayName("일정 수정 성공")
    void updateScheduleSuccess() {
        // given
        Schedule schedule = Schedule.builder()
                .title("기존 제목")
                .description("기존 내용")
                .startDate(LocalDateTime.now())
                .endDate(LocalDateTime.now().plusHours(2))
                .category(ScheduleCategory.WORK)
                .status(ScheduleStatus.RESERVED)
                .build();

        ScheduleUpdateRequest request = ScheduleUpdateRequest.builder()
                .title("수정된 제목")
                .description("수정된 내용")
                .startDate(LocalDateTime.now().plusDays(1))
                .endDate(LocalDateTime.now().plusDays(1).plusHours(2))
                .category(ScheduleCategory.APPOINTMENT)
                .build();

        when(scheduleRepository.findById(any())).thenReturn(Optional.of(schedule));

        // when
        scheduleService.updateSchedule(1L, request);

        // then
        assertThat(schedule.getTitle()).isEqualTo("수정된 제목");
        assertThat(schedule.getCategory()).isEqualTo(ScheduleCategory.APPOINTMENT);
    }

    @Test
    @DisplayName("일정 조회 성공")
    void getScheduleSuccess() {
        // given
        Schedule schedule = Schedule.builder()
                .title("테스트 일정")
                .description("테스트 내용")
                .startDate(LocalDateTime.now())
                .endDate(LocalDateTime.now().plusHours(2))
                .category(ScheduleCategory.WORK)
                .status(ScheduleStatus.RESERVED)
                .build();

        when(scheduleRepository.findById(any())).thenReturn(Optional.of(schedule));

        // when
        ScheduleResponse response = scheduleService.getSchedule(1L);

        // then
        assertThat(response.getTitle()).isEqualTo("테스트 일정");
        verify(scheduleRepository).findById(1L);
    }

    @Test
    @DisplayName("기간별 일정 조회 성공")
    void getScheduleByPeriodSuccess() {
        // given
        User user = User.builder()
                .email("test@test.com")
                .password("qor1234567!")
                .name("테스터")
                .role(Role.USER)
                .build();

        List<Schedule> schedules = List.of(
                Schedule.builder()
                        .title("일정 1")
                        .category(ScheduleCategory.WORK)
                        .build(),
                Schedule.builder()
                        .title("일정 2")
                        .category(ScheduleCategory.APPOINTMENT)
                        .build()
        );

        when(userRepository.findById(any())).thenReturn(Optional.of(user));
        when(scheduleRepository.findSchedulesByPeriod(any(), any(), any())).thenReturn(schedules);

        // when
        List<ScheduleResponse> responses = scheduleService.getScheduleByPeriod(
                1L,
                LocalDateTime.now(),
                LocalDateTime.now().plusDays(7)
        );

        // then
        assertThat(responses).hasSize(2);
        verify(scheduleRepository).findSchedulesByPeriod(any(), any(), any());
    }



}