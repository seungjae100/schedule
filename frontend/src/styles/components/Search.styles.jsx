import styled from "styled-components";

export const SearchContainer = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;
`;

export const SearchWrapper = styled.div`
    flex: 1;
    max-width: 600px;
    margin-left: 2rem;
`;

export const SearchIcon = styled.div`
    position: absolute;
    left: 0.75rem;
    top: 50%;
    transform: translateY(-50%);
    color: #9ca3af;
    z-index: 1;
`;

export const SearchInput = styled.input`
    width: 100%;
    padding: 0.5rem 2.5rem;
    border: 1px solid #e2e8f0;
    border-radius: 0.5rem;

    &:focus {
        outline: none;
        border-color: #3b82f6;
        box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
    }
`;

export const SearchResultsContainer = styled.div`
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: white;
    border: 1px solid #e2e8f0;
    border-radius: 0.5rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    max-height: 200px;
    overflow-y: auto;
    z-index: 50;
`;

export const SearchResultItem = styled.div`
    padding: 0.75rem 1rem;
    cursor: pointer;
    
    &:hover {
        background-color: #f7fafc;
    }
`;