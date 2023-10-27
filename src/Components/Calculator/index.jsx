import { useState } from "react"

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
         <input type="text"  value={calc} disabled/>
         <section>
            <button onClick={clear}>
               Clear
            </button>
            <button onClick={backSpace}>
               C
            </button>
            <button value="/" onClick={click}>
               &divide;
            </button>
            <button value="7" onClick={click}>
               7
            </button>
            <button value="8" onClick={click}>
               8
            </button>
            <button value="9" onClick={click}>
               9
            </button>
            <button value="*" onClick={click}>
               &times;
            </button>
            <button value="4" onClick={click}>
               4
            </button>
            <button value="5" onClick={click}>
               5
            </button>
            <button value="6" onClick={click}>
               6
            </button>
            <button value="-" onClick={click}>
               &ndash;
            </button>
            <button value="1" onClick={click}>
               1
            </button>
            <button value={2} onClick={click}>
               2
            </button>
            <button value={3} onClick={click}>
               3
            </button>
            <button value="+" onClick={click}>
               +
            </button>
            <button value="0" onClick={click}>
               0
            </button>
            <button value="." onClick={click}>
               .
            </button>
            <button onClick={result}>
               =
            </button>
         </section>
      </main>
   )
}