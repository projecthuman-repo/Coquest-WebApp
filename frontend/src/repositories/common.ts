// Repositories contain our service logic to bridge application with web API

import { EnumType, Model, TypedObject, getAssociatedEnum, isExpandableType } from "../models/common";


function getOutputType<T extends EnumType>(enumObj: T, value: string): keyof T | undefined {
    // Iterate over all keys of the enum object
    for (const key in enumObj) {
        if (enumObj[key] === value) {
            return key as keyof T;
        }
    }
    // Return undefined if no matching key is found
    return undefined;
}

// Converts any expandable object into the format that GrpahQL expects 
function transformProp<T extends EnumType, K extends TypedObject>(
    enumObj: T,
    obj: K
): Omit<K, 'type'> & { type: keyof T | undefined } {
    return {
        ...obj,
        type: getOutputType(enumObj, obj.type),
    }
}

// Transforms the entire object parameter, `inputObj`, into the format GraphQL expects.
export function toOutputFormat(inputObj: any): any {
    if (Array.isArray(inputObj)) {
        // Treat empty arrays as lack of any data
        if (inputObj.length === 0) {
            return null;
        } else {
            return inputObj.map(item => toOutputFormat(item));
        }
    } else if(inputObj === '') {
        return null
    } else if (isExpandableType(inputObj)) {
        const enumObj = getAssociatedEnum(inputObj);
        return transformProp(enumObj, inputObj);
    } else if (typeof inputObj === 'object' && inputObj !== null) {
        const processedObj: { [key: string]: any } = {};
        for (const key of Object.keys(inputObj)) {
            processedObj[key] = toOutputFormat(inputObj[key]);
        }
        return processedObj;
    } else {
        // Return the input as-is if it doesn't meet any criteria for processing
        return inputObj;
    }
}

export function replaceNullsWithDefaults<T extends Model>(obj: T): T {
    let copy: T = { ...obj };

    for (const key in copy) {
        if (copy[key] === null) {
            copy[key] = obj['getDefaultForProperty'](key);
        }
    }
    return copy;
}

export function replaceUndefinedWithNulls(obj: any) {
    let copy = { ...obj };

    for (const key in copy) {
        if (copy[key] === undefined) {
            copy[key] = null;
        }
    }
    return copy; 
}
