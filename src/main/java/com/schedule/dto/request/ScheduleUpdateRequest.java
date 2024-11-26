package com.schedule.dto.request;

import com.schedule.domain.schedule.ScheduleCategory;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
public class ScheduleUpdateRequest {

    private String title;
    private String description;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private ScheduleCategory category;

    @Builder

    public ScheduleUpdateRequest(String title, String description, LocalDateTime startDate, LocalDateTime endDate, ScheduleCategory category) {
        this.title = title;
        this.description = description;
        this.startDate = startDate;
        this.endDate = endDate;
        this.category = category;
    }
}
