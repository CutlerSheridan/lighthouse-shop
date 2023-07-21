const { ProductInstance, STATUSES } = require('../models/ProductInstance');
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
  const id = new ObjectId(req.params.id);
  const instanceDoc = await db
    .collection('product_instances')
    .findOne({ _id: id });
  const instance = ProductInstance(instanceDoc);
  const productDoc = await db
    .collection('products')
    .findOne({ _id: instance.product });
  const product = Product(productDoc);

  res.render('layout', {
    contentFile: 'productinstance_detail',
    stylesheets: ['productinstance_detail'],
    title: 'Instance detail',
    instance,
    product,
    statuses: STATUSES,
  });
});

exports.productinstance_create_get = asyncHandler(async (req, res, next) => {
  const productDocs = await db
    .collection('products')
    .find({})
    .sort({ name: 1 })
    .toArray();
  const products = Product(productDocs);
  res.render('layout', {
    contentFile: 'productinstance_form',
    stylesheets: ['form'],
    title: 'Add item to stock',
    products,
    statuses: STATUSES,
  });
});
exports.productinstance_create_post = [
  body('product', 'Must select a product')
    .trim()
    .notEmpty()
    .isMongoId()
    .escape()
    .bail()
    .customSanitizer((value) => new ObjectId(value)),
  body('status', 'Select status').trim().notEmpty().isIn(STATUSES).escape(),
  body('condition', 'Condition required if not new')
    .trim()
    .if((value, { req }) => req.body.status !== STATUSES[0])
    .notEmpty()
    .escape(),
  body('condition', 'Condition emptied')
    .if((value, { req }) => req.body.status === STATUSES[0])
    .customSanitizer((value) => ''),
  body('discount')
    .trim()
    .if((value, { req }) => req.body.status !== STATUSES[0])
    .notEmpty()
    .withMessage('Discount required if not new')
    .escape()
    .bail()
    .isFloat()
    .withMessage('Discount must be a number')
    .bail()
    .isFloat({ min: 0.5, max: 99.4 })
    .withMessage('Discount must be between 1% and 99%')
    .customSanitizer((value) => Math.round(+value))
    .toInt(),
  body('discount')
    .if((value, { req }) => req.body.status === STATUSES[0])
    .customSanitizer((value) => ''),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    const instance = ProductInstance({
      ...req.body,
      percentDiscounted: req.body.discount,
    });
    if (!errors.isEmpty()) {
      const productDocs = await db
        .collection('products')
        .find({})
        .sort({ name: 1 })
        .toArray();
      const products = Product(productDocs);
      products.forEach((prod) => {
        if (prod._id.equals(instance.product)) {
          prod.selected = 'selected';
        }
      });

      res.render('layout', {
        contentFile: 'productinstance_form',
        stylesheets: ['form'],
        title: 'Add item to stock',
        products,
        statuses: STATUSES,
        instance,
        errors: errors.array(),
      });
    } else {
      await db.collection('product_instances').insertOne(instance);
      res.redirect(instance.getUrl());
    }
  }),
];

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
