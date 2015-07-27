module.exports = function(app) {
  app.dataSources.db_mysql.automigrate('CoffeeShop', function(err) {
    if (err) throw err;

    app.models.CoffeeShop.create([
      {name: 'Bel Cafe', city: 'Vancouver', address: 'address1'},
      {name: 'Three Bees Coffee House', city: 'San Mateo', address: 'address2'},
      {name: 'Caffe Artigiano', city: 'Vancouver', address: 'address3'},
    ], function(err, coffeeShops) {
      if (err) throw err;

      console.log('Models created: \n', coffeeShops);
    });
  });
};
