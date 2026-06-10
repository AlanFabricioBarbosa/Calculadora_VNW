import { useState, useEffect, useCallback, useRef } from "react";
import { evaluate, factorial } from "mathjs";
import {
  Wrapper,
  DisplayArea,
  ExpressionLine,
  ResultLine,
  ModeToggle,
  SciSection,
  SciGroup,
  SciGroupLabel,
  SciGroupBtns,
  Divider,
  ButtonsGrid,
  Btn,
  HistoryPanel,
  HistoryTitle,
  HistoryList,
  HistoryItem,
  HistoryClear,
  HistoryEmpty,
} from "./styled";

// ─── helpers ────────────────────────────────────────────────────────────────

function safeEval(expr) {
  if (!expr.trim()) return "";
  let sanitized = expr
    .replace(/×/g, "*")
    .replace(/÷/g, "/")
    .replace(/−/g, "-")
    .replace(/π/g, "pi")
    .replace(/\^/g, "^");

  const result = evaluate(sanitized);
  if (!isFinite(result)) throw new Error("Infinity");
  return typeof result === "number"
    ? parseFloat(result.toPrecision(10)).toString()
    : result.toString();
}

// ─── button data ─────────────────────────────────────────────────────────────

const basicButtons = [
  { label: "AC",  action: "clear",  variant: "clear", id: "btn-ac" },
  { label: "⌫",   action: "back",   variant: "back",  id: "btn-back" },
  { label: "%",   value: "%",       variant: "op",    id: "btn-pct" },
  { label: "÷",   value: "/",       variant: "op",    id: "btn-div" },

  { label: "7",   value: "7",       variant: "num",   id: "btn-7" },
  { label: "8",   value: "8",       variant: "num",   id: "btn-8" },
  { label: "9",   value: "9",       variant: "num",   id: "btn-9" },
  { label: "×",   value: "*",       variant: "op",    id: "btn-mul" },

  { label: "4",   value: "4",       variant: "num",   id: "btn-4" },
  { label: "5",   value: "5",       variant: "num",   id: "btn-5" },
  { label: "6",   value: "6",       variant: "num",   id: "btn-6" },
  { label: "−",   value: "-",       variant: "op",    id: "btn-sub" },

  { label: "1",   value: "1",       variant: "num",   id: "btn-1" },
  { label: "2",   value: "2",       variant: "num",   id: "btn-2" },
  { label: "3",   value: "3",       variant: "num",   id: "btn-3" },
  { label: "+",   value: "+",       variant: "op",    id: "btn-add" },

  { label: "0",   value: "0",       variant: "num",   id: "btn-0", wide: true },
  { label: ".",   value: ".",       variant: "num",   id: "btn-dot" },
  { label: "=",   action: "result", variant: "eq",    id: "btn-eq" },
];

// Organized into visual groups — each group has a label + 5 buttons (one row)
const sciGroups = [
  {
    label: "Trigonometria",
    color: "trig",
    buttons: [
      { label: "sin",   action: "fn", fn: "sin(",  id: "btn-sin" },
      { label: "cos",   action: "fn", fn: "cos(",  id: "btn-cos" },
      { label: "tan",   action: "fn", fn: "tan(",  id: "btn-tan" },
      { label: "sin⁻¹", action: "fn", fn: "asin(", id: "btn-asin" },
      { label: "cos⁻¹", action: "fn", fn: "acos(", id: "btn-acos" },
      { label: "tan⁻¹", action: "fn", fn: "atan(", id: "btn-atan" },
      { label: "(",     value: "(",                 id: "btn-lparen" },
      { label: ")",     value: ")",                 id: "btn-rparen" },
      { label: "π",     value: "pi",                id: "btn-pi" },
      { label: "e",     value: "e",                 id: "btn-e" },
    ],
  },
  {
    label: "Potências & Raízes",
    color: "power",
    buttons: [
      { label: "x²",  action: "fn", fn: "^2",   id: "btn-sq",    postfix: true },
      { label: "x³",  action: "fn", fn: "^3",   id: "btn-cub",   postfix: true },
      { label: "xⁿ",  action: "fn", fn: "^",    id: "btn-pow",   postfix: true },
      { label: "√x",  action: "fn", fn: "sqrt(",id: "btn-sqrt" },
      { label: "ⁿ√x", action: "fn", fn: "^(1/", id: "btn-nthrt", postfix: true },
    ],
  },
  {
    label: "Logaritmos & Outros",
    color: "log",
    buttons: [
      { label: "log",  action: "fn", fn: "log10(", id: "btn-log" },
      { label: "ln",   action: "fn", fn: "log(",   id: "btn-ln" },
      { label: "n!",   action: "factorial",         id: "btn-fact" },
      { label: "1/x",  action: "fn", fn: "1/(",    id: "btn-inv" },
      { label: "Ans",  action: "ans",               id: "btn-ans" },
    ],
  },
];

// ─── component ───────────────────────────────────────────────────────────────

