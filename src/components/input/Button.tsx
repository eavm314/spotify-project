"use client"
import { MouseEventHandler, ReactNode } from "react";

interface Props {
  children: ReactNode;
  action?: MouseEventHandler;
}

export const Button = ({ children, action }: Props) => {
  return (
    <button 
      className="bg-green-400 px-4 py-2"
      onClick={action}
      type="button" 
    >
      {children}
    </button>
  )
}
