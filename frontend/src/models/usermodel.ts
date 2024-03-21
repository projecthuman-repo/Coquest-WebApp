import { Topic, Motive, Image, Location, Skill, Badge, Recommendations, ExpandableCommunity, Registered, RegisteredRepType, Model } from "./common";

export interface UserRequired {
    readonly _id: string;
    name: string;
    username: string;
    email: string;
}

export interface UserOptional {
    registered: Registered | number | boolean;
    location: Location | null;
    images: Image[] | null;
    motives: Motive[] | null;
    biography: string | null;
    topics: Topic[] | null;
    communities: ExpandableCommunity[] | null;
    skills: Skill[] | null;
    badges: Badge[] | null;
    currentLevel: number;
    recommendations: Recommendations[] | null;
}

export class User implements Model {
    readonly id: string;
    name: string;
    username: string;
    email: string;
    /*
    The progress of registration; it is either a boolean or a Number[1, NUM_OF_STEPS].
    
    Interpretations:
    - Boolean: Signifies whether the user has yet to start or has completed the registration process 
    - Number[1, NUM_OF_STEPS]: Indicates the step on which the user is actively working
    */
    registered: Registered;
    /*
    Location uses null to represent safe empty state to prevent prepopulating map data
    when geolocating for the first time  
    */
    location: Location | null | undefined;
    images: Image[] | null | undefined;
    motives: Motive[] | null | undefined;
    biography: string | null | undefined;
    topics: Topic[] | null | undefined;
    // Expandable set of affliated communities
    communities: ExpandableCommunity[] | null | undefined;
    // The following properties are a part of the reputation system
    skills: Skill[] | null | undefined;
    badges: Badge[] | null | undefined;
    currentLevel: number;
    recommendations: Recommendations[] | null | undefined;

    setNumRegistered(newStep: number) {
        this.registered = {
            type: RegisteredRepType.NUMBER,
            numValue: newStep,
        }
    }

    setBoolRegistered(newStatus: boolean) {
        this.registered = {
            type: RegisteredRepType.BOOLEAN,
            boolValue: newStatus,
        };
    }

    isValid() {
        return (this.currentLevel ?? -1) >= 0;
    }

    getDefaultForProperty(key: string): any {
        const defaultValues: { [key: string]: any } = {
            images: [],
            motives: [],
            biography: "",
            topics: [],
            communities: [],
            skills: [],
            badges: [],
            recommendations: [],
        };

        return defaultValues.hasOwnProperty(key) ? defaultValues[key] : null;
    }

    constructor(params: UserRequired & Partial<UserOptional> = {_id: "", name: "", email: "", username: "", currentLevel: -1}) {
        this.id = params._id;
        this.name = params.name;
        this.username = params.username;
        this.email = params.email;

        this.registered = {type: RegisteredRepType.BOOLEAN, boolValue: false};
        if(params.registered) {
            if(typeof params.registered === 'boolean') {
                this.setBoolRegistered(params.registered);
            } else if(typeof params.registered === 'number') {
                this.setNumRegistered(params.registered);
            } else if('type' in params.registered) {
                this.registered = params.registered;
            }
        }
        
        this.location = params.location;
        this.images = params.images;
        this.motives = params.motives;
        this.biography = params.biography;
        this.topics = params.topics;
        // Note: on instantiation, assume the user passes a list of strings
        this.communities = params.communities;
        this.skills = params.skills;
        this.badges = params.badges;
        this.currentLevel = params.currentLevel ?? 0;
        this.recommendations = params.recommendations;
    }
}
