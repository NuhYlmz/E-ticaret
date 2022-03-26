import { each } from 'jquery';
import SimpleSchema from 'simpl-schema';

new ValidatedMethod({
  name: 'category.delete',
  mixins: [SignedInMixin],
  validate: new SimpleSchema({
    _id: SimpleSchema.RegEx.Id
  }).validator(),
  run: async function (data) {
    this.unblock();

    const { _id } = data;
    let category = Categories.findOne({ _id: _id });

    const categoryIds = [category._id];

    const deleteSubCategory = (_id) => {
      const categories = Categories.find({ parentId: _id }).fetch();

      categories.forEach(category => {
        categoryIds.push(category._id);
        deleteSubCategory(category._id);
      });
    }

    deleteSubCategory(category._id);
    Categories.remove({ _id: { $in: categoryIds } })

  }
});