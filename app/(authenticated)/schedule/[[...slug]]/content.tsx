"use client";
import { PageHeading } from "@/components/layout/page-heading";
import { useIsMobile } from "@/hooks/use-mobile";
import { timezonedDayJS } from "@/instances/dayjs";
import { useSearchParams } from "next/navigation";
import { useRouter } from "nextjs-toploader/app";
import { useState } from "react";
import { SCHEDULE_QUERY_DATE_FORMAT } from "./constants";
import { ScheduleDayPicker } from "./day-picker";
import { convertQueryDayToDate } from "./helpers";
import { ScheduleLoadableSection } from "./loadable-section";
import { WeekdaySlider } from "./weekday-slider";

const formatDateToStandard = (date: Date | undefined) =>
  timezonedDayJS(date).format(SCHEDULE_QUERY_DATE_FORMAT);
export function SchedulePageContent({
  initialDay,
}: {
  initialDay: string | undefined;
}) {
  const [date, setDate] = useState(convertQueryDayToDate(initialDay));

  const router = useRouter();
  const currentSearchParams = useSearchParams();

  const dateSetHandler = (newDate: Date) => {
    setDate(newDate);

    router.push(
      `/schedule${
        newDate ? `/${formatDateToStandard(newDate)}` : ""
      }?${currentSearchParams.toString()}`
    );
  };
  const isMobile = useIsMobile();
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-3">
        <PageHeading
          leftContent={
            <ScheduleDayPicker date={date} setDate={dateSetHandler} />
          }
        />
        {isMobile && (
          <WeekdaySlider
            setDate={dateSetHandler}
            startDate={timezonedDayJS(date).startOf("week").toDate()}
            currentDate={date}
          />
        )}
      </div>
      <ScheduleLoadableSection date={date} />
    </div>
  );
}
