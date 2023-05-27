export const quoteSchema = {
  type: "object",
  properties: {
    quote: { type: "string" },
    author: { type: "string" },
    id: { type: "number" },
    consultation_date: { type: "string" },
  },
};

export const quotesSchema = {
  type: "object",
  properties: {
    id: { type: "number" },
    quote: { type: "string" },
    consultation_date: { type: "string" },
  },
};
