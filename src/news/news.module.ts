import { Module, forwardRef } from '@nestjs/common';
import { NewsService } from './news.service';
import { NewsController } from './news.controller';
import { CommentModule } from '~/comment/comment.module';

@Module({
  imports: [
    forwardRef(() => CommentModule)
  ],
  controllers: [NewsController],
  providers: [NewsService],
  exports: [NewsService],
})
export class NewsModule { }