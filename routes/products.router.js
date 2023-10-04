const express = require("express");

const ProductsService = require("../services/products.service");
const validatorHandler = require("../middlewares/validator.handler");
const { createProductSchema , updateProductSchema , queryProductSchema} = require("../schemas/product.schema");

const router =  express.Router();
const service = new ProductsService();

router.get('/', validatorHandler(queryProductSchema , "query")  , async (req, res, next) => {
  try {
    const products = await service.find(req.query);
    res.json(products);
  } catch (error) {
    next(error);
  }
});

router.get("/filter" , (req , res) => {
  res.send("Yo soy un filtro");
})

router.get("/:id" , validatorHandler(queryProductSchema , "query")  , async (req , res , next) => {
  try {
    const { id } = req.params;
    const product = await service.findOne(id);
    res.json(product);
  } catch (error) {
    next(error)
  }
});

router.post('/', validatorHandler(createProductSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newProduct = await service.create(body);
      res.status(201).json(newProduct);
    } catch (error) {
      next(error);
    }
  }
);

router.patch("/:id", validatorHandler(queryProductSchema , "params") , validatorHandler(updateProductSchema , "body") ,async (req  , res )=> {
  try {
    const { id } = req.params;
    const body = req.body;
    const product = await service.update(id , body)
    res.json(product)
  } catch (error) {
    next(error) // con este se enlaza a los middlewares
    //Aqui se capturan de manera normal los errores
    //res.status(404).json({
    //  message : error.message
    //});
  }

});

router.delete("/:id"  ,async (req  , res )=> {
  const { id } = req.params;
  const rpta = await service.delete(id);
  res.json(rpta)
});

module.exports = router;
