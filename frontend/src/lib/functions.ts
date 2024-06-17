import { Goal, Player } from "@/types/graphql";

export function toUpOne(str: string) {
  return str
    .split(" ")
    .map((word) => {
      return word.charAt(0).toLocaleUpperCase() + word.slice(1);
    })
    .join(" ");
}

export function formaterDate(dateString: string): string {
  const [jour, mois, annee] = dateString.split("/");
  const moisEnLettres = [
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Août",
    "Septembre",
    "Octobre",
    "Novembre",
    "Décembre",
  ];
  const moisIndex = parseInt(mois, 10) - 1;
  const moisEnLettresAbrege = moisEnLettres[moisIndex];
  return `${jour} ${moisEnLettresAbrege} ${annee}`;
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
    }
    else {
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