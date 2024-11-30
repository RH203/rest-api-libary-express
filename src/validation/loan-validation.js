import Joi from "joi";

const loanValidation = Joi.object({
  student_id: Joi.number().required(),
  book_id: Joi.number().required(),
  notes: Joi.string().max(100).optional().allow(""),
});

export { loanValidation };
