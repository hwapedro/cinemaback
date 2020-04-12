import { PaginationQuery } from "./interfaces";
import Busboy from 'busboy';

export default class BaseController {

  constructor() {

  }

  /**
   * @description: need to use everywhere, where api error response is made
   * @param message: string - custom english message
   */
  protected wrapError(message: string): object {
    return {
      success: false, message,
    };
  }

  /**
   * @description: need to use everywhere, where api success response is made
   * @param options - additional fields in the response json
   */
  protected wrapSuccess(options?: object): object {
    return {
      success: true,
      ...options,
    };
  }

  protected wrapFail(options?: object): object {
    return {
      success: false,
      ...options,
    };
  }

  protected createPaginationQuery(page: number, limit: number, maxAllowedLimit: number): PaginationQuery {
    const clampedLimit = Math.min(limit, maxAllowedLimit);

    return {
      skip: page * clampedLimit,
      take: clampedLimit,
    };
  }

  /**
   * Calculate next page number given current params
   * @param currentPage Current page (starting from 0)
   * @param total Total amount of db entries
   * @param limit Limit
   */
  protected calculateNextPage(currentPage: number, total: number, limit: number): number {
    const maxPageIndex = Math.ceil(total / limit) - 1;

    if (currentPage < maxPageIndex)
      return currentPage + 1;
    return null;
  }

  protected getHttpFile(req) {
    return new Promise(resolve => {
      const chunks = [];

      const busboy = new Busboy({ headers: req.headers });

      busboy.on('file', function (fieldname, file) {
        file.on('data', chunk => chunks.push(chunk));
      });

      busboy.on('finish', async () => {
        resolve(Buffer.concat(chunks));
      });
      req.pipe(busboy);
    })
  }

  protected getFileStream(req): Promise<{ fileStream?: NodeJS.ReadableStream, busboy?: busboy.Busboy, uploadError: Error | null }> {
    return new Promise(resolve => {
      let resolved = false;

      try {
        const busboy = new Busboy({
          headers: req.headers,
          limits: {
            files: 1,
            fileSize: 5 * Math.pow(1024, 2),
          }
        });

        busboy.on('file', (fieldname, file, filename, enc, mime) => {
          if (resolved) {
            file.resume();
            return;
          }
          if (!(/image\/.+/.test(mime))) {
            // invalid mime type
            file.resume();
            resolved = true;
            return resolve({
              uploadError: new Error('Invalid MIME type: ' + mime),
            });
          }
          resolved = true;
          resolve({ fileStream: file, busboy, uploadError: null });
        });

        busboy.on('finish', () => {
          if (!resolved) {
            resolve({
              uploadError: new Error('No file passed for upload'),
            });
          }
        });

        req.pipe(busboy);

      } catch (error) {
        resolve({
          uploadError: error
        });
      }
    })
  }
}
