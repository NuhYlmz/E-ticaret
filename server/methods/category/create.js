import SimpleSchema from 'simpl-schema';

new ValidatedMethod({
  name: 'category.create',
  validate: new SimpleSchema({
    category: CategorySchema.omit('level')
  }).validator(),
  run: function (data) {
    this.unblock();
    const { category } = data
    if (category.parentId == 'default') {
      category.level=0;
    }else{
      const parentLevel = Categories.findOne({_id: category.parentId}).level;
      if(parentLevel<2){
        category.level=parentLevel+1;
      }else{
        throw (new Meteor.Error("Daha fazla alt kategori oluşturulamaz."));
      }
    }
  
    const id = Categories.insert(category);
    return Categories.findOne({ _id: id });
  }
});