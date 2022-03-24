import { FlowRouter } from 'meteor/ostrio:flow-router-extra';

const routesAuth = FlowRouter.group({
  prefix: '/shop',
  name: 'shop',
  triggersEnter: [MustSignIn],
});

routesAuth.route('/', {
  name: 'shop.product',
  action: function (params, queryParams) {
    this.render('publicLayoutDefault', { page: 'publicPageShop' });
  }
});

routesAuth.route('/category', {
  name: 'shop.manage',
  action: function (params, queryParams) {
    this.render('publicLayoutDefault', { page: 'publicPageShopCategory' });
  }
});
routesAuth.route('/product', {
  name: 'shop.manage',
  action: function (params, queryParams) {
    this.render('publicLayoutDefault', { page: 'publicPageShopProduct' });
  }
});


routesAuth.route('/manage', {
  name: 'shop.manage',
  action: function (params, queryParams) {
    this.render('publicLayoutDefault', { page: 'publicPageManageShop' });
  }
});




FlowRouter.route('/', {
  name: 'public.home',
  action: function (params, queryParams) {
    this.render('publicLayoutDefault', { page: 'publicPagehome' });
  }
});

FlowRouter.route('/about', {
  name: 'public.about',
  action: function (params, queryParams) {
    this.render('publicLayoutDefault', { page: 'publicPageAbout' });
  }
});

FlowRouter.route('/chat', {
  name: 'public.chat',
  action: function (params, queryParams) {
    this.render('publicLayoutDefault', { page: 'publicPageChat' });
  }
});

FlowRouter.route('/blog/:id', {
  name: 'public.blog',
  action: function (params, queryParams) {
    this.render('publicLayoutDefault', { page: 'publicPageBlog' });
  }
});

// FlowRouter.route('/shop', {
//   name: 'public.shop',
//   action: function (params, queryParams) {
//     this.render('publicLayoutDefault', { page: 'publicPageShop' });
//   }
// });

// FlowRouter.route('/manageshop', {
//   name: 'public.manageshop',
//   action: function (params, queryParams) {
//     this.render('publicLayoutDefault', { page: 'publicPageManageShop' });
//   }
// });