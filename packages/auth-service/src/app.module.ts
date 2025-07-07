import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { DomainModule } from './domain/domain.module';

@Module({
  imports: [DomainModule],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
