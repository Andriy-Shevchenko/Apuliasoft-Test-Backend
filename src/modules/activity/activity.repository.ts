import { Injectable } from '@nestjs/common';
import { activities } from '../../shared/constants/data';

@Injectable()
export class ActivityRepository {
  constructor() {}

  public async getActivities() {
    return activities;
  }
}
