import { readFileSync, readdirSync, statSync } from 'fs';
import { load } from 'js-yaml';
import { resolve } from 'path';
import { DataSource } from 'typeorm';
import { Cat } from '../api/cats/entities/cat.entity';
import { dataSourceOptions } from '../common/helpers/database';
import { loadObject } from '../common/helpers/yaml';
import { DatabaseSettings } from '../common/types/database';

const CATS_PATH = resolve('assets', 'cats');

async function seed() {
    console.log('Start seeding database');
    const dataSource = await getDataSource();
    const catRepository = dataSource.getRepository(Cat);
    const files = readdirSync(resolve(CATS_PATH), 'utf8');
    for (const file of files) {
        const filePath = resolve(CATS_PATH, file);
        if (statSync(filePath).isFile() && file.endsWith('.yaml')) {
            const cat = loadObject<Cat>(filePath);
            await catRepository.save(cat);
        }
    }
    await dataSource.destroy();
    console.log('Finish seeding database');
}

async function getDataSource(): Promise<DataSource> {
    const env = process.env.NODE_ENV || 'development';
    const yaml = load(readFileSync(resolve(`config/${env}.yaml`), 'utf8')) as Record<string, any>;
    const databaseSettings = yaml['database'] as DatabaseSettings;
    const sourceOptions = dataSourceOptions(databaseSettings, env);
    const dataSource: DataSource = new DataSource(sourceOptions);
    await dataSource.initialize();
    return dataSource;
}

seed();
