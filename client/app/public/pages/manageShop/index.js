Template.publicPageManageShop.onCreated(function () {
    this.state = new ReactiveDict(null, {
        categories: [],            
    });

});

Template.publicPageManageShop.onRendered(function () {
    const self = this;

    this.autorun(function () {
        AppUtil.refreshTokens.get('refreshShopManage');
        Meteor.call('category.list', {}, function (error, result) {

            if (error) {
              console.log(error);
              return;
            }
      
            console.log(result);
            self.state.set('categories', result.categories);
          });
    });
});

Template.publicPageManageShop.helpers({

  });

Template.publicPageManageShop.events({
    'submit form#brdCategoryCreateForm': function (event,template) {
        event.preventDefault();
        const name = event.target.category.value;
        const obj = {
            category: {
              name: name
            }
          }
      
          Meteor.call('category.create', obj, function (error, result) {
      
            if (error) {
              console.log(error);
              return;
            }
      
            AppUtil.refreshTokens.set('refreshShopManage', Random.id());
            console.log(result);
            event.target.reset();
          });

    }
});