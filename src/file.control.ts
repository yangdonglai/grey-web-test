import { Controller, Get, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { FileService } from './file.service';
import path from 'path';

@Controller('files')
export class FilesController {
  constructor(private readonly fileService: FileService) {}

  @Get(':filename')
  async getFile(@Param('filename') filename: string, @Res() res: Response) {
    try {
      const filePath = path.join(__dirname, 'static', filename);
      const fileContent = await this.fileService.getCachedFile(filePath);

      // 返回文件内容
      res.send(fileContent);
    } catch (error) {
      // 处理错误
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  }
}
