import { Module } from '@nestjs/common';
import { FileStorageService } from './fileStorage.service';

FileStorageService
@Module({
  imports: [],
  controllers: [],
  providers: [FileStorageService],
  exports: [FileStorageService],
})
export class FileStorageModule { }