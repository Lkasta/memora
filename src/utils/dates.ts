import { format, isToday, isYesterday, isThisWeek, parseISO } from "date-fns";
import { toZonedTime } from "date-fns-tz";
import { ptBR } from "date-fns/locale";

function capitalizeDay(day: string) {
  return day
    .split("-")
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ");
}

export function formatMemorieDate(date: Date) {
  if (isToday(date)) return "Hoje";
  if (isYesterday(date)) return "Ontem";
  if (isThisWeek(date, { weekStartsOn: 1 })) {
    return capitalizeDay(format(date, "EEEE", { locale: ptBR }));
  }
  return `${capitalizeDay(format(date, "EEEE", { locale: ptBR }))}, ${format(date, "d")}`;
}

export function formatMemorieDateDetailed(date: Date) {
  let weekDay = format(date, "EEE", { locale: ptBR });
  weekDay = weekDay.replace(".", "");
  weekDay = weekDay[0].toUpperCase() + weekDay.slice(1);

  return `${format(date, "dd/MM/yyyy")} - ${weekDay.slice(0, 3)} ${format(date, "HH'h'mm")}`;
}

export const getDateWithTimezone = (
  date: Date | string = new Date(),
  timeZone: string = "America/Sao_Paulo",
) => {
  let zonedDate;

  if (typeof date === "string") {
    zonedDate = toZonedTime(parseISO(date), timeZone);
  } else if (date instanceof Date) {
    zonedDate = toZonedTime(date, timeZone);
  } else {
    throw new Error("Invalid date format");
  }

  return zonedDate;
};
