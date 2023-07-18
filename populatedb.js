const { db } = require('./mongodb_config');
const { Product } = require('./models/Product');
const { Category } = require('./models/Category');
const { ProductInstance, STATUSES } = require('./models/ProductInstance');
const asyncHandler = require('express-async-handler');

const [categoryIds, productIds, instanceIds] = [[], [], []];

const main = asyncHandler(async () => {
  await createCategories();
  await createProducts();
  await createInstances();
});
const categoryCreate = asyncHandler(
  async (categoryIndex, name, description) => {
    const newCategory = Category({ name, description });
    await db.collection('categories').insertOne(newCategory);
    categoryIds[categoryIndex] = newCategory._id;
    console.log(`Added category: ${newCategory.name}, ID: ${newCategory._id}`);
  }
);
const productCreate = asyncHandler(
  async (productIndex, name, description, price, categories) => {
    const newProduct = Product({ name, description, price, categories });
    await db.collection('products').insertOne(newProduct);
    productIds[productIndex] = newProduct._id;
    console.log(`Added Product: ${newProduct.name}, ID: ${newProduct._id}`);
  }
);
const instanceCreate = asyncHandler(
  async (instanceIndex, product, status, condition, percentDiscounted) => {
    const newInstance = ProductInstance({
      product,
      status,
      condition,
      percentDiscounted,
    });
    await db.collection('product_instances').insertOne(newInstance);
    instanceIds[instanceIndex] = newInstance._id;
    console.log(`Added Product Instance with ID: ${newInstance._id}`);
  }
);
const createCategories = asyncHandler(async () => {
  await Promise.all([
    categoryCreate(
      0,
      'Recreation',
      'To help pass the time on those long nights by the sea.'
    ),
    categoryCreate(
      1,
      'Maintenance',
      'Whenever possible, you are expected to make your own repairs.  These items can help.'
    ),
    categoryCreate(
      2,
      'Comfort',
      "It gets cold on that hill by the sea.  Don't let it get to you."
    ),
    categoryCreate(
      3,
      'Hygiene',
      "You'll be there for a while.  Best to keep clean."
    ),
  ]);
});
const createProducts = asyncHandler(async () => {
  await Promise.all([
    productCreate(0, 'Cards', 'A deck of 52, plus two jokers.', 1.5, [
      categoryIds[0],
    ]),
    productCreate(1, 'Journal', 'Leather-bound, unlined journal.', 15, [
      categoryIds[0],
    ]),
    productCreate(2, 'Pen', 'Ink-based pen with a wooden handle.', 5, [
      categoryIds[0],
    ]),
    productCreate(3, 'Ink', 'A pot full of ink.', 3, [categoryIds[0]]),
    productCreate(
      4,
      'Whiskey',
      'A bottle of swill, but it will get the job done.',
      7,
      [categoryIds[0], categoryIds[2]]
    ),
    productCreate(
      5,
      'Lamp oil',
      'A cask of oil for the main lighthouse light or for your personal lantern.',
      30,
      [categoryIds[1]]
    ),
    productCreate(
      6,
      'Lighthouse wick',
      'A large wick required to light the lighthouse.',
      6,
      [categoryIds[1]]
    ),
    productCreate(7, 'Lantern', 'A small lantern for personal use.', 12, [
      categoryIds[2],
    ]),
    productCreate(
      8,
      'Boards',
      'Wooden planks to repair damaged walls and furniture.',
      10,
      [categoryIds[1]]
    ),
    productCreate(
      9,
      'Toolkit',
      'Includes everything you need for basic repairs.  A hammer, screwdriver, nails, saw, screws, pliers, etc.',
      25,
      [categoryIds[1]]
    ),
    productCreate(10, 'Pillow', 'A soft, hay pillow.', 4, [categoryIds[2]]),
    productCreate(
      11,
      'Blanket',
      'A thick, wool blanket large enough for your bed.',
      10,
      [categoryIds[2]]
    ),
    productCreate(12, 'Boots', 'A pair of tough work boots.', 22, [
      categoryIds[2],
    ]),
    productCreate(13, 'Coat', 'A heavy, wool overcoat.', 18, [categoryIds[2]]),
    productCreate(
      14,
      'Soap',
      'A bar of soap to scrub your body or your floors.',
      4,
      [categoryIds[3]]
    ),
    productCreate(
      15,
      'Toothpaste and toothbrush',
      'A fresh tube of mint toothpaste paired with a new toothbrush.',
      2,
      [categoryIds[3]]
    ),
    productCreate(16, 'Broom', 'A straw broom to keep your floors clean.', 13, [
      categoryIds[1],
      categoryIds[3],
    ]),
    productCreate(
      17,
      'Fresnel lens',
      'A new Fresnel lens to amplify and direct the lighthouse light.',
      120,
      [categoryIds[1]]
    ),
    productCreate(
      18,
      'Clockwork replacements',
      'Replacement set of gears and weights to keep your lamp spinning should any of yours break.',
      80,
      [categoryIds[1]]
    ),
    productCreate(19, 'Sponge', 'Replacement sponge for cleaning.', 8, [
      categoryIds[2],
      categoryIds[3],
    ]),
  ]);
});
const createInstances = asyncHandler(async () => {
  const promiseArray = [];
  let instancesIndex = 0;
  productIds.forEach((x, index) => {
    for (let i = 0; i < Math.round((Math.random() * 100 * 4) / 100 + 1); i++) {
      promiseArray.push(
        instanceCreate(instancesIndex++, productIds[index], STATUSES[0])
      );
    }
    if (index % 3 === 0) {
      promiseArray.push(
        instanceCreate(
          instancesIndex++,
          productIds[index],
          STATUSES[1],
          'Light wear.  May have minor signs of damage, but remains fully functional.',
          25
        )
      );
    }
  });
  promiseArray.push(
    instanceCreate(
      instancesIndex++,
      productIds[18],
      STATUSES[1],
      'Heavy wear.  Not a full replacement, but might have some parts you could salvage.',
      65
    )
  );
  await Promise.all(promiseArray);
});

main().catch((err) => console.log(err));
