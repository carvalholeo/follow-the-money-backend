import { Segments, Joi } from "celebrate";

export default {
  mfaRequired() {
    return {
      [Segments.HEADERS]: Joi.object({
        session: Joi.string().required()
      }).unknown(),
      [Segments.BODY]: Joi.object().keys({
        mfa_code: Joi.string().min(6).max(6).required()
      })
    };
  },

  token() {
    return {
      [Segments.HEADERS]: Joi.object({
        session: Joi.string().required()
      }).unknown()
    };
  }
}