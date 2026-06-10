import styled, { css, keyframes } from "styled-components";

// ─── keyframes ───────────────────────────────────────────────────────────────

const flashAnim = keyframes`
  0%   { background: rgba(167,139,250,0.22); }
  100% { background: rgba(0,0,0,0.35); }
`;

const slideDown = keyframes`
  from { opacity: 0; transform: translateY(-10px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const expandWidth = keyframes`
  from { max-width: 440px; }
  to   { max-width: 580px; }
`;

// ─── wrapper — expands horizontally in scientific mode ───────────────────────

export const Wrapper = styled.main`
  width: 100%;
  max-width: ${({ scientific }) => (scientific ? "620px" : "440px")};
  transition: max-width 0.35s cubic-bezier(0.4, 0, 0.2, 1);
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  border-radius: 1.5rem;
  box-shadow: var(--glass-shadow);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;

  @keyframes scaleIn {
    from { opacity: 0; transform: scale(0.93); }
    to   { opacity: 1; transform: scale(1); }
  }
  animation: scaleIn 0.35s cubic-bezier(0.34, 1.56, 0.64, 1) both;
`;

// ─── display ────────────────────────────────────────────────────────────────

export const DisplayArea = styled.div`
  background: rgba(0, 0, 0, 0.38);
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: var(--radius);
  padding: 1rem 1.25rem 0.875rem;
  min-height: 115px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-end;
  gap: 0.2rem;
  overflow: hidden;
  animation: ${({ flash }) => flash ? css`${flashAnim} 0.3s ease` : "none"};
`;

export const ModeToggle = styled.button`
  align-self: flex-start;
  background: ${({ active }) =>
    active
      ? "rgba(167, 139, 250, 0.22)"
      : "rgba(167, 139, 250, 0.08)"};
  border: 1px solid ${({ active }) =>
    active
      ? "rgba(167, 139, 250, 0.50)"
      : "rgba(167, 139, 250, 0.20)"};
  border-radius: 2rem;
  color: var(--accent);
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  padding: 0.28rem 0.85rem;
  cursor: pointer;
  transition: background 0.2s, border-color 0.2s, transform 0.15s;
  margin-bottom: 0.5rem;

  &:hover {
    background: rgba(167, 139, 250, 0.28);
    border-color: rgba(167, 139, 250, 0.55);
    transform: scale(1.03);
  }
  &:active { transform: scale(0.97); }
`;

export const ExpressionLine = styled.div`
  width: 100%;
  color: var(--text-primary);
  font-size: 2rem;
  font-weight: 300;
  letter-spacing: -0.02em;
  text-align: right;
  white-space: nowrap;
  overflow-x: auto;
  overflow-y: hidden;
  scrollbar-width: none;
  line-height: 1.2;
  min-height: 2.5rem;
  &::-webkit-scrollbar { display: none; }
`;

export const ResultLine = styled.div`
  color: var(--accent);
  font-size: 1rem;
  font-weight: 500;
  text-align: right;
  min-height: 1.4rem;
  transition: opacity 0.2s, transform 0.2s;
  opacity: ${({ hasValue }) => (hasValue ? 1 : 0)};
  transform: ${({ hasValue }) => (hasValue ? "translateY(0)" : "translateY(4px)")};
`;

// ─── scientific section ──────────────────────────────────────────────────────

export const SciSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  animation: ${slideDown} 0.28s cubic-bezier(0.4, 0, 0.2, 1) both;
`;

export const SciGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
`;

// color tokens per group
const groupColors = {
  trig:  { text: "#818cf8", bg: "rgba(129, 140, 248, 0.10)", hover: "rgba(129, 140, 248, 0.22)", border: "rgba(129, 140, 248, 0.18)" },
  power: { text: "#34d399", bg: "rgba(52, 211, 153, 0.09)",  hover: "rgba(52, 211, 153, 0.20)",  border: "rgba(52, 211, 153, 0.16)" },
  log:   { text: "#f59e0b", bg: "rgba(245, 158, 11, 0.09)",  hover: "rgba(245, 158, 11, 0.20)",  border: "rgba(245, 158, 11, 0.16)" },
};

export const SciGroupLabel = styled.span`
  font-size: 0.62rem;
  font-weight: 700;
  letter-spacing: 0.10em;
  text-transform: uppercase;
  color: ${({ color }) => groupColors[color]?.text ?? "var(--accent-2)"};
  opacity: 0.7;
  padding-left: 0.1rem;
`;

export const SciGroupBtns = styled.div`
  display: grid;
  grid-template-columns: repeat(${({ count }) => Math.min(count, 5)}, 1fr);
  gap: 0.4rem;
`;

// ─── divider ─────────────────────────────────────────────────────────────────

export const Divider = styled.div`
  height: 1px;
  background: linear-gradient(
    to right,
    transparent,
    rgba(255, 255, 255, 0.10) 20%,
    rgba(255, 255, 255, 0.10) 80%,
    transparent
  );
  margin: 0.1rem 0;
