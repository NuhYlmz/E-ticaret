import SimpleSchema from 'simpl-schema';

Categories = new Mongo.Collection('category');

CategorySchema = new SimpleSchema({
  name: String,

  description:  {
    type: String,
    optional: true
  }
});

Categories.attachSchema(CategorySchema);
Categories.softRemovable();
Categories.autoDates();
Categories.lastEditUser();
Categories.createdUser();