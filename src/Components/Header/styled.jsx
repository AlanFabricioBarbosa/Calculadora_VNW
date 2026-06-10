import styled from "styled-components";

export const HeaderWrapper = styled.header`
  width: 100%;
  max-width: 440px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
  animation: fadeInUp 0.4s ease both;
`;

export const LogoIcon = styled.span`
  font-size: 1.5rem;
  line-height: 1;
`;

export const Title = styled.h1`
  font-size: 1.1rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  background: linear-gradient(135deg, #a78bfa, #818cf8);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;