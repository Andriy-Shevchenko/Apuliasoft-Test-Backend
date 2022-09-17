import { Module } from '@nestjs/common';
import { ActivityController } from './activity.controller';
import { ActivityService } from './activity.service';
import { ActivityRepository } from './activity.repository';

@Module({
  imports: [],
  providers: [ActivityService, ActivityRepository],
  exports: [ActivityService, ActivityRepository],
  controllers: [ActivityController]
})
export class ActivityModule {}
