import { readFileSync } from 'fs';
import { load } from 'js-yaml';
import { resolve } from 'path';

// environment-dependent core configuration
export const environmentSource = () => {
    const env = process.env.NODE_ENV || 'development';
    return {
        ...loadYaml(env),
        env,
    };
};

export const commonSource = () => loadYaml('common');

function loadYaml(name: string) {
    return load(readFileSync(resolve(`config/${name}.yaml`), 'utf8')) as Record<string, any>;
}
