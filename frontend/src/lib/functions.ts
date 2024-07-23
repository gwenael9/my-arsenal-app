import { useLangue } from "@/components/Layout/LangueContext";
import { Player } from "@/types/graphql";

export function toUpOne(str: string) {
  return str
    .split(" ")
    .map((word) => {
      return word.charAt(0).toLocaleUpperCase() + word.slice(1);
    })
    .join(" ");
}

export function formaterDate(date: string) {
  const [day, month, year] = date.split("/").map(Number);
  const { langue } = useLangue();

  const dateFormat = new Date(year, month - 1, day);
  const options: Intl.DateTimeFormatOptions = {
    // weekday: 'long',
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const locale = langue ? "fr-FR" : "en-US";
  const formatDate = dateFormat.toLocaleDateString(locale, options);

  if (langue) {
    const [dayPart, monthPart, yearPart] = formatDate.split(" ");
    return `${dayPart} ${toUpOne(monthPart)} ${yearPart}`;
  }

  return formatDate;
}

const flags: { [key: string]: string } = {
  Angleterre: "gb-eng",
  France: "fr",
  Norvège: "no",
  Brésil: "br",
  Belgique: "be",
  Ukraine: "ua",
  Allemagne: "de",
  Egypte: "eg",
  Ghana: "gh",
  Italie: "it",
  Japon: "jp",
  Pologne: "pl",
  Portugal: "pt",
};

export const flagCountry = (country: string) => flags[toUpOne(country)] || "";

export const getName = (name: Player | any, item?: string) => {
  let fullname;
  if (name) {
    if (name.lastname == "smith-rowe") {
      fullname = `${name.firstname} Smith-Rowe`;
    } else if (name.lastname == "csc") {
      fullname = name.lastname.toUpperCase();
    } else {
      fullname = `${name.firstname} ${name.lastname}`;
    }
    return item === "buteur" ? fullname.toUpperCase() : toUpOne(fullname);
  }

  return "";
};

export const modifNameTeam = (item: string) => {
  if (item.includes("Manchester United")) {
    return "Man. United";
  } else if (item.includes("Manchester City")) {
    return "Man. City";
  } else if (item.includes("Nottingham Forest")) {
    return "Nottingham";
  }
  return item;
};

// obtenir le ratio but / match
export const getRatioGoalByMatch = (item: number, total: number, value?: boolean) => {
  const number = value ? 100 : 1;
  const ratio = (item / total) * number;
  return ratio.toFixed(2);
};