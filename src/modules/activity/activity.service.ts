import { Injectable } from '@nestjs/common';
import { groupBy } from 'lodash';
import { ActivityRepository } from './activity.repository';
import { GetActivityDto } from './dto/get-activity.dto';

@Injectable()
export class ActivityService {
  constructor(
    private readonly activityRepository: ActivityRepository
  ) {}

  private aggregate(fields: string[], data: any[], grouped: any) {
    if (!fields.length) {
      const hours = data.reduce((sum, item) => sum + item.hours, 0);
      return [{ ...grouped, hours }];
    }

    const field = fields[0];
    let groupField = field;
    if (groupField === 'project' || groupField === 'employee') {
      groupField += '.name';
    }
    const groups = groupBy(data, groupField);
    let result = [];
    for (const group of Object.values(groups)) {
      const currentGroup = { ...grouped, [field]: group[0][field] };
      result = result.concat(this.aggregate(fields.slice(1), group, currentGroup));
    }
    return result;
  }

  public async getActivities(filter: GetActivityDto) {
    const activities = await this.activityRepository.getActivities();
    if (!filter?.aggregations?.length) {
      return {
        columns: Object.keys(activities[0]),
        data: activities,
      };
    }
    const result = this.aggregate(filter.aggregations, activities, {});
    return {
      columns: [...filter.aggregations, 'hours'],
      data: result,
    };
  }
}
