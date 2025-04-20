import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { KnexModule } from 'nestjs-knex';
import {
  masterKnexConfigUseFactory,
  slaveKnexConfigUseFactory,
} from './shared/knex/knex.config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    KnexModule.forRootAsync(
      {
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (configService: ConfigService) =>
          masterKnexConfigUseFactory(configService),
      },
      'master',
    ),
    KnexModule.forRootAsync(
      {
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (configService: ConfigService) =>
          slaveKnexConfigUseFactory(configService),
      },
      'slave',
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
