import styled from "styled-components";

export const ProfileDropdown = styled.div`
    position: absolute;
    top: calc(100% + 0.5rem);
    right: 0;
    width: 200px;
    background: white;
    border: 1px solid #e2e8f0;
    border-radius: 0.5rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    z-index: 50;
`;

export const DropdownItem = styled.button`
    width: 100%;
    padding: 0.75rem 1rem;
    text-align: left;
    color: #4a5568;
    background: transparent;
    border: none;

    &:hover {
        background-color: #f7fafc;
    }

    &:first-child {
        border-top-left-radius: 0.5rem;
        border-top-right-radius: 0.5rem;
    }

    &:last-child {
        border-bottom-left-radius: 0.5rem;
        border-bottom-right-radius: 0.5rem;
    }
`;