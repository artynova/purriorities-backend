import { IsInt, IsPositive } from 'class-validator';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Cat } from '../../cats/cat.entity';
import { User } from './user.entity';

@Entity('cat_ownerships')
export class CatOwnership {
    @PrimaryColumn({ length: 36 })
    userId: string;

    @ManyToOne(() => User, (user) => user.catOwnerships, {
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'userId' })
    user: User;

    @PrimaryColumn({ length: 16 })
    catNameId: string;

    @ManyToOne(() => Cat, { onDelete: 'RESTRICT' })
    @JoinColumn({ name: 'catNameId' })
    cat: Cat;

    @IsInt()
    @IsPositive()
    @Column({ default: 1 })
    level: number;

    @CreateDateColumn()
    acquireDate: Date;
}
