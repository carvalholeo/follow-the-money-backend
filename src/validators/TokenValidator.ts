import { Segments, Joi } from "celebrate";

export default  {
  [Segments.HEADERS]: Joi.object({
    token: Joi.string().required(),
    session: Joi.string().required(),
  }).unknown()
}
