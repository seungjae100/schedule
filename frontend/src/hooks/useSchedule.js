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
    const [events, setEvents] =useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [newEvent, setNewEvent] = useState({
        title: '',
        startDate: '',
        endDate: '',
        description: '',
        category: Object.keys(SCHEDULE_CATEGORIES)[0]
    });

    const formatDateForInput = (date) => {
        return date.toISOString().slice(0, 16);
    };

    const fetchAndFormatEvents = async () => {
        try {
            const data = await getAllSchedules();
            const formattedEvents = data.map(formatEventData);
            setEvents(formattedEvents);
        } catch (error) {
            console.error('일정조회 실패: ', error);
        }
    };

    const handleEventClick = (arg) => {
        setSelectedEvent(arg.event);
        setIsViewModalOpen(true);
    };

    const handleEditEvent = (event) => {
        setIsViewModalOpen(false);
        setNewEvent({
            title: event.title,
            startDate: event.start,
            endDate: event.end,
            description: event.description,
            category: event.category
        });
        setIsModalOpen(true);
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

    const handleOpenModal = () => {
        const now = new Date();
        setNewEvent({
            title: '',
            startDate: formatDateForInput(now),
            endDate: formatDateForInput(new Date(now.getTime() + 60 * 60 * 1000)),
            description: '',
            category: Object.keys(SCHEDULE_CATEGORIES)[0]
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
            category: Object.keys(SCHEDULE_CATEGORIES)[0]
        });
    };

    const handleSubmitEvent = async (e) => {
        e.preventDefault();
        try {
            await createSchedule(newEvent);
            handleCloseModal();
            await fetchAndFormatEvents();
        } catch (error) {
            console.error('일정 생성 실패: ', error);
        }
    };

    const handleScheduleAdd = async (arg) => {
        try {
            const scheduleData = {
                title: arg.event.title || '새 일정',
                startDate: arg.event.start,
                endDate: arg.event.end,
                description: arg.event.extendedProps?.description || '',
                category: arg.event.extendedProps?.category || Object.keys(SCHEDULE_CATEGORIES)[0],
                status: 'RESERVED'
            };
            await createSchedule(scheduleData);
            await fetchAndFormatEvents();
        } catch (error) {
            console.error('일정 생성 실패: ', error);
            arg.revert();
        }
    };

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
            await fetchAndFormatEvents();
        } catch (error) {
            console.error('일정 수정 실패: ', error);
            arg.revert();
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
        isModalOpen,
        isViewModalOpen,
        setIsViewModalOpen,
        selectedEvent,
        newEvent,
        setNewEvent,
        handleOpenModal,
        handleCloseModal,
        handleEventClick,
        handleEditEvent,
        handleDeleteEvent,
        handleSubmitEvent,
        handleScheduleAdd,
        handleScheduleChange,
        handleDatesSet,
        fetchAndFormatEvents
    };
};
