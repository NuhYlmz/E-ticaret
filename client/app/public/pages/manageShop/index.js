Template.publicPageManageShop.onCreated(function () {
    this.state = new ReactiveDict(null, {
        categories: [],
        selectedCategory: null
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
    'submit form#brdCategoryCreateForm': function (event, template) {
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

    },
    'click .categoryDel': function (event, template) {
        event.preventDefault();
        const category = this;

        LoadingLine.show()

        Meteor.call('category.delete', {
            _id: category._id
        }, function (error, result) {
            LoadingLine.hide()

            if (error) {
                ErrorHandler.show(error)
                return;
            }

            AppUtil.refreshTokens.set('refreshShopManage', Random.id());
        });

    },
    'click .brd-category-select': function (event, template) {
        event.preventDefault();
        console.log(this);
        template.state.set('selectedCategory', this);
      }
});