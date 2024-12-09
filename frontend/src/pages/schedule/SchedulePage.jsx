import React from "react";
import { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Plus, Home } from 'lucide-react';
import {
    createSchedule,
    deleteSchedule,
    getAllSchedules,
    getSchedulesByPeriod,
    updateSchedule
} from "../../api/schedule";
import {useNavigate} from "react-router-dom";
import {ContentContainer, Header, HeaderTitle, PageContainer} from "../../styles/layouts/PageLayout.styles";
import {ButtonGroup, IconButton} from "../../styles/components/Common.styles";
import {CATEGORY_COLORS} from "../../constants/scheduleConstants";
import CreateScheduleModal from "../../components/schedule/CreateScheduleModal";
import ViewScheduleModal from "../../components/schedule/ViewScheduleModal";




// 일정 데이터 변환 함수
const formatEventData = (event) => ({
    id: event.id,
    title: event.title,
    start: event.startDate,
    end: event.endDate,
    description: event.description,
    category: event.category,
    backgroundColor: CATEGORY_COLORS[event.category],
    borderColor: CATEGORY_COLORS[event.category]
});

const SchedulePage = () => {
    const navigate = useNavigate();
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [events, setEvents] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newEvent, setNewEvent] = useState({
        title: '',
        startDate: '',
        endDate: '',
        description: '',
        category: 'WORK'
    });

    // 초기 일정 데이터 로드
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const data = await getAllSchedules();
                // 서버 데이터를 풀캘린더 형식으로 변환
                const formattedEvents = data.map(formatEventData);
                setEvents(formattedEvents);
            } catch (error) {
                console.error('일정 조회 실패: ', error);
            }
        };
        fetchEvents();
    }, []);

    const handleNavigateHome = () => {
        navigate('/');
    };

    const formatDateForInput = (date) => {
        return date.toISOString().slice(0, 16);
    };

    const handleOpenModal = () => {
        const now = new Date();
        setNewEvent({
            title: '',
            startDate: formatDateForInput(now),
            endDate: formatDateForInput(new Date(now.getTime() + 60 * 60 * 1000)), // 1 시간 후
            description: '',
            category: 'WORK'
        });
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setNewEvent({
            title: '',
            startDate: '',
            endDate: '',
            description: '',
            category: 'WORK'
        });
    };

    const handleSubmitEvent = async (e) => {
        e.preventDefault();
        try {
            await createSchedule(newEvent);
            handleCloseModal();
            const data = await getAllSchedules();
            // 서버 데이터를 FullCalendar 형식으로 변환
            const formattedEvents = data.map(formatEventData);
            setEvents(formattedEvents);
        } catch (error) {
            console.error('일정 생성 실패: ', error);
        }
    };

    // 일정 생성
    const handleScheduleAdd = async (arg) => {
        try {
            const scheduleData = {
                title: arg.event.title || '새 일정',
                startDate: arg.event.start,
                endDate: arg.event.end,
                description: arg.event.extendedProps?.description || '',
                category: arg.event.extendedProps?.category || 'SCHEDULE_CATEGORIES',
                status: 'RESERVED'
            };
            await createSchedule(scheduleData);
            const data = await getAllSchedules();
            const formattedEvents = data.map(formatEventData);
            setEvents(formattedEvents);
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
            const data = await getAllSchedules();
            const formattedEvents = data.map(formatEventData);
            setEvents(formattedEvents);
        } catch (error) {
            console.error('일정 수정 실패: ', error);
            arg.revert();
        }
    };

    // 일정 삭제
    const handleScheduleDelete = async (arg) => {
        try {
            await deleteSchedule(arg.event.id);
            const data = await getAllSchedules();
            const formattedEvents = data.map(formatEventData);
            setEvents(formattedEvents);
        } catch (error) {
            console.error('일정 삭제 실패 : ', error);
            arg.revert();
        }
    };

    // 날짜 범위 변경 시 일정 조회
    const handleDatesSet = async (arg) => {
        try {
            const data = await getSchedulesByPeriod(arg.start, arg.end);
            const formattedEvents = data.map(formatEventData);
            setEvents(formattedEvents);
        } catch (error) {
            console.error('기간별 일정 조회 실패: ', error);
        }
    }

    return (
        <PageContainer>
            <Header>
                <HeaderTitle>캘린더</HeaderTitle>
                <ButtonGroup>
                    <IconButton onClick={handleNavigateHome}>
                        <Home size={18} />
                        홈으로
                    </IconButton>
                    <IconButton onClick={handleOpenModal}>
                        <Plus size={18} />
                        새 일정
                    </IconButton>
                </ButtonGroup>
            </Header>

            <ContentContainer>
                <FullCalendar
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                    initialView="dayGridMonth"
                    headerToolbar={{
                        left: 'prev,next today',
                        center: 'title',
                        right: 'dayGridMonth,timeGridWeek,timeGridDay'
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
            </ContentContainer>
            <CreateScheduleModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onSubmit={handleSubmitEvent}
                newEvent={newEvent}
                setNewEvent={setNewEvent}
            />
            <ViewScheduleModal
                isOpen={isViewModalOpen}
                onClose={() => setIsViewModalOpen(false)}
                event={selectedEvent}
                onEdit={handleEditEvent}
                onDelete={handleDeleteEvent}
            />
        </PageContainer>
    );
};

export default SchedulePage;