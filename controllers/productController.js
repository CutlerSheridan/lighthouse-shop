const Product = require('../models/Product');
const asyncHandler = require('express-async-handler');
const { db, objectId } = require('../mongodb_config');
const { body, validationResult } = require('express-validator');

exports.product_list = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: Product list');
});

exports.product_detail = asyncHandler(async (req, res, next) => {
  res.send(`NOT IMPLEMENTED: Product detail for ID ${req.params.id}`);
});

exports.product_create_get = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: Product create GET');
});
exports.product_create_post = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: Product create POST');
});

exports.product_delete_get = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: Product delete GET');
});
exports.product_delete_post = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: Product delete POST');
});

exports.product_update_get = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: Product update GET');
});
exports.product_update_post = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: Product update POST');
});
