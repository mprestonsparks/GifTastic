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
var APIKey = "skQePfC92zigpKm93AxiEg6K4RiNlDTy";

// Create a list of GIF topics to initialize the site with
var topics = ["Miles+Davis","Duke+Ellington","John+Coltrane","Louis+Armstrong","Ella+Fitzgerald"]

// Create buttons from the topics list via loop
for (i=0; i<topics.length; i++) {
    var setupButtons = $("<button>");
    setupButtons.attr("title",topics[i]);
    setupButtons.attr("id","button"+i);
    setupButtons.attr("class","btn btn-secondary")
    setupButtons.attr("type","button")
    $("#button-section").append(setupButtons);
    $(setupButtons).text(topics[i]);
}
// When user clicks a button, retrieve 10 static, non-animated gif images from the GIPHY API and place them on the page
$("button").on("click", function() {
    var buttonSearchTerm = this.title;  
    var buttonQueryURL = "https://api.giphy.com/v1/gifs/search?q="+buttonSearchTerm+"&api_key="+APIKey+"&limit=10"
    var buttontest = this.id;
    // rating = "This Rating";
    // imageURL = "https://www.firemagicgrills.com/wp-content/uploads/accessories-small-placeholder.jpg"
    // createCard(rating,imageURL);
    
    // *** COMMENTED THIS SECTION OUT UNTIL THE CORS ERROR IS FIXED ***
    // *** ONCE AJAX REQUEST WORKS, REPLACE LAST 3 LINES ABOVE W/ CODE BELOW ***
    $.ajax({
        url: buttonQueryURL,
        method: "GET",
        // datatype: "jsonp",
    }).then(function(response) {
        for (i=0; i<10; i++) {
            rating = response.data[i].rating;
            var test5 = response.data[i].images.original.url;
            imageURL = test5;
            createCard(rating,imageURL);
        }
        console.log(response);
        console.log("imageurl..",imageURL);
    });
});

function createCard(rating,imageURL) {
    var newCard = $("<div>");
    newCard.attr("class","card");
    $("#image-section").prepend(newCard);
    var cardText = $("<h5>");
    cardText.attr("class","card-header text-center");
    $(newCard).prepend(cardText);
    $(cardText).text("Rating: " + rating);
    var newImg = $("<img>");
    newImg.attr("class","card-img")
    newImg.attr("src",imageURL);
    newImg.attr("alt"," ");
    $(cardText).append(newImg);
};

// When user clicks an image, the GIF begins to animate
// When user clicks a gif while animated, pause the GIF/convert back to static image
// Display the rating of each GIF
// Push input from search form to the topics list
// When a topic is searched, give it a button and add to page