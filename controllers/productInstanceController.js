const { ProductInstance } = require('../models/ProductInstance');
const asyncHandler = require('express-async-handler');
const { db, ObjectId } = require('../mongodb_config');
const { body, validationResult } = require('express-validator');
const { Product } = require('../models/Product');

exports.productinstance_list = asyncHandler(async (req, res, next) => {
  const [instanceDocs, productDocs] = await Promise.all([
    db
      .collection('product_instances')
      .find({})
      .sort({ product: 1, status: 1 })
      .toArray(),
    db
      .collection('products')
      .find({}, { $projection: { name: 1 } })
      .sort({ name: 1 })
      .toArray(),
  ]);
  const [instances, products] = [
    ProductInstance(instanceDocs),
    Product(productDocs),
  ];
  res.render('layout', {
    contentFile: 'productinstance_list',
    title: 'All product instances',
    instances,
    products,
    ObjectId,
  });
});

exports.productinstance_detail = asyncHandler(async (req, res, next) => {
  res.send(`NOT IMPLEMENTED: Product Instance detail for ID ${req.params.id}`);
});

exports.productinstance_create_get = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: Product Instance create GET');
});
exports.productinstance_create_post = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: Product Instance create POST');
});

exports.productinstance_delete_get = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: Product Instance delete GET');
});
exports.productinstance_delete_post = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: Product Instance delete POST');
});

exports.productinstance_update_get = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: Product Instance update GET');
});
exports.productinstance_update_post = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: Product Instance update POST');
});
