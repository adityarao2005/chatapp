export function allExists(...values: any[]): boolean {
    return values.every(value => value !== null && value !== undefined);
}