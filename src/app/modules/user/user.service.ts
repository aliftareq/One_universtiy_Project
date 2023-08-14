import mongoose from 'mongoose';
import config from '../../../config';
import ApiError from '../../../errors/ApiErrors';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { IStudent } from '../student/student.interface';
import { IUser } from './user.interface';
import { User } from './user.model';
import {
  generateAdminId,
  generateFacultyId,
  generateStudentId,
} from './user.utils';
import { Student } from '../student/student.model';
import httpStatus from 'http-status';
import { IFaculty } from '../Faculty/Faculty.interface';
import { Faculty } from '../Faculty/Faculty.model';
import { IAdmin } from '../Admin/Admin.interface';
import { Admin } from '../Admin/Admin.model';

const createStudent = async (
  student: IStudent,
  user: IUser
): Promise<IUser | null> => {
  //default password.
  if (!user.password) {
    user.password = config.default_student_pass as string;
  }

  //set role
  user.role = 'student';

  //getting student semesterInfo
  const academicSemester = await AcademicSemester.findById(
    student.academicSemester
  );

  //generating student Id
  let newUserAllData = null;
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const id = await generateStudentId(academicSemester);
    user.id = id;
    student.id = id;

    //array
    const newStudent = await Student.create([student], { session });

    if (!newStudent?.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create student!');
    }

    //set student _id into user.student
    user.student = newStudent[0]._id;

    const newUser = await User.create([user], { session });

    if (!newUser?.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create user!');
    }

    newUserAllData = newUser[0];

    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }

  //user --> student --> academic-semester,academic-Depertment, academic-faculty.
  if (newUserAllData) {
    newUserAllData = await User.findOne({ id: newUserAllData.id }).populate({
      path: 'student',
      populate: [
        {
          path: 'academicSemester',
        },
        {
          path: 'academicFaculty',
        },
        {
          path: 'academicDepartment',
        },
      ],
    });
  }

  return newUserAllData;
};

const createFaculty = async (
  faculty: IFaculty,
  user: IUser
): Promise<IUser | null> => {
  //default password.
  if (!user.password) {
    user.password = config.default_student_pass as string;
  }

  //set role
  user.role = 'faculty';

  //generating student Id
  let newUserAllData = null;
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const id = await generateFacultyId();
    user.id = id;
    faculty.id = id;

    //array
    const newFaculty = await Faculty.create([faculty], { session });

    if (!newFaculty?.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create faculty!');
    }

    //set faculty _id into user.faculty
    user.faculty = newFaculty[0]._id;

    const newUser = await User.create([user], { session });

    if (!newUser?.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create user!');
    }

    newUserAllData = newUser[0];

    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }

  //user --> student --> academic-semester,academic-Depertment, academic-faculty.
  if (newUserAllData) {
    newUserAllData = await User.findOne({ id: newUserAllData.id }).populate({
      path: 'faculty',
      populate: [
        {
          path: 'academicFaculty',
        },
        {
          path: 'academicDepartment',
        },
      ],
    });
  }

  return newUserAllData;
};

const createAdmin = async (
  admin: IAdmin,
  user: IUser
): Promise<IUser | null> => {
  //default password.
  if (!user.password) {
    user.password = config.default_student_pass as string;
  }

  //set role
  user.role = 'admin';

  //generating student Id
  let newUserAllData = null;
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const id = await generateAdminId();
    user.id = id;
    admin.id = id;

    //array
    const newAdmin = await Admin.create([admin], { session });

    if (!newAdmin?.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create admin!');
    }

    //set faculty _id into user.faculty
    user.admin = newAdmin[0]._id;

    const newUser = await User.create([user], { session });

    if (!newUser?.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create user!');
    }

    newUserAllData = newUser[0];

    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }

  //user --> student --> academic-semester,academic-Depertment, academic-faculty.
  if (newUserAllData) {
    newUserAllData = await User.findOne({ id: newUserAllData.id }).populate({
      path: 'Admin',
      populate: [
        {
          path: 'managementDepartments',
        },
      ],
    });
  }

  return newUserAllData;
};

export const UserService = {
  createStudent,
  createFaculty,
  createAdmin,
};
