import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigService } from './config/config.service';
import { ConfigModule } from './config/config.module';
import { Certificador } from '@cpe';

@Module({
  imports: [ConfigModule],
  controllers: [AppController],
  providers: [AppService, ConfigService, Certificador],
})
export class AppModule {}
