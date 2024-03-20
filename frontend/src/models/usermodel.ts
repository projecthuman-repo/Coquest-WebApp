import { Topic, Motive, Image, Location, Skill, Badge, Recommendations, ExpandableCommunity, Registered, RegisteredRepType } from "./common";

export interface UserRequired {
    readonly _id: string;
    name: string;
    username: string;
    email: string;
}

export interface UserOptional {
    registered: Registered | number | boolean;
    location: Location | null;
    images: Image[];
    motives: Motive[];
    biography: string;
    topics: Topic[];
    communities: ExpandableCommunity[];
    skills: Skill[];
    badges: Badge[];
    currentLevel: number;
    recommendations: Recommendations[];
}

export class User {
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
    location: Location | null;
    images: Image[];
    motives: Motive[];
    biography: string;
    topics: Topic[];
    // Expandable set of affliated communities
    communities: ExpandableCommunity[];
    // The following properties are a part of the reputation system
    skills: Skill[];
    badges: Badge[];
    currentLevel: number;
    recommendations: Recommendations[];

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
        return this.currentLevel >= 0;
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
        
        this.location = params?.location ?? {lat: 0, lng: 0};
        this.images = params?.images ?? [];
        this.motives = params?.motives ?? [];
        this.biography = params?.biography ?? "";
        this.topics = params?.topics ?? [];
        // Note: on instantiation, assume the user passes a list of strings
        this.communities = params?.communities ?? [];
        this.skills = params?.skills ?? [];
        this.badges = params?.badges ?? [];
        this.currentLevel = params?.currentLevel ?? 0;
        this.recommendations = params?.recommendations ?? [];
    }
}
