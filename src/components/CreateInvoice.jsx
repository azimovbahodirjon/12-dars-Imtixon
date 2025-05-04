import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import AddItem from "./AddItem";
import invoiceSlice from "../app/invoiceSlice";
import {
  validateSenderStreetAddress,
  validateSenderPostCode,
  validateSenderCity,
  validateCLientEmail,
  validateCLientName,
  validateClientCity,
  validateClientPostCode,
  validateClientStreetAddress,
  validateItemCount,
  validateItemName,
  validateItemPrice,
  validateSenderCountry,
  validateClientCountry,
} from "../functions/createInvoiceValidator";

function CreateInvoice({
  openCreateInvoice,
  setOpenCreateInvoice,
  invoice,
  type,
}) {
  const dispatch = useDispatch();
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [isValidatorActive, setIsValidatorActive] = useState(false);
  const [filterValue, setFilterValue] = useState("");
  const deliveryTimes = [
    { text: "Next 1 day", value: 1 },
    { text: "Next 7 days", value: 7 },
    { text: "Next 14 days", value: 14 },
    { text: "Next 30 days", value: 30 },
  ];
  const [senderStreet, setSenderStreet] = useState("");
  const [senderCity, setSenderCity] = useState("");
  const [senderPostCode, setSenderPostCode] = useState("");
  const [senderCountry, setSenderCountry] = useState("");
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientStreet, setClientStreet] = useState("");
  const [clientCity, setClientCity] = useState("");
  const [clientPostCode, setClientPostCode] = useState("");
  const [clientCountry, setClientCountry] = useState("");
  const [description, setDescription] = useState("");
  const [selectDeliveryDate, setSelectDeliveryDate] = useState("");
  const [paymentTerms, setPaymentTerms] = useState(deliveryTimes[0].value);
  const [items, setItems] = useState([
    {
      name: "",
      quantity: 1,
      price: 0,
      total: 0,
      id: uuidv4(),
    },
  ]);

  useEffect(() => {
    if (type === "edit" && isFirstLoad && invoice) {
      const updatedItemsArray = invoice.items.map((obj) => ({
        ...obj,
        id: uuidv4(),
      }));
      setClientName(invoice.clientName);
      setClientCity(invoice.clientAddress.city);
      setClientStreet(invoice.clientAddress.street);
      setClientPostCode(invoice.clientAddress.postCode);
      setClientCountry(invoice.clientAddress.country);
      setClientEmail(invoice.clientEmail);
      setPaymentTerms(invoice.paymentTerms);
      setDescription(invoice.description);
      setSenderCity(invoice.senderAddress.city);
      setSenderStreet(invoice.senderAddress.street);
      setSenderCountry(invoice.senderAddress.country);
      setSenderPostCode(invoice.senderAddress.postCode);
      setItems(updatedItemsArray);
      setIsFirstLoad(false);
    }
  }, [type, isFirstLoad, invoice]);

  const onDelete = (id) => {
    setItems((prevState) => prevState.filter((el) => el.id !== id));
  };

  const handleOnChange = (id, e) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? {
              ...item,
              [e.target.name]:
                e.target.name === "quantity" || e.target.name === "price"
                  ? Number(e.target.value)
                  : e.target.value,
              total:
                e.target.name === "quantity" || e.target.name === "price"
                  ? Number(
                      (e.target.name === "quantity"
                        ? Number(e.target.value)
                        : item.quantity) *
                        (e.target.name === "price"
                          ? Number(e.target.value)
                          : item.price)
                    ).toFixed(2)
                  : item.total,
            }
          : item
      )
    );
  };

  const itemsValidator = () => {
    return items.every(
      (item) =>
        validateItemName(item.name) &&
        validateItemCount(item.quantity) &&
        validateItemPrice(item.price)
    );
  };

  const validator = () => {
    return (
      validateSenderStreetAddress(senderStreet) &&
      validateSenderPostCode(senderPostCode) &&
      validateSenderCity(senderCity) &&
      validateCLientEmail(clientEmail) &&
      validateCLientName(clientName) &&
      validateClientCity(clientCity) &&
      validateClientPostCode(clientPostCode) &&
      validateClientStreetAddress(clientStreet) &&
      validateSenderCountry(senderCountry) &&
      validateClientCountry(clientCountry) &&
      itemsValidator()
    );
  };

  const onSubmit = () => {
    const payload = {
      description,
      paymentTerms,
      clientName,
      clientEmail,
      senderStreet,
      senderCity,
      senderPostCode,
      senderCountry,
      clientStreet,
      clientCity,
      clientPostCode,
      clientCountry,
      items,
      ...(type === "edit" && { id: invoice.id }),
    };

    if (type === "edit") {
      dispatch(invoiceSlice.actions.editInvoice(payload));
      setOpenCreateInvoice(false);
    } else {
      dispatch(invoiceSlice.actions.addInvoice(payload));
      dispatch(invoiceSlice.actions.filterInvoice({ status: filterValue }));
      setOpenCreateInvoice(false);
    }
  };

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          setOpenCreateInvoice(false);
        }
      }}
      className="fixed inset-0 bg-[#000005be]"
    >
      <motion.div
        initial={{ x: -500, opacity: 0 }}
        animate={{
          opacity: 1,
          x: 0,
          transition: { type: "spring", stiffness: 300, damping: 40 },
        }}
        exit={{ x: -700, transition: { duration: 0.2 } }}
        className="flex flex-col dark:text-white dark:bg-[#141625] bg-white md:pl-[150px] py-16 px-6 h-screen md:w-[768px] md:rounded-r-3xl overflow-y-auto"
      >
        <h1 className="font-semibold dark:text-white text-3xl">
          {type === "edit" ? "Edit" : "Create"} Invoice
        </h1>
        <div className="my-14">
          <h2 className="text-[#7c5dfa] mb-4 font-medium">Bill From</h2>
          <div className="grid grid-cols-3 mx-1 space-y-4">
            <div className="flex flex-col col-span-3">
              <label className="text-gray-400 font-light">Street Address</label>
              <input
                value={senderStreet}
                onChange={(e) => setSenderStreet(e.target.value)}
                type="text"
                className={`dark:bg-[#1e2139] py-2 px-4 border-[0.2px] rounded-lg focus:outline-purple-400 border-gray-300 dark:border-gray-800 ${
                  isValidatorActive &&
                  !validateSenderStreetAddress(senderStreet) &&
                  "border-red-500 dark:border-red-500 border-2"
                }`}
              />
            </div>
            <div className="flex flex-col mr-4 col-span-1">
              <label className="text-gray-400 font-light">City</label>
              <input
                type="text"
                value={senderCity}
                onChange={(e) => setSenderCity(e.target.value)}
                className={`dark:bg-[#1e2139] py-2 px-4 border-[0.2px] rounded-lg focus:outline-purple-400 border-gray-300 dark:border-gray-800 ${
                  isValidatorActive &&
                  !validateSenderCity(senderCity) &&
                  "border-red-500 dark:border-red-500 border-2"
                }`}
              />
            </div>
            <div className="flex flex-col mr-4 col-span-1">
              <label className="text-gray-400 font-light">Post Code</label>
              <input
                type="text"
                value={senderPostCode}
                onChange={(e) => setSenderPostCode(e.target.value)}
                className={`dark:bg-[#1e2139] py-2 px-4 border-[0.2px] rounded-lg focus:outline-purple-400 border-gray-300 dark:border-gray-800 ${
                  isValidatorActive &&
                  !validateSenderPostCode(senderPostCode) &&
                  "border-red-500 dark:border-red-500 border-2"
                }`}
              />
            </div>
            <div className="flex flex-col col-span-1">
              <label className="text-gray-400 font-light">Country</label>
              <input
                type="text"
                value={senderCountry}
                onChange={(e) => setSenderCountry(e.target.value)}
                className={`dark:bg-[#1e2139] py-2 px-4 border-[0.2px] rounded-lg focus:outline-purple-400 border-gray-300 dark:border-gray-800 ${
                  isValidatorActive &&
                  !validateSenderCountry(senderCountry) &&
                  "border-red-500 dark:border-red-500 border-2"
                }`}
              />
            </div>
          </div>
          <h2 className="text-[#7c5dfa] my-4 mt-10 font-medium">Bill To</h2>
          <div className="grid grid-cols-3 mx-1 space-y-4">
            <div className="flex flex-col col-span-3">
              <label className="text-gray-400 font-light">Client Name</label>
              <input
                type="text"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                className={`dark:bg-[#1e2139] py-2 px-4 border-[0.2px] rounded-lg focus:outline-purple-400 border-gray-300 dark:border-gray-800 ${
                  isValidatorActive &&
                  !validateCLientName(clientName) &&
                  "border-red-500 dark:border-red-500 border-2"
                }`}
              />
            </div>
            <div className="flex flex-col col-span-3">
              <label className="text-gray-400 font-light">Client Email</label>
              <input
                type="text"
                value={clientEmail}
                onChange={(e) => setClientEmail(e.target.value)}
                className={`dark:bg-[#1e2139] py-2 px-4 border-[0.2px] rounded-lg focus:outline-purple-400 border-gray-300 dark:border-gray-800 ${
                  isValidatorActive &&
                  !validateCLientEmail(clientEmail) &&
                  "border-red-500 dark:border-red-500 border-2"
                }`}
              />
            </div>
            <div className="flex flex-col col-span-3">
              <label className="text-gray-400 font-light">Street Address</label>
              <input
                type="text"
                value={clientStreet}
                onChange={(e) => setClientStreet(e.target.value)}
                className={`dark:bg-[#1e2139] py-2 px-4 border-[0.2px] rounded-lg focus:outline-purple-400 border-gray-300 dark:border-gray-800 ${
                  isValidatorActive &&
                  !validateClientStreetAddress(clientStreet) &&
                  "border-red-500 dark:border-red-500 border-2"
                }`}
              />
            </div>
            <div className="flex flex-col mr-4 col-span-1">
              <label className="text-gray-400 font-light">City</label>
              <input
                type="text"
                value={clientCity}
                onChange={(e) => setClientCity(e.target.value)}
                className={`dark:bg-[#1e2139] py-2 px-4 border-[0.2px] rounded-lg focus:outline-purple-400 border-gray-300 dark:border-gray-800 ${
                  isValidatorActive &&
                  !validateClientCity(clientCity) &&
                  "border-red-500 dark:border-red-500 border-2"
                }`}
              />
            </div>
            <div className="flex flex-col mr-4 col-span-1">
              <label className="text-gray-400 font-light">Post Code</label>
              <input
                type="text"
                value={clientPostCode}
                onChange={(e) => setClientPostCode(e.target.value)}
                className={`dark:bg-[#1e2139] py-2 px-4 border-[0.2px] rounded-lg focus:outline-purple-400 border-gray-300 dark:border-gray-800 ${
                  isValidatorActive &&
                  !validateClientPostCode(clientPostCode) &&
                  "border-red-500 dark:border-red-500 border-2"
                }`}
              />
            </div>
            <div className="flex flex-col col-span-1">
              <label className="text-gray-400 font-light">Country</label>
              <input
                type="text"
                value={clientCountry}
                onChange={(e) => setClientCountry(e.target.value)}
                className={`dark:bg-[#1e2139] py-2 px-4 border-[0.2px] rounded-lg focus:outline-purple-400 border-gray-300 dark:border-gray-800 ${
                  isValidatorActive &&
                  !validateClientCountry(clientCountry) &&
                  "border-red-500 dark:border-red-500 border-2"
                }`}
              />
            </div>
          </div>
          <div className="grid mx-1 grid-cols-2 mt-8">
            <div className="flex flex-col">
              <label className="text-gray-400 font-light">Invoice Date</label>
              <input
                type="date"
                value={selectDeliveryDate}
                onChange={(e) => setSelectDeliveryDate(e.target.value)}
                className="dark:bg-[#1e2139] py-2 px-4 border-[0.2px] rounded-lg focus:outline-purple-400 border-gray-300 dark:border-gray-800 dark:text-white mr-4"
              />
            </div>
            <div className="w-full">
              <label className="text-gray-400 font-light">Payment Terms</label>
              <select
                value={paymentTerms}
                onChange={(e) => setPaymentTerms(e.target.value)}
                className="appearance-none w-full py-2 px-4 border-[0.2px] rounded-lg dark:bg-[#1e2139] dark:text-white dark:border-gray-800 focus:outline-purple-400 border-gray-300"
              >
                {deliveryTimes.map((time) => (
                  <option key={time.value} value={time.value}>
                    {time.text}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="mx-1 mt-4 flex flex-col">
            <label className="text-gray-400 font-light">Description</label>
            <input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              type="text"
              className="dark:bg-[#1e2139] py-2 px-4 border-[0.2px] rounded-lg focus:outline-purple-400 border-gray-300 dark:border-gray-800 dark:text-white"
            />
          </div>
          <h2 className="text-2xl text-gray-500 mt-10">Item List</h2>
          {items.map((itemDetails) => (
            <div
              key={itemDetails.id}
              className="border-b pb-2 border-gray-300 mb-4"
            >
              <AddItem
                isValidatorActive={isValidatorActive}
                handleOnChange={handleOnChange}
                setItems={setItems}
                onDelete={onDelete}
                itemDetails={itemDetails}
              />
            </div>
          ))}
          <button
            onClick={() =>
              setItems((prev) => [
                ...prev,
                {
                  name: "",
                  quantity: 1,
                  price: 0,
                  total: 0,
                  id: uuidv4(),
                },
              ])
            }
            className="bg-gray-200 hover:opacity-80 py-2 dark:text-white dark:bg-[#252945] rounded-xl w-full mt-6"
          >
            + Add New Item
          </button>
        </div>
        <div className="flex justify-between">
          <button
            onClick={() => setOpenCreateInvoice(false)}
            className="bg-gray-200 hover:opacity-80 py-4 dark:text-white dark:bg-[#252945] px-8 rounded-full"
          >
            Discard
          </button>
          <button
            className="text-white hover:opacity-80 py-4 bg-[#7c5dfa] px-8 rounded-full"
            onClick={() => {
              setIsValidatorActive(true);
              if (validator()) {
                onSubmit();
              }
            }}
          >
            Save & Send
          </button>
        </div>
      </motion.div>
    </div>
  );
}

export default CreateInvoice;
