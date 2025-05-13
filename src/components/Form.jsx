import { useEffect, useState } from "react";
import { prepareData } from "../lib/utils";
import { useAppStore } from "../lib/zustand";
import { addInvoice, updateById } from "../request";
import ItemList from "./ItemList";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export default function Form({ info, setSheetOpen }) {
  const { items, updateInvoices } = useAppStore();
  const navigate = useNavigate();
  const [sending, setSending] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const requiredFields = [
    "senderAddress-street",
    "senderAddress-city",
    "senderAddress-postCode",
    "senderAddress-country",
    "clientEmail",
    "clientName",
    "clientAddress-street",
    "clientAddress-city",
    "clientAddress-postCode",
    "clientAddress-country",
    "createdAt",
    "paymentTerms",
    "description",
  ];

  const validateForm = (formData) => {
    const newErrors = {};
    requiredFields.forEach((field) => {
      if (!formData.get(field))
        newErrors[field] = "Iltimos, ushbu maydonni to'ldiring";
    });
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const validationErrors = validateForm(formData);

    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      toast.error("Iltimos, barcha majburiy maydonlarni to'ldiring");
      return;
    }

    const result = Object.fromEntries(formData);
    if (!info) result.status = e.nativeEvent.submitter.id;
    ["quantity", "price", "paymentTerms"].forEach(
      (key) => (result[key] = Number(result[key]))
    );
    result.items = items;
    setSending({
      mode: e.nativeEvent.submitter.id === "edit" ? "edit" : "add",
      data: prepareData(result),
    });
  };

  useEffect(() => {
    if (!sending) return;
    setLoading(true);
    (sending.mode === "add" ? addInvoice : updateById.bind(null, info.id))(
      sending.data
    )
      .then((res) => {
        updateInvoices(res);
        toast.success(
          `${
            sending.mode === "add"
              ? "Muvaffaqiyatli qo'shildi"
              : "Muvaffaqiyatli tahrirlandi"
          } ✅`
        );
        setSheetOpen(false);
        if (sending.mode === "edit") navigate(-1);
      })
      .catch(({ message }) => toast.error(message))
      .finally(() => {
        setLoading(false);
        setSending(null);
      });
  }, [sending, info, navigate, setSheetOpen, updateInvoices]);

  const AddressFields = ({ prefix, defaults }) => (
    <div className="space-y-3">
      <div>
        <Label htmlFor={`${prefix}-street`}>Street Address</Label>
        <Input
          id={`${prefix}-street`}
          name={`${prefix}-street`}
          defaultValue={defaults?.street}
          className={errors[`${prefix}-street`] ? "border-red-500" : ""}
        />
        {errors[`${prefix}-street`] && (
          <p className="text-red-500 text-xs">{errors[`${prefix}-street`]}</p>
        )}
      </div>
      <div className="grid grid-cols-3 gap-2">
        <div>
          <Label htmlFor={`${prefix}-city`}>City</Label>
          <Input
            id={`${prefix}-city`}
            name={`${prefix}-city`}
            defaultValue={defaults?.city}
            className={errors[`${prefix}-city`] ? "border-red-500" : ""}
          />
          {errors[`${prefix}-city`] && (
            <p className="text-red-500 text-xs">{errors[`${prefix}-city`]}</p>
          )}
        </div>
        <div>
          <Label htmlFor={`${prefix}-postCode`}>Post Code</Label>
          <Input
            id={`${prefix}-postCode`}
            name={`${prefix}-postCode`}
            defaultValue={defaults?.postCode}
            className={errors[`${prefix}-postCode`] ? "border-red-500" : ""}
          />
          {errors[`${prefix}-postCode`] && (
            <p className="text-red-500 text-xs">
              {errors[`${prefix}-postCode`]}
            </p>
          )}
        </div>
        <div>
          <Label htmlFor={`${prefix}-country`}>Country</Label>
          <Input
            id={`${prefix}-country`}
            name={`${prefix}-country`}
            defaultValue={defaults?.country}
            className={errors[`${prefix}-country`] ? "border-red-500" : ""}
          />
          {errors[`${prefix}-country`] && (
            <p className="text-red-500 text-xs">
              {errors[`${prefix}-country`]}
            </p>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="p-3 pt-8 space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-3">Bill From</h3>
        <AddressFields prefix="senderAddress" defaults={info?.senderAddress} />
      </div>

      <div>
        <h3 className="text-lg font-medium mb-3">Bill To</h3>
        <div className="space-y-3 mb-3">
          <div>
            <Label htmlFor="clientEmail">Client's Email</Label>
            <Input
              id="clientEmail"
              name="clientEmail"
              defaultValue={info?.clientEmail}
              className={errors.clientEmail ? "border-red-500" : ""}
            />
            {errors.clientEmail && (
              <p className="text-red-500 text-xs">{errors.clientEmail}</p>
            )}
          </div>
          <div>
            <Label htmlFor="clientName">Client's Name</Label>
            <Input
              id="clientName"
              name="clientName"
              defaultValue={info?.clientName}
              className={errors.clientName ? "border-red-500" : ""}
            />
            {errors.clientName && (
              <p className="text-red-500 text-xs">{errors.clientName}</p>
            )}
          </div>
        </div>
        <AddressFields prefix="clientAddress" defaults={info?.clientAddress} />
      </div>

      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-3 items-end">
          <div>
            <Label htmlFor="createdAt">Invoice Date</Label>
            <Input
              type="date"
              id="createdAt"
              name="createdAt"
              defaultValue={info?.createdAt}
              className={errors.createdAt ? "border-red-500" : ""}
            />
            {errors.createdAt && (
              <p className="text-red-500 text-xs">{errors.createdAt}</p>
            )}
          </div>
          <Select
            name="paymentTerms"
            defaultValue={info?.paymentTerms?.toString()}
          >
            <SelectTrigger
              className={`w-full ${
                errors.paymentTerms ? "border-red-500" : ""
              }`}
            >
              <SelectValue placeholder="Payment Terms" />
            </SelectTrigger>
            <SelectContent>
              {[1, 7, 14, 30].map((day) => (
                <SelectItem key={day} value={day.toString()}>
                  Net {day} Day
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.paymentTerms && (
            <p className="text-red-500 text-xs">{errors.paymentTerms}</p>
          )}
        </div>
        <div>
          <Label htmlFor="description">Project Description</Label>
          <Input
            id="description"
            name="description"
            defaultValue={info?.description}
            className={errors.description ? "border-red-500" : ""}
          />
          {errors.description && (
            <p className="text-red-500 text-xs">{errors.description}</p>
          )}
        </div>
      </div>

      <ItemList info={info?.items} />

      <div className="flex justify-end gap-2 mt-6">
        {info ? (
          <>
            <Button variant="outline" size="sm">
              Cancel
            </Button>
            <Button id="edit" disabled={loading} size="sm">
              {loading ? "Loading..." : "Save Changes"}
            </Button>
          </>
        ) : (
          <>
            <Button type="button" variant="outline" size="sm">
              Discard
            </Button>
            <Button id="draft" variant="secondary" disabled={loading} size="sm">
              {loading ? "Loading..." : "Save as Draft"}
            </Button>
            <Button id="pending" disabled={loading} size="sm">
              {loading ? "Loading..." : "Save & Send"}
            </Button>
          </>
        )}
      </div>
    </form>
  );
}
