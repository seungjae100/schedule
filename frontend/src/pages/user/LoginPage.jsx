import styled from "styled-components";
import React, { useState } from "react";
import {useNavigate} from 'react-router-dom';
import {login} from "../../api/user";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";


const Container = styled.div`
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f9fafb;
`;

const FormContainer = styled.div`
    max-width: 28rem;
    width: 100%;
    padding: 2rem;
    background-color: white;
    border-radius: 0.5rem;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
    font-size: 1.5rem;
    font-weight: bold;
    text-align: center;
    margin-bottom: 2rem;
    color: #111827;
`;

const ErrorMessage = styled.div`
    padding: 0.75rem;
    margin-bottom: 1rem;
    background-color: #fee2e2;
    color: #dc2626;
    border-radius: 0.375rem;
`;

const SignupText = styled.p`
    text-align: center;
    margin-top: 1rem;
    color: #6b7280;
    
    button {
        color: #3b82f6;
        font-weight: 500;
        %:hover {
            text-decoration: underline;
        }
    }
`;

const LoginPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(formData);
            navigate('/schedules');
        } catch (error) {
            setError('로그인에 실패했습니다.');
        }
    };

    return (
        <Container>
            <FormContainer>
                <Title>로그인</Title>
                {error && <ErrorMessage>{error}</ErrorMessage>}

                <form onSubmit={handleSubmit}>
                    <Input
                        label="이메일"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        required
                    />
                    <Input
                        label="비밀번호"
                        type="password"
                        value={formData.password}
                        onChange={(e) => setFormData({...formData, password: e.target.value})}
                        required
                    />
                    <Button type="submit" variant="primary" fullWidth>
                        로그인
                    </Button>
                </form>

                <SignupText>
                    계정이 없으신가요?{' '}
                    <button type="button" onClick={() => navigate('/users/signup')}>
                        회원가입
                    </button>
                </SignupText>
            </FormContainer>
        </Container>
    );
};

export default LoginPage;


