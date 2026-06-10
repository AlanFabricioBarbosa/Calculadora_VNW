import { createGlobalStyle } from "styled-components";

export const GlobalStyled = createGlobalStyle`
  *, *::before, *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  :root {
    --font: 'Inter', sans-serif;
    --bg-from: #0d0d1a;
    --bg-mid: #0f0c29;
    --bg-to: #1a0533;
    --glass-bg: rgba(255, 255, 255, 0.04);
    --glass-border: rgba(255, 255, 255, 0.10);
    --glass-shadow: 0 8px 32px rgba(0, 0, 0, 0.6);
    --accent: #a78bfa;
    --accent-2: #818cf8;
    --num-bg: rgba(255, 255, 255, 0.07);
    --num-hover: rgba(255, 255, 255, 0.14);
    --op-bg: rgba(167, 139, 250, 0.18);
    --op-hover: rgba(167, 139, 250, 0.32);
    --eq-from: #7c3aed;
    --eq-to: #4f46e5;
    --clear-bg: rgba(239, 68, 68, 0.18);
    --clear-hover: rgba(239, 68, 68, 0.32);
    --sci-bg: rgba(129, 140, 248, 0.12);
    --sci-hover: rgba(129, 140, 248, 0.25);
    --text-primary: #f1f5f9;
    --text-secondary: rgba(241, 245, 249, 0.5);
    --radius: 1rem;
    --radius-sm: 0.625rem;
  }

  html {
    font-family: var(--font);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body {
    min-height: 100dvh;
    background: linear-gradient(135deg, var(--bg-from) 0%, var(--bg-mid) 50%, var(--bg-to) 100%);
    background-attachment: fixed;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 1.5rem;
    overflow-x: hidden;
  }

  body::before {
    content: '';
    position: fixed;
    inset: 0;
    background:
      radial-gradient(ellipse 80% 60% at 20% 10%, rgba(124, 58, 237, 0.15) 0%, transparent 60%),
      radial-gradient(ellipse 60% 50% at 80% 90%, rgba(79, 70, 229, 0.12) 0%, transparent 60%);
    pointer-events: none;
    z-index: 0;
  }

  #root {
    position: relative;
    z-index: 1;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  button {
    font-family: var(--font);
    border: none;
    cursor: pointer;
    user-select: none;
    -webkit-tap-highlight-color: transparent;
  }

  *:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
  }

  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  @keyframes pulse-glow {
    0%, 100% { box-shadow: 0 0 20px rgba(167, 139, 250, 0.15); }
    50%       { box-shadow: 0 0 40px rgba(167, 139, 250, 0.30); }
  }
`;
