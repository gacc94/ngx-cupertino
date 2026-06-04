let idCounter = 0;

export function generateId(prefix = "cup"): string {
    return `${prefix}-${++idCounter}`;
}
