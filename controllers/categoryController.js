const { Category } = require('../models/Category');
const { Product } = require('../models/Product');
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
  const id = new ObjectId(req.params.id);
  const [categoryDoc, productDocs] = await Promise.all([
    db.collection('categories').findOne({ _id: id }),
    db
      .collection('products')
      .find({ categories: id })
      .sort({ name: 1 })
      .toArray(),
  ]);
  const [category, products] = [Category(categoryDoc), Product(productDocs)];
  const instances = await db
    .collection('product_instances')
    .find(
      { product: { $in: products.map((prod) => prod._id) } },
      { $projection: { product: 1 } }
    )
    .toArray();

  res.render('layout', {
    contentFile: 'category_detail',
    stylesheets: ['product_grid'],
    title: category.name,
    category,
    products,
    instances,
  });
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
