import { City } from "../types/interfaces";

export const THEMES = {
  DARK: "dark",
  LIGHT: "light",
};

export const CATEGORIES = {
  COFFEE: "coffee",
  TEA: "tea",
  DESSERT: "dessert",
};

export const CITIES: City[] = [
  {
    city: "Tbilisi",
    streets: [
      "Rustaveli Avenue",
      "Agmashenebeli Avenue",
      "Chavchavadze Avenue",
      "Vake Street",
      "Abashidze Street",
      "Melikishvili Street",
      "Tsinamdzgvrishvili Street",
      "Saburtalo Street",
      "Marjanishvili Street",
      "Beliashvili Street",
    ],
  },
  {
    city: "Milan",
    streets: [
      "Corso Buenos Aires",
      "Via Montenapoleone",
      "Corso Vittorio Emanuele II",
      "Via della Moscova",
      "Via Torino",
      "Via Manzoni",
      "Viale Certosa",
      "Corso Venezia",
      "Via Brera",
      "Corso Magenta",
    ],
  },
  {
    city: "Chicago",
    streets: [
      "Michigan Avenue",
      "State Street",
      "Wacker Drive",
      "Clark Street",
      "Dearborn Street",
      "LaSalle Street",
      "Madison Street",
      "Randolph Street",
      "Roosevelt Road",
      "Halsted Street",
    ],
  },
];

export const RATING_STARS = 5;
