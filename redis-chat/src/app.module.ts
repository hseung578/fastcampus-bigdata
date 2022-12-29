import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ChatModule } from './gateway/chat.module';

@Module({
  imports: [ChatModule],
  controllers: [AppController],
})
export class AppModule {}
