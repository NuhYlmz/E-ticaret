import SimpleSchema from 'simpl-schema';

new ValidatedMethod({
  name: 'product.update',
  validate: new SimpleSchema({
    _id: SimpleSchema.RegEx.Id,
    product: ProductSchema
  }).validator(),
  run: function (data) {
    this.unblock();
    const { _id, product } = data

    const id = Products.update({ _id: _id }, {
      $set: product
    });

    return Products.findOne({ _id: id });
  }
});







