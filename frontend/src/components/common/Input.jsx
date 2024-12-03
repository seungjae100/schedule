import styled from "styled-components";
import React from "react";

const InputWrapper = styled.div`
    margin-bottom: 1rem;
`;

const Label = styled.label`
    display: block;
    font-size: 0.875rem;
    font-weight: 500;
    margin-bottom: 0.5rem;
    color: #374151;
`;

const StyledInput = styled.input`
    width: 100%;
    padding: 0.5rem 0.75rem;
    border: 1px solid #d1d5db;
    border-radius: 0.5rem;
    
    &:focus {
        outline: none;
        border-color: #3b82f6;
        box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
    }
`;

const Input = ({ label, ...props }) => {
    return (
        <InputWrapper>
            <Label>{label}</Label>
            <StyledInput {...props} />
        </InputWrapper>
    );
};

export default Input;