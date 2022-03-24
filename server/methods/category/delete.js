import { each } from 'jquery';
import SimpleSchema from 'simpl-schema';

new ValidatedMethod({
  name: 'category.delete',
  validate: new SimpleSchema({
    _id: SimpleSchema.RegEx.Id
  }).validator(),
  run: async function (data) {
    this.unblock();
    const { _id } = data;
    let obj = Categories.findOne({_id: _id})
    let obj2 = Object;
    if (obj.level == 2) {
      Categories.remove({ _id: obj._id });
    }else if(obj.level == 1){
      Categories.remove({ _id: obj._id });
      Categories.remove({ parentId: obj._id});
    }else if(obj.level == 0){
      obj2= Categories.find( { parentId: obj._id } )
      obj2.forEach(function(data1){
        Categories.remove({ parentId: data1._id});
        Categories.remove({ _id: data1._id });
      })
      Categories.remove({ _id: obj._id });
    }
  }
});