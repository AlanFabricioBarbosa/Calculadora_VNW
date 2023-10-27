import { createGlobalStyle } from "styled-components";

export const GlobalStyled = createGlobalStyle`
      * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      font-family: 'Ubuntu', sans-serif ;
   }

   body{
      background-color: #ED9121;
      margin: 5rem auto;
      max-width: 40rem;
      padding: 0 1.5rem 2.5rem;
   }

   button { 
      background-color: ${(props)=> props.backgroundColor};
	   border: none;
	   border-radius: 0.25rem;
      color: ${(props)=> props.color};
      cursor: pointer;
      font-size: 1.5rem;
	   font-weight: 700;
	   padding: 0.5rem 1rem;
	   transition: 0.15s;
      &:hover {
         filter: brightness(1.3);
      }
   }
`
