import SimpleSchema from 'simpl-schema';

Categories = new Mongo.Collection('category');

CategorySchema = new SimpleSchema({
  name: String,
  parentId:  {
    type: SimpleSchema.RegEx.Id,
    optional: true
  },
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