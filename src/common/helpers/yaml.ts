import { readFileSync } from 'fs';
import { load } from 'js-yaml';

export function loadObject<T>(path: string): T {
    return load(readFileSync(path, 'utf8')) as T;
}
