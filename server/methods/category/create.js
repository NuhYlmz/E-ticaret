import SimpleSchema from 'simpl-schema';

new ValidatedMethod({
  name: 'category.create',
  mixins: [SignedInMixin],
  validate: new SimpleSchema({
    category: CategorySchema.omit('level')
  }).validator(),
  run: function (data) {
    this.unblock();
    const { category } = data;

    if (category.parentId) {
      const parentCategory = Categories.findOne({ _id: category.parentId });

      if (!parentCategory) {
        throw (new Meteor.Error("Eklemek istediğini ana kategori bulunamadı."));
      }

      const level = parentCategory.level;

      if (level < 2) {
        category.level = level + 1;
      } else {
        throw (new Meteor.Error("Daha fazla alt kategori oluşturulamaz."));
      }
    } else {
      category.level = 0;
    }

    const id = Categories.insert(category);
    return Categories.findOne({ _id: id });
  }
});