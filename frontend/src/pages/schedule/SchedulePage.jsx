import React from "react";
import styled from "styled-components";
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

const PageContainer = styled.div`
    height: 100vh;
    display: flex;
    flex-direction: column;
`;

const Header = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 2rem;
    background-color: #fff;
    border-bottom: 1px solid #edf2f7;
`;

const HeaderTitle = styled.h1`
    font-size: 1.5rem;
    font-weight: 600;
    color: #2d3748;
`;

const ButtonGroup = styled.div`
    display: flex;
    gap: 1rem;
`;

const IconButton = styled.button`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    border-radius: 0.375rem;
    border: 1px solid #e2e8f0;
    background-color: #fff;
    color: #4a5568;
    cursor: pointer;
    transition: all 0.2s;
    
    &:hover {
        background-color: #f7fafc;
    }
`;

const ScheduleContainer = styled.div`
    flex: 1;
    padding: 20px;
    display: flex;

    /* Calendar Container Styles */
    .fc {
        flex: 1;
        background-color: #ffffff;
        border-radius: 8px;
        box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
    }

    /* Header Styles */
    .fc .fc-toolbar {
        padding: 1rem;
        margin-bottom: 0;
    }

    .fc .fc-toolbar-title {
        font-size: 1.5rem;
        font-weight: 600;
        color: #333;
    }

    .fc .fc-button {
        background-color: #f8f9fa;
        border: 1px solid #ddd;
        color: #333;
        padding: 0.5rem 1rem;
        font-weight: 500;
        text-transform: capitalize;
    }

    .fc .fc-button-primary:not(:disabled).fc-button-active,
    .fc .fc-button-primary:not(:disabled):active {
        background-color: #4a5568;
        border-color: #4a5568;
        color: #fff;
    }

    /* Calendar Body Styles */
    .fc-theme-standard td,
    .fc-theme-standard th {
        border: 1px solid #edf2f7;
    }

    .fc .fc-daygrid-day-number,
    .fc .fc-col-header-cell-cushion {
        color: #4a5568;
        padding: 8px;
        text-decoration: none;
    }

    .fc .fc-daygrid-day.fc-day-today {
        background-color: #ebf8ff;
    }

    /* Event Styles */
    .fc-event {
        border-radius: 4px;
        border: none;
        padding: 2px 4px;
        font-size: 0.875rem;
        cursor: pointer;
    }

    .fc-event-main {
        padding: 2px 4px;
        color: #fff;
    }

    .fc-h-event {
        background-color: #4299e1;
        border: none;
    }

    /* Time Grid Specific Styles */
    .fc-timegrid-slot-label {
        color: #718096;
        font-size: 0.875rem;
    }

    .fc-timegrid-axis {
        border-right: 1px solid #edf2f7;
    }
    
    /* Responsive Adjustments */
    @media (max-width: 768px) {
        .fc .fc-toolbar {
            flex-direction: column;
            gap: 1rem;
        }

        .fc .fc-toolbar-title {
            font-size: 1.25rem;
        }
    }

    /* Hover Effects */
    .fc-event:hover {
        opacity: 0.9;
    }

    .fc .fc-button:hover {
        background-color: #edf2f7;
    }
`;

const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1000;
`;

const ScheduleModal = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: white;
    padding: 2rem;  
    border-radius: 0.5rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    width: 90%;
    max-width: 500px;
    z-index: 1001;
`;

const Select = styled.select`
    padding: 0.5rem;
    border: 1px solid #e2e8f0;
    border-radius: 0.375rem;
`;

const ModalForm = styled.form`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

const FormGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
`;

const Input = styled.input`
    padding: 0.5rem;
    border: 1px solid #e2e8f0;
    border-radius: 0.375rem;
`;

const TextArea = styled.textarea`
    padding: 0.5rem;
    border: 1px solid #e2e8f0;
    border-radius: 0.375rem;
    min-height: 100px;
`;

const ModalButtons = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
    margin-top: 1rem;
`;

const Button = styled.button`
    padding: 0.5rem 1rem;
    border-radius: 0.375rem;
    border: none;
    cursor: pointer;
    
    &.primary {
        background-color: #4299e1;
        color: white;
    }
    
    &.secondary {
        background-color: #e2e8f0;
        color: #4a5568;
    }
`;

const SchedulePage = () => {
    const navigate = useNavigate();
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
                setEvents(data);
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
            const updateData = await getAllSchedules();
            setEvents(updateData);
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

            <ScheduleContainer>
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
            </ScheduleContainer>

            {isModalOpen && (
                <>
                <ModalOverlay onClick={handleCloseModal} />
                <ScheduleModal>
                    <ModalForm onSubmit={handleSubmitEvent}>
                        <FormGroup>
                            <label>제목</label>
                            <Input
                                type="text"
                                value={newEvent.title}
                                onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                                required
                            />
                        </FormGroup>
                        <FormGroup>
                            <label>카테고리</label>
                            <Select
                                value={newEvent.category}
                                onChange={(e) => setNewEvent({...newEvent, category: e.target.value})}
                                required
                            >
                                <option value="WORK">업무</option>
                                <option value="APPOINTMENT">약속</option>
                                <option value="ETC">기타</option>
                                <option value="BIRTHDAY">생일</option>
                                <option value="FAMILY">가족</option>
                                <option value="MEETING">회의</option>
                                <option value="SELF_DEVELOPMENT">자기계발</option>
                            </Select>
                        </FormGroup>
                        <FormGroup>
                            <label>시작 일시</label>
                            <Input
                                type="datetime-local"
                                value={newEvent.startDate}
                                onChange={(e) => setNewEvent({...newEvent, startDate: e.target.value})}
                                required
                            />
                        </FormGroup>
                        <FormGroup>
                            <label>종료 일시</label>
                            <Input
                                type="datetime-local"
                                value={newEvent.endDate}
                                onChange={(e) => setNewEvent({...newEvent, endDate: e.target.value})}
                                required
                            />
                        </FormGroup>
                        <FormGroup>
                            <label>설명</label>
                            <TextArea
                                value={newEvent.description}
                                onChange={(e) => setNewEvent({...newEvent, description: e.target.value})}
                            />
                        </FormGroup>
                        <ModalButtons>
                            <Button type="button" className="secondary" onClick={handleCloseModal}>
                                취소
                            </Button>
                            <Button type="submit" className="primary">
                                저장
                            </Button>
                        </ModalButtons>
                    </ModalForm>
                </ScheduleModal>
                </>
            )}
        </PageContainer>
    );
};

export default SchedulePage;