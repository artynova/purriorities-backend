import { readFileSync } from 'fs';

export function loadObject<T>(path: string): T {
    return JSON.parse(readFileSync(path, 'utf8')) as T;
}
