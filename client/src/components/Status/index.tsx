import React from "react";
import "./style.css";

interface Props {
  children: React.ReactNode;
}

const Status = ({ children }: Props) => {
  return <div className="loading">{children}</div>;
};

export default Status;
