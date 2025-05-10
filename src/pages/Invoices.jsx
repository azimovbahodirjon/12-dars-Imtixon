import { useEffect, useState } from "react";
import useThemeStore from "../store/useThemeStore";
import Add from "../images/add.svg";
import InvoiceCard from "../components/InvoiceCard";
import NotFound from "../images/not-found.svg";
import AddInvoice from "../components/AddInvoice";
import useAddStore from "../store/useAddStore";

function Invoices() {
  const [add, setAdd] = useState(false);
  const [filter, setFilter] = useState("filter");
  const { theme } = useThemeStore();
  const { invoices } = useAddStore();
  const [data, setData] = useState(invoices);

  useEffect(() => {
    setData(
      filter === "filter"
        ? invoices
        : invoices.filter((prev) => prev.status === filter)
    );
  }, [filter, invoices]);

  return (
    <div className="contma relative">
      {invoices.length > 0 ? (
        <div>
          <div className="flex items-end justify-between xl:gap-[267px]">
            <div className="mt-[34px] pl-[24px] animation-left">
              <h1
                className={`${
                  theme === "dark" ? "text-white" : "text-black"
                } font-bold text-[30px] xl:text-[32px]`}
              >
                Invoices
              </h1>
              <p
                className={`${
                  theme === "dark" ? "text-[#DFE3FA]" : "text-[#888EB0]"
                } font-normal mt-[4px]`}
              >
                {invoices.length} invoices
              </p>
            </div>
            <div className="flex items-center mb-[10px] gap-[18px] pr-[24px] animation-right">
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                style={{
                  padding: "12px 24px",
                  fontSize: "12px",
                  fontWeight: "700",
                  borderRadius: "24px",
                  backgroundColor: theme === "dark" ? "#252945" : "#F9FAFE",
                  color: theme === "dark" ? "#DFE3FA" : "#7E88C3",
                  border: `1px solid ${
                    theme === "dark" ? "#252945" : "#DFE3FA"
                  }`,
                  outline: "none",
                  cursor: "pointer",
                  boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
                  appearance: "none",
                  backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='${
                    theme === "dark" ? "%23DFE3FA" : "%237E88C3"
                  }'><path d='M6 9L2 5h8L6 9z'/></svg>")`,
                  backgroundPosition: "right 12px center",
                  backgroundRepeat: "no-repeat",
                }}
              >
                <option value="filter">Filter</option>
                <option value="paid">Paid</option>
                <option value="pending">Pending</option>
                <option value="draft">Draft</option>
              </select>
              <button
                onClick={() => setAdd(true)}
                style={{
                  padding: "12px 24px",
                  fontSize: "12px",
                  fontWeight: "700",
                  borderRadius: "24px",
                  backgroundColor: "#7C5DFA",
                  color: "#FFFFFF",
                  border: "none",
                  cursor: "pointer",
                  boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <img
                  src={Add}
                  alt="add"
                  style={{ width: "16px", height: "16px" }}
                />
                New <span className="hidden sm:inline">Invoice</span>
              </button>
            </div>
          </div>
          <div className="h-[536px] overflow-x-scroll">
            {data.length > 0 &&
              data.map((invoice, index) => (
                <InvoiceCard key={index} invoice={invoice} />
              ))}
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center text-center">
          <div className="flex items-end justify-between xl:gap-[267px] w-full">
            <div className="mt-[34px] pl-[24px] animation-left">
              <h1
                className={`${
                  theme === "dark" ? "text-white" : "text-black"
                } font-bold text-[30px] xl:text-[32px]`}
              >
                Invoices
              </h1>
              <p
                className={`${
                  theme === "dark" ? "text-[#DFE3FA]" : "text-[#888EB0]"
                } font-normal mt-[4px]`}
              >
                {invoices.length} invoices
              </p>
            </div>
            <div className="flex items-center mb-[10px] gap-[18px] pr-[24px] animation-right">
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                style={{
                  padding: "12px 24px",
                  fontSize: "12px",
                  fontWeight: "700",
                  borderRadius: "24px",
                  backgroundColor: theme === "dark" ? "#252945" : "#F9FAFE",
                  color: theme === "dark" ? "#DFE3FA" : "#7E88C3",
                  border: `1px solid ${
                    theme === "dark" ? "#252945" : "#DFE3FA"
                  }`,
                  outline: "none",
                  cursor: "pointer",
                  boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
                  appearance: "none",
                  backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='${
                    theme === "dark" ? "%23DFE3FA" : "%237E88C3"
                  }'><path d='M6 9L2 5h8L6 9z'/></svg>")`,
                  backgroundPosition: "right 12px center",
                  backgroundRepeat: "no-repeat",
                }}
              >
                <option value="filter">Filter</option>
                <option value="paid">Paid</option>
                <option value="pending">Pending</option>
                <option value="draft">Draft</option>
              </select>
              <button
                onClick={() => setAdd(true)}
                style={{
                  padding: "12px 24px",
                  fontSize: "12px",
                  fontWeight: "700",
                  borderRadius: "24px",
                  backgroundColor: "#7C5DFA",
                  color: "#FFFFFF",
                  border: "none",
                  cursor: "pointer",
                  boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <img
                  src={Add}
                  alt="add"
                  style={{ width: "16px", height: "16px" }}
                />
                New <span className="hidden sm:inline">Invoice</span>
              </button>
            </div>
          </div>
          <div className="animation">
            <img
              src={NotFound}
              className="mt-[210px] w-40 h-auto"
              alt="notfound"
            />
            <div className="text-center">
              <h1
                className={`${
                  theme === "dark" ? "text-white" : "text-[#0C0E16]"
                } font-bold text-[20px] mt-[64px] mb-[24px]`}
              >
                There is nothing here
              </h1>
              <p
                className={`${
                  theme === "dark" ? "text-white" : "text-[#0C0E16]"
                } font-normal text-[12px] w-[180px] mx-auto`}
              >
                Create an invoice by clicking the
                <span
                  className={`font-bold text-[12px] ${
                    theme === "dark" ? "text-[#DFE3FA]" : "text-[#888EB0]"
                  }`}
                >
                  {" "}
                  New button{" "}
                </span>
                and get started
              </p>
            </div>
          </div>
        </div>
      )}
      {add && <AddInvoice add={add} onClose={() => setAdd(false)} />}
    </div>
  );
}

export default Invoices;
