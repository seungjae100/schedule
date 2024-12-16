import styled from "styled-components";

export const FilterWrapper = styled.div`
    position: absolute;
    top: 8px;
    left: 180px;
    z-index: 1;
`;

export const CategorySelect = styled.select`
    padding: 0.5rem 1rem;
    border: 1px solid #e2e8f0;
    border-radius: 0.375rem;
    width: 120px;
    height: 36px;
    font-size: 0.875rem;
    background-color: white;
    cursor: pointer;
    
    &:focus {
        outline: none;
        border-color: #3b82f6;
        box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
    }
`;