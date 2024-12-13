import {useNavigate} from "react-router-dom";
import {useSchedule} from "../../hooks/useSchedule";
import React, {useEffect, useState} from "react";
import {ButtonGroup, IconButton} from "../../styles/components/Common.styles";
import {Home} from "lucide-react";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import CreateScheduleModal from "../../components/schedule/CreateScheduleModal";
import ViewScheduleModal from "../../components/schedule/ViewScheduleModal";
import ModifyScheduleModal from "../../components/schedule/ModifyScheduleModal";
import ScheduleSearch from "../../components/schedule/ScheduleSearch";
import ProfileMenu from "../../components/schedule/ProfileMenu";
import ScheduleFilter from "../../components/schedule/ScheduleFilter";


const SchedulePage = () => {
    const navigate = useNavigate();
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [searchKeyword, setSearchKeyword] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");

    const {
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
        // 기타
        handleDatesSet,
        fetchAndFormatEvents,
        searchSchedules
    } = useSchedule();

    useEffect(() => {
        fetchAndFormatEvents();
    }, []);

    return (
        <PageContainer>
            <GlobalCalendarStyle/>
            {/* 메인 헤더 */}
            <Header>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <HeaderTitle>캘린더</HeaderTitle>
                    <ScheduleSearch
                        searchKeyword={searchKeyword}
                        setSearchKeyword={setSearchKeyword}
                        onSearch={searchSchedules}
                    />
                </div>
                <ButtonGroup>
                    <IconButton onClick={() => navigate('/')}>
                        <Home size={20} />
                        홈으로
                    </IconButton>
                    <ProfileMenu
                        isOpen={isProfileOpen}
                        onToggle={() => setIsProfileOpen(!isProfileOpen)}
                    />
                </ButtonGroup>
            </Header>

            {/* 캘린더 바디 */}
            <ContentContainer>
                <div style={{ position: 'relative' }}>
                    <FullCalendar
                        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                        initialView="dayGridMonth"
                        headerToolbar={{
                            left: 'prev,next today',
                            center: 'title',
                            right: 'newSchedule dayGridMonth,timeGridWeek,timeGridDay'
                        }}
                        customButtons={{
                            newSchedule: {
                                text: '새 일정',
                                click: handleOpenCreateModal
                            }
                        }}
                        dayMaxEvents={true}
                        events={events}
                        eventClick={handleEventClick}
                        datesSet={handleDatesSet}
                        locale="ko"
                    />
                    <div style={{
                        position: 'absolute',
                        top: '8px',
                        left: '180px'  // today 버튼 우측에 위치하도록 조정
                    }}>
                        <ScheduleFilter
                            selectedCategory={selectedCategory}
                            onCategoryChange={setSelectedCategory}
                        />
                    </div>
                </div>
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