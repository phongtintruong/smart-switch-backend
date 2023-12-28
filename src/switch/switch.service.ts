import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { SwitchUser } from 'src/interfaces/switch-user.interface';
import { Switch, CreateSwitchDto } from 'src/interfaces/switch.interface';
import { User } from 'src/interfaces/user.interface';

@Injectable()
export class SwitchService {
  constructor(
    @Inject('SWITCH_USER_MODEL')
    private switchUserModel: Model<SwitchUser>,

    @Inject('SWITCH_MODEL')
    private switchModel: Model<Switch>,
  ) {}

  async createOne(createSwitchDto: CreateSwitchDto) {
    if (createSwitchDto.private_key !== 'PRIVATE_KEY') {
      return { message: 'private key mismatch' };
    }

    const switchObject: Switch = { id: createSwitchDto.id, topic: null };
    const createdSwitch = new this.switchModel(switchObject);
    try {
      await createdSwitch.save();
    } catch (e) {
      console.log(e);
    }

    return createdSwitch;
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
      switch_id: switchObject._id,
    });
    if (duplicatedUserModel) {
      return {
        message: 'Duplicated',
      };
    }

    const switchUser: SwitchUser = {
      switch_id: switchObject._id.toString(),
      user_id: userId,
    };

    const newSwitchUser = new this.switchUserModel(switchUser);

    await newSwitchUser.save();

    return newSwitchUser;
  }
}
