import SimpleSchema from 'simpl-schema';

new ValidatedMethod({
  name: 'category.list',
  validate: new SimpleSchema({
    options: { type: QueryOptionsSchema, optional: true }
  }).validator(),
  run: function (data) {
    this.unblock();
    
    const { options } = data

    return Fetch(Categories, {}, options, 'categories');
  }
});