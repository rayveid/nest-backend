import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as uuid from 'uuid';
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class FilesService {
  async create(file): Promise<string> {
    try {
      const fileName = uuid.v4() + '.png';
      const filePath = path.resolve(__dirname, '..', 'static');
      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, { recursive: true });
      }
      fs.writeFileSync(path.join(filePath, fileName), file.buffer, {});
      return fileName;
    } catch (e) {
      throw new HttpException(
        'Error while writing file',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
