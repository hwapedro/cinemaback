import { Controller, Get, Param, Req, Res, UseGuards, Post, Body, Put, Delete, ParseIntPipe } from '@nestjs/common';
import { ImagesService } from './images.service';
import BaseController from '../common/BaseController';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { QueryValidator } from '~/common/validators';
import { FileStorageService } from '~/fileStorage/fileStorage.service';

@Controller('api/v1/images')
@ApiTags('auth')
export class ImagesController extends BaseController {
  constructor(
    private readonly imagesService: ImagesService,
    private readonly fileStorageService: FileStorageService,
  ) {
    super();
  }

  @Post('/upload')
  @UseGuards(AuthGuard('jwt'))
  async upload(
    @Param('id') id: string,
    @Req() req,
  ) {
    const { fileStream, uploadError } = await this.getFileStream(req);

    if (uploadError) {
      return this.wrapError(`Error: ${uploadError.message}`);
    }

    const url = await this.fileStorageService.upload(fileStream);
    const image = await this.imagesService.create({
      url
    });

    return this.wrapSuccess({
      _id: image._id,
      url,
    });
  }

  @Delete('/:id')
  @UseGuards(AuthGuard('jwt'))
  async delete(
    @Param('id') id: string,
    @Req() req,
  ) {
    await this.imagesService.raw()
      .findByIdAndDelete(id);
    return this.wrapSuccess();
  }
}

