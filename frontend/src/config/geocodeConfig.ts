import { setKey, setLanguage, setRegion } from "react-geocode";

const setupGeocode = () => {
	setKey(import.meta.env.VITE_GOOGLE_MAPS_API_KEY!);
	setLanguage("en");
	setRegion("ca");
};

export default setupGeocode;
