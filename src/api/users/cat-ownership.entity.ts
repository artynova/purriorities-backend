import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { Cat } from '../cats/cat.entity';
import { User } from './user.entity';

@Entity('cat_ownerships')
export class CatOwnership {
    @PrimaryColumn()
    userId: string;

    @PrimaryColumn()
    catNameId: string;

    @ManyToOne(() => User, (user) => user.catOwnerships)
    user: User;

    @ManyToOne(() => Cat)
    cat: Cat;

    @Column({ default: 1 })
    level: number;

    @CreateDateColumn()
    acquireDate: Date;
}
