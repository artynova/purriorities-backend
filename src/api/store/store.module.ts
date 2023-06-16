import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatsMapper } from '../cats/cats.mapper';
import { CatOwnership } from '../cats/entities/cat-ownership.entity';
import { Cat } from '../cats/entities/cat.entity';
import { User } from '../users/entities/user.entity';
import { StoreController } from './store.controller';
import { StoreService } from './store.service';

@Module({
    imports: [TypeOrmModule.forFeature([Cat, CatOwnership, User])],
    controllers: [StoreController],
    providers: [StoreService, CatsMapper],
})
export class StoreModule {}
