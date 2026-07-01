import z from "zod";

export const quizCreateSchema = z.object({
  name: z.string(),
  start_hour: z.number().min(0).max(23),
  end_hour: z.number().min(0).max(23),
  quizzes: z.object({
    question: z.string(),
    options: z.array(z.string()),
    answer_idx: z.number(),
  }),
});
