
export function toTitleCase(str: string) {
    str = str.replace(/_/g, " ");
    return str.replace(
        /\w\S*/g,
        text => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase()
    );
}

