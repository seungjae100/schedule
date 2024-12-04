import React, {useEffect, useState} from "react";
import styled from "styled-components";
import {useNavigate} from "react-router-dom";
import {getAccessToken, removeTokens} from "../../utils/token";
import Button from "../../components/common/Button";
import {logout} from "../../api/user";

const Container = styled.div`
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #f9fafb;
`;

const Logo = styled.div`
    font-size: 3rem;
    font-weight: bold;
    color: #3b82f6;
    margin-bottom: 1.5rem;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
`;

const Description = styled.p`
    font-size: 1.2rem;
    color: #6b7280;
    margin-bottom: 3rem;
    text-align: center;
    line-height: 1.8;
`;

const ButtonGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 200px;
`;

const StyledButton = styled(Button)`
    padding: 1rem 2rem;
    font-size: 1.2rem;
    transition: transform 0.2s;
    
    &:hover {
        transform: translateY(-2px);
    }
`;

const HomePage = () => {
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = getAccessToken();
        if (token) {
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
        }
    }, []);

    const handleEnterClick = () => {
        navigate('/schedules');
    };

    const handleLogout = async () => {
        try {
            await logout();
            removeTokens();
            setIsAuthenticated(false);
            navigate('/users/login');
        } catch (error) {
            console.error('로그아웃 실패: ', error);
        }
    };

    return (
        <Container>
            <Logo>Schedule Manager</Logo>
            <Description>
                효율적인 일정 관리를 시작하세요<br/>
                당신의 소중한 시간을 더 가치있게
            </Description>
            <ButtonGroup>
                {isAuthenticated ? (
                    <>
                        <StyledButton variant="primary" onClick={handleEnterClick}>
                            입장하기
                        </StyledButton>
                        <StyledButton variant="secondary" onClick={handleLogout}>
                            로그아웃
                        </StyledButton>
                    </>
                ) : (
                    <StyledButton variant="primary" onClick={() => navigate('/users/login')}>
                        로그인하기
                    </StyledButton>
                )}
            </ButtonGroup>
        </Container>
    );
};

export default HomePage;
