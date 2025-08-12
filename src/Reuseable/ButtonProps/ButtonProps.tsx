import React from "react";


type ButtonProps =React.ComponentPropsWithRef<"button">
const Button = ({...rest}:ButtonProps) => {
    return ( 
        <button {...rest}></button>
     );
}
 
export default Button;