"use client";

import { Calendar as CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar, CalendarProps } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { timezonedDayJS } from "@/instances/dayjs";
import { cn } from "@/lib/utils";
import { ComponentProps, useState } from "react";

export function DatePicker({
  defaultDate,
  date = defaultDate,
  setDate,
  disabledModifier,
  disabled,
  isLoading,
}: {
  date?: Date;
  defaultDate?: Date;
  disabledModifier?: CalendarProps["disabled"];
  setDate: (newDate: typeof date) => void;
} & Pick<ComponentProps<typeof Button>, "disabled" | "isLoading">) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          disabled={disabled}
          isLoading={isLoading}
          shouldShowChildrenOnLoading
          variant={"outline"}
          className={cn(
            "justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="h-4 w-4" />
          {date ? timezonedDayJS(date).format("L") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-auto p-0">
        <Calendar
          disabled={disabledModifier}
          mode="single"
          selected={date}
          onSelect={(date) => {
            setIsOpen(false);
            setDate(date);
          }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}