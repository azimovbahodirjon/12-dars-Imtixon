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
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/config";

function Sidebar() {
  const { setSheetOpen, sheetOpen, editedData } = useAppStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <>
      <div className="bg-[#373B53] flex flex-col justify-between md:fixed md:h-full md:left-0 md:w-[78px] md:top-0 md:bottom-0 md:z-[99] shadow-md">
        <div className="flex items-center justify-center py-4 bg-[#7C5DFA] rounded-br-2xl">
          <img src={Logo} alt="site logo" className="h-6 w-6" />
        </div>

        <div className="flex flex-col items-center gap-4 pb-4">
          <Button
            className="text-red-500 hover:bg-white/10 p-2 rounded-full transition-all duration-200"
            variant="ghost"
            size="icon"
            onClick={handleLogout}
            title="Logout"
          >
            <LogOut className="h-5 w-5" />
          </Button>

          <ToggleTheme className="hover:bg-white/10 text-white p-2 rounded-full transition-all duration-200" />

          <div className="border-t border-white/10 pt-4">
            <Avatar className="w-8 h-8 border border-white/20">
              <AvatarImage src={userImage} alt="@user" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>

      <Sheet open={sheetOpen} onOpenChange={setSheetOpen} className="w-[800px]">
        <SheetContent
          className="min-w-[calc(60%-72px)] sm:w-[540px] ml-[78px] min-h-[calc(100%-56px)] overflow-y-auto"
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
