import {setKey, setLanguage, setRegion} from "react-geocode";

const setupGeocode = () => {
    setKey(process.env.REACT_APP_GOOGLE_MAPS_API_KEY!);
    setLanguage("en");
    setRegion("ca");
};

export default setupGeocode;
