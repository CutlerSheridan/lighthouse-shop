const { Product } = require('../models/Product');
const { ProductInstance, STATUSES } = require('../models/ProductInstance');
const { Category } = require('../models/Category');
const asyncHandler = require('express-async-handler');
const { db, ObjectId } = require('../mongodb_config');
const { body, validationResult } = require('express-validator');

exports.product_list = asyncHandler(async (req, res, next) => {
  const [productDocs, instanceDocs] = await Promise.all([
    db.collection('products').find({}).sort({ name: 1 }).toArray(),
    db
      .collection('product_instances')
      .find({}, { $projection: { _id: 1 } })
      .toArray(),
  ]);
  const products = Product(productDocs);

  res.render('layout', {
    contentFile: 'product_list',
    stylesheet: 'product_list',
    title: 'All products',
    products,
    instances: instanceDocs,
    ObjectId,
  });
});

exports.product_detail = asyncHandler(async (req, res, next) => {
  const id = new ObjectId(req.params.id);
  const [productDoc, instanceDocs] = await Promise.all([
    db.collection('products').findOne({ _id: id }),
    db
      .collection('product_instances')
      .find({ product: id })
      .sort({ status: 1 })
      .toArray(),
  ]);
  const [product, instances] = [
    Product(productDoc),
    ProductInstance(instanceDocs),
  ];
  const categoryDocs = await db
    .collection('categories')
    .find({ _id: { $in: product.categories } })
    .sort({ name: 1 })
    .toArray();
  const categories = Category(categoryDocs);

  res.render('layout', {
    contentFile: 'product_detail',
    stylesheet: 'product_detail',
    title: product.name,
    product,
    instances,
    statuses: STATUSES,
    categories,
  });
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
