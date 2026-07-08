import z from "zod";

const jsonObject = <T extends z.ZodType>(schema: T) =>
  z.preprocess((value) => {
    if (typeof value === "string") {
      return JSON.parse(value);
    }
    return value;
  }, schema);

export const registerSchema = z.object({
  firstName: z.string(),
  middleName: z.string().optional(),
  lastName: z.string(),
  dob: z.string(),
  age: z.coerce.number().positive().optional(),
  sex: z.enum(["male", "female", "others"]),
  bloodGroup: z
    .enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"])
    .optional(),

  nationality: z.string().optional(),
  maritalStatus: z.enum(["unmarried", "married"]).optional(),
  fatherName: z.string(),
  motherName: z.string(),
  email: z.email(),
  phoneNumber: z.string(),
  postalAddress: jsonObject(
    z.object({
      address: z.string(),
      pinCode: z.coerce.number(),
    }),
  ),

  permanentAddress: jsonObject(
    z.object({
      address: z.string(),
      pinCode: z.coerce.number(),
    }),
  ),
  height: z.coerce.number(),
  weight: z.coerce.number(),
  disability: jsonObject(
    z.object({
      hasDisability: z.coerce.boolean().default(false),
      description: z.string().default(""),
    }),
  ),

  username: z.string(),
  password: z.string(),
});

export const loginSchema = z.object({
  identifier: z.string(),
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
