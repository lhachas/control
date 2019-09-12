import { Module, CacheModule as Cache } from '@nestjs/common';
import { CacheService } from './cache.service';

@Module({
    imports: [
        Cache.registerAsync({
            useClass: CacheService,
        }),
    ],
    providers: [CacheService],
})
export class CacheModule {}
