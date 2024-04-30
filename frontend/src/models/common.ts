import { Community } from "./communitymodel";

/* 
Calling code of a Model's business logic can request the depth of the data of interest, controlling how much of the component instances 
to return from the back-end's object manager, Mongoose.

Depth-varying properties are documented as 'expandable' properties.

By default, the properties are curtailed, or more simply, not expanded; curtailed properties solely return the ID of the containing objects.
*/

export type EnumType = { [index: string]: string };
export type TypedObject = { type: string; [key: string]: any };

export interface Model {
    readonly id: string | undefined;

    isValid(): boolean;
    getDefaultForProperty(key: string): any;
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
interface CommunityObj extends TypedObject {
    readonly type: "obj",
    objValue: Community
}

interface CommunityString extends TypedObject {
    readonly type: "string",
    strValue: string,
}

export type ExpandableCommunity = CommunityString | CommunityObj;

export enum RegisteredRepType {
    BOOLEAN = "bool",
    NUMBER = "int",
}

// TODO: Convert Registered type into a class and encapsulate free helpers assisting the type
interface RegisteredBool extends TypedObject {
    readonly type: "bool";
    boolValue: boolean;
}

interface RegisteredNumber extends TypedObject {
    readonly type: "int";
    numValue: number;
}

// Combine the variants into a discriminated union
export type Registered = RegisteredBool | RegisteredNumber;

export function isCompleteRegistration(registered: Registered): boolean {
    let complete: boolean = false;
    if(registered.type === 'bool') {
        complete = registered.boolValue!;
    }
    return complete;
}

export function getRegistrationProgress(registered: Registered): number {
    let progress: number = 0;
    if(registered.type === 'bool') {
        if(!registered.boolValue) {
            progress = 1;
        } else {
            throw new Error('Registration is complete. No need to call this function.');
        }
    } else if(registered.type === 'int') {
        progress = registered.numValue!;
    } else {
        throw new Error('Unknown registration value')
    }
    return progress
}

export interface EnumMap {
    Registered: RegisteredRepType;
    ExpandableCommunity: ExpandedRepType;
}

export function getAssociatedEnum<T extends TypedObject>(obj: T): EnumType {
    switch (obj.type) {
        case "bool":
        case "int":
            return RegisteredRepType;
        case "obj":
        case "string":
            return ExpandedRepType;
        default:
            throw new TypeError("Unknown Expandable Type");
    }
}

export function isExpandableType(obj: any): obj is TypedObject {
    return obj && typeof obj === 'object' && 'type' in obj;
}
