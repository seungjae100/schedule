import {useState} from "react";
import {CATEGORY_COLORS, SCHEDULE_CATEGORIES} from "../constants/scheduleConstants";
import {createSchedule, deleteSchedule, getAllSchedules, getSchedulesByPeriod, updateSchedule} from "../api/schedule";

const formatEventData = (event) => ({
    id: event.id,
    title: event.title,
    start: event.startDate,
    end: event.endDate,
    description: event.description,
    category: event.category,
    backgroundColor: CATEGORY_COLORS[event.category],
    borderColor: CATEGORY_COLORS[event.category],
    extendedProps: {
        description: event.description,
        category: event.category
    }
});

export const useSchedule = () => {
    // 캘린더 이벤트 상태
    const [events, setEvents] =useState([]);

    // 생성 모달 관련 상태
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [newEvent, setNewEvent] = useState({
        title: '',
        startDate: '',
        endDate: '',
        description: '',
        category: Object.keys(SCHEDULE_CATEGORIES)[0]
    });

    // 조회 모달 관련 상태
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);

    // 수정 모달 관련 상태
    const [isModifyModalOpen, setIsModifyModalOpen] = useState(false);
    const [modifyEvent, setModifyEvent] = useState({
        id: null,
        title: '',
        startDate: '',
        endDate: '',
        description: '',
        category: Object.keys(SCHEDULE_CATEGORIES)[0]
    });

    // 날짜 포맷 함수
    const formatDateForInput = (date) => date.toISOString().slice(0, 16);

    // 일정 데이터 조회
    const fetchAndFormatEvents = async () => {
        try {
            const data = await getAllSchedules();
            const formattedEvents = data.map(formatEventData);
            setEvents(formattedEvents);
        } catch (error) {
            console.error('일정조회 실패: ', error);
        }
    };

    // 생성 모달 핸들러
    const handleOpenCreateModal = () => {
        const now = new Date();
        setNewEvent({
            title: '',
            startDate: formatDateForInput(now),
            endDate: formatDateForInput(new Date(now.getTime() + 60 * 60 * 1000)),
            description: '',
            category: Object.keys(SCHEDULE_CATEGORIES)[0]
        });
        setIsCreateModalOpen(true);
    };

    const handleCloseCreateModal = () => {
        setIsCreateModalOpen(false);
        setNewEvent({
            title: '',
            startDate: '',
            endDate: '',
            description: '',
            category: Object.keys(SCHEDULE_CATEGORIES)[0]
        });
    };

    const handleCreateSubmit = async (e) => {
        e.preventDefault();
        try {
            const now = new Date().toISOString();
            await createSchedule({
                ...newEvent,
                created_at: now,
                modified_at: null
            });
            handleCloseCreateModal();
            await fetchAndFormatEvents();
        } catch (error) {
            console.error('일정 생성 실패: ', error);
        }
    };

    // 일정 조회/수정/삭제 핸들러
    const handleEventClick = (arg) => {
        setSelectedEvent(arg.event);
        setIsViewModalOpen(true);
    };

    const handleOpenModifyModal = (event) => {
        setIsViewModalOpen(false);
        setModifyEvent({
            id: event.id,
            title: event.title,
            startDate: event.start,
            endDate: event.end,
            description: event.extendedProps?.description || '',
            category: event.extendedProps?.category
        });
        setIsModifyModalOpen(true);
    };

    const handleCloseModifyModal = () => {
        setIsModifyModalOpen(false);
        setModifyEvent({
            id: null,
            title: '',
            startDate: '',
            endDate: '',
            description: '',
            category: Object.keys(SCHEDULE_CATEGORIES)[0]
        });
    };

    const handleModifySubmit = async (e) => {
        e.preventDefault();
        try {
            await updateSchedule(modifyEvent.id, {
                ...modifyEvent,
                modified_at: new Date().toISOString()
            });
            handleCloseModifyModal();
            await fetchAndFormatEvents();
        } catch (error) {
            console.error('일정 수정 실패: ', error);
        }
    };

    const handleDeleteEvent = async (event) => {
        try {
            await deleteSchedule(event.id);
            await fetchAndFormatEvents();
            setIsViewModalOpen(false);
        } catch (error) {
            console.error('일정 삭제 실패: ', error);
        }
    };



    const handleDatesSet = async (arg) => {
        try {
            const data = await getSchedulesByPeriod(arg.start, arg.end);
            const formattedEvents = data.map(formatEventData);
            setEvents(formattedEvents);
        } catch (error) {
            console.error('기간별 일정 조회 실패: ', error);
        }
    };

    return {
        events,
        // 생성 모달 관련
        isCreateModalOpen,
        newEvent,
        setNewEvent,
        handleOpenCreateModal,
        handleCloseCreateModal,
        handleCreateSubmit,
        // 조회 모달 관련
        isViewModalOpen,
        setIsViewModalOpen,
        selectedEvent,
        handleEventClick,
        handleDeleteEvent,
        // 수정 모달 관련
        isModifyModalOpen,
        modifyEvent,
        setModifyEvent,
        handleOpenModifyModal,
        handleCloseModifyModal,
        handleModifySubmit,
        // 캘린더 이벤트 핸들러
        handleDatesSet,
        // 기타
        fetchAndFormatEvents
    };
};
