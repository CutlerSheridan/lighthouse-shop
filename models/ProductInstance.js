const { db } = require('../mongodb_config');

const _instanceSchema = ({
  _id,
  product,
  status,
  condition,
  percentDiscounted = 0,
}) => {
  return {
    _id,
    product,
    status,
    condition,
    percentDiscounted,
  };
};

const ProductInstance = (details) => {
  const newInstance = _instanceSchema(details);

  newInstance.getUrl = () => `/inventory/productinstance/${newInstance._id}`;
  newInstance.getPrice = async () => {
    const originalPrice = await db
      .collection('products')
      .findOne({ _id: newInstance._id }, { $projection: { price: 1, _id: 0 } });
    const newPrice =
      (originalPrice * 100 * (100 - newInstance.percentDiscounted)) / 10000;
    return newPrice.toFixed(2);
  };

  return newInstance;
};

const STATUSES = ['New', 'Used'];

module.exports = { ProductInstance, STATUSES };
