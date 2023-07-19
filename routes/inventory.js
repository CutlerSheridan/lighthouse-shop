const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const { db } = require('../mongodb_config');
const { STATUSES } = require('../models/ProductInstance');
const productController = require('../controllers/productController');
const categoryController = require('../controllers/categoryController');
const productInstanceController = require('../controllers/productInstanceController');

/// HOME PAGE ///

router.get(
  '/',
  asyncHandler(async (req, res, next) => {
    const [numOfProducts, numOfCategories, instanceGroup] = await Promise.all([
      db.collection('products').countDocuments({}),
      db.collection('categories').countDocuments({}),
      db
        .collection('product_instances')
        .aggregate([
          {
            $group: {
              _id: null,
              total_count: { $sum: 1 },
              not_new_count: {
                $sum: {
                  $switch: {
                    branches: [
                      {
                        case: { $ne: ['$status', STATUSES[0]] },
                        then: 1,
                      },
                    ],
                    default: 0,
                  },
                },
              },
            },
          },
        ])
        .next(),
    ]);

    console.log(instanceGroup);

    res.render('layout', {
      contentFile: 'index',
      stylesheet: 'index',
      title: 'Lighthouse Shop',
      numOfProducts,
      numOfCategories,
      numOfInstances: instanceGroup.total_count,
      numOfUsed: instanceGroup.not_new_count,
    });
  })
);

/// PRODUCT ROUTES ///

router.get('/products', productController.product_list);
router.get('/product/create', productController.product_create_get);
router.post('/product/create', productController.product_create_post);
router.get('/product/:id/delete', productController.product_delete_get);
router.post('/product/:id/delete', productController.product_delete_post);
router.get('/product/:id/update', productController.product_update_get);
router.post('/product/:id/update', productController.product_update_post);
router.get('/product/:id', productController.product_detail);

/// CATEGORY ROUTES ///

router.get('/categories', categoryController.category_list);
router.get('/category/create', categoryController.category_create_get);
router.post('/category/create', categoryController.category_create_post);
router.get('/category/:id/delete', categoryController.category_delete_get);
router.post('/category/:id/delete', categoryController.category_delete_post);
router.get('/category/:id/update', categoryController.category_update_get);
router.post('/category/:id/update', categoryController.category_update_post);
router.get('/category/:id', categoryController.category_detail);

/// PRODUCT INSTANCE ROUTES ///

router.get('/productinstances', productInstanceController.productinstance_list);
router.get(
  '/productinstance/create',
  productInstanceController.productinstance_create_get
);
router.post(
  '/productinstance/create',
  productInstanceController.productinstance_create_post
);
router.get(
  '/productinstance/:id/delete',
  productInstanceController.productinstance_delete_get
);
router.post(
  '/productinstance/:id/delete',
  productInstanceController.productinstance_delete_post
);
router.get(
  '/productinstance/:id/update',
  productInstanceController.productinstance_update_get
);
router.post(
  '/productinstance/:id/update',
  productInstanceController.productinstance_update_post
);
router.get(
  '/productinstance/:id',
  productInstanceController.productinstance_detail
);

module.exports = router;
