import SimpleSchema from 'simpl-schema';

new ValidatedMethod({
  name: 'product.delete',
  mixins: [SignedInMixin],
  validate: new SimpleSchema({
    _id: SimpleSchema.RegEx.Id
  }).validator(),
  run: async function (data) {
    this.unblock();
    const { _id } = data;

    Products.remove({ _id: _id });
  }
});




