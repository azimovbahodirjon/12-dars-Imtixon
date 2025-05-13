import { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { PlusIcon, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useAppStore } from "../lib/zustand";

export default function ItemList({ info }) {
  const { setItems } = useAppStore();
  const [localItems, setLocalItems] = useState(
    info || [
      {
        id: crypto.randomUUID(),
        name: "Banner Design",
        quantity: 1,
        price: 156,
        get total() {
          return +this.price * +this.quantity;
        },
      },
    ]
  );

  useEffect(() => {
    setItems(localItems);
  }, [JSON.stringify(localItems)]);

  const handleChange = (e, id) => {
    setLocalItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, [e.target.name]: e.target.value } : item
      )
    );
  };

  const handleClick = (type, id) => {
    if (type === "add") {
      if (localItems.at(-1).name.trim()) {
        setLocalItems((prev) => [
          ...prev,
          {
            id,
            name: "",
            quantity: 1,
            price: 0,
            get total() {
              return this.price * this.quantity;
            },
          },
        ]);
      } else {
        toast.info("Oxirgi element nomini yozing");
      }
    } else if (type === "delete") {
      if (localItems.length === 1) {
        toast.info("Kamida 1 element bo‘lishi kerak!");
      } else {
        setLocalItems((prev) => prev.filter((item) => item.id !== id));
      }
    }
  };

  return (
    <div className="space-y-3">
      <h3 className="text-lg font-medium">Item List</h3>
      <div className="grid grid-cols-4 gap-2 text-sm">
        <span>Qty</span>
        <span>Price</span>
        <span>Total</span>
      </div>
      <ul className="space-y-3">
        {localItems.map(({ name, quantity, price, total, id }) => (
          <li key={id} className="grid grid-cols-4 gap-2 items-center">
            <Input
              onChange={(e) => handleChange(e, id)}
              defaultValue={name}
              className="w-[180px]"
              type="text"
              name="name"
              placeholder="Item Name"
            />
            <Input
              onChange={(e) => handleChange(e, id)}
              defaultValue={quantity}
              className="w-[80px]"
              type="number"
              name="quantity"
              placeholder="Qty."
            />
            <Input
              onChange={(e) => handleChange(e, id)}
              defaultValue={price}
              className="w-[80px]"
              type="number"
              name="price"
              placeholder="Price"
            />
            <div className="flex items-center gap-2">
              <span>{total.toFixed(2)}</span>
              <Button
                type="button"
                onClick={() => handleClick("delete", id)}
                variant="destructive"
                size="icon"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </li>
        ))}
      </ul>
      <Button
        type="button"
        onClick={() => handleClick("add", crypto.randomUUID())}
        className="w-full"
        variant="secondary"
        size="sm"
      >
        <PlusIcon className="h-4 w-4 mr-1" /> Add New Item
      </Button>
    </div>
  );
}
