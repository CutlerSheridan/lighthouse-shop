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
    stylesheets: ['product_list', 'product_grid'],
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
    stylesheets: ['product_detail'],
    title: product.name,
    product,
    instances,
    statuses: STATUSES,
    categories,
  });
});

exports.product_create_get = asyncHandler(async (req, res, next) => {
  const categoryDocs = await db
    .collection('categories')
    .find({})
    .sort({ name: 1 })
    .toArray();
  const categories = Category(categoryDocs);
  res.render('layout', {
    contentFile: 'product_form',
    stylesheets: ['form'],
    title: 'Add Product',
    categories,
  });
});
exports.product_create_post = [
  (req, res, next) => {
    if (!(req.body.categories instanceof Array)) {
      if (!req.body.categories) {
        req.body.categories = [];
      } else {
        req.body.categories = [req.body.categories];
      }
    }
    next();
  },
  body('name', 'Product name is required').trim().notEmpty().escape(),
  body('price')
    .trim()
    .notEmpty()
    .escape()
    .withMessage('Price is required')
    .bail()
    .isFloat()
    .withMessage('Price must be number')
    .bail()
    .customSanitizer((value) => (+value).toFixed(2))
    .isFloat({ min: 0.01 })
    .withMessage('Price must be at least .01¢')
    .toFloat()
    .if(body('price').not().isFloat({ min: 0.01 }))
    .customSanitizer((value) => ''),
  body('description', 'Description is required').trim().notEmpty().escape(),
  body('categories.*').trim().escape(),
  body('categories', 'At least one category is required')
    .isArray({ min: 1 })
    .customSanitizer((value) => value.map((x) => new ObjectId(x))),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    const product = Product(req.body);
    if (!errors.isEmpty()) {
      const categoryDocs = await db
        .collection('categories')
        .find({})
        .sort({ name: 1 })
        .toArray();
      const categories = Category(categoryDocs);
      categories.forEach((cat) => {
        if (product.categories.find((x) => x.equals(cat._id))) {
          cat.checked = 'checked';
        }
      });
      res.render('layout', {
        contentFile: 'product_form',
        stylesheets: ['form'],
        title: 'Add Product',
        categories,
        product,
        errors: errors.array(),
      });
    } else {
      await db.collection('products').insertOne(product);
      res.redirect(product.getUrl());
    }
  }),
];

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
