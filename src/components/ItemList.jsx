import { PlusCircle, Trash2 } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useAppStore } from "../lib/zustand";

function ItemList({ info }) {
  const [localItems, setLocalItems] = useState(
    info
      ? info
      : [
          {
            id: crypto.randomUUID(),
            name: "Des",
            quantity: 2,
            price: 156,
            get total() {
              return +this.price * +this.quantity;
            },
          },
        ]
  );

  const { items, setItems } = useAppStore();

  useEffect(() => {
    setItems(localItems);
  }, [JSON.stringify(localItems)]);

  function handleChange(e, id) {
    const changedItem = localItems.find((el) => el.id === id);
    changedItem[e.target.name] = e.target.value;

    setLocalItems((prev) =>
      prev.map((item) => (item.id === changedItem.id ? changedItem : item))
    );
  }

  function handleClick(type, id) {
    if (type === "add") {
      const last = localItems.at(-1);
      if (last.name.trim() !== "") {
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
        const filtered = localItems.filter((el) => el.id !== id);
        setLocalItems(filtered);
      }
    }
  }

  return (
    <div className="flex flex-col">
      <h2>Item List</h2>
      <div className="flex items-center gap-4 justify-between">
        <span>Item Name</span>
        <span>Name</span>
        <span>Price</span>
        <span>Total</span>
        <span></span>
      </div>

      <ul className="mb-5 flex flex-col gap-5">
        {localItems.map(({ name, quantity, total, price, id }) => (
          <li key={id} className="flex items-center justify-between gap-5">
            <Input
              onChange={(e) => handleChange(e, id)}
              name="name"
              className="w-[100px]"
              type="text"
              defaultValue={name}
              placeholder="Item Name"
            />
            <Input
              onChange={(e) => handleChange(e, id)}
              name="quantity"
              className="w-[100px]"
              type="number"
              defaultValue={quantity}
              placeholder="Item Qty."
            />
            <Input
              onChange={(e) => handleChange(e, id)}
              name="price"
              className="w-[100px]"
              type="number"
              defaultValue={price}
              placeholder="Item Price"
            />
            <span>{total}</span>
            <Button
              type="button"
              onClick={() => handleClick("delete", id)}
              variant="destructive"
              size="icon"
              className="cursor-pointer"
            >
              <Trash2 />
            </Button>
          </li>
        ))}
      </ul>

      <Button
        type="button"
        onClick={() => handleClick("add", crypto.randomUUID())}
        variant="secondary"
      >
        <PlusCircle /> Add New Item
      </Button>
    </div>
  );
}

export default ItemList;
