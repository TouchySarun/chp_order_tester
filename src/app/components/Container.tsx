import React from "react";

interface ContainerProps {
  children: React.ReactNode;
}

function Container({ children }: ContainerProps) {
  return <div className="flex flex-col min-h-screen">{children}</div>;
}

export default Container;
