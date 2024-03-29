import { request } from "graphql-request";

function onCheck(setFuncs: React.Dispatch<React.SetStateAction<Set<string>>>[], prev: Set<any>, e: React.ChangeEvent<HTMLInputElement>) {
    const { name, checked } = e.target;
    const updatedFlags = new Set(prev);
    
    if (checked) {
        updatedFlags.add(name);
    } else {
        updatedFlags.delete(name);
    }

    setFuncs.forEach(elem => {
        elem(updatedFlags);
    });
}

// Executes the provided `query` string and coerces the resulting list into a list of strings.
// Assumes the sole fetched document is called options.
export async function fetchEnumerable(query: string): Promise<Array<string>> {
    try {
        const data: any = await request(process.env.REACT_APP_API!, query);
        return data.options.map((opt: any) => opt.name);
    } catch(error: any) {
        throw new Error(error);
    }
}

export function capitalize(str: string) {
    return str.charAt(0) + str.substring(1).toLowerCase();
}

export default onCheck;
