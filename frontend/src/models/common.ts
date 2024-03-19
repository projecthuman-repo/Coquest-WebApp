import { Community } from "./communitymodel";

/* 
Calling code of a Model's business logic can request the depth of the data of interest, controlling how much of the component instances 
to return from the back-end's object manager, Mongoose.

Depth-varying properties are documented as 'expandable' properties.

By default, the properties are curtailed, or more simply, not expanded; curtailed properties solely return the ID of the containing objects.
*/

// TODO: For both Topic and Motive, define a collection with these enum variants as documents within MongoDB.
// For simplicity, sample values are hard-coded here. 
export enum Topic {
    SPORTS = "SPORTS",
    ARTS = "ARTS",
    MUSIC = "MUSIC",
    GENERATIVE_ART = "GENERATIVE_ART",
    BASKETBALL = "BASKETBALL",
}

export enum Motive {
    VOLUNTEER = "VOLUNTEER",
    INITIATER = "INITIATER",
    ORGANIZER = "ORGANIZER",
    SPECTATOR = "SPECTATOR",
}

export type Location = {
    lat: number;
    lng: number;
}

export type Image = {
    // Mime type of Image as defined by IANA
    // https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types
    contentType: string;
    path: string;
}

export type Skill = {
    skillName: string;
    skillLevel: string;
}

export type Badge = {
    badgeName: string
    badgeDescription: string
}

export type Recommendations = {
    name: string
    comment: string
}

export enum ExpandedRepType {
    EXPANDED_OBJ = "obj",
    ID_STRING = "string",
}

// Including this in the user model module might introduce a circular dependancy
export type ExpandableCommunity = {
    readonly type: ExpandedRepType,
    strValue: string,
    objValue?: never,
} | {
    readonly type: ExpandedRepType,
    objValue: Community,
    strValue?: never,
}