export default function Calculator() {
  const [expr, setExpr]               = useState("");
  const [preview, setPreview]         = useState("");
  const [isScientific, setIsScientific] = useState(false);
  const [history, setHistory]         = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [lastAns, setLastAns]         = useState("");
  const [flash, setFlash]             = useState(false);
  const displayRef                    = useRef(null);

  // live preview
  useEffect(() => {
    if (!expr) { setPreview(""); return; }
    try {
      const res = safeEval(expr);
      setPreview(res !== expr ? res : "");
    } catch { setPreview(""); }
  }, [expr]);

  // auto-scroll display
  useEffect(() => {
    if (displayRef.current)
      displayRef.current.scrollLeft = displayRef.current.scrollWidth;
  }, [expr]);

  const appendToExpr = useCallback((val) => setExpr((p) => p + val), []);

  const triggerFlash = () => {
    setFlash(true);
    setTimeout(() => setFlash(false), 300);
  };

  const handleResult = useCallback(() => {
    if (!expr) return;
    try {
      const res = safeEval(expr);
      setHistory((h) => [{ expr, result: res }, ...h.slice(0, 9)]);
      setLastAns(res);
      triggerFlash();
      setExpr(res);
      setPreview("");
    } catch {
      setExpr("Erro");
      setPreview("");
    }
  }, [expr]);

  const handleClear     = () => { setExpr(""); setPreview(""); };
  const handleBack      = () => setExpr((p) => p.slice(0, -1));
  const handleAns       = () => setExpr((p) => p + lastAns);

  const handleFactorial = () => {
    const num = parseFloat(expr);
    if (!isNaN(num) && Number.isInteger(num) && num >= 0) {
      const res = factorial(num).toString();
      setHistory((h) => [{ expr: `${num}!`, result: res }, ...h.slice(0, 9)]);
      setLastAns(res);
      triggerFlash();
      setExpr(res);
    }
  };

  const handleBtn = (btn) => {
    if (expr === "Erro" && btn.action !== "clear") {
      setExpr(""); setPreview("");
      if (btn.value) appendToExpr(btn.value);
      return;
    }
    switch (btn.action) {
      case "clear":     handleClear(); break;
      case "back":      handleBack(); break;
      case "result":    handleResult(); break;
      case "factorial": handleFactorial(); break;
      case "ans":       handleAns(); break;
      case "fn":
        btn.postfix ? appendToExpr(btn.fn) : appendToExpr(btn.fn);
        break;
      default:          appendToExpr(btn.value ?? "");
    }
  };

  // keyboard support
  useEffect(() => {
    const onKey = (e) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const k = e.key;
      if (k === "Enter" || k === "=") { e.preventDefault(); handleResult(); }
      else if (k === "Backspace")     handleBack();
      else if (k === "Escape")        handleClear();
      else if (/^[0-9]$/.test(k))    appendToExpr(k);
      else if (["+","-","*","/",".",  "(",")","%","^"].includes(k)) appendToExpr(k);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [handleResult, handleBack, handleClear, appendToExpr]);

  // ──────────────────────────────────────────────────────────────────────────
  return (
    <Wrapper scientific={isScientific}>

      {/* ── Display ── */}
      <DisplayArea flash={flash}>
        <ModeToggle
          onClick={() => setIsScientific((s) => !s)}
          id="btn-mode-toggle"
          active={isScientific}
          aria-label="Alternar modo científico"
        >
          {isScientific ? "📐 Científica" : "🔢 Básica"}
        </ModeToggle>
        <ExpressionLine ref={displayRef} aria-label="Expressão">
          {expr || <span style={{ opacity: 0.3 }}>0</span>}
        </ExpressionLine>
        <ResultLine hasValue={!!preview} aria-label="Prévia">
          {preview || ""}
        </ResultLine>
      </DisplayArea>

      {/* ── Scientific section ── */}
      {isScientific && (
        <SciSection>
          {sciGroups.map((group) => (
            <SciGroup key={group.label}>
              <SciGroupLabel color={group.color}>{group.label}</SciGroupLabel>
              <SciGroupBtns count={group.buttons.length}>
                {group.buttons.map((btn) => (
                  <Btn
                    key={btn.id}
                    id={btn.id}
                    variant="sci"
                    sciColor={group.color}
                    onClick={() => handleBtn(btn)}
                    aria-label={btn.label}
                  >
                    {btn.label}
                  </Btn>
                ))}
              </SciGroupBtns>
            </SciGroup>
          ))}
        </SciSection>
      )}

      {/* ── Divider ── */}
      {isScientific && <Divider />}

      {/* ── Basic buttons ── */}
      <ButtonsGrid>
        {basicButtons.map((btn) => (
          <Btn
            key={btn.id}
            id={btn.id}
            variant={btn.variant}
            wide={btn.wide}
            onClick={() => handleBtn(btn)}
            aria-label={btn.label}
          >
            {btn.label}
          </Btn>
        ))}
      </ButtonsGrid>

      {/* ── History ── */}
      <HistoryPanel>
        <HistoryTitle
          onClick={() => setShowHistory((s) => !s)}
          id="btn-history-toggle"
          aria-expanded={showHistory}
        >
          {showHistory ? "▲" : "▼"} Histórico ({history.length})
          {history.length > 0 && (
            <HistoryClear
              id="btn-history-clear"
              onClick={(e) => { e.stopPropagation(); setHistory([]); }}
              aria-label="Limpar histórico"
            >
              Limpar
            </HistoryClear>
          )}
        </HistoryTitle>
        {showHistory && (
          <HistoryList>
            {history.length === 0 ? (
              <HistoryEmpty>Nenhum cálculo ainda</HistoryEmpty>
            ) : (
              history.map((item, i) => (
                <HistoryItem
                  key={i}
                  onClick={() => setExpr(item.result)}
                  title="Clique para usar o resultado"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === "Enter" && setExpr(item.result)}
                >
                  <span className="expr">{item.expr}</span>
                  <span className="eq">= {item.result}</span>
                </HistoryItem>
              ))
            )}
          </HistoryList>
        )}
      </HistoryPanel>
    </Wrapper>
  );
}