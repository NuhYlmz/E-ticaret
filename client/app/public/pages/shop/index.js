Template.publicPageShop.onCreated(function () {
  this.state = new ReactiveDict(null, {
    categories: [],
    products: [],
    filter: [],
  });

});

Template.publicPageShop.onRendered(function () {
  const self = this;

  // setTimeout(() => {
  //   $('.fiterbtn').trigger('click')
  // }, 500);

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
    Meteor.call('product.list', {}, function (error, result) {

      if (error) {
        console.log(error);
        return;
      }
      //console.log(result);
      self.state.set('products', result.products);
    });

    self.productSub = Meteor.subscribe('shop.products', self.state.get("filter"));

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