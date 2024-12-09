import styled from "styled-components";

export const PageContainer = styled.div`
    height: 100vh;
    display: flex;
    flex-direction: column;
`;

export const Header = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 2rem;
    background-color: #fff;
    border-bottom: 1px solid #edf2f7;
`;

export const HeaderTitle = styled.h1`
    font-size: 1.5rem;
    font-weight: 600;
    color: #2d3748;
`;

export const ContentContainer = styled.div`
    flex: 1;
    padding: 20px;
    display: flex;
`;