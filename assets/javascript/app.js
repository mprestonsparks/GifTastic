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

var APIKey = "skQePfC92zigpKm93AxiEg6K4RiNlDTy";

// REQUIRED** Create a list of GIF topics to initialize the site with
var topics = [
  "Miles+Davis",
  "Duke+Ellington",
  "John+Coltrane",
  "Louis+Armstrong",
  "Ella+Fitzgerald"
];

// REQUIRED** Create buttons from the topics list via loop
for (i = 0; i < topics.length; i++) {
  var title = topics[i];
  var id = "button" + i;
  var text = topics[i];
  createButton(title, id, text);
}

// REQUIRED** When user clicks a button, retrieve 10 static, non-animated gif images from the GIPHY API and place them on the page
$(".gif-buttons").on("click", function() {
  // Clear existing gifs from page
  $("#image-section").empty();
  var buttonSearchTerm = this.title;
  console.log("searchtitle...",buttonSearchTerm);
  var buttonQueryURL = "https://api.giphy.com/v1/gifs/search?q=" + buttonSearchTerm + "&api_key=" + APIKey + "&limit=10";
  $.ajax({
    url: buttonQueryURL,
    method: "GET"
  }).then(function(response) {
    for (i = 0; i < 10; i++) {
      var rating = response.data[i].rating;
      var imageURL = response.data[i].images.fixed_width_still.url;
      var cardID = i;
      var imgTitle = buttonSearchTerm;
      // Add gifs to page as bootstrap cards  
      createCard(rating, imageURL, cardID, imgTitle);
      console.log(response);
    }
  });
});

// Create a new button and add to end of the button section
function createButton(title, id, text) {
  var newButton = $("<button>");
  newButton.attr("title", title);
  newButton.attr("id", id);
  newButton.attr("class", "btn btn-secondary gif-buttons");
  newButton.attr("type", "button");
  $("#button-section").append(newButton);
  $(newButton).text(text);
}

// Create new bootstrap card to contain gif and rating
function createCard(rating, imageURL, cardID, imgTitle) {
  var newCard = $("<div>");
  newCard.attr("class", "card");
  $("#image-section").prepend(newCard);
  var cardText = $("<h5>");
  cardText.attr("class", "card-header text-center");
  $(newCard).prepend(cardText);
  $(cardText).text("Rating: " + rating);
  var newImg = $("<img>");
  newImg.attr("class", "card-img");
  newImg.attr("id","cardImg" + cardID);
  newImg.data("state","still");
  newImg.data("title",imgTitle);
  newImg.attr("src", imageURL);
  newImg.attr("alt", " ");
  $(cardText).append(newImg);
  var cardButton = $("<button>");
  cardButton.attr("class", "btn btn-secondary card-buttons");
  cardButton.attr("id","cardButton" + cardID);
  cardButton.attr("type","button");
  cardButton.text("Animate");
  $(newCard).append(cardButton);
}

// REQUIRED** When a topic is searched, give it a button and add to page
// REQUIRED** Display the rating of each GIF
// Push input from search form to the topics list
$("#search-button").on("click", function() {
  event.preventDefault();
  // Get text searched for as searchQuery
  var searchQuery = $("#search-text").val();
  // Push searchQuery to topics list
  topics.push(searchQuery);
  // Create new button
  var title = searchQuery.trim();
  var buttonPosition = parseInt(topics.length);
  var id = "button" + (buttonPosition - 1);
  var text = searchQuery.trim();
  createButton(title, id, text);
  // Request GIFs from Giphy API
  var newSearch = searchQuery;
  var newSearchQueryURL = "https://api.giphy.com/v1/gifs/search?q=" + newSearch + "&api_key=" + APIKey + "&limit=10";
  $.ajax({
    url: newSearchQueryURL,
    method: "GET"
  }).then(function(response) {
    // Clear existing gifs from page
    $("#image-section").empty();  
    for (i = 0; i < 10; i++) {
      var rating = response.data[i].rating;
      var imageURL = response.data[i].images.fixed_width_still.url;
      var cardID = i;
      var imgTitle = searchQuery;
      // Push gifs to page in bootstrap Cards
      createCard(rating, imageURL, cardID, imgTitle);
    }
  });
});

// REQUIRED** When user clicks an image, the GIF begins to animate
// REQUIRED** When user clicks a gif while animated, pause the GIF/convert back to static image
$(".card-buttons-wrapper").click(function (e) {
  var idClicked = e.target.id;
  var idNum = idClicked[idClicked.length - 1]
  var imageNum = "#cardImg" + idNum;
  var imageTitle = $(imageNum).data("title");
  var checkState = $(imageNum).data("state");
  var stateStill = checkState === "still";
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + imageTitle + "&api_key=" + APIKey + "&limit=10"; // Change Tree to data-title once data-title works
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    var replaceGIFID = "#cardImg" + idNum;
    var replaceGIF = $(replaceGIFID);
    var stillURL = response.data[idNum].images.fixed_width_still.url;
    var animatedURL = response.data[idNum].images.fixed_width.url;
    if (stateStill) {
      var imageURL = animatedURL;
      $(replaceGIF).attr("src", imageURL);
      $(imageNum).data("state", "animated")
    } else {
      imageURL = stillURL;
      $(replaceGIF).attr("src", imageURL);
      $(imageNum).data("state", "still");
    }
  })
});
