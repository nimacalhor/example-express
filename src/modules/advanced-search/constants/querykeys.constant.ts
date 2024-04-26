import { QueryKey } from "@src/modules/setting/types/setting.type";

export const D_MEDIA_KEYS = [
  "_id",
  "media_type",
  "user.username",
  "user.full_name",
  "caption",
];
export const D_PROFILE_KEYS = [
  "_id",
  "media_type",
  "username",
  "full_name",
  "following",
  "followers",
  "bio",
  "category",
];
export const D_COMMENT_KEYS = [
  "_id",
  "user_id",
  "created_at",
  "full_name",
  "username",
  "text",
  "comment_index",
  "is_private",
];

export const ALL_ALLOWED_OPERATORS_ARR = ["lt", "gt", "eq", "neq", "regex"];
export const ALL_ALLOWED_TYPES_ARR = ["string", "number", "boolean"];
export const ALL_ALLOWED_OPERATORS_MAP = {
  lt: "lt",
  gt: "gt",
  eq: "eq",
  neq: "neq",
  regex: "regex",
};
export const ALL_ALLOWED_TYPES_MAP = {
  string: "string",
  number: "number",
  date: "date",
  boolean: "boolean",
};

export const D_MEDIA_QUERY_KEYS: QueryKey[] = [
  {
    key: "_id",
    allowedOperators: [ALL_ALLOWED_OPERATORS_MAP.eq],
    allowedTypes: [ALL_ALLOWED_TYPES_MAP.string],
  },
  {
    key: "media_type",
    allowedOperators: [
      ALL_ALLOWED_OPERATORS_MAP.eq,
      ALL_ALLOWED_OPERATORS_MAP.neq,
    ],
    allowedTypes: [ALL_ALLOWED_TYPES_MAP.number],
  },
  {
    key: "user.username",
    allowedOperators: [
      ALL_ALLOWED_OPERATORS_MAP.eq,
      ALL_ALLOWED_OPERATORS_MAP.neq,
      ALL_ALLOWED_OPERATORS_MAP.regex,
    ],
    allowedTypes: [ALL_ALLOWED_TYPES_MAP.string],
  },
  {
    key: "user.full_name",
    allowedOperators: [
      ALL_ALLOWED_OPERATORS_MAP.eq,
      ALL_ALLOWED_OPERATORS_MAP.neq,
      ALL_ALLOWED_OPERATORS_MAP.regex,
    ],
    allowedTypes: [ALL_ALLOWED_TYPES_MAP.string],
  },
  {
    key: "caption",
    allowedOperators: [
      ALL_ALLOWED_OPERATORS_MAP.eq,
      ALL_ALLOWED_OPERATORS_MAP.neq,
      ALL_ALLOWED_OPERATORS_MAP.regex,
    ],
    allowedTypes: [ALL_ALLOWED_TYPES_MAP.string],
  },
];

export const D_PROFILE_QUERY_KEYS: QueryKey[] = [
  {
    key: "_id",
    allowedOperators: [ALL_ALLOWED_OPERATORS_MAP.eq],
    allowedTypes: [ALL_ALLOWED_TYPES_MAP.string],
  },
  {
    key: "media_type",
    allowedOperators: [
      ALL_ALLOWED_OPERATORS_MAP.gt,
      ALL_ALLOWED_OPERATORS_MAP.lt,
      ALL_ALLOWED_OPERATORS_MAP.eq,
      ALL_ALLOWED_OPERATORS_MAP.neq,
    ],
    allowedTypes: [ALL_ALLOWED_TYPES_MAP.number],
  },
  {
    key: "username",
    allowedOperators: [
      ALL_ALLOWED_OPERATORS_MAP.eq,
      ALL_ALLOWED_OPERATORS_MAP.neq,
      ALL_ALLOWED_OPERATORS_MAP.regex,
    ],
    allowedTypes: [ALL_ALLOWED_TYPES_MAP.string],
  },
  {
    key: "full_name",
    allowedOperators: [
      ALL_ALLOWED_OPERATORS_MAP.eq,
      ALL_ALLOWED_OPERATORS_MAP.neq,
      ALL_ALLOWED_OPERATORS_MAP.regex,
    ],
    allowedTypes: [ALL_ALLOWED_TYPES_MAP.string],
  },
  {
    key: "following",
    allowedOperators: [
      ALL_ALLOWED_OPERATORS_MAP.eq,
      ALL_ALLOWED_OPERATORS_MAP.gt,
      ALL_ALLOWED_OPERATORS_MAP.lt,
    ],
    allowedTypes: [ALL_ALLOWED_TYPES_MAP.number],
  },
  {
    key: "followers",
    allowedOperators: [
      ALL_ALLOWED_OPERATORS_MAP.eq,
      ALL_ALLOWED_OPERATORS_MAP.lt,
      ALL_ALLOWED_OPERATORS_MAP.gt,
    ],
    allowedTypes: [ALL_ALLOWED_TYPES_MAP.number],
  },
  {
    key: "bio",
    allowedOperators: [
      ALL_ALLOWED_OPERATORS_MAP.eq,
      ALL_ALLOWED_OPERATORS_MAP.regex,
    ],
    allowedTypes: [ALL_ALLOWED_TYPES_MAP.string],
  },
  {
    key: "category",
    allowedOperators: [
      ALL_ALLOWED_OPERATORS_MAP.eq,
      ALL_ALLOWED_OPERATORS_MAP.neq,
    ],
    allowedTypes: [ALL_ALLOWED_TYPES_MAP.number],
  },
];

