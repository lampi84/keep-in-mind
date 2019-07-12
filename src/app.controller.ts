import { Controller, Get, Res, Post, Body, Logger, HttpStatus } from '@nestjs/common';
import { AppService } from './app.service';
import { getEnabledCategories } from 'trace_events';

@Controller()
export class AppController {
  private readonly logger = new Logger(AppController.name);

  private static notes: string[] = [];

  constructor(private readonly appService: AppService) { }

  @Get('/')
  getIndex(@Res() res) {
    res.sendFile(__dirname + '/index.html');
  }

  @Post('/add')
  addPost(@Body() body, @Res() res) {

    this.logger.log('Adding note: ' + body.note);
    AppController.notes.push(body.note);
    return res.redirect('/');

  }

  @Get('/notes')
  getEnabledCategories(@Res() res) {
    res.status(HttpStatus.OK).json(AppController.notes);
  }

}
