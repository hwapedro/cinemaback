import { Injectable } from '@nestjs/common';
import { ModelUpdateOptions } from 'mongoose';
import { ImageModel, Image } from './images.model';

@Injectable()
export class ImagesService {
  constructor(

  ) { }

  create(body: Partial<Image>) {
    return ImageModel.create(body);
  }

  findById(id: string) {
    return ImageModel.findById(id);
  }

  find(conditions: any, projection?: any, options?: any) {
    return ImageModel.find(conditions, projection, options);
  }

  update(conditions: any, body: any, options?: ModelUpdateOptions) {
    return ImageModel.updateMany(conditions, body, options);
  }

  delete(conditions: any) {
    return ImageModel.deleteMany(conditions);
  }

  raw() {
    return ImageModel;
  }
}
