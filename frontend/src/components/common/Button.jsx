import styled from "styled-components";

const StyledButton = styled.button`
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    font-weight: 500;
    width: ${props => props.$fullWidth ? '100%' : 'auto'};

    ${props => props.$variant === 'primary' && `
    background-color: #3b82f6;
    color: white;
    &:hover {
      background-color: #2563eb;
    }
  `}

  ${props => props.$variant === 'secondary' && `
    background-color: #e5e7eb;
    color: #1f2937;
    &:hover {
      background-color: #d1d5db;
    }
  `}
`;

const Button = ({ children, fullWidth, variant, ...props }) => {
    return <StyledButton $variant={variant} $fullWidth={fullWidth} {...props}>{children}</StyledButton>;
};

export default Button;