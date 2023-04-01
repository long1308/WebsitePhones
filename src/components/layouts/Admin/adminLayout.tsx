import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../../../partials/Admin/Header";
import Sideber from "../../../partials/Admin/Sideber";

type Props = {};

const AdminLayout = (props: Props) => {
  return (
    <div>
      <aside></aside>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
