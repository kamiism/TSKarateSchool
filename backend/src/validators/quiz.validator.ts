import z from "zod";
import { BELT_OPTIONS } from "../config/constants.ts";

export const quizCreateSchema = z.object({
  name: z.string(),
  belt: z.enum(BELT_OPTIONS),
  start_hour: z.number().min(0).max(23),
  end_hour: z.number().min(0).max(23),
  quizzes: z.object({
    question: z.string(),
    options: z.array(z.string()),
    answer_idx: z.number(),
  }),
});
