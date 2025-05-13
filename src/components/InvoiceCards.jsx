import { useEffect, useState } from "react";
import { getInvoices } from "../request";
import CardSkleton from "../components/CardSkleton";
import MyCard from "../components/MyCard";
import { useAppStore } from "../lib/zustand";
import NotFoundComponent from "./NotFoundComponent";

export default function InvoiceCards() {
  const { filter, invoices, setInvoices } = useAppStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    getInvoices(filter)
      .then(setInvoices)
      .catch(({ message }) => setError(message))
      .finally(() => setLoading(false));
  }, [filter]);

  if (loading) return <CardSkleton />;
  if (error) return <p>{error}</p>;
  if (invoices.length === 0) return <NotFoundComponent />;

  return (
    <div className="base-container flex flex-col gap-4">
      {invoices.map(({ createdAt, clientName, total, status, id }) => (
        <MyCard
          key={id}
          createdAt={createdAt}
          clientName={clientName}
          total={total}
          status={status}
          id={id}
        />
      ))}
    </div>
  );
}
