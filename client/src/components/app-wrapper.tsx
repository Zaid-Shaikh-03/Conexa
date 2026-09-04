import type React from "react";
import AsideBar from "./aside-bar";

interface Props {
  children: React.ReactNode;
}

const AppWrapper = ({ children }: Props) => {
  return (
    <div className="h-full">
      {/*Toolbar*/}
      <AsideBar />
      <main className="lg:pl-10 h-full">{children}</main>
    </div>
  );
};

export default AppWrapper;
