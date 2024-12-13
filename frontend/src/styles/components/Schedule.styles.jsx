import styled from "styled-components";
import { ButtonGroup, IconButton } from "./Common.styles";
import { Select } from "./Form.styles";

// 네비게이션 그룹
export const NavigationGroup = styled(ButtonGroup)`
    display: flex;
    align-items: center;
`;

// 검색 관련
export const SearchContainer = styled.div`
    flex: 1;
    max-width: 600px;
    position: relative;
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

export const SearchIcon = styled.div`
    position: absolute;
    left: 0.75rem;
    top: 50%;
    transform: translateY(-50%);
    color: #9ca3af;
`;

export const CategorySelect = styled(Select)`
    margin-left: 0.5rem;
`;

// 새 일정 버튼
export const AddScheduleButton = styled(IconButton)`
    background-color: #3b82f6;
    color: white;

    &:hover {
        background-color: #2563eb;
    }
`;

// 드롭다운 메뉴
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
    transition: background-color 0.2s;

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