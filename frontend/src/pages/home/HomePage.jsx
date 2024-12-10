import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {removeTokens} from "../../utils/token";
import {logout} from "../../api/user";
import {
    Container,
    Logo,
    Description,
    ButtonGroup,
    StyledButton
} from "../../styles/layouts/HomeLayout.styles";

const HomePage = () => {
    const navigate = useNavigate();
    const [isAuth, setIsAuth] = useState(false);

    useEffect(() => {
        const accessToken = sessionStorage.getItem('accessToken');
        const refreshToken = localStorage.getItem('refreshToken');
        setIsAuth(!!accessToken && !!refreshToken);
    }, []);

    const handleEnterClick = () => {
        navigate('/schedules');
    };

    const handleLogout = async () => {
        try {
            await logout();
            removeTokens();
            setIsAuth(false);
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
                {isAuth ? (
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