import styled from "styled-components";

export const Input = styled.input`
	background-color: #2C3E50;
	border: 2px solid #999;
	border-radius: 0.5rem;
	color: #FFF;
	display: block;
	font-size: 1.25rem;
	margin: 0 auto;
	padding: 1rem;
	text-align: end;
	width: 100%;
`

export const ButtonsContainer = styled.section`
   display: grid;
	grid-template-columns: repeat(4, 1fr);
	grid-auto-rows: minmax(70px, auto);
	gap: 1rem;
	margin: 2rem 0;
`
export const ButtonNumbers = styled.button`
   background-color: #2C3E50;
   color: #ED9121;
` 
export const ButtonCharacters = styled.button`
   background-color: #BDC3C7;
   color: #2C3E50;
` 

export const ButtonClear = styled.button`
   background-color: #BDC3C7;
   color: #2C3E50;
	grid-column: 1/3;
	grid-row: 1;
`
export const ButtonBackSpace = styled.button`
   background-color: #BDC3C7;
   color: #2C3E50;
`

export const ButtonResult = styled.button`
   background-color: #BDC3C7;
   color: #2C3E50;
	grid-column: 3/5;
	grid-row: 5;
`