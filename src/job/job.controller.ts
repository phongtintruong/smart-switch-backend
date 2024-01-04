import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  Req,
  Request,
} from '@nestjs/common';
import { CreateJobDto, DeleteJobDto } from 'src/interfaces/job.interface';
import { JobService } from './job.service';

@Controller('job')
export class JobController {
  constructor(private jobService: JobService) {}

  @Post()
  createJob(@Body() createJobDto: CreateJobDto, @Req() req) {
    const user_id = req.user.user_id;
    createJobDto.author_id = user_id;

    return this.jobService.create(createJobDto);
  }

  @Delete(':id')
  deleteJob(@Request() req, @Param() params: any) {
    const user_id = req.user.user_id;
    const job_id = params.id;

    const deleteJobDto: DeleteJobDto = { user_id, job_id };
    return this.jobService.delete(deleteJobDto);
  }
}
