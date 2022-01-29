import React,{useContext} from "react";
import {context } from "./context/context";

const Contact = ({index})=>
{
    const Context = useContext(context)
    
    return (
        <div className="contact" 
        onClick={(e)=>{Context.set_id(index.toString())}}>
            <p>Абонент - {index}</p>
        </div>
    )
}
export default Contact