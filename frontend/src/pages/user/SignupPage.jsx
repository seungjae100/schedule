import styled from "styled-components";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {signup} from "../../api/user";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import React from "react";

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

const LoginText = styled.p`
    text-align: center;
    margin-top: 1rem;
    color: #6b7280;
    
    button {
        color: #3b82f6;
        font-weight: 500;
        &:hover {
            text-decoration: underline;
        }
    }
`;

const SignupPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        passwordConfirm: '',
        name: ''
    });
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        // 비밀번호 확인
        if (formData.password !== formData.passwordConfirm) {
            setError('비밀번호가 일치하지 않습니다.');
            return;
        }

        try {
            // passwordConfirm 은 제외하고 서버로 전송
            const { passwordConfirm , ...signupData } = formData;
            await signup(signupData);
            navigate('/users/login');
        } catch (error) {
            setError('회원가입에 실패했습니다.');
        }
    };

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <Container>
            <FormContainer>
                <Title>회원가입</Title>
                {error && <ErrorMessage>{error}</ErrorMessage>}

                <form onSubmit={handleSubmit}>
                    <Input
                        label="이름"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                    <Input
                        label="이메일"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    <Input
                        label="비밀번호"
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                    <Input
                        label="비밀번호 확인"
                        type="password"
                        name="passwordConfirm"
                        value={formData.passwordConfirm}
                        onChange={handleChange}
                        required
                    />
                    <Button type="submit" variant="primary" fullWidth>
                        가입하기
                    </Button>
                </form>

                <LoginText>
                    이미 계정이 있으신가요?{' '}
                    <button type="button" onClick={() => navigate('/users/login')}>
                        로그인
                    </button>
                </LoginText>
            </FormContainer>
        </Container>
    );
};

export default SignupPage;