import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TimeClock } from './time-clock/entities/time-clock.entity';
import { TimeClockModule } from './time-clock/time-clock.module';
import { PointRegisterModule } from './point-register/point-register.module';
import { AccountsModule } from './accounts/accounts.module';
import { SessionModule } from './session/session.module';
import { EnsureAutjenticated } from './shared/infra/http/middlewares/ensureAuthenticated';


@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'sqlite',
      host: join(__dirname, 'database.sqlite'),
      autoLoadModels: true,
      models: [TimeClock],
    }),
    TimeClockModule,
    PointRegisterModule,
    AccountsModule,
    SessionModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
    .apply(EnsureAutjenticated)
    .forRoutes({ path: 'accounts', method: RequestMethod.POST})
  }
}
