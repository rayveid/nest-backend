import { Module } from '@nestjs/common';
import { FilesService } from './files.service';

@Module({
  providers: [FilesService],
  controllers: [],
  exports: [FilesService],
})
export class FilesModule {}
