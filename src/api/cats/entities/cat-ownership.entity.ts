import { AutoMap } from '@automapper/classes';
import { IsInt, IsPositive } from 'class-validator';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Cat } from './cat.entity';

@Entity('cat_ownerships')
export class CatOwnership {
    @PrimaryColumn()
    userId: string;

    @ManyToOne(() => User, (user) => user.catOwnerships, {
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'userId' })
    user: User;

    @AutoMap()
    @PrimaryColumn({ length: 16 })
    catNameId: string;

    @ManyToOne(() => Cat, { onDelete: 'RESTRICT' })
    @JoinColumn({ name: 'catNameId' })
    cat: Cat;

    @AutoMap()
    @IsInt()
    @IsPositive()
    @Column({ default: 1 })
    level: number;

    @CreateDateColumn()
    acquireDate: Date;

    @AutoMap()
    @Column({ default: false })
    isAway: boolean;
}
