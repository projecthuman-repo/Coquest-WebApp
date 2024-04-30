import Bio from "./Pages/Bio";
import Purpose from "./Pages/Purpose";
import Interests from "./Pages/Interests";
import Communities from "./Pages/Communities";
import RelativeLocation from "./Pages/RelativeLocation";
import { UserModelSubject } from "../../observers/userobserver";
import { Location, Image } from "../../models/common";
import { UserOptional, UserRequired } from "../../models/usermodel";
import ProfilePicture from "./Pages/ProfilePicture/ProfilePicture";

// Represents the metadata of a particular step in the registration process. 
type RegistrationPage = {
    title: string;
    view: React.ElementType;
    dataSetter: any;
}

export async function update(updatedUserData: Partial<UserRequired> & Partial<UserOptional>) {
    try {
        const userModelSubject = await UserModelSubject.getInstance();
        userModelSubject.update(updatedUserData);
    } catch(err) {
        console.error('Error initializing UserModelSubject:', err);
    }
}

export const RegistrationPages: RegistrationPage[] = [
    {
        title: "Bio",
        view: Bio,
        dataSetter: async (bio: string) => {update({biography: bio})},
    },
    {
        // Initially, we only expect the user to only upload one image, but they can opt to upload more later down the line
        title: "Profile Picture",
        view: ProfilePicture,
        dataSetter: (images: Image[]) => {update({images: images})},
    },
    {
        title: "Purpose",
        view: Purpose,
        dataSetter: (motives: string[]) => {update({motives: Array.from(motives)})},
    },
    {
        title: "Interests",
        view: Interests,
        dataSetter: (topics: string[]) => {update({topics: Array.from(topics)})},
    },
    {
        title: "Relative location",
        view: RelativeLocation,
        dataSetter: (location: Location) => {update({location: location})},
    },
    {
        title: "Layers",
        view: Communities,
        dataSetter: null,
    },
];

export const NUMPAGES = RegistrationPages.length;

export function sanitizePage(page: number) {    
    if(page <= 1) {
        return 1;
    } else if(page > NUMPAGES) {
        return NUMPAGES;
    } else {
        return page
    }
}
