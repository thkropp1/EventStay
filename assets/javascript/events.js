// =====================//
// ======EVENT STAY=====//
// =====================//


// *Global artist var
// ===================

var artist;
var clientId = "&client_id=ODM4NTkyM3wxNTAxNzgxMjczLjM5";
$("#eventResults").hide();
var lat;
var lon;
var newList;
var checkArray = [];


// *Calling ajax for events
// ==========================
function findEvent(events) {

  // Clear no-event message from previous search
    $("#no-event").empty();

  // var for query url
  var queryURL = "https://api.seatgeek.com/2/events?performers.slug=" + artist + clientId;


  $.ajax({
    url: queryURL,
    method: "GET"
  }).done(function(response2) {

    // Printing the entire object to console
    //console.log(response2);

    // *Construct HTML 
    // ====================

    // if prev searches... remove items 
    $(".result").remove();

    // number of events returned
    console.log("Number of Events Returned: " + response2.events.length);

     // Display message if no scheduled events are found
    if (response2.events.length === 0) {
      $("#no-event").append("No scheduled event(s) found.");
    } 

    for (var i = 0; i < response2.events.length; i++) {
      var object = response2.events[i];

      // set variables for info i need
      lat = object.venue.location.lat;
      lon = object.venue.location.lon;
      var eventName = object.title;
      var tickets = $("<a>").attr("href", object.url).text("Buy Tickets");
      tickets.attr("target", "_blank");
      var eventDate = moment(object.datetime_utc).format("MM/DD/YYYY");
      var eventCity = object.venue.display_location;



      // Generating new div 
      newList = $("<li>");
      var newEvent = $("<div>");
      $(newEvent).addClass("collapsible-header result");
      $(newEvent).attr("data-Index", i);
      $(newEvent).attr("lat", lat);
      $(newEvent).attr("lon", lon);

      // making first col for event name and location
      var col1 = $("<span>");
      $(col1).addClass("col s10");

      // append to col1
      $(col1).append(eventName + "<br/>" + eventCity + "<br/>" + eventDate + "<br/>");

      // let users know to click here for a list of hotels
      var hotelList = $("<p>").attr("class", "hotel-font").text("Click here for a list of local hotels");

      // append to col1      
      $(col1).append(hotelList);

      // making second col for ticket url
      var col2 = $("<span>");
      $(col2).addClass("col s2");

      // append to col2
      col2.append(tickets);


      // append columns to div
      newEvent.append(col1, col2);

      var body = $("<div>");
      $(body).addClass("collapsible-body clearfix");
      $(body).attr("id", "body" + i)
      // append div to new list
      newList.append(newEvent, body);


      $("#eventResults").append(newList);

      // calling hoetel function
      // hoeTels();

    };
  });
};


// *Calling ajax for artist
// ==========================
function findArtist(artist) {

  // Clear previous band name and band image
  $("#band-name").empty();
  $("#band-image").attr("src", "assets/images/concert2.jpg");

  var queryURL1 = "https://api.seatgeek.com/2/performers?slug=" + artist + clientId;

  $.ajax({
    url: queryURL1,
    method: "GET"
  }).done(function(response) {

    // Printing the entire object to console
    // console.log(response);

    // image, name, upcoming events

    var artistName = response.performers[0].short_name;
    // console.log(artistName);

    var bandImage = response.performers[0].image;
    console.log("Band Image: " + bandImage);

    // *Construct HTML
    // ================

    // Append artist name
    $("#band-name").append(artistName);
   
    // Attr band image
    if (bandImage === null) { // If no band image is found, use the stock image
    	$("#band-image").attr("src", "assets/images/concert2.jpg");
    } else {
        $("#band-image").attr("src", bandImage);
    }
  });
};






// *Capture user input in search box..
// =====================================

