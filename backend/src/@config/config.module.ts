import { Module, Global } from '@nestjs/common';
import { ConfigService } from './config.service';
import { CacheModule } from './cache/cache.module';

@Global()
@Module({
    imports: [CacheModule],
    providers: [
        {
            provide: ConfigService,
            useValue: new ConfigService(),
        },
    ],
    exports: [ConfigService],
})
export class ConfigModule {}
