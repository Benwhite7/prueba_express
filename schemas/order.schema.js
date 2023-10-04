const joi = require("joi");

const id = joi.number().integer();
const customerId = joi.number().integer();
const orderId = joi.number().integer();
const productId = joi.number().integer();
const amount = joi.number().integer().min(1);

const createOrderSchema = joi.object({
  customerId : customerId.required()
});

const getOrderSchema = joi.object({
  id: id.required(),
});

const addItemSchema = joi.object({
  orderId : orderId.required(),
  productId : productId.required(),
  amount : amount.required()
});

module.exports = { createOrderSchema, getOrderSchema , addItemSchema}
