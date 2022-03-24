Template.publicPageShopProduct.onCreated(function () {
  this.state = new ReactiveDict(null, {
    categories: [],
    products: [],
  });
});

Template.publicPageShopProduct.onRendered(function () {
  const self = this;

  this.autorun(function () {
    AppUtil.refreshTokens.get('refreshShopManage');
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
  });
});

Template.publicPageShopProduct.helpers({
  counter: function () {
    Template.instance().i++;
    return Template.instance().i;
  }
});

Template.publicPageShopProduct.events({

  'click .productDel': function (event, template) {
    event.preventDefault();
    const product = this;
    LoadingLine.show()
    Meteor.call('product.delete', {
      _id: product._id
    }, function (error, result) {
      LoadingLine.hide()

      if (error) {
        ErrorHandler.show(error)
        return;
      }

      AppUtil.refreshTokens.set('refreshShopManage', Random.id());
    });

  },
  'submit form#brdProductCreateForm': function (event, template) {
    event.preventDefault();
    const name = event.target.productNameInput.value;
    const categoryId = event.target.productCategorySelect.value;
    const imageUrl = event.target.productImageLink.value;
    const obj = {
      product: {
        name: name,
        categoryId: categoryId,
        imageUrl: imageUrl
      }
    }
    Meteor.call('product.create', obj, function (error, result) {

      if (error) {
        console.log(error);
        return;
      }
      AppUtil.refreshTokens.set('refreshShopManage', Random.id());
      //console.log(result);
      event.target.reset();
    });

  },
});