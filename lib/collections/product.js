import SimpleSchema from 'simpl-schema';

Products = new Mongo.Collection('product');

ProductSchema = new SimpleSchema({
  name: String,

  description:  {
    type: String,
    optional: true
  }
});

Products.attachSchema(ProductSchema);
Products.softRemovable();
Products.autoDates();
Products.lastEditUser();
Products.createdUser();