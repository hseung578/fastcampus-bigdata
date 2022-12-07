import { Module, CacheModule, CacheStore } from '@nestjs/common';
import { AppController } from './app.controller';
import { UserModule } from './users/user.module';
import { PostModule } from './posts/post.module';

@Module({
  imports: [UserModule, PostModule],
  controllers: [AppController],
})
export class AppModule {}
