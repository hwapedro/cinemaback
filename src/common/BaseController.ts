import { PaginationQuery } from "./interfaces";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const Busboy = require('busboy');

export default class BaseController {

  constructor () {

  }

  /**
   * @description: need to use everywhere, where api error response is made
   * @param message: string - custom english message
   */
  protected wrapError (message: string): object {
    return {
      success: false, message,
    };
  }

  /**
   * @description: need to use everywhere, where api success response is made
   * @param options - additional fields in the response json
   */
  protected wrapSuccess (options?: object): object {
    return {
      success: true,
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

  protected getHttpFile (req) {
    return new Promise(resolve => {
      const chunks = [];

      const busboy = new Busboy({ headers: req.headers });

      busboy.on('file', function(fieldname, file) {
        file.on('data', chunk => chunks.push(chunk));
      });

      busboy.on('finish', async () => {
        resolve(Buffer.concat(chunks));
      });
      req.pipe(busboy);
    })
  }
}
