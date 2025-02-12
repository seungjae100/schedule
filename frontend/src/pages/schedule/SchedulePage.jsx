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
import {
    Container,
    HeaderContainer,
    HeaderTitle,
    ContentContainer,
    CalendarWrapper
} from "../../styles/components/Schedule.styles";
import {SearchContainer, SearchWrapper} from "../../styles/components/Search.styles";
import {FilterWrapper} from "../../styles/components/Filter.styles";


const SchedulePage = () => {
    const navigate = useNavigate();
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [searchKeyword, setSearchKeyword] = useState("");


    const {
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
        // 검색
        handleSearch,
        showSearchResults,
        handleSearchResultClick,
        searchResults,
        // 카테고리 필터
        selectedCategory,
        setSelectedCategory,
        filteredEvents,
    } = useSchedule();

    useEffect(() => {
        fetchAndFormatEvents();
    }, [fetchAndFormatEvents]);

    return (
        <Container>
            <HeaderContainer>
                <SearchContainer>
                    <HeaderTitle>캘린더</HeaderTitle>
                    <SearchWrapper>
                        <ScheduleSearch
                            searchKeyword={searchKeyword}
                            setSearchKeyword={setSearchKeyword}
                            onSearch={handleSearch}
                            searchResults={searchResults}
                            showResults={showSearchResults}
                            onResultClick={handleSearchResultClick}
                        />
                    </SearchWrapper>
                </SearchContainer>
                <ButtonGroup>
                    <IconButton variant="secondary" onClick={() => navigate('/')}>
                        <Home size={20} />
                        홈으로
                    </IconButton>
                    <ProfileMenu
                        isOpen={isProfileOpen}
                        onToggle={() => setIsProfileOpen(!isProfileOpen)}
                    />
                </ButtonGroup>
            </HeaderContainer>

            <ContentContainer>
                <CalendarWrapper>
                    <div style={{ position: 'relative' }}>
                        <FullCalendar
                            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                            initialView="dayGridMonth"
                            headerToolbar={{
                                left: 'prev,next',
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
                            events={filteredEvents}
                            eventClick={handleEventClick}
                            datesSet={handleDatesSet}
                            locale="ko"
                            displayEventTime={false}
                            eventDisplay="block"
                            eventOverlap={true}
                            eventBorderColor="transparent"

                            height="auto"
                            contentHeight={(view) => (view.type === "dayGridMonth" ? 800 : "auto")}
                            aspectRatio={1.8}

                            // Week/Day 뷰에서 24시간 표시
                            slotMinTime="00:00:00"
                            slotMaxTime="24:00:00"
                            slotDuration="00:30:00"
                            slotLabelInterval="01:00:00"
                            allDaySlot={false}
                            nowIndicator={true}
                        />
                        <FilterWrapper>
                            <ScheduleFilter
                                selectedCategory={selectedCategory}
                                onCategoryChange={setSelectedCategory}
                            />
                        </FilterWrapper>
                    </div>
                </CalendarWrapper>
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
        </Container>
    );
};

export default SchedulePage;