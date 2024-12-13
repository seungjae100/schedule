import styled from "styled-components";

export const ButtonGroup = styled.div`
    display: flex;
    gap: 1rem;
`;

export const IconButton = styled.button`
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
