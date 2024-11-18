package com.schedule.domain;

public enum Role {
    ADMIN("관리자"),
    USER("일반");

    private final String description;

    Role(String description) {
        this.description = description;
    }

    public String getDescription() {
        return description;
    }
}
