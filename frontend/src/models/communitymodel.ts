import { ExpandableUser, Image, Location } from "./common";

// TODO: Convert to class to encapsulate property manipulations
export type Community = {
    readonly id: string | undefined;
    name: string;
    description: string;
    // Expandable
    members: ExpandableUser[] | string[] | null | undefined;
    // Set of descriptors to help distinguish communities  
    tags: string[] | null | undefined;
    // Coordinate on the world map situated in the relative area of a community 
    location: Location | null | undefined;
    images: Image[] | null | undefined;
};

// TODO: Business logic to bridge application with web API

// TODO: Use RXJS to fetch communities based on interest and location
// const endpoint = https://my-gateway-1njig8y6.uc.gateway.dev/regenquest?query={getRelevantCommunitiesByTags(topics, location){communityID name}}
// communities = ajax.getJson(endpoint);
// see https://www.learnrxjs.io/learn-rxjs/operators/creation/ajax
