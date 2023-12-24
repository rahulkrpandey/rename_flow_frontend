import React, { useEffect, useState, useContext, memo, useRef } from "react";
import { GlobalContext } from "../context/GlobalContext";
import "./content.css";
import Toast from "./toast";
import axios from "axios";

const BASE_URL = "http://localhost:5000";

const Content = () => {
  //-----------------------------states and variables---------------------------------------------

  // All the rows including files and folders
  const [contents, setContents] = useState([
    {
      id: "id",
      name: "rahul",
      tags: ["tagA, tagB"],
      source: "local",
      createdBy: "",
      createdDate: "",
      modidiedBy: "",
      modifiedDate: "",
      size: "",
    },

    {
      id: "id2",
      name: "rahul",
      tags: ["tagA, tagB"],
      source: "local",
      createdBy: "",
      createdDate: "",
      modidiedBy: "",
      modifiedDate: "",
      size: "",
    },

    {
      id: "id3",
      name: "rahul",
      tags: ["tagA, tagB"],
      source: "local",
      createdBy: "",
      createdDate: "",
      modidiedBy: "",
      modifiedDate: "",
      size: "",
    },

    {
      id: "id4",
      name: "rahul",
      tags: ["tagA, tagB"],
      source: "local",
      createdBy: "",
      createdDate: "",
      modidiedBy: "",
      modifiedDate: "",
      size: "",
    },
  ]);

  // List of selected items for operations e.g, rename or delete etc
  const [selectedItems, setSelectedItems] = useState([]);
  const {
    setContentSelected,
    renameModalOpen,
    setRenameModalOpen,
    viewer_id,
    viewer_name,
    folder_id,
  } = useContext(GlobalContext);
  const renameInputRef = useRef(null);
  const [headerSelect, setHeaderSelect] = useState(false);
  const toastRef = useRef();
  // const folder_id = "WRS979112806709";

  // Can be taken from global context or as prop

  //   ------------------------------functions-------------------------------------------------------
  // function to simulate fetch from database
  const fetchEmulator = async (endpoint, id, name) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({ status: "Successfully renamed", id, name });
      }, 500);
    });
  };

  // function to rename files and folders
  const renameFilesAndFolders = async () => {
    if (renameInputRef.current === null) {
      console.log("not initialised");
      return;
    }

    const renameText = renameInputRef.current.value.trim();
    if (renameText.length === 0) {
      renameInputRef.current.style.borderColor = "red";
      return;
    }

    if (selectedItems.length !== 1) {
      console.log("Either no item is selected or multiple items are selected!");
      return;
    }

    const item = selectedItems[0];

    // renaming file or folder that is selected, inside a promise
    new Promise((resolve, reject) => {
      axios
        .post(`${BASE_URL}/get-table-name`, {
          record_id: item.id,
        })
        .then((res) => res.data.tablename)
        .then((tablename) => {
          if (tablename === "content") {
            return axios.patch(`${BASE_URL}/edit-content/${item.id}`, {
              updated_by: viewer_id,
              mimetype: item.mimetype,
              name: renameText,
            });
          } else {
            return axios.patch(`${BASE_URL}/edit-folder/${item.id}`, {
              updated_by: viewer_id,
              name: renameText,
              parent_folder: item.parent_folder,
            });
          }
        })
        .then((res) => {
          console.log("success", res);
          return resolve(res);
        })
        .catch((err) => {
          console.log("could not rename", item.id, err);
          return reject(err);
        });
    })
      .then((value) => {
        console.log("Success", value);
        const newContents = contents.map((content) => {
          const id = content.id;

          // The currDate could be retured by backend with response to avoid potential inconsistency
          const currDate = new Date();
          if (id === item.id) {
            content.name = renameText;
            console.log("viewer's name", viewer_name);
            content.updated_by = viewer_name;
            content.updated_at = `${currDate.getDate()}/${
              currDate.getMonth() + 1
            }/${currDate.getFullYear()}`;
          }
          return content;
        });

        setContents([...newContents]);
        toastRef.current.trigger("Rename Successfull", "success");
        // throw new Error("test")
      })
      .catch((err) => {
        console.log("Failure", err);
        toastRef.current.trigger(
          `${
            err?.response?.data?.message
              ? err.response.data.message
              : "Could not rename"
          }`,
          "failure"
        );
      })
      .finally(() => {
        setRenameModalOpen(false);
      });
  };

  //   ------------------------------useEffects-------------------------------------------------------

  // Changing a parameter in global context to dynamically renderring operation buttons
  useEffect(() => {
    const itemsSelectionChanged = () => {
      setContentSelected(selectedItems.length);
    };

    itemsSelectionChanged();
  }, [selectedItems]);

  // Unselecting all the rows after content is modified e.g renamed or copied etc
  useEffect(() => {
    console.log(contents);
    if (selectedItems.length > 0) {
      setSelectedItems([]);
    }

    if (headerSelect) {
      setHeaderSelect(false);
    }
  }, [contents]);

  // Populating data when component mounts
  useEffect(() => {
    const initialiseContent = async () => {
      try {
        const res = await axios.post(
          `${BASE_URL}/view-content-and-folders-sorted`,
          {
            viewer_id,
            folder_id,
          }
        );

        const contentArr = res.data.items;
        console.log(contentArr);
        setContents(
          contentArr.map((content) => {
            const creationDate = new Date(content.created_at);
            const updationDate = new Date(content.updated_at);

            const creationDateStr = `${creationDate.getDate()}/${
              creationDate.getMonth() + 1
            }/${creationDate.getFullYear()}`;

            const updationDateStr = `${updationDate.getDate()}/${
              updationDate.getMonth() + 1
            }/${updationDate.getFullYear()}`;

            return {
              ...content,
              tags: ["tag1"],
              size: "2mb",
              created_at: creationDateStr,
              updated_at: updationDateStr,
            };
          })
        );
      } catch (err) {
        console.log(err);
      }
    };

    initialiseContent();
  }, []);

  return (
    <div className="dashboard__content">
      {/* toast */}
      <Toast ref={toastRef} />

      {/* modal for change name */}
      {renameModalOpen && (
        <div className="content_modal">
          <div
            onClick={() => setRenameModalOpen(false)}
            className="content_modal_overlay"
          ></div>
          <form className="content_modal_content">
            <h1 className="content_modal_content_heading">Rename</h1>
            <h2 className="content_modal_content_sub_heading">Name:</h2>
            <input
              type="text"
              autoFocus
              onFocus={(e) => {
                e.target.style.borderColor = "black";
              }}
              ref={renameInputRef}
              className="content_modal_content_input"
            />
            <div className="content_modal_content_btn_gp">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  renameFilesAndFolders();
                }}
                className="content_modal_content_btn_save"
              >
                Save
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setRenameModalOpen(false);
                }}
                className="content_modal_content_btn_cancel"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Content table */}
      <table className="content__table">
        {/* table head */}
        <thead className="content__head">
          <tr className="content__head_row">
            <th style={{}}>
              <button
                onClick={() => {
                  if (selectedItems.length === contents.length) {
                    setHeaderSelect(false);
                    setSelectedItems([]);
                  } else {
                    setHeaderSelect(true);
                    setSelectedItems([...contents]);
                  }
                }}
                className={`content__item_select_btn ${
                  headerSelect
                    ? "content__item_select_btn_bg_selected"
                    : "content__item_select_btn_bg_default"
                }`}
              ></button>
            </th>
            <th>Name</th>
            <th></th>
            <th>Tags</th>
            <th>Source</th>
            <th>Created By</th>
            <th>Created Date</th>
            <th>Modified By</th>
            <th>Modified Date</th>
            <th>Size</th>
            <th></th>
          </tr>
        </thead>

        {/* table entries */}
        <tbody className="content__body">
          {contents.map((item) => (
            <tr key={item.id} className="content__body_row">
              <td>
                <button
                  onClick={() => {
                    let idx = -1;
                    selectedItems.forEach((item2, index) => {
                      if (item2.id === item.id) {
                        idx = index;
                      }
                    });
                    if (idx === -1) {
                      setSelectedItems((items) => [...items, item]);
                    } else {
                      setSelectedItems((items) =>
                        items.filter((item2) => item2.id !== item.id)
                      );
                    }
                  }}
                  className={`content__item_select_btn ${
                    selectedItems.reduce((idx, item2, index) => {
                      if (item2.id === item.id) {
                        idx = index;
                      }

                      return idx;
                    }, -1) !== -1
                      ? "content__item_select_btn_bg_selected"
                      : "content__item_select_btn_bg_default"
                  }`}
                ></button>
              </td>
              <td>{item.name}</td>
              <td>
                <button className="content__add_btn">
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8 2.75C8 2.47386 7.77614 2.25 7.5 2.25C7.22386 2.25 7 2.47386 7 2.75V7H2.75C2.47386 7 2.25 7.22386 2.25 7.5C2.25 7.77614 2.47386 8 2.75 8H7V12.25C7 12.5261 7.22386 12.75 7.5 12.75C7.77614 12.75 8 12.5261 8 12.25V8H12.25C12.5261 8 12.75 7.77614 12.75 7.5C12.75 7.22386 12.5261 7 12.25 7H8V2.75Z"
                      fill="white"
                      fillRule="evenodd"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </button>
              </td>
              <td>{item.tags.reduce((str, tag) => str + tag + ", ", "")}</td>
              <td>{item.source || item.parent_folder_name}</td>
              <td>{item.created_by}</td>
              <td>{item.created_at}</td>
              <td>{item.updated_by}</td>
              <td>{item.updated_at}</td>
              <td>{item.size}</td>
              <td>
                <button className="content__info_btn">
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.49991 0.876892C3.84222 0.876892 0.877075 3.84204 0.877075 7.49972C0.877075 11.1574 3.84222 14.1226 7.49991 14.1226C11.1576 14.1226 14.1227 11.1574 14.1227 7.49972C14.1227 3.84204 11.1576 0.876892 7.49991 0.876892ZM1.82707 7.49972C1.82707 4.36671 4.36689 1.82689 7.49991 1.82689C10.6329 1.82689 13.1727 4.36671 13.1727 7.49972C13.1727 10.6327 10.6329 13.1726 7.49991 13.1726C4.36689 13.1726 1.82707 10.6327 1.82707 7.49972ZM8.24992 4.49999C8.24992 4.9142 7.91413 5.24999 7.49992 5.24999C7.08571 5.24999 6.74992 4.9142 6.74992 4.49999C6.74992 4.08577 7.08571 3.74999 7.49992 3.74999C7.91413 3.74999 8.24992 4.08577 8.24992 4.49999ZM6.00003 5.99999H6.50003H7.50003C7.77618 5.99999 8.00003 6.22384 8.00003 6.49999V9.99999H8.50003H9.00003V11H8.50003H7.50003H6.50003H6.00003V9.99999H6.50003H7.00003V6.99999H6.50003H6.00003V5.99999Z"
                      fill="currentColor"
                      fillRule="evenodd"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default memo(Content);
