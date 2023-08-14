import { Schema, model } from 'mongoose';
import {
  IManagementDepartment,
  ManagementDepartmentModel,
} from './ManagementDepartment.interface';

// 1. created a Schema.
const ManagementDepartmentSchema = new Schema<
  IManagementDepartment,
  ManagementDepartmentModel
>(
  {
    title: { type: String, required: true, unique: true },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

// 2. Create a Model.
export const ManagementDepartment = model<
  IManagementDepartment,
  ManagementDepartmentModel
>('ManagementDepartment', ManagementDepartmentSchema);
