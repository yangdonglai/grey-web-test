import { Controller, Get, Param, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { FileService } from './file.service';
import { Response } from 'express';

@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService, private readonly fileService: FileService) { }

  @Get('js/:token')
  async getHello1(@Param('token') token: string, @Res() res: Response) {
    try {
      const fileContent = await this.appService.getApiFile(token);
      // 返回文件内容
      res.contentType('application/javascript');
      res.send(fileContent);
    } catch (error) {
      // 处理错误
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  }
  @Get('update')
  async updateVersionMap() {
    await this.appService.updateVersionMap();
    return { message: 'Success!' };
  }
}
