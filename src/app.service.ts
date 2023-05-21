import { Injectable, OnApplicationBootstrap } from '@nestjs/common';

@Injectable()
export class AppService implements OnApplicationBootstrap {
    async onApplicationBootstrap() {
        // TODO implement logic for updating cat archetypes from JSON
    }
}
