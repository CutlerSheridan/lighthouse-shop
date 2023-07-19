const { Category } = require('../models/Category');
const asyncHandler = require('express-async-handler');
const { db, ObjectId } = require('../mongodb_config');
const { body, validationResult } = require('express-validator');

exports.category_list = asyncHandler(async (req, res, next) => {
  const categoryDocs = await db
    .collection('categories')
    .find({})
    .sort({ name: 1 })
    .toArray();
  const categories = Category(categoryDocs);

  res.render('layout', {
    contentFile: 'category_list',
    title: 'All categories',
    categories,
  });
});

exports.category_detail = asyncHandler(async (req, res, next) => {
  res.send(`NOT IMPLEMENTED: Category detail for ID ${req.params.id}`);
});

exports.category_create_get = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: Category create GET');
});
exports.category_create_post = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: Category create POST');
});

exports.category_delete_get = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: Category delete GET');
});
exports.category_delete_post = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: Category delete POST');
});

exports.category_update_get = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: Category update GET');
});
exports.category_update_post = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: Category update POST');
});
