import React from 'react';
import { CategorySelect } from "../../styles/components/Schedule.styles";

const ScheduleFilter = ({ selectedCategory, onCategoryChange }) => {
    return (
        <CategorySelect
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value)}
        >
            <option value="">카테고리 필터</option>
            <option value="WORK">업무</option>
            <option value="APPOINTMENT">약속</option>
            <option value="ETC">기타</option>
            <option value="BIRTHDAY">생일</option>
            <option value="FAMILY">가족</option>
            <option value="MEETING">회의</option>
            <option value="SELF_DEVELOPMENT">자기계발</option>
        </CategorySelect>
    );
};

export default ScheduleFilter;