import { z } from 'zod';

//request validation
const createUserZodSchema = z.object({
  body: z.object({
    role: z.string({
      required_error: 'role is required',
    }),
    password: z.string().optional(),
  }),
});

export const userValidation = {
  createUserZodSchema,
};
