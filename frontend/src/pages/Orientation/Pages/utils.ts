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

export function capitalize(str: string) {
    return str.charAt(0) + str.substring(1).toLowerCase();
}

export default onCheck;
