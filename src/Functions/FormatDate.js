import { format, formatRelative } from "date-fns";
import { enGB } from "date-fns/locale/en-GB";

// This file utilises date-fns and new methods are created that can be used globally to format dates a certain way 

const formatRelativeLocale = {
  lastWeek: "'Last' eeee 'at' h:mmaaa",
  yesterday: "'Yesterday at' h:mmaaa",
  today: "'Today at' h:mmaaa",
  tomorrow: "'Tomorrow at' h:mmaaa",
  nextWeek: "eeee 'at' h:mmaaa",
  other: "eeee do MMMM yyyy 'at' h:mmaaa",
};

const locale = {
  ...enGB,
  formatRelative: (token) => formatRelativeLocale[token],
};

export function formatDefaultDate(date) {
  return format(new Date(date), "yyyy-MM-dd");
}

export function formatDate(date) {
  return format(new Date(date), "do MMMM yyyy");
}

export function formatDayOfWeekDate(date) {
  return format(new Date(date), "eeee do MMMM yyyy");
}

export function formatTime(date) {
  return format(new Date(date), "h:mmaaa");
}

export function formatDateTime(date) {
  return format(new Date(date), "do MMMM yyyy 'at' h:mmaaa");
}

export function formatDayOfWeekTimeDate(date) {
  return format(new Date(date), "h:mmaaa 'on' eeee do MMMM yyyy");
}

export function formatDayOfWeekDateTime(date) {
  return format(new Date(date), "eeee do MMMM yyyy 'at' h:mmaaa");
}

export function formatDateTimeRelative(date) {
  return formatRelative(new Date(date), new Date(), { locale });
}
