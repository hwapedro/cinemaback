import { prop, index, getModelForClass, pre } from '@typegoose/typegoose';
import { defaultSchemaOptions, defaultOptions } from '~/common/constants';
import { BaseMongooseModel } from '~/common/BaseModel';
import { AdminFieldType } from '~/common/decorators';
import { TicketModel } from '~/ticket/ticket.model';
import { oidToString } from '~/common/scripts/oidToString';
import { HallModel } from '~/hall/hall.model';

@index({
  index: 1,
}, { unique: true })
@pre<HallCell>('remove', async function (next) {
  try {
    const hallCellId = oidToString(this._id);
    const hallCellIndex = this.index;
    await TicketModel.updateMany({}, {
      $pull: {
        seats: { type: hallCellId },
      },
    }, { multi: true }).exec();
    const halls = await HallModel.find({}).exec();
    await Promise.all(halls.map(async hall => {
      hall.structure = hall.structure.map(row => row.map(cell => cell === hallCellIndex ? 0 : cell));
      await hall.save();
    }));
    next();
  } catch (error) {
    console.error('Error on pre remove', error);
    next(error);
  }
})
export class HallCell extends BaseMongooseModel {
  @prop()
  name: string;

  @prop()
  price: number;

  @prop()
  index: number;

  @AdminFieldType('color')
  @prop()
  color: string;
}

export const HallCellModel = getModelForClass(HallCell, {
  schemaOptions: {
    ...defaultSchemaOptions,
    collection: 'hallCells',
  },
  options: {
    ...defaultOptions,
  }
});