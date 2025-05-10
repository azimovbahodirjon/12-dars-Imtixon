import { useEffect, useState } from "react";
import useThemeStore from "../store/useThemeStore";
import { ChevronDown } from "lucide-react";
import { Toaster, toast } from "sonner";
import Trash from "../images/trash-can.svg";
import useAddStore from "../store/useAddStore";
import { useLocation } from "react-router-dom";

function EditInvoice({ add, onClose }) {
  const [item, setItem] = useState([]);
  const [defInvoice, setDefInvoice] = useState({});
  const [isClosing, setIsClosing] = useState(false);
  const [formData, setFormData] = useState({
    id: generateId(),
    senderStreet: "",
    senderCity: "",
    senderPostCode: "",
    senderCountry: "",
    clientName: "",
    clientEmail: "",
    clientStreet: "",
    clientCity: "",
    clientPostCode: "",
    clientCountry: "",
    invoiceDate: "",
    paymentTerms: "1",
    description: "",
  });
  const { invoices, updateInvoice } = useAddStore();
  const { theme } = useThemeStore();
  const location = useLocation();
  const invoice = location.state?.invoice;

  useEffect(() => {
    if (invoice) {
      const prevInvo = invoices.find((prev) => prev.id == invoice.id);
      if (prevInvo) {
        setDefInvoice(prevInvo);
        setFormData(prevInvo);
      }
    }
  }, [invoice, invoices]);

  function handleClose() {
    setIsClosing(true);
    setTimeout(onClose, 300);
  }

  const error = (text) => {
    toast.error(text);
  };

  useEffect(() => {
    if (add) {
      setIsClosing(false);
    }
  }, [add]);

  function generateId() {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numbers = "12345678910";
    let id = "";

    for (let i = 0; i < 6; i++) {
      if (Math.random() < 0.5) {
        id += letters[Math.floor(Math.random() * letters.length)];
      } else {
        id += numbers[Math.floor(Math.random() * numbers.length)];
      }
    }

    return id;
  }

  function handleDeleteItem(id) {
    setItem(item.filter((prev) => prev.id !== id));
  }

  function AddNewItem() {
    setItem([...item, { name: "", qty: "1", price: "", id: Date.now() }]);
  }

  function handleItemChange(id, field, value) {
    setItem((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? {
              ...item,
              [field]:
                field === "qty" || field === "price"
                  ? parseFloat(value) || 0
                  : value,
            }
          : item
      )
    );
  }

  function postInvoice() {
    const invoiceId = invoice ? invoice.id : generateId();

    const transformedData = {
      ...formData,
      id: invoiceId,
      items: item.map((itm) => ({
        ...itm,
        total: itm.qty * itm.price,
      })),
      total: item.reduce((sum, itm) => sum + itm.qty * itm.price, 0),
    };

    updateInvoice(invoiceId, transformedData);
    handleClose();
  }

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function getInputClass() {
    return `w-full p-4 rounded-lg border outline-none transition-colors ${
      theme === "dark"
        ? "bg-[#1E2139] border-[#252945] text-white focus:border-[#7C5DFA]"
        : "bg-white border-gray-200 text-gray-900 focus:border-[#7C5DFA]"
    }`;
  }

  function getLabelClass() {
    return `block mb-2 text-sm font-medium ${
      theme === "dark" ? "text-gray-300" : "text-[#7E88C3]"
    }`;
  }

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/50" onClick={handleClose} />
      <div
        className={`fixed left-0 top-0 h-full w-full md:w-[616px] lg:w-[720px] transform transition-all duration-300 ease-in-out
          ${!isClosing ? "translate-x-0" : "-translate-x-full"}
          ${theme === "dark" ? "bg-[#141625]" : "bg-white"}`}
      >
        <div className="h-full flex flex-col p-6 md:p-8">
          <h1
            className={`text-xl md:text-2xl font-bold mb-6 md:mb-8 ${
              theme === "dark" ? "text-white" : "text-[#0C0E16]"
            }`}
          >
            New Invoice
          </h1>

          <form className="flex-1 overflow-y-auto space-y-6 md:space-y-8">
            <div>
              <p className="text-[#7C5DFA] font-bold text-xs md:text-sm mb-6">
                Bill From
              </p>

              <div className="space-y-6">
                <div>
                  <label className={getLabelClass()}>Street Address</label>
                  <input
                    name="senderStreet"
                    defaultValue={invoice.senderAddress.street}
                    onChange={handleChange}
                    className={getInputClass()}
                  />
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6">
                  <div>
                    <label className={getLabelClass()}>City</label>
                    <input
                      name="senderCity"
                      defaultValue={invoice.senderAddress.city}
                      onChange={handleChange}
                      className={getInputClass()}
                    />
                  </div>
                  <div>
                    <label className={getLabelClass()}>Post Code</label>
                    <input
                      name="senderPostCode"
                      defaultValue={invoice.senderAddress.postCode}
                      onChange={handleChange}
                      className={getInputClass()}
                    />
                  </div>
                  <div className="col-span-2 md:col-span-1">
                    <label className={getLabelClass()}>Country</label>
                    <input
                      name="senderCountry"
                      defaultValue={invoice.senderAddress.country}
                      onChange={handleChange}
                      className={getInputClass()}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div>
              <p className="text-[#7C5DFA] font-bold text-xs md:text-sm mb-6">
                Bill To
              </p>

              <div className="space-y-6">
                <div>
                  <label className={getLabelClass()}>Client's Name</label>
                  <input
                    name="clientName"
                    defaultValue={invoice.clientName}
                    onChange={handleChange}
                    className={getInputClass()}
                  />
                </div>

                <div>
                  <label className={getLabelClass()}>Client's Email</label>
                  <input
                    name="clientEmail"
                    type="email"
                    defaultValue={invoice.clientEmail}
                    onChange={handleChange}
                    className={getInputClass()}
                  />
                </div>

                <div>
                  <label className={getLabelClass()}>Street Address</label>
                  <input
                    name="clientStreet"
                    defaultValue={invoice.clientAddress.street}
                    onChange={handleChange}
                    className={getInputClass()}
                  />
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6">
                  <div>
                    <label className={getLabelClass()}>City</label>
                    <input
                      name="clientCity"
                      defaultValue={invoice.clientAddress.city}
                      onChange={handleChange}
                      className={getInputClass()}
                    />
                  </div>
                  <div>
                    <label className={getLabelClass()}>Post Code</label>
                    <input
                      name="clientPostCode"
                      defaultValue={invoice.clientAddress.postCode}
                      onChange={handleChange}
                      className={getInputClass()}
                    />
                  </div>
                  <div className="col-span-2 md:col-span-1">
                    <label className={getLabelClass()}>Country</label>
                    <input
                      name="clientCountry"
                      defaultValue={invoice.clientAddress.country}
                      onChange={handleChange}
                      className={getInputClass()}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className={getLabelClass()}>Invoice Date</label>
                <div className="relative">
                  <input
                    type="date"
                    name="invoiceDate"
                    defaultValue={invoice.invoiceDate}
                    onChange={handleChange}
                    className={`${getInputClass()}`}
                  />
                </div>
              </div>

              <div>
                <label className={getLabelClass()}>Payment Terms</label>
                <div className="relative">
                  <select
                    name="paymentTerms"
                    defaultValue={invoice.paymentTerms}
                    onChange={handleChange}
                    className={`${getInputClass()} appearance-none`}
                  >
                    <option value="1">Next 1 day</option>
                    <option value="7">Next 7 days</option>
                    <option value="14">Next 14 days</option>
                    <option value="30">Next 30 days</option>
                  </select>
                  <ChevronDown
                    size={20}
                    className={`absolute right-4 top-1/2 transform -translate-y-1/2 ${
                      theme === "dark" ? "text-white" : "text-gray-500"
                    }`}
                  />
                </div>
              </div>
            </div>

            <div className="mb-8">
              <label className={getLabelClass()}>Description</label>
              <textarea
                name="description"
                rows={4}
                onChange={handleChange}
                className={`${getInputClass()} resize-none`}
                value={formData.description}
              />
            </div>

            <div>
              <button
                type="button"
                className={`w-full py-4 px-6 rounded-lg text-white ${
                  theme === "dark" ? "bg-[#7C5DFA]" : "bg-[#7C5DFA]"
                }`}
                onClick={postInvoice}
              >
                Save & Send
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditInvoice;
