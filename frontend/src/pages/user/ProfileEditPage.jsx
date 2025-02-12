import {getCurrentUser, updateUser} from "../../api/user";
import {useEffect, useState} from "react";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import {useNavigate} from "react-router-dom";
import styled from "styled-components";
import {ButtonGroup} from "../../styles/components/Common.styles";
import {FormGroup} from "../../styles/components/Form.styles";

const Container = styled.div`
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f9fafb;
`;

const FormContainer = styled.div`
    max-width: 26rem;
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

const SuccessMessage = styled.div`
    padding: 0.75rem;
    margin-bottom: 1rem;
    background-color: #d1fae5;
    color: #065f46;
    border-radius: 0.375rem;
    text-align: center;
`;

const ProfileEditPage = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({name : "", password : ""});
    const [successMessage, setSuccessMessage] = useState("");

    useEffect(() => {
        // 현재 사용자 정보 불러오기
        const fetchUser = async () => {
            try {
                const data = await getCurrentUser();
                setUser({ name : data.name, password: ""});
            } catch (error) {
                console.error("사용자 정보를 불러오는데 실패했습니다.", error);
            }
        };
        fetchUser();
    }, []);

    const handleChange = (e) => {
        setUser({...user, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateUser(user);
            setSuccessMessage("정보가 성공적으로 업데이트 되었습니다.")
            setTimeout(() => navigate('/schedules'), 1500);
        } catch (error) {
            console.error("사용자 정보 업데이트 실패", error);
        }
    };

    return (
        <Container>
            <FormContainer>
                <Title>내 정보 수정</Title>
                {successMessage && <SuccessMessage>{successMessage}</SuccessMessage>}

                <form onSubmit={handleSubmit}>
                    <FormGroup>
                        <Input
                            type="text"
                            name="name"
                            value={user.name}
                            onChange={handleChange}
                            placeholder="이름"
                            required
                        />
                        <Input
                            type="password"
                            name="password"
                            value={user.password}
                            onChange={handleChange}
                            placeholder="비밀번호"
                        />
                    </FormGroup>


                <ButtonGroup>
                    <Button type="submit" variant="primary" fullWidth>
                        저장
                    </Button>
                    <Button type="button" variant="secondary" fullWidth onClick={() => navigate('/schedules')}>
                        취소
                    </Button>
                </ButtonGroup>
                </form>
            </FormContainer>
        </Container>
    );
};

export default ProfileEditPage;