import React from "react";
import Sidebar from "../components/Sidebar";

const MainLayout = ({ children }: any) => {
  return (
    <div className="w-full flex justify-between">
      <Sidebar />
      <div className="my-1 w-full mr-2 p-2 pt-1">{children}</div>
    </div>
  );
};

export default MainLayout;
