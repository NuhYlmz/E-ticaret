import SimpleSchema from 'simpl-schema';

new ValidatedMethod({
  name: 'category.update',
  validate: new SimpleSchema({
    _id: SimpleSchema.RegEx.Id,
    category: CategorySchema
  }).validator(),
  run: function (data) {
    this.unblock();
    const { _id, category } = data

    const id = Categories.update({ _id: _id }, {
      $set: category
    });

    return Categories.findOne({ _id: id });
  }
});







