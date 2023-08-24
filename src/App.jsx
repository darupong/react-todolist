/* eslint-disable no-unused-vars */
import { useState } from "react";
import "./App.css";
import { Input } from "antd";
import List from "./components/List";
import { useEffect } from "react";
import { Button, Form, message, Modal } from "antd";

const getLocalStorage = () => {
  let list = localStorage.getItem("list");
  if (list) {
    return (list = JSON.parse(localStorage.getItem("list")));
  } else {
    return [];
  }
};

function App() {
  const [form] = Form.useForm();
  const [name, setName] = useState("");
  const [list, setList] = useState(getLocalStorage());
  const [isEdit, setIsEdit] = useState(false);
  const [editID, setEditID] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);

  const handleSubmit = (e) => {
    // e.preventDefault();
    if (!name) {
      message.error("Please enter the value");
    } else if (name && isEdit) {
      setList(
        list.map((item) => {
          if (item.id === editID) {
            return { ...item, title: name };
          }
          return item;
        })
      );
      setName("");
      setEditID(null);
      setIsEdit(false);
      message.success("Value is Change");
    } else {
      const newItem = { id: new Date().getTime().toString(), title: name };
      setList([...list, newItem]);
      setName("");
      message.success("Item add to list");
    }
  };

  const removeItem = (id) => {
    setList(list.filter((item) => item.id !== id));
    message.success("Item is remove");
  };
  const editItem = (id) => {
    const editItem = list.find((item) => item.id === id);
    setIsEdit(true);
    setEditID(id);
    setName(editItem.title);
  };

  const clearList = () => {
    setList([]);
    message.warning("Empty list");
  };

  const checkItem = (id) => {
    setList((prevList) => {
      const checkList = prevList.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      );
      return checkList;
    });
  };

  return (
    <>
      <div className="mx-auto container pt-10">
        <div className="flex justify-center items-center bg-gray-200">
          <div className="w-full px-10 py-10">
            <p className="text-center font-bold pb-5 text-4xl">
              Todo List with Local Storage
            </p>
            <Form
              layout="inline"
              onFinish={handleSubmit}
              className="flex justify-center"
            >
              <Form.Item>
                <Input
                  type="text"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                />
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="btn btn-success bg-blue-600"
                >
                  {isEdit ? "Edit" : "Submit"}
                </Button>
              </Form.Item>
            </Form>

            {list.length > 0 && (
              <>
                <div>
                  <List
                    items={list}
                    removeItem={removeItem}
                    editItem={editItem}
                    checked={checkItem}
                  />
                  <div className=" text-center">
                    <Button className="btn" danger onClick={showModal}>
                      Clear All
                    </Button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <Modal
        title="Are you sure to delete this all value?"
        open={isModalOpen}
        closable={false}
        footer={[
          <Button key="1" onClick={closeModal}>
            Cancel
          </Button>,
          <Button
            key="2"
            className="btn"
            danger
            onClick={() => {
              clearList(), closeModal();
            }}
          >
            Delete All
          </Button>,
        ]}
      >
        <p>All value will be delete!</p>
      </Modal>
    </>
  );
}

export default App;
