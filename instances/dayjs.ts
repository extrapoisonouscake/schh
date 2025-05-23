import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import isBetween from "dayjs/plugin/isBetween";
import localizedFormat from "dayjs/plugin/localizedFormat"; // ES 2015
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import weekday from "dayjs/plugin/weekday";
dayjs.extend(customParseFormat);
dayjs.extend(isBetween);
dayjs.extend(timezone);
dayjs.extend(localizedFormat);
dayjs.extend(utc);
dayjs.extend(weekday)
export const INSTANTIATED_TIMEZONE = "America/Vancouver";
dayjs.tz.setDefault(INSTANTIATED_TIMEZONE);
const timezonedDayJS = (...args: any[]) => {
  return dayjs(...args).tz(INSTANTIATED_TIMEZONE);
};
const locallyTimezonedDayJS = (...args: any[]) => {
  return dayjs(...args).tz(INSTANTIATED_TIMEZONE, true);
};
const timezonedUnix = (value: number) => {
  return dayjs.unix(value).tz(INSTANTIATED_TIMEZONE);
};

timezonedDayJS.unix = timezonedUnix;

export { dayjs, locallyTimezonedDayJS, timezonedDayJS };
