import { Link, useNavigate, useParams } from "react-router-dom";
import { deleteById, getInvoice, updateById } from "../request";
import { useEffect, useState } from "react";
import Status from "../components/StatusBadje";
import { Card, CardContent } from "../components/ui/card";
import { Button, buttonVariants } from "../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DialogClose } from "@radix-ui/react-dialog";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { useAppStore } from "../lib/zustand";

function Details() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [invoice, setInvoice] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);

  const { updateInvoices, setSheetOpen, setEditedData } = useAppStore();

  useEffect(() => {
    getInvoice(id)
      .then(setInvoice)
      .catch((err) => toast.error(err.message));
  }, [id]);

  const handleDelete = () => {
    setDeleteLoading(true);
    deleteById(id)
      .then(() => navigate("/"))
      .catch((err) => toast.error(err.message))
      .finally(() => setDeleteLoading(false));
  };

  const handleUpdate = () => {
    setUpdateLoading(true);
    updateById(id, { status: "paid" })
      .then((res) => {
        updateInvoices(res);
        navigate("/");
      })
      .catch((err) => toast.error(err.message))
      .finally(() => setUpdateLoading(false));
  };

  const handleEdit = (data) => {
    setEditedData(data);
    setSheetOpen();
  };

  if (!invoice)
    return <div className="text-center text-gray-500">No invoice found</div>;

  return (
    <div className="py-5 px-4 md:px-8 lg:px-16">
      <div className="max-w-4xl mx-auto">
        <Link
          to="/"
          className="inline-flex items-center gap-2 mb-8 text-sm font-bold text-gray-900 dark:text-white"
        >
          <ArrowLeft className="w-5 h-5" /> Go back
        </Link>

        <Card className="shadow-md rounded-lg">
          <CardContent className="flex justify-between items-center p-6">
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                Status:
              </span>
              <Status status={invoice.status} />
            </div>

            <div className="flex gap-3">
              <Button
                variant="ghost"
                onClick={() => handleEdit(invoice)}
                className="text-gray-600 dark:text-gray-300 border border-gray-300 rounded-md px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Edit
              </Button>

              <Dialog>
                <DialogTrigger
                  className={buttonVariants({
                    variant: "destructive",
                    className:
                      "bg-red-500 text-white rounded-md px-4 py-2 hover:bg-red-600",
                  })}
                >
                  Delete
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Confirm Deletion</DialogTitle>
                    <DialogDescription>
                      Are you sure you want to delete invoice #{invoice.id}?
                      This action cannot be undone.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="flex gap-3 justify-end">
                    <DialogClose
                      className={buttonVariants({
                        variant: "ghost",
                        className:
                          "text-gray-600 rounded-md px-4 py-2 hover:bg-gray-100",
                      })}
                    >
                      Cancel
                    </DialogClose>
                    <Button
                      variant="destructive"
                      onClick={handleDelete}
                      disabled={deleteLoading}
                      className="bg-red-500 text-white rounded-md px-4 py-2 hover:bg-red-600"
                    >
                      {deleteLoading ? "Loading..." : "Delete"}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>

              {invoice.status === "pending" && (
                <Button
                  variant="default"
                  onClick={handleUpdate}
                  disabled={updateLoading}
                  className="bg-purple-600 text-white rounded-md px-4 py-2 hover:bg-purple-700"
                >
                  {updateLoading ? "Loading..." : "Mark as paid"}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="mt-6 shadow-md rounded-lg">
          <CardContent className="p-0">
            <div className="p-8 md:p-12">
              <div className="flex flex-col md:flex-row justify-between mb-6">
                <div className="flex flex-col gap-2">
                  <span className="text-lg font-bold text-gray-900 dark:text-white">
                    <span className="text-gray-500">#</span>
                    {invoice.id}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {invoice.description}
                  </span>
                </div>

                <div className="flex flex-col gap-0 text-right text-xs text-gray-500 dark:text-gray-400">
                  <span>{invoice.senderAddress.street}</span>
                  <span>{invoice.senderAddress.city}</span>
                  <span>{invoice.senderAddress.postCode}</span>
                  <span>{invoice.senderAddress.country}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-8">
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col gap-2">
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      Invoice Date
                    </span>
                    <h2 className="text-sm font-bold text-gray-900 dark:text-white">
                      {invoice.createdAt}
                    </h2>
                  </div>
                  <div className="flex flex-col gap-2">
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      Payment Due
                    </span>
                    <h2 className="text-sm font-bold text-gray-900 dark:text-white">
                      {invoice.paymentDue}
                    </h2>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    Bill To
                  </span>
                  <h2 className="text-sm font-bold text-gray-900 dark:text-white">
                    {invoice.clientName}
                  </h2>
                  <div className="flex flex-col text-xs text-gray-500 dark:text-gray-400">
                    <span>{invoice.clientAddress.street}</span>
                    <span>{invoice.clientAddress.city}</span>
                    <span>{invoice.clientAddress.postCode}</span>
                    <span>{invoice.clientAddress.country}</span>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    Sent to
                  </span>
                  <h2 className="text-sm font-bold text-gray-900 dark:text-white">
                    {invoice.clientEmail}
                  </h2>
                </div>
              </div>
            </div>

            <div className="p-6 md:p-8 bg-gray-50 dark:bg-gray-800 rounded-t-2xl">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-gray-500 dark:text-gray-400">
                      Item Name
                    </TableHead>
                    <TableHead className="text-gray-500 dark:text-gray-400">
                      QTY.
                    </TableHead>
                    <TableHead className="text-gray-500 dark:text-gray-400">
                      Price
                    </TableHead>
                    <TableHead className="text-right text-gray-500 dark:text-gray-400">
                      Total
                    </TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {invoice.items.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium text-gray-900 dark:text-white">
                        {item.name || "N/A"}
                      </TableCell>
                      <TableCell className="text-gray-500 dark:text-gray-400">
                        {item.quantity || 0}
                      </TableCell>
                      <TableCell className="text-gray-500 dark:text-gray-400">
                        £{" "}
                        {item.price !== undefined && item.price !== null
                          ? Number(item.price).toFixed(2)
                          : "0.00"}
                      </TableCell>
                      <TableCell className="text-right font-medium text-gray-900 dark:text-white">
                        £{" "}
                        {item.total !== undefined && item.total !== null
                          ? Number(item.total).toFixed(2)
                          : "0.00"}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              <div className="flex justify-between bg-gray-600 dark:bg-gray-700 py-6 px-6 items-center rounded-b-2xl text-white">
                <p className="text-sm">Amount Due</p>
                <h3 className="text-xl font-bold">
                  £{" "}
                  {invoice.total !== undefined && invoice.total !== null
                    ? Number(invoice.total).toFixed(2)
                    : "0.00"}
                </h3>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default Details;
