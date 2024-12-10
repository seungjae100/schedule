import styled, {createGlobalStyle} from "styled-components";
import React from 'react';

export const PageContainer = styled.div`
    height: 100vh;
    display: flex;
    flex-direction: column;
    background-color: #f7fafc;  // 배경색 추가
`;

export const Header = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 2rem;
    background-color: #fff;
    border-bottom: 1px solid #edf2f7;
`;

export const HeaderTitle = styled.h1`
    font-size: 1.5rem;
    font-weight: 600;
    color: #2d3748;
`;

const Content = styled.div`
    flex: 1;
    padding: 2rem;
    display: flex;
`;

export const GlobalCalendarStyle = createGlobalStyle`
    .fc {
        flex: 1;
        background-color: #ffffff;
        padding: 1.5rem;
        border-radius: 0.5rem;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    }

    .fc-toolbar-title {
        font-size: 1.5rem !important;
        font-weight: 600;
    }

    .fc-button {
        background-color: #ffffff !important;
        border: 1px solid #e2e8f0 !important;
        color: #4a5568 !important;
        font-weight: 500;

        &:hover {
            background-color: #f7fafc !important;
        }

        &.fc-button-active {
            background-color: #edf2f7 !important;
        }
    }

    .fc-view {
        border: 1px solid #e2e8f0;
        border-radius: 0.5rem;
        overflow: hidden;
    }

    .fc-event {
        padding: 0.25rem 0.5rem;
        border-radius: 0.25rem;
    }
`;

export const ContentContainer = React.forwardRef(({ children, ...props }, ref) => (
    <Content ref={ref} {...props}>
        {children}
    </Content>
));