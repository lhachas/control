import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@control/config/config.module';
import { DatabaseModule } from '@control/db/database.module';
import { ControlControllers } from '@control/api/controllers';
import { ControlServices } from '@control/api/services';
import { ControlEntities } from '@control/api/models';
import { AuthModule } from '@control/api/auth/auth.module';

@Module({
  imports: [
    ConfigModule,
    DatabaseModule,
    AuthModule,
    TypeOrmModule.forFeature([ ...ControlEntities ]),
  ],
  controllers: [ ...ControlControllers ],
  providers: [  ...ControlServices ],
  exports: [ ...ControlServices ],
})
export class AppModule {}
