import React from "react";
import { TrashIcon } from "@heroicons/react/24/solid";
import {
  validateItemCount,
  validateItemName,
  validateItemPrice,
} from "../functions/createInvoiceValidator";

function AddItem({
  itemDetails,
  setItem,
  isValidatorActive,
  onDelete,
  handelOnChange,
}) {
  const inputClass = (isValid) =>
    `dark:bg-[#1e2139] py-2 px-4 border-[.2px] rounded-lg focus:outline-purple-400 border-gray-300 focus:outline-none max-w-full dark:border-gray-800 ${
      isValidatorActive && !isValid
        ? "border-red-500 dark:border-red-500 outline-red-500 border-2"
        : ""
    }`;

  return (
    <div className="flex justify-between items-start dark:text-white">
      <div className="flex flex-wrap">
        <div className="flex px-2 py-2 flex-col items-start">
          <label htmlFor="name">Item Name</label>
          <input
            id="name"
            name="name"
            type="text"
            value={itemDetails.name}
            onChange={(e) => handelOnChange(itemDetails.id, e)}
            className={inputClass(validateItemName(itemDetails.name))}
          />
        </div>

        <div className="flex px-2 py-2 flex-col items-start">
          <label htmlFor="quantity">Qty.</label>
          <input
            id="quantity"
            name="quantity"
            type="number"
            min={0}
            value={itemDetails.quantity}
            onChange={(e) => handelOnChange(itemDetails.id, e)}
            className={`${inputClass(
              validateItemCount(itemDetails.quantity)
            )} max-w-[60px]`}
          />
        </div>

        <div className="flex px-2 py-2 flex-col items-start">
          <label htmlFor="price">Price</label>
          <input
            id="price"
            name="price"
            type="number"
            min={0}
            value={itemDetails.price}
            onChange={(e) => handelOnChange(itemDetails.id, e)}
            className={`${inputClass(
              validateItemPrice(itemDetails.price)
            )} max-w-[100px]`}
          />
        </div>

        <div className="flex px-2 py-2 flex-col items-start">
          <label>Total</label>
          <div className="max-w-[100px] dark:bg-[#1e2139] py-2 px-4 border-[.2px] rounded-lg border-gray-300 dark:border-gray-800 dark:text-white">
            {itemDetails.total}
          </div>
        </div>
      </div>

      <button onClick={() => onDelete(itemDetails.id)} className="mt-6">
        <TrashIcon className="text-gray-500 hover:text-red-500 cursor-pointer h-6 w-6" />
      </button>
    </div>
  );
}

export default AddItem;
