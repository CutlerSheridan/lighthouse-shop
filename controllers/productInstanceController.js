const ProductInstance = require('../models/ProductInstance');
const asyncHandler = require('express-async-handler');
const { db, objectId } = require('../mongodb_config');
const { body, validationResult } = require('express-validator');

exports.productinstance_list = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: Product Instance list');
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
