export type requiredType = (value: string) => string | undefined
export const required: requiredType = (value) => {
    if (value) return undefined;
    return "Field is required";
}
export const maxLengthCreator = (maxLength: number): requiredType => (value) => {
    if (value.length > maxLength) return `max length is ${maxLength} symbols`;
    return undefined;

}
