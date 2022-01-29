import React,{useContext} from "react";
import {context } from "../context/context";

const AnswerInput = ()=>
{
    const Context = useContext(context)
  
    return (
        <div className='input'>
           <input type='hidden' value={Context.id} onChange={(e)=>Context.set_id(e.target.value)}/>
           <input type='text' value={Context.answer} 
           onChange={(e)=>Context.set_answer(e.target.value)}
           onKeyPress={e=>{if (e.key==='Enter' && e.target.value!==''){
           Context.send()
           }}}
           />
           <div className="buttonDiv">
            <button onClick={Context.send}>Отправить</button>
            <button id='butClear' onClick={Context.clear} >Очистить</button>
           </div>
        </div>
    )
}

export default AnswerInput