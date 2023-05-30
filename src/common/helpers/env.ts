import * as fs from 'fs';
import { PACKAGE_JSON_PATH } from '../constants/paths';

export function adjustNodeEnv() {
    if (process.env.NODE_ENV !== 'production') process.env.NODE_ENV = 'development';
}

export function loadAppVersion() {
    const packageJson = JSON.parse(fs.readFileSync(PACKAGE_JSON_PATH, 'utf8'));
    process.env.APP_VERSION = packageJson.version as string;
}
