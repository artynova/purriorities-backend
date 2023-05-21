import { adjustNodeEnv } from './helpers/env.helper';
adjustNodeEnv();
import * as fs from 'fs';
import * as enquirer from 'enquirer';
import { ENV_PATH, ENV_TEMPLATE_PATH } from './constants/paths';

async function promptForValues(template: string) {
    const prompts = [];
    const lines = template.split('\n');
    for (const line of lines) {
        const [key, value] = line.split('=');
        const question = {
            type: 'input',
            name: key,
            message: `Enter a value for ${key}:`,
            initial: value || '',
        };
        prompts.push(question);
    }
    return enquirer.prompt(prompts);
}

function generateEnv(variables: object) {
    let envContents = '';
    for (const key in variables) {
        envContents += `${key}=${variables[key]}\n`;
    }
    fs.writeFileSync(ENV_PATH, envContents);
    console.log(
        `Successfully generated a ${process.env.NODE_ENV} env file at ${ENV_PATH}`,
    );
}

export async function initEnv() {
    try {
        if (fs.existsSync(ENV_PATH)) {
            console.log(
                `${process.env.NODE_ENV} env file exists, skip generation`,
            );
            return;
        }
        console.log(`Generating a ${process.env.NODE_ENV} env file`);
        const template = fs.readFileSync(ENV_TEMPLATE_PATH, 'utf8');
        const variables = await promptForValues(template);
        generateEnv(variables);
    } catch (error) {
        console.error('Could not generate env file:', error);
        process.exit(1);
    }
}

initEnv();
