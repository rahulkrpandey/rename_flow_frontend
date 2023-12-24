import "./App.css";
import { Sidebar } from "./components/sidebar";
import { Header } from "./components/header";
// import { Content } from "./components/content";
import Content from "./components/content";
// import { createContext } from "react";
import "./variables.css";
import GlobalState from "./context/GlobalState";

/*    toggleTheme,
    theme,
    setSortOption,
    setOrder,
    order,
    sortOption,
    setViewer_id,
    setFolder_id,
    toggleSidebar,
    viewer_id,
 theme, toggleSidebar, sidebarOpen 
*/

function App() {
  return (
    // <globalContext.Provider value={context}>
    <GlobalState>
      <div className="app-container">
        <Sidebar />
        <div className="content-container">
          <Header />
          <Content />
        </div>
      </div>
    </GlobalState>
    // </globalContext.Provider>
  );
}

export default App;
