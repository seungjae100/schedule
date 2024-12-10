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

const SchedulePage = () => {
    const navigate = useNavigate();
    const {
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
                        eventClick={handleEventClick}
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