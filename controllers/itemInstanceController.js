const ItemInstance = require('../models/ItemInstance');
const asyncHandler = require('express-async-handler');
const { db, objectId } = require('../mongodb_config');
const { body, validationResult } = require('express-validator');

exports.iteminstance_list = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: Item Instance list');
});

exports.iteminstance_detail = asyncHandler(async (req, res, next) => {
  res.send(`NOT IMPLEMENTED: Item Instance detail for ID ${req.params.id}`);
});

exports.iteminstance_create_get = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: Item Instance create GET');
});
exports.iteminstance_create_post = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: Item Instance create POST');
});

exports.iteminstance_delete_get = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: Item Instance delete GET');
});
exports.iteminstance_delete_post = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: Item Instance delete POST');
});

exports.iteminstance_update_get = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: Item Instance update GET');
});
exports.iteminstance_update_post = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: Item Instance update POST');
});
