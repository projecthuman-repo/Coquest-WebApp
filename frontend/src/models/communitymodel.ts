import { Topic, Image, Location } from "./common";
import { User } from "./usermodel";

export type Community = {
    id: String;
    name: String;
    description: String;
    // Expandable
    members: User[] | string[];
    // Set of descriptors to help distinguish communities  
    tags: [Topic];
    // Coordinate on the world map situated in the relative area of a community 
    location: Location;
    images: Image[];
};

// TODO: Business logic to bridge application with web API

// TODO: Use RXJS to fetch communities based on interest and location
// const endpoint = https://my-gateway-1njig8y6.uc.gateway.dev/regenquest?query={getRelevantCommunitiesByTags(topics, location){communityID name}}
// communities = ajax.getJson(endpoint);
// see https://www.learnrxjs.io/learn-rxjs/operators/creation/ajax
