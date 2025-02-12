import {useCallback, useMemo, useState} from "react";
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
        category: event.category,
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

    // 필터 관련 상태
    const [selectedCategory, setSelectedCategory] = useState("");

    // 검색 관련 상태
    const [searchResults, setSearchResults] = useState([]);
    const [showSearchResults, setShowSearchResults] = useState(false);


    // 날짜 포맷 함수
    const formatDateForInput = (date) => {
        if (!date) return '';
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');

        const formattedDate = `${year}-${month}-${day}T${hours}:${minutes}`;

        return formattedDate;
    };

    // 일정 데이터 조회
    const fetchAndFormatEvents = useCallback(async () => {
        try {
            const data = await getAllSchedules();
            const formattedEvents = data.map(formatEventData);
            setEvents(formattedEvents);
        } catch (error) {
            console.error('일정조회 실패: ', error);
        }
    }, []);

    // 생성 모달 핸들러
    const handleOpenCreateModal = () => {
        const now = new Date();

        //  브라우저의 현재 시간을 한국 시간(KST)으로 변환
        const koreaTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), now.getMinutes());

        setNewEvent({
            title: '',
            startDate: formatDateForInput(koreaTime), //  한국 시간 반영
            endDate: formatDateForInput(new Date(koreaTime.getTime() + 60 * 60 * 1000)), // +1시간
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
            await createSchedule(newEvent);
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
            startDate: formatDateForInput(event.start || event.startDate),
            endDate: formatDateForInput(event.end || event.endDate),
            description: event.extendedProps?.description || '',
            category: event.extendedProps?.category || Object.keys(SCHEDULE_CATEGORIES)[0],
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
                title: modifyEvent.title,
                startDate: new Date(modifyEvent.startDate).toISOString(),
                endDate: new Date(modifyEvent.endDate).toISOString(),
                description: modifyEvent.description,
                category: modifyEvent.category,
            });
            handleCloseModifyModal();
            await fetchAndFormatEvents(); // 수정 후 일정 갱신
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

    // 카테고리 필터링
    const filteredEvents = useMemo(() => {
        if (!events || events.length === 0) return [];
        if (!selectedCategory) return events;
        return events.filter(event => {
            return event.extendedProps && event.extendedProps.category === selectedCategory;
        });
    }, [selectedCategory, events]);



    // 검색 기능
    const handleSearch = (keyword) => {
        if (!keyword.trim()) {
            setSearchResults([]);
            setShowSearchResults(false);
            return;
        }

        const results = events.filter(event =>
            event.title.toLowerCase().includes(keyword.toLowerCase()));
        setSearchResults(results);
        setShowSearchResults(true);
    };

    // 검색 결과 클릭 처리
    const handleSearchResultClick = (event) => {
        setSelectedEvent(event);
        setIsViewModalOpen(true);
        setShowSearchResults(false);
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
        events: filteredEvents || [],
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
        fetchAndFormatEvents,
        // 카테고리 필터
        selectedCategory,
        setSelectedCategory,
        filteredEvents,
        // 검색 관련
        handleSearch,
        searchResults,
        showSearchResults,
        handleSearchResultClick,
        setShowSearchResults
    };
};
