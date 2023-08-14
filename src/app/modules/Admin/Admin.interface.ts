import { Model, Types } from 'mongoose';
import { IManagementDepartment } from '../ManagementDepartment/ManagementDepartment.interface';

export type IAdmin = {
  id: string;
  name: {
    firstName: string;
    middleName?: string;
    lastName: string;
  };
  gender: 'male' | 'female';
  dateOfBirth?: string;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  presentAddress: string;
  permanentAddress: string;
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  managementDepartment: Types.ObjectId | IManagementDepartment;
  designation: string;
  profileImage?: string;
};

export type IAdminFilters = {
  searchTerm?: string;
  id?: string;
  bloodgroup?: string;
  email?: string;
  contactNo?: string;
  emergencyContactNo?: string;
};

export type AdminModel = Model<IAdmin, Record<string, unknown>>;
