// This repo is optional extra practice to use the underscore functions.
// Here we'll be writing new functions, but these functions will use
// the underscore functions within them.

// If you would like to take a look at the inputs that are passed into these functions, please
// feel free to check out the data.js file.

/*
 *
 *  _.each
 *
 */

// use _.each to create a copy of the given array.
var moreFruits = function (fruits) {
  var results = [];

  _.each(fruits, function(fruit, index, collection) {
    results.push(fruit);
  });

  return results;
};

// use _.each to traverse the number array and determine
// which are multiples of five.
var multiplesOfFive = function (numbers) {
  var multiplesCount = 0;

  _.each(numbers, function (number, index, collection) {
    if (number % 5 === 0) {
      multiplesCount++;
    }
  });

  return multiplesCount;

};

// use _.each to build an array containing only tweets belonging to a specified user.

// Pseudocode
// Create a result variable and set it equal to an empty array
// Use _.each to iterate over the input array of tweets (an array
// of objects containing key value pairs)
// Determine if the current tweet matches the input user
  // if it does, push the current tweet to the result array
  // if it does not, do nothing
// return the result array


var getUserTweets = function(tweets, user) {
  var tweetsFromUser = [];

  _.each(tweets, function (tweet, index, collection) {
    if (tweet['user'] === user) {
      tweetsFromUser.push(tweet);
    }
  });

  return tweetsFromUser;

};

/*
 *
 *  _.filter
 *
 */

// use _.filter to return the fruits array with only the desired fruit.
var onlyOneFruit = function (fruits, targetFruit) {

  return _.filter(fruits, function (fruit) { return fruit === targetFruit; });

};

// use _.filter to return the fruits array with only fruits
// starting with the letter 'P'.
var startsWith = function (fruits, letter) {

  return _.filter(fruits, function (fruit) { return fruit[0] === letter; });

};

// return a filtered array containing only cookie-type desserts.
var cookiesOnly = function (desserts) {

  return _.filter(desserts, function (dessert) { return dessert['type'] === 'cookie'; });

};

// rebuild the getUserTweets function from above with _.filter instead
var filterUserTweets = function(tweets, user) {

  return _.filter(tweets, function (tweet) { return tweet['user'] === user; });

};

/*
 *
 *  _.map
 *
 */

// given an array of strings, use _.map to return a new array containing all
// strings converted to uppercase letters.
var upperCaseFruits = function (fruits) {

  return _.map(fruits, function (fruit) { return fruit.toUpperCase(); });

};

// given an array of dessert objects, return a new array of objects
// that have a new "glutenFree" property, with a boolean value.
// TIP: Items that contain flour are not gluten-free.

//Pseudocode
// Use _.map to transform each element and assign the glutenFree property to it
  // to false if the item contains flour
  // to true if it does not


var glutenFree = function (desserts) {

  _.map(desserts, function (dessert, index, collection) {
    if ( dessert['ingredients'].includes('flour') ) {
      dessert['glutenFree'] = false;
    } else {
      dessert['glutenFree'] = true;
    }
  });

  return desserts;

};

// given an array of tweet objects, return a new array of strings
// containing only the message properties.
var allUserMessages = function(tweets) {

  _.map(tweets, function ( tweet, index, collection ) {
    tweets[index] = tweet['message'];
  });

  return tweets;

};

// use _.map to return an array of items with their sale prices, with a new property
// containing the sale price. round any decimals to 2 places.
//
// having trouble with decimals? check out this article:
// http://adripofjavascript.com/blog/drips/avoiding-problems-with-decimal-math-in-javascript.html
//
/*

 example output:
  var salePrices = applyCoupon(groceries, 0.20);
  [
    {
      id: 1,
      product: 'Olive Oil',
      price: '$12.1',
      salePrice: '$9.68'
    }
  ];

*/
var applyCoupon = function (groceries, coupon) {

  _.map(groceries, function ( item, index, collection ) {

    var priceArr = item['price'].split('');
    priceArr.shift();
    var priceInt = parseFloat(priceArr.join('')) * 100;
    groceries[index]['salePrice'] = '$' + (( priceInt - priceInt * coupon ) / 100).toFixed(2);

  });
  return groceries;
};

/*
 *
 *  _.reduce
 *
 */

// return the total price of all products.
var sumTotal = function (products) {

  return _.reduce(products, function (memo, num) {
    num = parseInt(parseFloat(num['price'].slice(1)) * 100);
    // console.log('memo: ', memo, 'num :', num, 'memo + num: ', memo + num)
    return memo + num;
  }, 0) / 100;

};

// return an object consisting of dessert types and how many of each.
// exampleOutput: { dessertType: 3, dessertType2: 1 }
var dessertCategories = function (desserts) {

  var dessertTypeCount = {};

  _.reduce(desserts, function (memo, dessert) {
    if (dessertTypeCount[dessert['type']] === undefined) {
      dessertTypeCount[dessert['type']] = 1;
    } else { dessertTypeCount[dessert['type']] += 1; }
  }, 0);

  return dessertTypeCount;

};

// return an object with the proper count of all user messages
/*
 example output:
  var tweetCountPerUser = countMessagesPerUser(tweets);
  {
    "douglascalhoun": 5,
    "mracus": 6,
    "shawndrost": 5,
    "sharksforcheap": 3
  }
*/
var countMessagesPerUser = function(tweets) {

  var tweetCountPerUser = {};

  _.reduce(tweets, function (memo, tweet) {
    if (tweetCountPerUser[tweet['user']] === undefined) {
      tweetCountPerUser[tweet['user']] = 1;
    } else { tweetCountPerUser[tweet['user']] += 1; }
  }, 0);

  return tweetCountPerUser;

};

// given an array of movie data objects,return an array containing
// movies that came out between 1990 and 2000.
// TIP: use an array as your accumulator - don't push to an external array!
var ninetiesKid = function (movies) {

  return _.reduce(movies, function (ninetiesMovies, movie) {
    if ( movie['releaseYear'] >= 1990 && movie['releaseYear'] <= 2000 ) {
      ninetiesMovies.push(movie.title);
    }
    return ninetiesMovies;
  }, []);

};

// return an boolean stating if there exists a movie with a shorter
// runtime than your time limit.
// timeLimit is an integer representing a number of minutes.
var movieNight = function (movies, timeLimit) {

  return _.reduce(movies, function (isUnderLimit, movie) {
    if ( movie['runtime'] <= timeLimit ) {
      isUnderLimit = true;
    }
    return isUnderLimit;
  }, false);

};
