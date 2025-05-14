import Logo from "../assets/logo.svg";
import userImage from "../assets/userImage.png";
import { useAppStore } from "../lib/zustand";
import ToggleTheme from "./ThemesToggle";
import Form from "./Form";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

function Sidebar() {
  const { setSheetOpen, sheetOpen, editedData } = useAppStore();

  return (
    <>
      <div className="bg-[#373B53] flex items-center justify-between md:flex-col md:fixed md:h-full md:left-0 md:w-[78px] md:top-0 md:bottom-0 md:z-[99]">
        <div>
          <img src={Logo} alt="site logo" />
        </div>
        <div className="flex items-center gap-4 pr-5 md:pr-0 md:flex-col">
          <ToggleTheme />
          <Avatar className="mt-5 mb-5 mx-auto">
            <AvatarImage src={userImage} alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
      </div>
      <Sheet open={sheetOpen} onOpenChange={setSheetOpen} className="w-[800px]">
        <SheetContent
          className="min-w-[calc(80%-72px)] sm:w-[540px] ml-[78px] min-h-[calc(100%-56px)] overflow-y-auto"
          side="left"
        >
          <SheetHeader className="sticky top-0 w-full border-b">
            <SheetTitle>New Invoice</SheetTitle>
          </SheetHeader>
          <Form setSheetOpen={setSheetOpen} info={editedData} />
        </SheetContent>
      </Sheet>
    </>
  );
}

export default Sidebar;
