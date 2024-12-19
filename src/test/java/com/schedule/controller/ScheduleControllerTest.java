package com.schedule.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.schedule.domain.schedule.Schedule;
import com.schedule.domain.schedule.ScheduleCategory;
import com.schedule.domain.schedule.ScheduleStatus;
import com.schedule.dto.request.ScheduleCreateRequest;
import com.schedule.dto.request.ScheduleUpdateRequest;
import com.schedule.dto.response.ScheduleResponse;
import com.schedule.service.ScheduleService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDateTime;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(ScheduleController.class)
@AutoConfigureMockMvc(addFilters = false) // 시큐리티 필터 비활성화
public class ScheduleControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private ScheduleService scheduleService;

    private ObjectMapper objectMapper;

    @BeforeEach
    void setUp() {
        objectMapper = new ObjectMapper();
        objectMapper.registerModule(new JavaTimeModule());
    }

    @Test
    @DisplayName("일정 생성 성공")
    void createScheduleSuccess() throws Exception {
        // given
        ScheduleCreateRequest request = ScheduleCreateRequest.builder()
                .title("테스트 일정")
                .description("테스트 내용")
                .startDate(LocalDateTime.now())
                .endDate(LocalDateTime.now().plusHours(2))
                .category(ScheduleCategory.WORK)
                .build();

        when(scheduleService.createSchedule(any(), any()))
                .thenReturn(1L);

        // when & then
        mockMvc.perform(post("/schedules", 1)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").value(1));
    }

    @Test
    @DisplayName("일정 수정 성공")
    void updateScheduleSuccess() throws Exception {
        // given
        ScheduleUpdateRequest request = ScheduleUpdateRequest.builder()
                .title("수정된 일정")
                .description("수정된 제목")
                .startDate(LocalDateTime.now())
                .endDate(LocalDateTime.now().plusHours(2))
                .category(ScheduleCategory.APPOINTMENT)
                .build();

        doNothing().when(scheduleService).updateSchedule(any(), any());

        // when & then
        mockMvc.perform(put("/schedules/{scheduleId}", 1)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk());
    }

    @Test
    @DisplayName("일정 삭제 성공")
    void deleteScheduleSuccess() throws Exception {
        // given
        doNothing().when(scheduleService).deleteSchedule(any());

        // when &then
        mockMvc.perform(delete("/schedules/{scheduleId}", 1))
                .andExpect(status().isOk());
    }

    @Test
    @DisplayName("일정 상세 조회 성공")
    void getScheduleSuccess() throws Exception {
        // given
        ScheduleResponse response = new ScheduleResponse(
                Schedule.builder()
                        .title("테스트 일정")
                        .description("테스트 내용")
                        .startDate(LocalDateTime.now())
                        .endDate(LocalDateTime.now().plusHours(2))
                        .category(ScheduleCategory.WORK)
                        .status(ScheduleStatus.RESERVED)
                        .build()
        );

        when(scheduleService.getSchedule(any())).thenReturn(response);

        // when & then
        mockMvc.perform(get("/schedules/{scheduleId}", 1))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.title").value("테스트 일정"))
                .andExpect(jsonPath("$.category").value("WORK"));
    }
}
