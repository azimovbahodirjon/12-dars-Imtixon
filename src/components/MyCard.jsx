import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import StatusBadje from "./StatusBadje";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function MyCard({
  createdAt = "Due 19 Aug 2021",
  clientName = "Jensen Huang",
  total = "1,800.90",
  status = "draft",
  id = "1",
}) {
  const navigate = useNavigate();

  return (
    <Card
      onClick={() => {
        navigate(`/${id}`);
      }}
      className="border-2 border-transparent hover:border-blue-400 transition-colors cursor-pointer"
    >
      <CardHeader>
        <div className="flex items-center justify-between gap-x-4 text-sm flex-wrap">
          <CardTitle className="min-w-[60px]">#{id}</CardTitle>
          <CardDescription className="min-w-[90px]">
            {createdAt}
          </CardDescription>
          <span className="truncate max-w-[120px]">{clientName}</span>
          <span className="min-w-[80px]">£{total}</span>
          <StatusBadje status={status} />
          <ArrowRight className="text-[#7C5DFA] min-w-[24px]" />
        </div>
      </CardHeader>
    </Card>
  );
}
