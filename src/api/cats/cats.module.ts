import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatsController } from './cats.controller';
import { CatsMapper } from './cats.mapper';
import { CatsService } from './cats.service';
import { CatOwnership } from './entities/cat-ownership.entity';
import { Cat } from './entities/cat.entity';
import { User } from '../users/entities/user.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Cat, CatOwnership, User])],
    controllers: [CatsController],
    providers: [CatsService, CatsMapper],
})
export class CatsModule {}
