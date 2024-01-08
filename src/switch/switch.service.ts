import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { SwitchUser } from 'src/interfaces/switch-user.interface';
import {
  Switch,
  CreateSwitchDto,
  UpdateSwitchDto,
} from 'src/interfaces/switch.interface';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class SwitchService {
  constructor(
    @Inject('SWITCH_USER_MODEL')
    private switchUserModel: Model<SwitchUser>,

    @Inject('SWITCH_MODEL')
    private switchModel: Model<Switch>,
  ) {}

  async getAll(userId: string) {
    const switchList = await this.switchUserModel
      .find({
        user_id: userId,
      })
      .populate('switch', 'status')
      .exec();

    return switchList;
  }

  async createOne(createSwitchDto: CreateSwitchDto) {
    if (createSwitchDto.private_key !== 'PRIVATE_KEY') {
      return { message: 'private key mismatch' };
    }

    const duplicatedSwitchModel = await this.switchModel.findOne({
      id: createSwitchDto.id,
    });

    if (duplicatedSwitchModel) {
      return  duplicatedSwitchModel.topic + '\n'
    }

    const switchObject: Switch = { id: createSwitchDto.id, topic: uuidv4() };
    const createdSwitch = new this.switchModel(switchObject);
    createdSwitch.save();

    return switchObject.topic + '\n';
  }

  async getOne(switchId: string) {
    const switchObject = await this.switchModel.findOne({ _id: switchId });

    return switchObject;
  }

  async assignOne(userId: string, switchId: string) {
    const switchObject = await this.switchModel.findOne({ id: switchId });
    if (!switchObject) {
      return {
        message: 'Switch not found',
      };
    }

    const duplicatedUserModel = await this.switchUserModel.findOne({
      user_id: userId,
      switch: switchObject._id,
    });
    if (duplicatedUserModel) {
      return {
        message: 'Duplicated',
      };
    }

    const switchUser: SwitchUser = {
      switch: switchObject._id.toString(),
      user_id: userId,
    };

    const newSwitchUser = new this.switchUserModel(switchUser);

    await newSwitchUser.save();

    return newSwitchUser;
  }

  async updateOne(updateSwitchDto: UpdateSwitchDto) {
    if (updateSwitchDto.id) {
    } else {
      return await this.switchModel.updateOne(
        { topic: updateSwitchDto.topic },
        { status: updateSwitchDto.status },
      );
    }
  }
}
