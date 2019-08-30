import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@control/config/config.module';
import { JwtModule } from '@nestjs/jwt';
import { DatabaseModule } from '@control/db/database.module';
import { ControlControllers } from '@control/api/controllers';
import { ControlServices } from '@control/api/services';
import { ControlEntities } from '@control/db/entities';
import { ControlPassport } from '@control/common/passport';

@Module({
  imports: [
    ConfigModule,
    DatabaseModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
        secret: 'leonelhs',
        signOptions: {
            expiresIn: '10d',
        },
    }),
    TypeOrmModule.forFeature([ ...ControlEntities ]),
  ],
  controllers: [ ...ControlControllers ],
  providers: [  ...ControlServices, ...ControlPassport ],
  exports: [ ...ControlServices ],
})
export class AppModule {}
