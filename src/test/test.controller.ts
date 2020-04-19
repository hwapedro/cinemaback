import { Controller, Get, Param, Req, Res, UseGuards, Post, Body, Put, Delete } from '@nestjs/common';
import BaseController from '../common/BaseController';
import { ApiTags } from '@nestjs/swagger';

@Controller('api/v1/test')
@ApiTags('test')
export class TestController extends BaseController {
  constructor(
  ) {
    super();
  }
}

