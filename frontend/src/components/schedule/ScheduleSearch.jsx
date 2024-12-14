import {Search} from "lucide-react";
import React from "react";
import {
    SearchContainer,
    SearchIcon,
    SearchInput,
    SearchResultItem,
    SearchResultsContainer
} from "../../styles/components/Search.styles";

const ScheduleSearch = ({ searchKeyword, setSearchKeyword, onSearch, searchResults, showResults, onResultClick }) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        if (searchKeyword.trim()) {
            onSearch(searchKeyword);
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{position: 'relative', width: '100%'}}>
            <SearchContainer>
                <SearchIcon>
                    <Search size={20}/>
                </SearchIcon>
                <SearchInput
                    type="text"
                    value={searchKeyword}
                    onChange={(e) => {
                        setSearchKeyword(e.target.value);
                        onSearch(e.target.value);
                    }}
                    placeholder="일정 검색"
                />
            </SearchContainer>
            {showResults && searchResults.length > 0 && (
                <SearchResultsContainer>
                    {searchResults.map((event) => (
                        <SearchResultItem
                            key={event.id}
                            onClick={() => onResultClick(event)}
                        >
                            {event.title}
                        </SearchResultItem>
                    ))}
                </SearchResultsContainer>
            )}
        </form>
    );
};

export default ScheduleSearch;