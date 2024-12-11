import {useNavigate} from "react-router-dom";
import {useSchedule} from "../../hooks/useSchedule";
import React, {useEffect} from "react";
import {GlobalCalendarStyle, Header, HeaderTitle, PageContainer} from "../../styles/layouts/PageLayout.styles";
import {ButtonGroup, IconButton} from "../../styles/components/Common.styles";
import {Home, Plus} from "lucide-react";
import {ContentContainer} from "../../styles/layouts/PageLayout.styles";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import CreateScheduleModal from "../../components/schedule/CreateScheduleModal";
import ViewScheduleModal from "../../components/schedule/ViewScheduleModal";
import ModifyScheduleModal from "../../components/schedule/ModifyScheduleModal";

const SchedulePage = () => {
    const navigate = useNavigate();
    const {
        events,
        // 생성 모달 관련
        isCreateModalOpen, // isModalOpen -> isCreateModalOpen으로 수정
        newEvent,
        setNewEvent,
        handleOpenCreateModal, // handleOpenModal -> handleOpenCreateModal로 수정
        handleCloseCreateModal, // handleCloseModal -> handleCloseCreateModal로 수정
        handleCreateSubmit, // handleSubmitEvent -> handleCreateSubmit으로 수정
        // 조회 모달 관련
        isViewModalOpen,
        setIsViewModalOpen,
        selectedEvent,
        handleEventClick,
        handleDeleteEvent,
        // 수정 모달 관련
        isModifyModalOpen,
        modifyEvent,        // 추가
        setModifyEvent,     // 추가
        handleOpenModifyModal,
        handleCloseModifyModal,
        handleModifySubmit,
        // 기타
        handleDatesSet,
        fetchAndFormatEvents
    } = useSchedule();

    useEffect(() => {
        fetchAndFormatEvents();
    }, []);

    const handleNavigateHome = () => {
        navigate('/');
    };

    return (
        <PageContainer>
            <GlobalCalendarStyle/>
                <Header>
                    <HeaderTitle>캘린더</HeaderTitle>
                    <ButtonGroup>
                        <IconButton onClick={handleNavigateHome}>
                            <Home size={18} />
                            홈으로
                        </IconButton>
                        <IconButton onClick={handleOpenCreateModal}>
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

                        dayMaxEvents={true}
                        events={events}
                        eventClick={handleEventClick}
                        datesSet={handleDatesSet}
                        locale="ko"
                    />
                </ContentContainer>

            <CreateScheduleModal
                isOpen={isCreateModalOpen}
                onClose={handleCloseCreateModal}
                onSubmit={handleCreateSubmit}
                newEvent={newEvent}
                setNewEvent={setNewEvent}
            />

            <ViewScheduleModal
                isOpen={isViewModalOpen}
                onClose={() => setIsViewModalOpen(false)}
                event={selectedEvent}
                onEdit={handleOpenModifyModal}
                onDelete={handleDeleteEvent}
            />

            <ModifyScheduleModal
                isOpen={isModifyModalOpen}
                onClose={handleCloseModifyModal}
                onSubmit={handleModifySubmit}
                modifyEvent={modifyEvent}
                setModifyEvent={setModifyEvent}
            />
        </PageContainer>
    );
};

export default SchedulePage;