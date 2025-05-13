import React from "react";
import Logo from "../assets/logo.svg";
import ThemesToggle from "./ThemesToggle";
import { useAppStore } from "../lib/zustand";
import Form from "./Form";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function SideBar() {
  const { sheetOpen, setSheetOpen, editedData } = useAppStore();
  return (
    <>
      <div
        className="bg-[#373B53] 
      flex items-center justify-between md:flex-col md:h-full md:fixed md:left-0 md:top-0 md:bottom-0 md:z-[999] "
      >
        <img width={75} src={Logo} />
        <div className="mr-5 md:mr-0 md:mb-5">
          <ThemesToggle />
        </div>
      </div>
      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent
          className="ml-[72px] min-w-[calc(65%-72px)] min-h-[calc(100%-56px)] overflow-y-scroll"
          side="left"
        >
          <SheetHeader className="sticky top-0 w-full bg-white border-b">
            <SheetTitle>Are you absolutely sure?</SheetTitle>
          </SheetHeader>
          <Form setSheetOpen={setSheetOpen} info={editedData} />
        </SheetContent>
      </Sheet>
    </>
  );
}
