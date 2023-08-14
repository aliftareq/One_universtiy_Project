import { z } from 'zod';
import { bloodGroup, gender } from '../student/student.constant';
import { designation } from '../Faculty/Faculty.constant';

//request validation
const createStudentZodSchema = z.object({
  body: z.object({
    password: z.string().optional(),
    student: z.object({
      name: z.object({
        firstName: z.string({ required_error: 'First Name is required!' }),
        middleName: z
          .string({ required_error: 'middle Name is required!' })
          .optional(),
        lastName: z.string({ required_error: 'last Name is required!' }),
      }),
      dateOfBirth: z.string({
        required_error: 'Date of Birth is required!',
      }),
      gender: z.enum([...gender] as [string, ...string[]], {
        required_error: 'Gender is Required',
      }),
      bloodGroup: z.enum([...bloodGroup] as [string, ...string[]]).optional(),
      email: z
        .string({
          required_error: 'email is required',
        })
        .email(),
      contactNo: z.string({
        required_error: 'emergencey Contact required',
      }),
      emergencyContactNo: z.string({
        required_error: 'emergencey Contact required',
      }),
      presentAddress: z.string({
        required_error: 'emergencey Contact required',
      }),
      permanentAddress: z.string({
        required_error: 'emergencey Contact required',
      }),
      guardian: z.object({
        fatherName: z.string({
          required_error: 'Father name is required',
        }),
        fatherOccupation: z.string({
          required_error: 'Father occupation is required',
        }),
        fatherContactNo: z.string({
          required_error: 'Father contact number is required',
        }),
        motherName: z.string({
          required_error: 'Mother name is required',
        }),
        motherOccupation: z.string({
          required_error: 'Mother occupation is required',
        }),
        motherContactNo: z.string({
          required_error: 'Mother contact number is required',
        }),
        address: z.string({
          required_error: 'Guardian address is required',
        }),
      }),
      localGuardian: z.object({
        name: z.string({
          required_error: 'Local guardian name is required',
        }),
        occupation: z.string({
          required_error: 'Local guardian occupation is required',
        }),
        contactNo: z.string({
          required_error: 'Local guardian contact number is required',
        }),
        address: z.string({
          required_error: 'Local guardian address is required',
        }),
      }),
      academicSemester: z.string({
        required_error: 'Academic semester is required',
      }),
      academicDepartment: z.string({
        required_error: 'Academic department is required',
      }),
      academicFaculty: z.string({
        required_error: 'Academic faculty is required',
      }),
      profileImage: z.string().optional(),
    }),
  }),
});

const createFacultyZodSchema = z.object({
  body: z.object({
    password: z.string().optional(),
    faculty: z.object({
      name: z.object({
        firstName: z.string({ required_error: 'First Name is required!' }),
        middleName: z
          .string({ required_error: 'middle Name is required!' })
          .optional(),
        lastName: z.string({ required_error: 'last Name is required!' }),
      }),
      dateOfBirth: z.string({
        required_error: 'Date of Birth is required!',
      }),
      gender: z.enum([...gender] as [string, ...string[]], {
        required_error: 'Gender is Required',
      }),
      bloodGroup: z.enum([...bloodGroup] as [string, ...string[]]).optional(),
      designation: z.enum([...designation] as [string, ...string[]]).optional(),
      email: z
        .string({
          required_error: 'email is required',
        })
        .email(),
      contactNo: z.string({
        required_error: 'emergencey Contact required',
      }),
      emergencyContactNo: z.string({
        required_error: 'emergencey Contact required',
      }),
      presentAddress: z.string({
        required_error: 'emergencey Contact required',
      }),
      permanentAddress: z.string({
        required_error: 'emergencey Contact required',
      }),
      academicDepartment: z.string({
        required_error: 'Academic department is required',
      }),
      academicFaculty: z.string({
        required_error: 'Academic faculty is required',
      }),
    }),
  }),
});

const createAdminZodSchema = z.object({
  body: z.object({
    password: z.string().optional(),
    admin: z.object({
      name: z.object({
        firstName: z.string({ required_error: 'First Name is required!' }),
        middleName: z
          .string({ required_error: 'middle Name is required!' })
          .optional(),
        lastName: z.string({ required_error: 'last Name is required!' }),
      }),
      gender: z.enum([...gender] as [string, ...string[]], {
        required_error: 'Gender is Required',
      }),
      dateOfBirth: z.string({
        required_error: 'Date of Birth is required!',
      }),
      email: z
        .string({
          required_error: 'email is required',
        })
        .email(),
      bloodGroup: z.enum([...bloodGroup] as [string, ...string[]]).optional(),
      contactNo: z.string({
        required_error: 'emergencey Contact required',
      }),
      emergencyContactNo: z.string({
        required_error: 'emergencey Contact required',
      }),
      presentAddress: z.string({
        required_error: 'emergencey Contact required',
      }),
      permanentAddress: z.string({
        required_error: 'emergencey Contact required',
      }),
      managementDepartment: z.string({
        required_error: 'managementDepartment is required',
      }),
      designation: z.string({
        required_error: 'Academic department is required',
      }),
    }),
  }),
});

export const userValidation = {
  createStudentZodSchema,
  createFacultyZodSchema,
  createAdminZodSchema,
};
