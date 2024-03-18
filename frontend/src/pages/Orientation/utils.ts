import Bio from "./Pages/Bio";
import Purpose from "./Pages/Purpose";
import Interests from "./Pages/Interests";
import Communities from "./Pages/Communities";
import RelativeLocation from "./Pages/RelativeLocation";
import { updateUserSub } from "../../repositories/userrepository";
import { Motive, Topic, Location } from "../../models/common";

// Represents the metadata of a particular step in the registration process. 
type RegistrationPage = {
    title: string;
    view: React.ElementType;
    dataSetter: any;
}

export const RegistrationPages: RegistrationPage[] = [
    {
        title: "Bio",
        view: Bio,
        dataSetter: (bio: string) => {updateUserSub({biography: bio})},
    },
    {
        title: "Purpose",
        view: Purpose,
        dataSetter: (motives: Motive[]) => {updateUserSub({motives: Array.from(motives)})},
    },
    {
        title: "Interests",
        view: Interests,
        dataSetter: (topics: Topic[]) => {updateUserSub({topics: Array.from(topics)})},
    },
    {
        title: "Relative location",
        view: RelativeLocation,
        dataSetter: (location: Location) => {updateUserSub({location: location})},
    },
    {
        title: "Layers",
        view: Communities,
        dataSetter: null,
    },
];

const NUMPAGES = RegistrationPages.length;

export function sanitizePage(page: number) {    
    if(page <= 1) {
        return 1;
    } else if(page > NUMPAGES) {
        return NUMPAGES;
    } else {
        return page
    }
}
