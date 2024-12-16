import styled from "styled-components";
import Button from "../../components/common/Button";

export const Container = styled.div`
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #f9fafb;
`;

export const Logo = styled.div`
    font-size: 3rem;
    font-weight: bold;
    color: #3b82f6;
    margin-bottom: 1.5rem;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
`;

export const Description = styled.p`
    font-size: 1.2rem;
    color: #6b7280;
    margin-bottom: 3rem;
    text-align: center;
    line-height: 1.8;
`;

export const ButtonGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 200px;
`;

export const StyledButton = styled(Button)`
    padding: 1rem 2rem;
    font-size: 1.2rem;
    transition: transform 0.2s;
    
    &:hover {
        transform: translateY(-2px);
    }
`;