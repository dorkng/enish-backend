import Joi from 'joi';

class ReservationUtil {
  public createReservationSchema = Joi.object().keys({
    name: Joi.string().required().label('Name'),
    phone: Joi.object()
      .keys({
        code: Joi.string().required().label('Code'),
        number: Joi.string().required().label('Number'),
      })
      .required()
      .label('Phone'),
    email: Joi.string().email().required().label('Email'),
    partySize: Joi.number().required().label('Party Size'),
    depositAmount: Joi.number().required().label('Deposit Amount'),
    time: Joi.string()
      .regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/)
      .required()
      .label('Time'),
    date: Joi.string()
      .regex(/^\d{4}-\d{2}-\d{2}$/)
      // .isoDate()
      .required()
      .label('Date'),
  });
}

export default ReservationUtil;
