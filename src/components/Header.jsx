import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEffect, useState } from "react";
import { buttonVariants } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { ArrowBigDown, PlusCircleIcon } from "lucide-react";
import { useAppStore } from "../lib/zustand";
import { queryGenerator } from "../lib/utils";

export default function Header() {
  const { setSheetOpen, setFilter } = useAppStore();
  const [items, setItems] = useState({
    draft: false,
    paid: false,
    pending: false,
  });

  function handleChange(key) {
    setItems((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  useEffect(() => {
    const query = queryGenerator(items);
    setFilter(query);
  }, [JSON.stringify(items)]);

  return (
    <header>
      <div className="base-container flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between py-10">
        <div>
          <h1 className="font-bold text-2xl text-foreground">Invoices</h1>
          <p className="text-muted-foreground text-sm">
            There are 7 total invoices
          </p>
        </div>

        <div className="flex items-center gap-4 flex-wrap">
          {/* Filter Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                className="flex items-center gap-2 text-sm rounded-xl"
                variant="ghost"
              >
                Filter by status
                <ArrowBigDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-56 rounded-xl shadow-md">
              <DropdownMenuLabel className="text-muted-foreground">
                Statuses
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="flex flex-col gap-1 px-1">
                {Object.entries(items).map(([key, value]) => (
                  <label
                    key={key}
                    htmlFor={key}
                    className={`${buttonVariants({
                      variant: "ghost",
                    })} justify-start gap-2 capitalize text-sm rounded-lg`}
                  >
                    <Checkbox
                      id={key}
                      checked={value}
                      onCheckedChange={() => handleChange(key)}
                    />
                    {key}
                  </label>
                ))}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* New Invoice Button */}
          <Button
            onClick={setSheetOpen}
            className="bg-[#7C5DFA] hover:bg-[#9277FF] text-white h-12 px-5 rounded-3xl flex items-center gap-2 shadow-sm transition duration-300"
          >
            <PlusCircleIcon className="w-5 h-5" />
            <span className="text-sm font-medium">New Invoice</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
