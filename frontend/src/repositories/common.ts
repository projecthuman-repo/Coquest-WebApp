// Repositories contain our service logic to bridge application with web API


type EnumType = { [index: string]: string };
type ExpandableType = { type: string; [key: string]: any };

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
export function toOutputFormat<T extends EnumType, K extends ExpandableType>(
    enumObj: T,
    obj: K
): Omit<K, 'type'> & { type: keyof T | undefined } {
    return {
        ...obj,
        type: getOutputType(enumObj, obj.type),
    }
}
