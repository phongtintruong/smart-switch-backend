import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateHistoryDto, History } from 'src/interfaces/history.interface';

@Injectable()
export class HistoryService {
  constructor(
    @Inject('HISTORY_MODEL')
    private historyModel: Model<History>,
  ) {}

  async create(createHistoryDto: CreateHistoryDto) {
    const createdHistoryEntity = new this.historyModel(createHistoryDto);

    console.log(createdHistoryEntity);

    createdHistoryEntity.save();
  }

  async getAll(user_id: string) {
    return await this.historyModel
      .find({
        user_id: user_id,
      })
      .populate('job_id')
      .exec();
  }
}
