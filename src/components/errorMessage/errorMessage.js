import React from "react";
import img from './codeError.gif';
import './errorMessage.css';

export function ErrorMessage() {
   return (
      <>
         <img src={img} alt='error'></img>
         <span>Something went wrong</span>
      </>
   )
}