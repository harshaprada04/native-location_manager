import axios from "axios";

const access_key = "9d6783ca8bb0417eba717c88d3500620";
const locationAPI = axios.create({
  baseURL: "https://api.opencagedata.com/",
});

export const getLocationDetails = (longitude: number, latitude: number) => {
  return locationAPI.get(
    `geocode/v1/json?key=${access_key}&q=${latitude}+${longitude}&pretty=1&no_annotations=1`
  );
};
