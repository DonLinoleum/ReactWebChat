import React from "react";

 const Message = ({el})=> 
{
    return (
        <div className={el.includes('client') ? 'message' : 'messageServer'}>
            {el}
        </div>       
    )
}

export default Message