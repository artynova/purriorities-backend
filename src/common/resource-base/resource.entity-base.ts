import { PrimaryGeneratedColumn } from 'typeorm';

export class Resource {
    @PrimaryGeneratedColumn('uuid')
    id: string;
}
