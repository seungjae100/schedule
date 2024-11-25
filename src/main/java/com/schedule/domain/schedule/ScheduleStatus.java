package com.schedule.domain.schedule;

import lombok.Getter;

@Getter
public enum ScheduleStatus {
    RESERVED("예정"),
    IN_PROGRESS("진행중"),
    COMPLETED("완료"),
    CANCELLED("취소");

    private final String description;

    ScheduleStatus(String description) {
        this.description = description;
    }
}
