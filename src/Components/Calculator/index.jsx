import { useState } from "react"
import { ButtonBackSpace, ButtonCharacters, ButtonClear, ButtonNumbers, ButtonResult, ButtonsContainer, Input } from "./styled"

export default function Calculator() {
   const [ calc, setCalc] = useState("")

   const click = (e) => {
      setCalc(calc.concat(e.target.value))
   }

   const result = () => {
      try {
         setCalc(eval(calc).toString())
      } catch (error) {
         setCalc("Error")
      }
   }

   const backSpace = () =>{
      setCalc(calc.slice(0,-1))
   }

   const clear = () => {
      setCalc("")
   }

   return (
      <main>
         <Input type="text"  value={calc} disabled/>
         <ButtonsContainer>
            <ButtonClear onClick={clear}>
               Clear
            </ButtonClear>
            <ButtonBackSpace onClick={backSpace}>
               C
            </ButtonBackSpace>
            <ButtonCharacters value="/" onClick={click}>
               &divide;
            </ButtonCharacters>
            <ButtonNumbers value="7" onClick={click}>
               7
            </ButtonNumbers>
            <ButtonNumbers value="8" onClick={click}>
               8
            </ButtonNumbers>
            <ButtonNumbers value="9" onClick={click}>
               9
            </ButtonNumbers>
            <ButtonCharacters value="*" onClick={click}>
               &times;
            </ButtonCharacters>
            <ButtonNumbers value="4" onClick={click}>
               4
            </ButtonNumbers>
            <ButtonNumbers value="5" onClick={click}>
               5
            </ButtonNumbers>
            <ButtonNumbers value="6" onClick={click}>
               6
            </ButtonNumbers>
            <ButtonCharacters value="-" onClick={click}>
               &ndash;
            </ButtonCharacters>
            <ButtonNumbers value="1" onClick={click}>
               1
            </ButtonNumbers>
            <ButtonNumbers value={2} onClick={click}>
               2
            </ButtonNumbers>
            <ButtonNumbers value={3} onClick={click}>
               3
            </ButtonNumbers>
            <ButtonCharacters value="+" onClick={click}>
               +
            </ButtonCharacters>
            <ButtonNumbers value="0" onClick={click}>
               0
            </ButtonNumbers>
            <ButtonNumbers value="." onClick={click}>
               .
            </ButtonNumbers>
            <ButtonResult onClick={result}>
               =
            </ButtonResult>
         </ButtonsContainer>
      </main>
   )
}