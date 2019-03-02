// Open connection to the Giphy API
// Create a list of GIF topics to initialize the site with
// Create buttons from the topics list via loop
// When user clicks a button, retrieve 10 static, non-animated gif images from the GIPHY API and place them on the page
// When user clicks an image, the GIF beings to animate
// When user clicks a gift while animated, pause the GIF/convert back to static image
// Display the rating of each GIF
// Push input from search form to the topics list
// When a topic is searched, give it a button and add to page
// *********************************************************************************************************

// Open connection to the Giphy API
// var APIKey = "skQePfC92zigpKm93AxiEg6K4RiNlDTy";
// var queryURL = "http://api.giphy.com/v1/gifs/search?q=ryan+gosling&api_key="+APIKey+"&limit=10"
// $.ajax({
//     url: queryURL,
//     method: "GET"
//   }).then(function(response) {
//     $("#movie-view").text(JSON.stringify(response));
//   });

// Create a list of GIF topics to initialize the site with
// Create buttons from the topics list via loop
// When user clicks a button, retrieve 10 static, non-animated gif images from the GIPHY API and place them on the page
// When user clicks an image, the GIF beings to animate
// When user clicks a gift while animated, pause the GIF/convert back to static image
// Display the rating of each GIF
// Push input from search form to the topics list
// When a topic is searched, give it a button and add to page