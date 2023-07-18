const _instanceSchema = ({ _id, product, status, condition }) => {
  return {
    _id,
    product,
    status,
    condition,
  };
};

const ProductInstance = (details) => {
  const newInstance = _instanceSchema(details);

  newInstance.getUrl = () => `/inventory/productinstance/${newInstance._id}`;

  return newInstance;
};

const STATUSES = ['New', 'Used', 'Damaged'];

module.exports = { ProductInstance, STATUSES };