// Event handler for user clicking the select-artist button
$("#search").submit(function(event) {
  $("#eventResults").show();
  // Preventing the button from trying to submit the form
  event.preventDefault();

  // Reset the array so that a user can search for another artist again and have hotels populate
  checkArray = [];

  //remove body containing hotel info from previous searches
  $(".collapsible-body").remove();


  // Storing the artist name
  artist = $("#searchText").val().toLowerCase().trim().split(" ").join("-");
  console.log("Artist is: " + artist);

  // Running the findEvent function (passing in the artist as an argument)
  findEvent(event);

  if (artist !== "") {
     findArtist(artist);
  } else {
     // Clear previous band name and band image
     $("#band-name").empty();
     $("#band-image").attr("src", "assets/images/concert2.jpg");
  }


});


$(document).on("click", ".result", function() {

  var body = $("<div>");
  $(body).addClass("collapsible-body clearfix");

  // $(this).append(body);

  var lon = $(this).attr("lon");

  var lat = $(this).attr("lat");

  var id = $(this).attr("data-Index");

  var hotelRooms = ["assets/images/room1.jpg", "assets/images/room2.jpg", "assets/images/room3.jpg", "assets/images/room4.jpg", "assets/images/room5.jpg"]

  var queryURL = "https://hotwire.herokuapp.com/v1/deal/hotel?format=json&apikey=8bya58qw23u2q33c7cmwb34d&limit=10&dest==" + lat + "," + lon + "&distance=*~30&starrating=4~*&sort=price&sortorder=asc";

  // var queryURL = "http://api.hotwire.com/v1/deal/hotel?apikey=8bya58qw23u2q33c7cmwb34d&format=json&limit=5&dest=="+lat+","+lon+"&distance=*~30&starrating=4~*&sort=price&sortorder=asc";


  if (checkArray.indexOf(id) === -1) {
    checkArray.push(id);

    $.ajax({
        url: queryURL,
        method: "GET"
      })
      .done(function(response) {




        for (var i = 0; i < 5; i++) {
          console.log(response);

          var object2 = JSON.parse(response);
          console.log(object2);
          var price = object2.Result[i].Price;
          var hotelURL = object2.Result[i].Url;
          var starRating = object2.Result[i].StarRating;
          var savingsPercentage = object2.Result[i].SavingsPercentage;
          var city = object2.Result[i].City;
          var state = object2.Result[i].StateCode;
          var Neighborhood = object2.Result[i].Neighborhood;
          var nights = object2.Result[i].NightDuration;

          console.log(price, city, state);


          var hotelImg = $("<span>");
          $(hotelImg).addClass("col s4");
          $(hotelImg).attr("id", "hotelImg");

          var hotelPic = $("<img>");
          hotelPic.attr("src", hotelRooms[i]);
          hotelPic.attr("id", "hotelPic");
          hotelImg.append(hotelPic)


          var hotelArea = $("<span>");
          $(hotelArea).addClass("col s6");
          $(hotelArea).attr("id", "hotelinfo")
          hotelArea.append("<b>" + Neighborhood + "</b><br/>");
          hotelArea.append(city + ", " + state);
          hotelArea.append("<br/>Rating: " + starRating + " &#9734;&#9734;&#9734;&#9734;")
          hotelArea.append("<br/>" + "<a href='" + hotelURL + "'target='_blank'>Hotwire LINK</a>");

          var priceInfo = $("<span>");
          $(priceInfo).addClass("col s2");
          $(priceInfo).attr("id", "hotelPrices");
          priceInfo.append("<h2>$" + Math.trunc(price) + "</h2><br/>Per Night</h1><br/>A " + savingsPercentage + "% Discount");
          // console.log(priceInfo, hotelArea);

          var row = $("<div>");
          $(row).addClass("row valign-wrapper");
          row.append(hotelImg, hotelArea, priceInfo);

          console.log(id);

          $("#body" + id).append(row);

          // console.log(row);

          // body.append(row);
          //  // console.log(body);



          // newList.append(body);
          // console.log(newList);

          // $("#eventResults").append(newList);

        };



      });
  } else {
    console.log("Stop double-clicking");
  }
});





// $(document).on('click','.result',function(){});