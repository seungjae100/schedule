package com.schedule.dto.request;

import com.schedule.domain.schedule.ScheduleCategory;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
public class ScheduleSearchRequest {

    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private ScheduleCategory category;
    private String keyword;

    @Builder
    public ScheduleSearchRequest(LocalDateTime startDate, LocalDateTime endDate, ScheduleCategory category, String keyword) {
        this.startDate = startDate;
        this.endDate = endDate;
        this.category = category;
        this.keyword = keyword;
    }
}
