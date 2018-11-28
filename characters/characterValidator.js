/*
** characterValidator.js
**
** Exports a validator object for JOI that can be applied to characters
*/

// Require statements
const Joi = require("joi");


// JOI character validation schema
const joiCharacterSchema = {
  player_id: Joi.string().min(24).max(24).required(),
  inspiration: Joi.boolean(),
  name: Joi.string().min(3).max(60).required(),
  nickname: Joi.string().min(3).max(16).required(),
  sex: Joi.string().required(),
  race: Joi.string().required(),
  subrace: Joi.string().allow(null, ''),
  alignment: Joi.string().required(),
  background: Joi.string(),
  backgroundDetails: Joi.string(),
  attributes: Joi.object({
    str: Joi.number().required(),
    con: Joi.number().required(),
    dex: Joi.number().required(),
    int: Joi.number().required(),
    wis: Joi.number().required(),
    cha: Joi.number().required()
  }),
  classes: Joi.array().items(
    Joi.object({
      class: Joi.string().required(),
      level: Joi.number().required(),
      hitDice: Joi.string().required()
    })
  ),
  hitPoints: Joi.object({
    max: Joi.number().required(),
    current: Joi.number().required(),
    temp: Joi.number()
  })
}

module.exports = joiCharacterSchema;