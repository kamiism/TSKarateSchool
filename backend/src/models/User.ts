import mongoose from "mongoose";
import bcrypt from "bcrypt";

interface IDisability {
  hasDisability: boolean;
  description?: string;
}

interface IAddress {
  address: string;
  pinCode: number;
}

export interface IUser extends mongoose.Document {
  firstName: string;
  middleName?: string;
  lastName: string;

  dob: string;
  age?: number;
  sex: "male" | "female" | "others";
  bloodGroup?: "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";
  nationality?: string;
  maritalStatus?: "single" | "married";

  fatherName: string;
  motherName: string;

  email: string;
  phoneNumber: string;

  postalAddress: IAddress;
  permanentAddress: IAddress;

  height: number;
  weight: number;

  disability: IDisability;
  passportPhoto: string;

  username: string;
  password: string;
}

const addressSchema = new mongoose.Schema<IAddress>(
  {
    address: {
      type: String,
      required: true,
      trim: true,
    },
    pinCode: {
      type: Number,
      required: true,
    },
  },
  { _id: false },
);

const disabilitySchema = new mongoose.Schema<IDisability>(
  {
    hasDisability: {
      type: Boolean,
      required: true,
      default: false,
    },
    description: {
      type: String,
      trim: true,
      default: "",
    },
  },
  { _id: false },
);

const userSchema = new mongoose.Schema<IUser>(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    middleName: {
      type: String,
      required: false,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    dob: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: false,
    },
    sex: {
      type: String,
      required: true,
      enum: ["male", "female", "others"],
    },

    bloodGroup: {
      type: String,
      enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
    },

    nationality: {
      type: String,
      trim: true,
    },

    maritalStatus: {
      type: String,
      enum: ["single", "married"],
    },

    fatherName: {
      type: String,
      required: true,
      trim: true,
    },

    motherName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
    },

    phoneNumber: {
      type: String,
      required: true,
      trim: true,
    },

    postalAddress: {
      type: addressSchema,
      required: true,
    },

    permanentAddress: {
      type: addressSchema,
      required: true,
    },

    height: {
      type: Number,
      required: true,
    },

    weight: {
      type: Number,
      required: true,
    },

    disability: {
      type: disabilitySchema,
      default: {
        hasDisability: false,
        description: "",
      },
    },

    passportPhoto: {
      type: String,
      required: true,
    },

    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

userSchema.methods.comparePassword = async function (
  password: string,
): Promise<Boolean> {
  return bcrypt.compare(password, this.password);
};

// userSchema.pre("save", async function () {
//     if(!this.isModified("password")) return;

// });

export const User = mongoose.model("User", userSchema);
