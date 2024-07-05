import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TanksModule } from './tanks/tanks.module';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
  }), TanksModule

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
