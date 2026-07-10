export enum STATUS_CODES {
  OK = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  UNAUTHORISED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  CONFLICT = 409,
  MANY_REQUEST = 429,
  SERVER_ERROR = 500,
  NOT_IMPLEMENTED = 501,
  SERVICE_UNAVAILABLE = 503,
}

export const API_RESPONSE_MESSAGES = {
  SUCCESS: "Request completed successfully",
  CREATED: "Resource created successfully",
  UPDATED: "Resource updated successfully",
  DELETED: "Resource deleted successfully",

  BAD_REQUEST: "Invalid request",
  UNAUTHORIZED: "Authentication required",
  FORBIDDEN: "You do not have permission to perform this action",
  NOT_FOUND: "The requested resource was not found",
  CONFLICT: "Resource already exists",

  VALIDATION_ERROR: "Validation error",
  TOO_MANY_REQUESTS: "Too many requests. Please try again later",

  INTERNAL_SERVER_ERROR: "Internal server error",
  SERVICE_UNAVAILABLE: "Service temporarily unavailable",
};

export enum STAFF_ROLES {
  MAIN_ADMIN = "Main Admin",
  ADMIN = "Admin",
  MODERATOR = "Moderator",
}

export const BELT_OPTIONS = [
  "White",
  "Yellow",
  "Orange",
  "Green",
  "Blue-II",
  "Blue-I",
  "Purple-II",
  "Purple-I",
  "Brown-III",
  "Brown-II",
  "Brown-I",
  "Black",
];

export enum BELT_OPTIONS_ENUM {
  White = "White",
  Yellow = "Yellow",
  Orange = "Orange",
  Green = "Green",
  BlueII = "Blue-II",
  BlueI = "Blue-I",
  PurpleII = "Purple-II",
  PurpleI = "Purple-I",
  BrownIII = "Brown-III",
  BrownII = "Brown-II",
  BrownI = "Brown-I",
  Black = "Black",
}
