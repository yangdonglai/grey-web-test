import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as cacheManager from 'cache-manager';
import { promisify } from 'util';

const readFileAsync = promisify(fs.readFile);

@Injectable()
export class FileService {
    private cache: cacheManager.MemoryCache;

    constructor() {
        // 使用 memoryStore 作为缓存
        cacheManager.caching('memory', {
            ttl: 24*60*60*1000, // 缓存时间，单位毫秒
        }).then((cache) => {
            this.cache = cache;
        });
    }

    async getCachedFile(filePath: string): Promise<string> {
        // 尝试从缓存中获取文件内容
        const cachedContent = await this.cache.get<string>(filePath);

        if (cachedContent) {
            // 如果缓存中存在，直接返回缓存的内容
            return cachedContent;
        } else {
            // 从文件中读取内容
            const fileContent = await readFileAsync(filePath, 'utf-8');

            // 将文件内容缓存到内存中
            await this.cache.set(filePath, fileContent);

            // 返回文件内容
            return fileContent;
        }
    }
}
