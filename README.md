# Lighthouse Shop

## The inventory of a shop for lighthouse keepers.

See all products, view by category, view product instances. CRUD products, categories, instances. Using Node, Express, ejs, MongoDB.

#### TODO NEXT

- implement productinstance_create
- implement category_create

#### TODO LATER

##### Features

- add product images

##### Behavior

- make instances list alphabetical
- make "in-stock" vs. "in stock" consistent
- add indices for:
  - product_instances.product - for Product.getStock(), product_detail, category_detail
  - product_instances.status - for router.get('/')
  - products.categories - for category_detail

##### Style

- add credit

#### DONE

_0.3.1_

- add stylesheet for forms with basic styling for legibility

_0.3.0_

- implement product_create_get
- implement product_create_post
- write product_form

_0.2.2_

- implement productinstance_detail
- style productinstance_detail a little for legibility

_0.2.1_

- implement category_detail
- refactor stylesheet template logic to accept multiple stylesheets
- extract product grid into its own css file for multipurpose use

_0.2.0_

- implement product_detail
- add getPriceFromArgument() method to ProductInstance objects as sync alternative to async getPriceFromDb()
- style product_detail a little for legibility

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
