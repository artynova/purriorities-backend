import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatsController } from './cats.controller';
import { CatsMapper } from './cats.mapper';
import { CatsService } from './cats.service';
import { Cat } from './entities/cat.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Cat])],
    controllers: [CatsController],
    providers: [CatsService, CatsMapper],
})
export class CatsModule {}
