import { CITIES } from "@/app/constants/constants";

export const getStreetsByCity = (cityName: string) => {
  const city = CITIES.find(
    (c) => c.city.toLowerCase() === cityName?.toLowerCase()
  );
  return city ? city.streets : [];
};
