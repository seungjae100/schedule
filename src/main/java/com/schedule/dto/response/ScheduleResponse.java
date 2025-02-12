package com.schedule.dto.response;

import com.schedule.domain.schedule.Schedule;
import com.schedule.domain.schedule.ScheduleCategory;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class ScheduleResponse {

    private Long id;
    private String title;
    private String description;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private ScheduleCategory category;
    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;

    public ScheduleResponse(Schedule schedule) {
        this.id = schedule.getId();
        this.title = schedule.getTitle();
        this.description = schedule.getDescription();
        this.startDate = schedule.getStartDate();
        this.endDate = schedule.getEndDate();
        this.category = schedule.getCategory();
        this.createdAt = schedule.getCreatedAt();
        this.modifiedAt = schedule.getModifiedAt();
    }
}
