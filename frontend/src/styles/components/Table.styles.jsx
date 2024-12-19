import styled from 'styled-components';
import {IconButton} from "./Common.styles";

export const TableContainer = styled.div`
    position: relative;
    background: white;
    border-radius: 0.75rem;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    padding: 1.5rem;
    overflow: visible;
`;

export const StyledTable = styled.table`
    width: 100%;
    border-collapse: collapse;
    min-width: 600px;
`;

export const TableHeader = styled.th`
    padding: 1rem;
    text-align: ${props => props.$center ? 'center' : 'left'};
    font-weight: 600;
    color: #374151;
    border-bottom: 2px solid #e5e7eb;
    background-color: #f9fafb;
    // 각 컬럼별 고정 너비 설정
    width: ${props => {
        switch (props.column) {
            case 'no':
                return '80px';  // No 컬럼
            case 'title':
                return '25%';   // 제목 컬럼
            case 'category':
                return '15%';   // 카테고리 컬럼
            case 'time':
                return '30%';   // 시작/종료 시간 컬럼
            default:
                return 'auto';
        }
    }};
`;

export const TableFooter = styled.div`
    position: relative;  
    margin-top: 1rem;
    padding-top: 1rem;
    border-top: 1px solid #e5e7eb;
`;

export const TableRow = styled.tr`
    &:hover {
        background-color: #f9fafb;
    }

    &:not(:last-child) {
        border-bottom: 1px solid #e5e7eb;
    }
`;

export const TableCell = styled.td`
    padding: 1rem;
    color: #4b5563;
`;

export const IndexCell = styled(TableCell)`
    font-weight: 500;
    color: #6b7280;
    text-align: center;
    width: 60px;  
`;

export const EmptyMessage = styled.div`
    text-align: center;
    padding: 2rem;
    color: #6b7280;
`;

export const PaginationContainer = styled.div`
    display: flex;
    justify-content: center;  
    align-items: center;
    gap: 0.5rem;
`;

export const NewScheduleButton = styled(IconButton)`
    position: absolute;  
    right: 0;           
    top: 1rem;          
    background-color: #3b82f6;
    color: white;
    &:hover {
        background-color: #2563eb;
    }
`;

export const PaginationButton = styled.button`
    padding: 0.5rem 1rem;
    border: 1px solid #e2e8f0;
    border-radius: 0.375rem;
    background-color: white;
    color: #4a5568;
    font-size: 0.875rem;
    cursor: pointer;
    
    &:hover:not(:disabled) {
        background-color: #f7fafc;
    }
    
    &:disabled {
        background-color: #f3f4f6;
        cursor: not-allowed;
        color: #9ca3af;
    }
`;

export const PageNumber = styled.button`
    padding: 0.5rem 0.75rem;
    border: 1px solid #e2e8f0;
    border-radius: 0.375rem;
    background-color: ${props => props.active ? '#3b82f6' : 'white'};
    color: ${props => props.active ? 'white' : '#4a5568'};
    font-size: 0.875rem;
    cursor: pointer;
    
    &:hover:not(:disabled) {
        background-color: ${props => props.active ? '#2563eb' : '#f7fafc'};
    }
`;