import { Module, Global } from '@nestjs/common';
import { MailerModule } from '@nest-modules/mailer';
import { CacheModule } from './cache/cache.module';
import { AppConfig } from '@control/config/app.config';
import { MailConfig } from '@control/config/mail.config';

@Global()
@Module({
    imports: [
        CacheModule,
        MailerModule.forRoot(MailConfig),
    ],
    providers: [
        {
            provide: 'APP.CONFIG',
            useValue: AppConfig,
        },
    ],
    exports: ['APP.CONFIG'],
})
export class ConfigModule {}
