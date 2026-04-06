import type React from "react";

interface Props {
  children: React.ReactNode;
}

const AppWrapper = ({ children }: Props) => {
  return (
    <div className="h-full">
      {/*Toolbar*/}
      <main className="h-full">{children}</main>
    </div>
  );
};

export default AppWrapper;
