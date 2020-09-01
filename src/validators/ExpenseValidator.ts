import { Segments, Joi } from "celebrate";
import headers from "./TokenValidator";

export default  {
  getExpense() {
    return {
      headers,
      [Segments.QUERY]: Joi.object().keys({
        page: Joi.number(),
      })
    };
  },

  postExpense() {
    return {
      headers,
      [Segments.BODY]: Joi.object().keys({
        source: Joi.string().max(50).required(),
        expense_type_id: Joi.number().required(),
        expense_category_id: Joi.number().required(),
        expected_amount: Joi.number().required(),
        paid_amount: Joi.number(),
        due_date: Joi.date().required(),
        payday: Joi.date(),
        reference_month: Joi.date().required(),
        is_paid: Joi.bool().required()
      })
    }
  },

  putExpense() {
    return {
      headers,
      [Segments.BODY]: Joi.object().keys({
        source: Joi.string().max(50).required(),
        expense_type_id: Joi.number().required(),
        expense_category_id: Joi.number().required(),
        expected_amount: Joi.number().required(),
        paid_amount: Joi.number(),
        due_date: Joi.date().required(),
        payday: Joi.date(),
        reference_month: Joi.date().required(),
        is_paid: Joi.bool().required()
      }),
      [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required()
      })
    }
  },

  deleteExpense() {
    return {
      headers,
      [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required()
      })
    }
  }
}
