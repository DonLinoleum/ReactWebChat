import React from "react";
import Contact from "./Contact";

const Contacts = ({contacts})=>
{
    if (contacts){
    return (
        <div className="overflowContainerContacts">
        <div className='contacts'>
            {contacts.map((el,index) =>
                {
                    return <Contact index={index} key={index} />
                })}
        </div>
        </div>
    )
    }
    return (
        <div></div>
    )
}
export default Contacts