export const D_COMMENT_QUERY_KEYS: QueryKey[] = [
  {
    key: "_id",
    allowedOperators: [ALL_ALLOWED_OPERATORS_MAP.eq],
    allowedTypes: [ALL_ALLOWED_TYPES_MAP.string],
  },
  {
    allowedOperators: [
      ALL_ALLOWED_OPERATORS_MAP.eq,
      ALL_ALLOWED_OPERATORS_MAP.regex,
      ALL_ALLOWED_OPERATORS_MAP.neq,
    ],
    allowedTypes: [ALL_ALLOWED_TYPES_MAP.string],
  },
  {
    key: "user_id",
    allowedOperators: [ALL_ALLOWED_OPERATORS_MAP.eq],
    allowedTypes: [ALL_ALLOWED_TYPES_MAP.number],
  },
  {
    key: "created_at",
    allowedOperators: [
      ALL_ALLOWED_OPERATORS_MAP.eq,
      ALL_ALLOWED_OPERATORS_MAP.gt,
      ALL_ALLOWED_OPERATORS_MAP.lt,
      ALL_ALLOWED_OPERATORS_MAP.neq,
    ],
    allowedTypes: [ALL_ALLOWED_TYPES_MAP.date],
  },
  {
    key: "full_name",
    allowedOperators: [
      ALL_ALLOWED_OPERATORS_MAP.eq,
      ALL_ALLOWED_OPERATORS_MAP.neq,
      ALL_ALLOWED_OPERATORS_MAP.regex,
    ],
    allowedTypes: [ALL_ALLOWED_TYPES_MAP.string],
  },
  {
    key: "username",
    allowedOperators: [
      ALL_ALLOWED_OPERATORS_MAP.eq,
      ALL_ALLOWED_OPERATORS_MAP.neq,
      ALL_ALLOWED_OPERATORS_MAP.regex,
    ],
    allowedTypes: [ALL_ALLOWED_TYPES_MAP.string],
  },
  {
    key: "text",
    allowedOperators: [
      ALL_ALLOWED_OPERATORS_MAP.eq,
      ALL_ALLOWED_OPERATORS_MAP.regex,
    ],
    allowedTypes: [ALL_ALLOWED_TYPES_MAP.string],
  },
  {
    key: "comment_index",
    allowedOperators: [
      ALL_ALLOWED_OPERATORS_MAP.eq,
      ALL_ALLOWED_OPERATORS_MAP.gt,
      ALL_ALLOWED_OPERATORS_MAP.lt,
      ALL_ALLOWED_OPERATORS_MAP.neq,
    ],
    allowedTypes: [ALL_ALLOWED_TYPES_MAP.number],
  },
  {
    key: "is_private",
    allowedOperators: [ALL_ALLOWED_OPERATORS_MAP.eq],
    allowedTypes: [ALL_ALLOWED_TYPES_MAP.boolean],
  },
];
