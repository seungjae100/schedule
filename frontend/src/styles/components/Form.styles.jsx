import styled from "styled-components";

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

export const FormGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
`;

export const TextArea = styled.textarea`
    padding: 0.5rem;
    border: 1px solid #e2e8f0;
    border-radius: 0.375rem;
    min-height: 100px;
`;

export const Select = styled.select`
    padding: 0.5rem;
    border: 1px solid #e2e8f0;
    border-radius: 0.375rem;
`;