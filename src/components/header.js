import React, { useState } from "react";
import "./header.css";
import moon from "../assets/images/moon.png";
import user from "../assets/images/user.png";
import sun from "../assets/images/sun.png";
import dropDownLight from "../assets/images/dropdown-light.png";
import dropDownDark from "../assets/images/dropdown-dark.png";
import menuDark from "../assets/images/menu-dark.png";
import menuLight from "../assets/images/menu-light.png";
import { contentData } from "../assets/data.js"; // Import the data
import { useContext } from "react";
// import { globalContext } from "../App";
import { GlobalContext } from "../context/GlobalContext.js";

export function Header() {
  const {
    toggleTheme,
    theme,
    setSortOption,
    setOrder,
    order,
    sortOption,
    setViewer_id,
    setFolder_id,
    toggleSidebar,
    viewer_id,
    contentSelected,
    setRenameModalOpen, // function to trigger rename modal to open inside content
  } = useContext(GlobalContext);
  // } = useContext(globalContext);

  const [viewerIdInput, setViewerIdInput] = useState("");
  const [folderIdInput, setFolderIdInput] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // ----------------------------------------------------implementation-------------------------------

  // ----------------------------------------------------implementation-------------------------------

  // Function to find viewer's name based on viewer_id
  const findViewerName = () => {
    const viewer = contentData.find((user) => user.id === viewer_id);
    return viewer ? viewer.name : "";
  };

  // Handler function for the onChange event for sorting
  const handleSelectChangeSort = (event) => {
    setOrder(event.target.value);
  };

  // Handler function for the onChange event for filtering
  const handleSelectChangeFilter = (event) => {
    setSortOption(event.target.value);
  };

  // Handler function for the input field change (Viewer Id)
  const handleViewerIdChange = (event) => {
    setViewerIdInput(event.target.value);
  };

  // Handler function for the input field change (Folder Id)
  const handleFolderIdChange = (event) => {
    setFolderIdInput(event.target.value);
  };

  // Handler function for the "Switch User" button click
  const handleSwitchUser = () => {
    // Use the values stored in the state variables
    setViewer_id(viewerIdInput);
    setFolder_id(folderIdInput);
    // Add any additional logic or actions you need
    handleDropDown();
  };

  // Handler function for the dropdown toggle
  const handleDropDown = () => {
    setDropdownOpen((prevState) => !prevState);
  };

  const handleCancelUser = () => {
    // Use the values stored in the state variables
    handleDropDown();
    // Add any additional logic or actions you need
  };

  const name = findViewerName();
  // console.log("Viewer's name", name);

  const path = "Root > Marketing > 2023 > Gated Content";
  return (
    <div className="header-box">
      <div className="header">
        <div className="header-slidebar-btn" onClick={toggleSidebar}>
          <img src={theme === "light" ? menuLight : menuDark} />
        </div>
        <div className="header-left">
          <p className="rev-txt">RevSpire Enablement</p>
          <div className="header-left-searchbox">
            <input
              className="search-input"
              type="text"
              placeholder="            Hinted search text"
            />
          </div>
        </div>
        <div className="header-btn">
          <img
            src={theme === "light" ? moon : sun}
            alt="Theme Toggle"
            onClick={toggleTheme}
          />
        </div>

        <div className="header-profile">
          <div className="profile-btn">
            <div className="profile-btn-left">
              <img src={user} alt="User" />
              <p>{name ? name : "Anirudh Krishnan"}</p>
            </div>
            <div
              className="profile-btn-right"
              onMouseEnter={() => {
                handleDropDown();
              }}
            >
              <img src={theme === "light" ? dropDownDark : dropDownLight} />
            </div>
          </div>
          <div
            className={dropdownOpen ? "dropdown-body" : "dropdown-body-close"}
          >
            <ul className="dropdown-ul">
              <li className="dropdown-li dropdown-li-F ">
                <input
                  type="text"
                  placeholder="Viewer id"
                  onChange={handleViewerIdChange}
                />
              </li>
              <li className="dropdown-li">
                <input
                  type="text"
                  placeholder="Folder id"
                  onChange={handleFolderIdChange}
                />
              </li>
              <li className="dropdown-li dropdown-li-btns">
                <button onClick={handleSwitchUser} className="dropdown-btn">
                  Switch User
                </button>
                <button onClick={handleCancelUser} className="dropdown-btn">
                  Close
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Button group to do operations on content */}
      <div className="">
        {!contentSelected && (
          <div className="action__btn_container">
            <button className="action__btn">Add</button>
          </div>
        )}
        {contentSelected ? (
          <div className="action__btn_container">
            {contentSelected === 1 ? (
              <button
                onClick={() => setRenameModalOpen(true)}
                className="action__btn"
              >
                Rename
              </button>
            ) : (
              ""
            )}
            <button className="action__btn">Move</button>
            <button className="action__btn">Copy</button>
            <button className="action__btn">Download</button>
            <button className="action__btn">Delete</button>
          </div>
        ) : (
          ""
        )}
      </div>

      <div className="header-2">
        <div className="header2-path">
          <p>{path}</p>
        </div>
        <div className="header2-dropdowns">
          <div className="header-2-sort">
            <select
              className="header2-select"
              value={order}
              // value="tempvalue"
              onChange={handleSelectChangeSort}
            >
              <option value="" disabled hidden>
                Sort
              </option>
              <option value="ASC" className="header2-options">
                ASC
              </option>
              <option value="DESC" className="header2-options">
                DESC
              </option>
            </select>
          </div>

          <div className="header-2-filter">
            <select
              className="header2-select"
              value={sortOption}
              onChange={handleSelectChangeFilter}
            >
              <option value="" disabled hidden>
                Filter
              </option>
              <option value="name" className="header2-options">
                Name
              </option>
              <option value="updated_at" className="header2-options">
                Modified
              </option>
              <option value="created_at" className="header2-options">
                Created
              </option>
              <option value="id" className="header2-options">
                ID
              </option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
