import * as path from 'path';

export const ENV_PATH = path.resolve(
    `env/.env.${process.env.NODE_ENV === 'production' ? 'prod' : 'dev'}`,
);
export const ENV_TEMPLATE_PATH = path.resolve('env/.env.template');
export const SERVE_STATIC_PATH = path.resolve(
    'purriorities-frontend/build/web',
);
export const PACKAGE_JSON_PATH = path.resolve('package.json');
