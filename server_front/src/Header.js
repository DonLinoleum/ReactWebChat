import React from "react";
import image from './img/1.png'

const Header = ()=>
{
    return(
        <div className="header">
            <img id="leftImage" src={image}/>
            <p>Чат ответственного сотрудника!</p>
            <img id="rightImage" src={image}/>
        </div>
    )
}

export default Header;