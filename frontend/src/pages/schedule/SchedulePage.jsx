import React from "react";
import styled from "styled-components";
import { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import {
    createSchedule,
    deleteSchedule,
    getAllSchedules,
    getSchedulesByPeriod,
    updateSchedule
} from "../../api/schedule";

const ScheduleContainer = styled.div`
    padding: 20px;
    height: 100vh;
    
    .fc {
        height: 100%;
    }
`;

const SchedulePage = () => {
    const [events, setEvents] = useState([]);

    // 초기 일정 데이터 로드
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const data = await getAllSchedules();
                setEvents(data);
            } catch (error) {
                console.error('일정 조회 실패: ', error);
            }
        };
        fetchEvents();
    }, []);

    // 일정 생성
    const handleScheduleAdd = async (arg) => {
        try {
            const scheduleData = {
                title: arg.event.title,
                startDate: arg.event.start,
                endDate: arg.event.endDate,
                description: arg.event.extendedProps?.description || '',
                category: arg.event.extendedProps?.category || 'WORK',
                status: 'RESERVED'
            };
            await createSchedule(scheduleData);
        } catch (error) {
            console.error('일정 생성 실패 : ', error);
            arg.revert();
        }
    };

    // 일정 수정
    const handleScheduleChange = async (arg) => {
        try {
            const scheduleData = {
                title: arg.event.title,
                startDate: arg.event.start,
                endDate: arg.event.end,
                description: arg.event.extendedProps?.description,
                category: arg.event.extendedProps?.category
            };
            await updateSchedule(arg.event.id, scheduleData);
        } catch (error) {
            console.error('일정 수정 실패: ', error);
            arg.revert();
        }
    };

    // 일정 삭제
    const handleScheduleDelete = async (arg) => {
        try {
            await deleteSchedule(arg.event.id);
        } catch (error) {
            console.error('일정 삭제 실패 : ', error);
            arg.revert();
        }
    };

    // 날짜 범위 변경 시 일정 조회
    const handleDatesSet = async (arg) => {
        try {
            const data = await getSchedulesByPeriod(arg.start, arg.end);
            setEvents(data);
        } catch (error) {
            console.error('기간별 일정 조회 실패: ', error);
        }
    }

    return (
        <ScheduleContainer>
            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek, timeGridDay'
                }}
                editable={true}
                selectable={true}
                selectMirror={true}
                dayMaxEvents={true}
                events={events}
                eventAdd={handleScheduleAdd}
                eventChange={handleScheduleChange}
                eventRemove={handleScheduleDelete}
                datesSet={handleDatesSet}
                locale="ko"
            />
        </ScheduleContainer>
    );
};

export default SchedulePage;