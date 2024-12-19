import React from 'react';
import { CategorySelect } from "../../styles/components/Filter.styles";
import { SCHEDULE_CATEGORIES } from '../../constants/scheduleConstants';

const ScheduleFilter = ({ selectedCategory, onCategoryChange }) => {
    return (
        <CategorySelect
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value)}
        >
            <option value="">전체</option>
            {Object.entries(SCHEDULE_CATEGORIES).map(([key, {label}]) => (
                <option key={key} value={key}>
                    {label}
                </option>
            ))}
        </CategorySelect>
    );
};

export default ScheduleFilter;