`;

// ─── basic buttons grid ───────────────────────────────────────────────────────

export const ButtonsGrid = styled.section`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.5rem;
`;

// ─── button ──────────────────────────────────────────────────────────────────

const variantStyles = {
  num: css`
    background: var(--num-bg);
    color: var(--text-primary);
    font-size: 1.15rem;
    font-weight: 400;
    &:hover { background: var(--num-hover); }
  `,
  op: css`
    background: var(--op-bg);
    color: var(--accent);
    font-size: 1.2rem;
    font-weight: 700;
    &:hover { background: var(--op-hover); }
  `,
  eq: css`
    background: linear-gradient(135deg, var(--eq-from), var(--eq-to));
    color: #fff;
    font-size: 1.3rem;
    font-weight: 700;
    box-shadow: 0 4px 20px rgba(124, 58, 237, 0.38);
    &:hover {
      filter: brightness(1.18);
      box-shadow: 0 6px 28px rgba(124, 58, 237, 0.55);
    }
  `,
  clear: css`
    background: var(--clear-bg);
    color: #f87171;
    font-size: 1rem;
    font-weight: 700;
    &:hover { background: var(--clear-hover); }
  `,
  back: css`
    background: var(--clear-bg);
    color: #f87171;
    font-size: 1.15rem;
    font-weight: 700;
    &:hover { background: var(--clear-hover); }
  `,
  sci: css`
    /* color set dynamically via sciColor prop */
    font-size: 0.78rem;
    font-weight: 600;
    letter-spacing: 0.01em;
  `,
};

export const Btn = styled.button`
  border-radius: var(--radius-sm);
  height: ${({ variant }) => (variant === "sci" ? "46px" : "60px")};
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  transition: background 0.15s, transform 0.1s, box-shadow 0.15s, filter 0.15s;
  -webkit-tap-highlight-color: transparent;

  /* wide button spans 2 cols */
  ${({ wide }) => wide && css`grid-column: span 2;`}

  /* base border */
  border: 1px solid ${({ variant, sciColor }) =>
    variant === "sci" && sciColor
      ? groupColors[sciColor]?.border ?? "rgba(255,255,255,0.06)"
      : "rgba(255, 255, 255, 0.06)"};

  /* sci dynamic colour */
  ${({ variant, sciColor }) =>
    variant === "sci" && sciColor
      ? css`
          background: ${groupColors[sciColor]?.bg ?? "rgba(129,140,248,0.10)"};
          color: ${groupColors[sciColor]?.text ?? "var(--accent-2)"};
          &:hover { background: ${groupColors[sciColor]?.hover ?? "rgba(129,140,248,0.22)"}; }
        `
      : ""}

  /* other variants */
  ${({ variant }) => variant !== "sci" && (variantStyles[variant] || variantStyles.num)}

  &:active {
    transform: scale(0.92);
  }

  /* ripple overlay */
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: rgba(255, 255, 255, 0.07);
    opacity: 0;
    transition: opacity 0.12s;
    border-radius: inherit;
  }
  &:active::after { opacity: 1; }
`;

// ─── history ─────────────────────────────────────────────────────────────────

export const HistoryPanel = styled.div`
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-sm);
  overflow: hidden;
`;

export const HistoryTitle = styled.button`
  width: 100%;
  background: rgba(255, 255, 255, 0.04);
  color: var(--text-secondary);
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  padding: 0.6rem 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  border-radius: 0;
  transition: background 0.15s;
  &:hover { background: rgba(255, 255, 255, 0.07); }
`;

export const HistoryClear = styled.button`
  margin-left: auto;
  background: transparent;
  color: #f87171;
  font-size: 0.7rem;
  font-weight: 600;
  padding: 0.1rem 0.5rem;
  border-radius: 0.25rem;
  border: 1px solid rgba(248, 113, 113, 0.3);
  cursor: pointer;
  transition: background 0.15s;
  &:hover { background: rgba(239, 68, 68, 0.15); }
`;

export const HistoryList = styled.ul`
  list-style: none;
  max-height: 180px;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: rgba(167, 139, 250, 0.3) transparent;
  animation: ${slideDown} 0.2s ease both;

  &::-webkit-scrollbar { width: 4px; }
  &::-webkit-scrollbar-thumb { background: rgba(167,139,250,0.3); border-radius: 2px; }
`;

export const HistoryItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 1rem;
  cursor: pointer;
  border-top: 1px solid rgba(255, 255, 255, 0.04);
  transition: background 0.15s;

  &:hover { background: rgba(167, 139, 250, 0.10); }

  .expr {
    color: var(--text-secondary);
    font-size: 0.82rem;
    max-width: 55%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .eq {
    color: var(--accent);
    font-size: 0.9rem;
    font-weight: 600;
    max-width: 43%;
    text-align: right;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

export const HistoryEmpty = styled.p`
  color: var(--text-secondary);
  font-size: 0.8rem;
  text-align: center;
  padding: 1rem;
`;