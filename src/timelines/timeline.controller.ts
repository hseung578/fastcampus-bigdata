import { TimelineService } from './timeline.service';
import { Controller } from '@nestjs/common';

@Controller()
export class TimelineController {
  constructor(private readonly timelineService: TimelineService) {}
}
