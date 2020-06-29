import { Segments, Joi } from "celebrate";
import headers from "./TokenValidator";

export default {
  createTypeAndCategory() {
    return {
      headers,
      [Segments.BODY]: Joi.object().keys({
        name: Joi.string()
          .min(3)
          .max(100)
          .required()
      })
    };
  },

  updateTypeAndCategory() {
    return {
      headers,
      [Segments.BODY]: Joi.object().keys({
        name: Joi.string()
          .min(3)
          .max(100)
          .required()
      }),
      [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number()
          .required()
      })
    };
  },

  deleteTypeAndCategory() {
    return {
      headers,
      [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number()
          .required()
      })
    };
  }
}