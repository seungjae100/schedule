import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSchedule } from '../../hooks/useSchedule';
import ViewScheduleModal from '../../components/schedule/ViewScheduleModal';
import { ButtonGroup, IconButton } from '../../styles/components/Common.styles';
import {Home, Plus} from 'lucide-react';
import ProfileMenu from '../../components/schedule/ProfileMenu';
import { SCHEDULE_CATEGORIES } from '../../constants/scheduleConstants';
import {
    Container,
    HeaderContainer,
    HeaderTitle,
    ContentContainer
} from '../../styles/components/Schedule.styles';
import {
    TableContainer,
    StyledTable,
    TableHeader,
    TableRow,
    TableCell,
    EmptyMessage, PaginationButton, PageNumber, PaginationContainer, IndexCell, NewScheduleButton, TableFooter
} from '../../styles/components/Table.styles';
import ModifyScheduleModal from "../../components/schedule/ModifyScheduleModal";
import CreateScheduleModal from "../../components/schedule/CreateScheduleModal";

const ITEMS_PER_PAGE = 5;

const ScheduleListPage = () => {
    const navigate = useNavigate();
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);

    const {
        events,
        isViewModalOpen,
        setIsViewModalOpen,
        selectedEvent,
        handleEventClick,
        handleDeleteEvent,
        handleOpenModifyModal,
        fetchAndFormatEvents,
        isModifyModalOpen,
        modifyEvent,
        setModifyEvent,
        handleCloseModifyModal,
        handleModifySubmit,
        isCreateModalOpen,
        newEvent,
        setNewEvent,
        handleOpenCreateModal,
        handleCloseCreateModal,
        handleCreateSubmit,
    } = useSchedule();

    useEffect(() => {
        fetchAndFormatEvents();
    }, [fetchAndFormatEvents]);

    // 페이지네이션 관련 계산
    const totalPages = Math.ceil(events.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const currentEvents = events.slice(startIndex, endIndex);

    // 이벤트 클릭 핸들러
    const handleRowClick = (event) => {
        handleEventClick({ event });
    };

    // 날짜 포맷 함수
    const formatDateTime = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = date.getHours();
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const ampm = hours >= 12 ? '오후' : '오전';
        const displayHours = hours % 12 || 12;

        return `${year}. ${month}. ${day}. ${ampm} ${displayHours}:${minutes}`;
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <Container>
            <HeaderContainer>
                <HeaderTitle>내 일정 목록</HeaderTitle>
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
                <TableContainer>
                        <StyledTable>
                            <thead>
                            <TableRow>
                                <TableHeader column="no" $center>No</TableHeader>
                                <TableHeader column="title">제목</TableHeader>
                                <TableHeader column="category">카테고리</TableHeader>
                                <TableHeader column="time">시작 시간</TableHeader>
                                <TableHeader column="time">종료 시간</TableHeader>
                            </TableRow>
                            </thead>
                            <tbody>
                            {currentEvents.length > 0 ? (
                                currentEvents.map((event, index) => (
                                    <TableRow
                                        key={event.id}
                                        onClick={() => handleRowClick(event)}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        <IndexCell>{startIndex + index + 1}</IndexCell>
                                        <TableCell>{event.title}</TableCell>
                                        <TableCell>
                                            {SCHEDULE_CATEGORIES[event.extendedProps.category].label}
                                        </TableCell>
                                        <TableCell>{formatDateTime(event.start)}</TableCell>
                                        <TableCell>{formatDateTime(event.end)}</TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan="5">
                                        <EmptyMessage>등록된 일정이 없습니다.</EmptyMessage>
                                    </TableCell>
                                </TableRow>
                            )}
                            </tbody>
                        </StyledTable>

                    <TableFooter>
                        {totalPages > 1 && (
                            <PaginationContainer>
                                <PaginationButton
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    disabled={currentPage === 1}
                                >
                                    이전
                                </PaginationButton>

                                {[...Array(totalPages)].map((_, index) => (
                                    <PageNumber
                                        key={index + 1}
                                        active={currentPage === index + 1}
                                        onClick={() => handlePageChange(index + 1)}
                                    >
                                        {index + 1}
                                    </PageNumber>
                                ))}

                                <PaginationButton
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                >
                                    다음
                                </PaginationButton>
                            </PaginationContainer>
                        )}
                        <NewScheduleButton onClick={handleOpenCreateModal}>
                            <Plus size={20} />
                            새 일정
                        </NewScheduleButton>
                    </TableFooter>
                </TableContainer>
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

export default ScheduleListPage;