import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TanksModule } from './tanks/tanks.module';
import { FuelLevelsModule } from './fuel-levels/fuel-levels.module';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
  }), 
  TanksModule, 
  FuelLevelsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
