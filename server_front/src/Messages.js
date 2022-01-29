import React from "react";
import Message from './Message'


 const Messages = ({messages,Id})=> 
{    
    if (messages)
    { 
    let sortedMessages = messages.filter(el=>el.includes('id :'+Id))  
    return (
        <div className="overflowContainerMessages">
        <div className="messagesDiv">
            {sortedMessages.map(el => 
                <Message  el={el} />
            )}
        </div>   
        </div>    
    )
    }
    return (
        <div></div>
    )
}

export default Messages