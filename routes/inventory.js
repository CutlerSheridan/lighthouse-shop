const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');

const itemController = require('../controllers/itemController');
const categoryController = require('../controllers/categoryController');
const itemInstanceController = require('../controllers/itemInstanceController');

/// HOME PAGE ///

router.get(
  '/',
  asyncHandler(async (req, res, next) => {
    res.render('layout', {
      contentFile: 'index',
      title: 'Lighthouse Shop',
    });
  })
);

/// ITEM ROUTES ///

router.get('/items', itemController.item_list);
router.get('/item/create', itemController.item_create_get);
router.post('/item/create', itemController.item_create_post);
router.get('/item/:id/delete', itemController.item_delete_get);
router.post('/item/:id/delete', itemController.item_delete_post);
router.get('/item/:id/update', itemController.item_update_get);
router.post('/item/:id/update', itemController.item_update_post);
router.get('/item/:id', itemController.item_detail);

/// CATEGORY ROUTES ///

router.get('/categories', categoryController.category_list);
router.get('/category/create', categoryController.category_create_get);
router.post('/category/create', categoryController.category_create_post);
router.get('/category/:id/delete', categoryController.category_delete_get);
router.post('/category/:id/delete', categoryController.category_delete_post);
router.get('/category/:id/update', categoryController.category_update_get);
router.post('/category/:id/update', categoryController.category_update_post);
router.get('/category/:id', categoryController.category_detail);

/// ITEM INSTANCE ROUTES ///

router.get('/iteminstances', itemInstanceController.iteminstance_list);
router.get(
  '/iteminstance/create',
  itemInstanceController.iteminstance_create_get
);
router.post(
  '/iteminstance/create',
  itemInstanceController.iteminstance_create_post
);
router.get(
  '/iteminstance/:id/delete',
  itemInstanceController.iteminstance_delete_get
);
router.post(
  '/iteminstance/:id/delete',
  itemInstanceController.iteminstance_delete_post
);
router.get(
  '/iteminstance/:id/update',
  itemInstanceController.iteminstance_update_get
);
router.post(
  '/iteminstance/:id/update',
  itemInstanceController.iteminstance_update_post
);
router.get('/iteminstance/:id', itemInstanceController.iteminstance_detail);

module.exports = router;
