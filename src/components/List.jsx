/* eslint-disable react/prop-types */
import React from "react";
import { Button, Divider, Checkbox } from "antd";

const List = ({ items, removeItem, editItem, checked }) => {
  return (
    <div className=" container ">
      {items.map((item) => {
        const { id, title, checked: isChecked } = item;
        return (
          <ul className="list-none" key={id}>
            {/* <li className=" ">{title}</li> */}
            <div className="flex flex-row justify-between items-center">
              <div className="flex flex-row gap-3">
                <Checkbox checked={isChecked} onChange={() => checked(id)} />
                <li className=" ">{title}</li>
              </div>
              <div className="gap-3 flex flex-row">
                <div>
                  <Button
                    type="primary"
                    className="bg-blue-600"
                    onClick={() => editItem(id)}
                  >
                    Edit
                  </Button>
                </div>
                <div>
                  <Button danger onClick={() => removeItem(id)}>
                    Remove
                  </Button>
                </div>
              </div>
            </div>
            <Divider className="my-2" />
          </ul>
        );
      })}
    </div>
  );
};

export default List;
