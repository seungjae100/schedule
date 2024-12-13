import {SearchContainer, SearchIcon, SearchInput} from "../../styles/components/Schedule.styles";
import {Search} from "lucide-react";
import React from "react";

const ScheduleSearch = ({ searchKeyword, setSearchKeyword, onSearch}) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        if (searchKeyword.trim()) {
            onSearch(searchKeyword);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <SearchContainer>
                <SearchIcon>
                    <Search siz={20}/>
                </SearchIcon>
                <SearchInput
                    type="text"
                    value={searchKeyword}
                    onChange={(e) => setSearchKeyword(e.target.value)}
                    placeholder="일정 검색"
                />
            </SearchContainer>
        </form>
    );
};

export default ScheduleSearch;