package com.schedule;

import com.schedule.domain.Role;
import com.schedule.domain.User;
import com.schedule.domain.schedule.Schedule;
import com.schedule.domain.schedule.ScheduleCategory;
import com.schedule.domain.schedule.ScheduleStatus;
import com.schedule.repository.ScheduleRepository;
import com.schedule.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDateTime;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
public class DatabaseConnectionTest {

    @Autowired
    private ScheduleRepository scheduleRepository;

    @Autowired
    private UserRepository userRepository;

    @Test
    void connectionTest() {
        // given
        User user = User.builder()
                .email("test@test.com")
                .password("qor1234567!")
                .name("테스터")
                .role(Role.USER)
                .build();

        User savedUser = userRepository.save(user);

        Schedule schedule = Schedule.builder()
                .title("테스트")
                .description("테스트 일정")
                .startDate(LocalDateTime.now())
                .endDate(LocalDateTime.now().plusHours(1))
                .category(ScheduleCategory.WORK)
                .status(ScheduleStatus.RESERVED)
                .user(savedUser)
                .build();

        // when
        Schedule savedSchedule = scheduleRepository.save(schedule);

        // then
        assertThat(savedSchedule.getId()).isNotNull();
        assertThat(savedSchedule.getUser()).isNotNull();
    }
}
