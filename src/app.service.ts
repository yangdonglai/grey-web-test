import { Injectable } from '@nestjs/common';
import { FileService } from './file.service';
import * as path from 'path';
import * as fs from 'fs'
@Injectable()
export class AppService {
  versionMap: Record<string, string> = {}
  constructor(private readonly fileService: FileService) {
    this.updateVersionMap();
  }
  getHello(): string {
    return 'Hello World!';
  }
  updateVersionMap() {
    const filePath = path.join('static', 'grey.config.json');
    this.versionMap = JSON.parse(fs.readFileSync(filePath).toString());
  }
  async getApiFile(token: string): Promise<string> {
    const version = this.versionMap[token] || '1.0.0';
    const filePath = path.join('static', `api.v${version}.js`);
    const fileContent = await this.fileService.getCachedFile(filePath);
    return fileContent;
  }
}
