import styled from "styled-components";

export const ButtonGroup = styled.div`
    display: flex;
    gap: 1rem;
`;

export const IconButton = styled.button`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    height: 36px;  // 고정 높이 추가
    border-radius: 0.375rem;
    border: 1px solid #e2e8f0;
    background-color: white;
    color: #4a5568;
    font-size: 0.875rem;
    white-space: nowrap;  // 텍스트 줄바꿈 방지
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
        background-color: #f7fafc;
    }
`;