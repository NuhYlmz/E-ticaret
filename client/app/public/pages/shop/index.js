Template.publicPageShop.onCreated(function () {
    this.state = new ReactiveDict(null, {
    categories: [],
    products: [],
    filter: [],
    filteredproducts: [],
    });

});

Template.publicPageShop.onRendered(function () {
    const self = this;

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

        // Tek veri sorgusu ile çağırma
        // Meteor.call('product.show', {
        //     _id: self.state.get("filter"),
        // }, function (error, result) {

        //     if (error) {
        //         console.log(error);
        //         return;
        //     }

        //     //console.log(result);
        //     //self.state.set('filteredproducts', result.products);
        // });

        //self.productSub = Meteor.subscribe('shop.products',"aA5z8eWvXd3HsenDr");
        self.productSub = Meteor.subscribe('shop.products',self.state.get("filter"));
        console.log(self.productSub);
        //çoklu sorgu
        // Meteor.call('product.filter', {
        //     _id: self.state.get("filters"),
        // }, function (error, result) {

        //     if (error) {
        //         console.log(error);
        //         return;
        //     }

        //     console.log(result);
        //     //self.state.set('filteredproducts', result.products);
        // });

       


    });
});

Template.publicPageShop.helpers({
    products: function() {
        return Products.find({}).fetch();
      },

  });

Template.publicPageShop.events({
    // 'change .form-check-input'(event, instance) {
    //     AppUtil.refreshTokens.set('refreshShop', Random.id());
    //     if(event.currentTarget.checked){

    //     }
    //     else{

    //     }
    //     console.log(event.currentTarget.checked);
    //     console.log(event.currentTarget.id);
    //     //console.log(Template.instance().state.get("categories"));

    // },
    'submit form#brdCategorySelect': function (event, template) {
        event.preventDefault();
        let obj=[];
        for (let index = 0; index < (event.target.length-1); index++) {
            if (event.target[index].checked) {
                obj.push(event.target[index].id);
                console.log(event.target[index].value +" = "+ event.target[index].id);
            }

        } 
        Template.instance().state.set('filter',obj);
        console.log(Template.instance().state.get("filter"));
        AppUtil.refreshTokens.set('refreshShop', Random.id());
    },
});