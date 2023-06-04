import { AutoMap } from '@automapper/classes';
import { PrimaryGeneratedColumn } from 'typeorm';

export class Resource {
    @AutoMap()
    @PrimaryGeneratedColumn('uuid')
    id: string;
}
