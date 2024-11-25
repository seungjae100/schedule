package com.schedule.domain.schedule;

import lombok.Getter;

@Getter
public enum ScheduleCategory {
    WORK("업무"),
    APPOINTMENT("약속"),
    ETC("기타"),
    BIRTHDAY("생일"),
    SELF_DEVELOPMENT("자기계발");

    private final String description;

    ScheduleCategory(String description) {
        this.description = description;
    }
}
