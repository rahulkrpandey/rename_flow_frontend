import React, { Children, useState } from "react";
import { GlobalContext } from "./GlobalContext";
import { contentData } from "../assets/data";

const GlobalState = ({ children }) => {
  const [theme, _setTheme] = useState("light");
  const [order, _setOrder] = useState("");
  const [sortOption, _setSortOption] = useState("");
  const [viewer_id, _setViewer_id] = useState(contentData[3].id); // "IGH141585754362"
  const [viewer_name, setViewer_name] = useState(contentData[3].name); // "IGH141585754362"
  const [folder_id, _setFolder_id] = useState("");
  const [sidebarOpen, _setSidebarOpen] = useState(false);
  const [contentSelected, setContentSelected] = useState(0);
  const [renameModalOpen, setRenameModalOpen] = useState(false);

  const setViewer_id = (viewer_id) => {
    _setViewer_id(viewer_id);
  };

  const setFolder_id = (folder_id) => {
    _setFolder_id(folder_id);
  };

  const toggleSidebar = () => {
    _setSidebarOpen((toggle) => !toggle);
  };

  const toggleTheme = () => {
    _setTheme((theme) => (theme === "light" ? "dark" : "light"));
  };

  const setSortOption = (optionValue) => {
    _setSortOption(optionValue);
  };

  const setOrder = (order) => {
    _setOrder(order);
  };

  return (
    <GlobalContext.Provider
      value={{
        theme,
        order,
        sortOption,
        viewer_id,
        viewer_name,
        folder_id,
        sidebarOpen,
        setViewer_id,
        setViewer_name,
        setFolder_id,
        toggleSidebar,
        toggleTheme,
        setSortOption,
        setOrder,
        contentSelected,
        setContentSelected,
        renameModalOpen,
        setRenameModalOpen,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalState;
