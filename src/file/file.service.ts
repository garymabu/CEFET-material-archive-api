import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { dirname, extname } from 'path';
import { writeFile, mkdir } from 'fs';
import {
  ENV_KEY,
  EnvironmentService,
} from 'src/environment/environment.service';

@Injectable()
export class FileService {
  constructor(private readonly environmentService: EnvironmentService) {}
  async saveFile(file: Express.Multer.File): Promise<string> {
    const filename = uuidv4() + extname(file.originalname);
    const path = `${__dirname}/../uploads/${filename}`;
    const dir = dirname(path);

    await new Promise<void>((resolve, error) =>
      mkdir(dir, { recursive: true }, (err) => {
        if (err) {
          console.error('Error creating directory', err);
          error(err);
        }
        resolve();
      }),
    );

    console.log('path', path);
    await new Promise<void>(async (resolve) =>
      writeFile(
        path,
        file.buffer,
        {
          flag: 'w+',
        },
        () => {
          console.log('finishied');
          resolve();
        },
      ),
    );
    return `${this.environmentService.get(ENV_KEY.FILE_SERVER_BASE_URL)}/${filename}`;
  }
}
