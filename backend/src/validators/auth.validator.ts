import z from "zod";

export const registerSchema = z.object({
  firstName: z.string(),
  middleName: z.string().optional(),
  lastName: z.string(),
  dob: z.string(),
  age: z.number().positive().optional(),
  sex: z.enum(["male", "female", "others"]),
  bloodGroup: z
    .enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"])
    .optional(),

  nationality: z.string().optional(),
  maritalStatus: z.enum(["single", "married"]).optional(),
  fatherName: z.string(),
  motherName: z.string(),
  email: z.email(),
  phoneNumber: z.string(),
  postalAddress: z.object({
    address: z.string(),
    pinCode: z.number(),
  }),

  permanentAddress: z.object({
    address: z.string(),
    pinCode: z.number(),
  }),
  height: z.number(),
  weight: z.number(),
  disability: z.object({
    hasDisability: z.boolean().default(false),
    description: z.string().default(""),
  }),
  
  username: z.string(),
  password: z.string(),
});

export const loginSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export const staffLoginSchema = z.object({
  identifier: z.string(),
  password: z.string(),
});

export const staffCreateSchema = z.object({
  name: z.string(),
  email: z.email(),
  username: z.string(),
  password: z.string(),
  role: z.enum(["Admin", "Moderator"]),
});
