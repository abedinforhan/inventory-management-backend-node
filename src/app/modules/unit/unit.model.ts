import { Schema, model } from 'mongoose';
import { IUnit, UnitModel } from './unit.interface';

const UnitSchema = new Schema<IUnit, UnitModel>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const Unit = model<IUnit, UnitModel>('Unit', UnitSchema);
