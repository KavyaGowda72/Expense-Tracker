import React, { useEffect } from "react";
import { useState } from "react";
import "../Styles/Expense.css";

const getAllItems = () => {
  const list = localStorage.getItem("lists");
  // console.log(list);

  if (list) {
    return JSON.parse(localStorage.getItem("lists"));
  } else {
    return [];
  }
};
getAllItems();

const ExpenseTracker = () => {
  const [items, setItems] = useState(getAllItems());
  const [itemName, setItemName] = useState("");
  const [itemAmt, setIteAmt] = useState("");
  const [expense, setExpense] = useState(0);

  const onItemChange = (event) => {
    setItemName(event.target.value);
  };

  const onAmountChange = (event) => {
    setIteAmt(event.target.value);
  };
  const addItem = () => {
    if (itemName.trim() && itemAmt.trim() !== "") {
      const newItems = { name: itemName, amount: itemAmt };
      setItems((t) => [...t, newItems]);
      setItemName("");
      setIteAmt("");
    }
  };

  const clearItems = () => {
    setItems([]);
  };

  useEffect(() => {
    localStorage.setItem("lists", JSON.stringify(items));
  }, [items]);

  return (
    <>
      <div className="container">
        <div className="heading">
          <h1>Expense Tracker</h1>
        </div>

        <div>
          <label className="label" htmlFor="itemName">
            Item Name :{" "}
          </label>
          {/* <LableComponent name="Item Name: " /> */}

          <input
            className="input"
            type="text"
            value={itemName}
            onChange={onItemChange}
            placeholder="Enter Item Name..."
          />
        </div>
        <div>
          <label className="label" htmlFor="itemAmount">
            Item Amount :{" "}
          </label>
          <input
            className="input"
            type="number"
            value={itemAmt}
            onChange={onAmountChange}
            placeholder="Enter Amount..."
          />
        </div>
        <div className="btn">
          <button className="btn-add" onClick={addItem}>
            Add Item
          </button>
          <button className="btn-clear" onClick={clearItems}>
            Clear All
          </button>
        </div>
        <div className="list">
          <ol>
            {items.map((item, index) => (
              <li key={index}>
                <span className="list-item">
                  {` ${item.name}  :  ₹
                  ${item.amount}`}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </>
  );
};

export default ExpenseTracker;
