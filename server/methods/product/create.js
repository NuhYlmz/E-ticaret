import SimpleSchema from 'simpl-schema';

new ValidatedMethod({
  name: 'product.create',
  validate: new SimpleSchema({
    product: ProductSchema
  }).validator(),
  run: function (data) {
    this.unblock();
    if(Meteor.userId()==null){
      console.log(Meteor.userId());
      throw (new Meteor.Error("Kullanıcı girişi yapınız."));
    }
    const { product } = data

    const id = Products.insert(product);
    return Products.findOne({ _id: id });
  }
});