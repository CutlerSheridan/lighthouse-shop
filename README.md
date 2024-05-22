# Lighthouse Shop

## The inventory of a shop for lighthouse keepers.

See all products, view by category, view product instances. CRUD products, categories, instances. Using Node, Express, ejs, MongoDB.

Doesn't look pretty, just did it to learn Express.

See it deployed [here](https://lighthouse-shop-production.up.railway.app/inventory).

#### TODO NEXT

#### TODO LATER

##### Features

- add product images

##### Behavior

##### Style

#### DONE

_1.0.2_

- fix attribution link URL
- make font sans-serif
- change link colors
- change link blue hue
- adjust spacing around Update/Delete buttons
- adjust h1 margins

_1.0.1_

- add deployed link to README
- add indices for:
  - product_instances.product - for Product.getStock(), product_detail, category_detail
  - product_instances.status - for router.get('/')
  - products.categories - for category_detail
- make instances list alphabetical
- add dollar sign before price in forms
- make "in-stock" vs. "in stock" consistent
- add credit

_1.0.0_

- add production dependencies

_0.5.2_

- implement category_update_get
- implement category_update_post

_0.5.1_

- implement productinstance_update_get
- implement productinstance_update_post
- add "go back" buttons to product and instance update forms

_0.5.0_

- implement product_update

_0.4.3_

- implement category_delete

_0.4.2_

- make form-added instances of status "New" not show the "new" and "% off" in the "All in-stock" list

_0.4.1_

- implement productinstance_delete

_0.4.0_

- implement product_delete

_0.3.4_

- add Update and Delete links to each detail page

_0.3.3_

- implement category_create_get
- implement category_create_post
- write category_form.ejs
- refactor constructors to use Array.isArray(details) instead of details.length so empty arrays return empty arrays instead of empty objects

_0.3.2_

- implement productinstance_create_get
- write productinstance_form.ejs
- improve validation chain for product_create_post
- implement productinstance_create_post
- add original price to productinstance_detail

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
