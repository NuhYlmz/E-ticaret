Template.publicPageShop.onCreated(function () {
  this.state = new ReactiveDict(null, {
    categories: [],
    filter: [],
  });
});

Template.publicPageShop.onRendered(function () {
  const self = this;
  this.autorun(function () {
    self.productSub = Meteor.subscribe('shop.products', self.state.get("filter"));
  });
  this.autorun(function () {
    AppUtil.refreshTokens.get('refreshShop');

    Meteor.call('category.list', {}, function (error, result) {

      if (error) {
        console.log(error);
        return;
      }
      //console.log(result);
      self.state.set('categories', result.categories);
    });
  });
});

Template.publicPageShop.helpers({
  products: function () {
    return Products.find({}).fetch();
  },

});

Template.publicPageShop.events({
  'submit form#brdCategorySelect': function (event, template) {
    event.preventDefault();
    let obj = [];
    for (let index = 0; index < (event.target.length - 1); index++) {
      if (event.target[index].checked) {
        obj.push(event.target[index].id);
      }
    }
    Template.instance().state.set('filter', obj);
    //console.log(Template.instance().state.get("filter"));
    AppUtil.refreshTokens.set('refreshShop', Random.id());
  },
});