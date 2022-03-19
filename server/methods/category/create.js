import SimpleSchema from 'simpl-schema';

new ValidatedMethod({
  name: 'category.create',
  validate: new SimpleSchema({
    category: CategorySchema
  }).validator(),
  run: function (data) {
    this.unblock();
    const { category } = data

    const id = Categories.insert(category);
    return Categories.findOne({ _id: id });
  }
});