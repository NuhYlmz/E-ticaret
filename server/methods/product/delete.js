import SimpleSchema from 'simpl-schema';

new ValidatedMethod({
  name: 'product.delete',
  validate: new SimpleSchema({
    _id: SimpleSchema.RegEx.Id
  }).validator(),
  run: async function (data) {
    this.unblock();
    if(Meteor.userId()==null){
      console.log(Meteor.userId());
      throw (new Meteor.Error("Kullanıcı girişi yapınız."));
    }
    const { _id } = data;

    Products.remove({ _id: _id });
  }
});




