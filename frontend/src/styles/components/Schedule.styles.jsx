import styled from "styled-components";

// Container와 Layout
export const Container = styled.div`
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    background-color: #f9fafb;
`;

// Header 영역
export const HeaderContainer = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.5rem 2rem;
    background-color: white;
    border-bottom: 1px solid #e2e8f0;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

export const HeaderTitle = styled.h1`
    font-size: 1.5rem;
    font-weight: 600;
    color: #1a202c;
`;



// Content 영역
export const ContentContainer = styled.main`
    flex: 1;
    padding: 2rem;
    overflow: auto;
`;

// Calendar Styles
export const CalendarWrapper = styled.div`
    background: white;
    padding: 1.5rem;
    border-radius: 0.75rem;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    height: 100%; // 부모 컨테이너 높이 맞추기
    min-height: 700px; //  최소 높이 지정 (Month 뷰가 너무 납작하지 않도록)

    .fc {
        background: white;
    }

    .fc-toolbar-title {
        font-size: 1.25rem;
        font-weight: 600;
        color: #374151;
    }

    .fc-button {
        background-color: white;
        border: 1px solid #d1d5db;
        color: #374151;

        &:hover {
            background-color: #f3f4f6;
            border-color: #9ca3af;
        }

        &:focus {
            outline: none;
            border-color: #3b82f6;
            box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
        }
    }

    .fc-button-active {
        background-color: #3b82f6;
        border-color: #3b82f6;
        color: white;

        &:hover {
            background-color: #2563eb;
        }
    }

    .fc-event {
        border: none;
        margin: 1px 0;
    }

    .fc-h-event {
        background-color: transparent;
        border: none;
    }

    .fc-daygrid-event {
        padding: 2px 4px;
        border-radius: 3px;
        margin-top: 1px;
    }
`;
