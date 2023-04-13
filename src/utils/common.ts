export const capitalizeString = (str: string) => {
    if (!str) return '';

    return `${str[0].toUpperCase()}${str.slice(1)}`;
}

export const setMarkColor = (mark: number): string => {
    if (!mark) return 'black';

    if (mark <= 4) {
        return 'red';
    } else if (mark > 4 && mark < 8) {
        return 'black';
    } else {
        return 'goldenrod';
    }
}