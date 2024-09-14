export const filterUndefinedAndEmpty = (obj: Record<string, any>): Record<string, any> => {
    return Object.entries(obj).reduce((acc, [key, value]) => {
        if (value !== undefined && value !== '') {
            acc[key] = value;
        }
        return acc;
    }, {} as Record<string, any>);
};
