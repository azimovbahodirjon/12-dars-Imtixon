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
import { Checkbox } from ".//ui/checkbox";
import { ArrowBigDown, PlusCircleIcon, LogOut } from "lucide-react";
import { useAppStore } from "../lib/zustand";
import { queryGenerator } from "../lib/utils";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/config";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const { setSheetOpen } = useAppStore();
  const { setFilter } = useAppStore();
  const [items, setItems] = useState({
    draft: false,
    paid: false,
    pending: false,
  });
  const navigate = useNavigate();

  function handleChange(key) {
    setItems((prev) => {
      return { ...prev, [key]: !prev[key] };
    });
  }

  useEffect(() => {
    const query = queryGenerator(items);
    setFilter(query);
  }, [JSON.stringify(items)]);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <header>
      <div className="base-container flex items-center justify-between py-10">
        <div>
          <h1 className="font-bold text-[20px]">Invoices</h1>
          <p>There are 7 total invoices</p>
        </div>
        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className={"mr-4"} variant="ghost">
                Filter by status
                <ArrowBigDown />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Statuses</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="flex flex-col">
                {Object.entries(items).map(([key, value]) => {
                  return (
                    <label
                      key={key}
                      className={`${buttonVariants({ variant: "ghost" })} 
              justify-start capitalize`}
                      htmlFor={key}
                    >
                      <Checkbox
                        value={key}
                        checked={value}
                        onCheckedChange={() => handleChange(key)}
                        id={key}
                      />
                      {key}
                    </label>
                  );
                })}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button
            className="bg-[#7C5DFA] w-[150px] h-12 rounded-3xl cursor-pointer hover:bg-[#9277FF]"
            onClick={setSheetOpen}
          >
            <PlusCircleIcon />
            New Invoice
          </Button>

          <Button
            variant="ghost"
            className="bg-red-600 text-white w-[100px] h-12 rounded-3xl cursor-pointer hover:bg-red-700 hover:text-white ml-auto transition duration-300"
            onClick={handleLogout}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>
    </header>
  );
}
