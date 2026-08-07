"use client";

import {
  MoreVertical,
  Eye,
  Sparkles,
  Trash2,
} from "lucide-react";


import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Props {
  onView: () => void;
  onAnalyze: () => void;
  onDelete: () => void;
}

export default function ReviewActionMenu({
  onView,
  onAnalyze,
  onDelete,
}: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:bg-slate-100"
            >
            <MoreVertical className="h-4 w-4" />
       </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-52 rounded-xl"
      >
        <DropdownMenuItem onClick={onView}>
          <Eye />
          View Details
        </DropdownMenuItem>

        <DropdownMenuItem onClick={onAnalyze}>
          <Sparkles className="mr-2 h-4 w-4" />
          Re-analyze
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={onDelete}
          className="text-red-600 focus:text-red-600"
        >
          <Trash2 className="mr-2 h-4 w-4" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}