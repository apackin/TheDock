app.config(function ($stateProvider) {

    // Register our *products* state.
    $stateProvider.state('products', {
        url: '/products',
        controller: 'ProductsController',
        templateUrl: 'js/product/products.html',
        resolve: {
        	products: function (ProductsFactory){
        		return ProductsFactory.fetchAll();
        	}
        }
    });

    $stateProvider.state('product', {
        url: '/products/:productId',
        controller: 'ProductController',
        templateUrl: 'js/product/product.html',
        resolve: {
            product: function (ProductsFactory, ReviewFactory,$stateParams){
                return ProductsFactory.fetchById($stateParams.productId)
                    .then(function(product){
                        return ReviewFactory.fetchProdReviews($stateParams.productId)
                        .then(function(reviews){
                            console.log("REVIEWS", reviews);
                            product.reviews = reviews;
                            return product;
                        });
                    });
            // making this two requests here is silly, should do this on the backend.
            }
        }
    });

});
