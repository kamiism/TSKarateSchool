import mongoose, { Document } from "mongoose";

type QuizType = {
  question: string;
  options: string[];
  answer_idx: number;
};

interface IQuiz extends Document {
  name: string;
  quizzes: QuizType[];
  start_hour: number;
  end_hour: number;
  isActive: boolean;
}

const quizSchema = new mongoose.Schema<IQuiz>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    quizzes: [
      {
        type: new mongoose.Schema<QuizType>(
          {
            question: {
              type: String,
              required: true,
              trim: true,
            },
            options: [
              {
                type: String,
                trim: true,
              },
            ],
            answer_idx: {
              type: Number,
              required: true,
            },
          },
          { _id: false },
        ),
        required: true,
      },
    ],
    start_hour: {
      type: Number,
      required: true,
    },
    end_hour: {
      type: Number,
      required: true,
    },
    isActive: {
      type: Boolean,
      required: false,
    },
  },
  { timestamps: true },
);

export const Quiz = mongoose.model<IQuiz>("Quiz", quizSchema);
