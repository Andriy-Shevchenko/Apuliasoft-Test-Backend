import { Controller, Post, Body } from '@nestjs/common';
import { ActivityService } from './activity.service';
import { GetActivityDto } from './dto/get-activity.dto';

@Controller('activities')
export class ActivityController {
  constructor(
    private readonly activityService: ActivityService
  ) {}

  @Post()
  async getActivities(
    @Body() filter: GetActivityDto
  ) {
    return this.activityService.getActivities(filter);
  }
}