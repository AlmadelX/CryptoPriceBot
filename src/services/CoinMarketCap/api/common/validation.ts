export function isObject(arg: unknown): arg is object {
    return !!(typeof arg === 'object' && arg);
}

export function isString(arg: unknown): arg is string {
    return typeof arg === 'string';
}

export function isNumber(arg: unknown): arg is number {
    return typeof arg === 'number';
}
