export function toUpOne(str: string) {
    return str.replace(/\b\w/g, function(char) {
        return char.toUpperCase();
    });
}