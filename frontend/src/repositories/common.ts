// Repositories contain our service logic to bridge application with web API


export function getOutputType(inType: string) {
    if(inType === 'int') {
        return 'NUMBER';
    } else if(inType === 'bool') {
        return 'BOOLEAN';
    } else if(inType === 'string') {
        return 'ID_STRING';
    } else if(inType === 'obj') {
        return 'EXPANDED_OBJ';
    } else {
        return '';
    }
}
