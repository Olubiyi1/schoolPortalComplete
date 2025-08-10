import React from "react";

type ButtonProps = {
  style?: React.CSSProperties;
  children: React.ReactNode;
};
export const Button = ({ style, children }: ButtonProps) => {
  return <button style={style}>{children}</button>
};
