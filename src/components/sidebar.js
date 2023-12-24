import React, { useContext, useState } from "react";
import "./sidebar.css";
import logo from "../assets/images/logo.png";
import CrossD from "../assets/images/cross-dark.png";
import CrossL from "../assets/images/cross-light.png";
import FolderLight from "../assets/images/folder-light.png";
import FolderDark from "../assets/images/folder-dark.png";

// import { globalContext } from "../App";
import { GlobalContext } from "../context/GlobalContext";

export function Sidebar() {
  const { theme, toggleSidebar, sidebarOpen } = useContext(GlobalContext);
  // const { theme, toggleSidebar, sidebarOpen } = useContext(globalContext);

  return (
    <div
      className={sidebarOpen ? "sidebar sidebarRes" : "sidebar sidebarNotRes"}
    >
      <div className="sidebar-top">
        <div className="sidebar-title">
          <img className="sidebar-brand-img" src={logo} alt="" />
          <h1 className="sidebar-brand-name">Terroni</h1>
        </div>
        <div className="sidebar-close" onClick={toggleSidebar}>
          <img src={theme === "light" ? CrossL : CrossD} />
        </div>
      </div>

      <ul className="sidebar-list">
        <li className="sidebar-list-item">
          <img
            className="icon"
            src={theme === "light" ? FolderLight : FolderDark}
            alt=""
          />
          <a className="sidebar-item-name">Content Manager</a>
        </li>

        <li className="sidebar-list-item">
          <img
            className="icon"
            src={theme === "light" ? FolderLight : FolderDark}
            alt=""
          />
          <a className="sidebar-item-name">Pitch Manager</a>
        </li>

        <li className="sidebar-list-item">
          <img
            className="icon"
            src={theme === "light" ? FolderLight : FolderDark}
            alt=""
          />
          <a className="sidebar-item-name">Tag Manager</a>
        </li>

        <li className="sidebar-list-item">
          <img
            className="icon"
            src={theme === "light" ? FolderLight : FolderDark}
            alt=""
          />
          <a className="sidebar-item-name">About</a>
        </li>
      </ul>
    </div>
  );
}
