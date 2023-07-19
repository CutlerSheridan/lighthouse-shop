# Lighthouse Shop

## The inventory of a shop for lighthouse keepers.

See all products, view by category, view product instances. CRUD products, categories, instances. Using Node, Express, ejs, MongoDB.

#### TODO NEXT

- implement product_detail
- implement category_detail
- implement productinstance_detail

#### TODO LATER

##### Features

##### Behavior

- add indices for:
  - product_instances.product - for Product.getStock()
  - product_instances.status - for router.get('/')

##### Style

- add credit

#### DONE

_0.1.4_

- implement productinstance_list

_0.1.3_

- implement category_list

_0.1.2_

- code home page with doc counts displayed

_0.1.1_

- add style for All Products page so it's a grid

_0.1.0_

- implement product_list

_0.0.2_

- add percentDiscounted and getPrice() to ProductInstance objects
- add populatedb script to fill in db

_0.0.1_

- change term "item" to "product"
- write Product constructor
- write ProductInstance constructor
- write Category constructor

_0.0.0_

- setup project with dependencies, directories, files
- add tailored boilerplate code to get started
