  	// By default display the Event content from localStorage
    $("#searchText").val(localStorage.getItem("event"));
    console.log("Event from localStorage(previous search): " + localStorage.getItem("event"));
        
    // Capture Button Click
    $("#submit-search").on("click", function(event) {
	      // prevent page from refreshing when form tries to submit itself
	      // event.preventDefault();

	      // Capture user input and store them into a variable
	      var eventSearch = $("#searchText").val().trim();
      
          // Console log the user input to confirm we are receiving them
	      console.log("Event: " + eventSearch);

	      // Store the content into localStorage
	      localStorage.setItem("event", eventSearch);
	      
	      // By default, display the content from localStorage
	      console.log("Event from localStorage: " + localStorage.getItem("event"));  
    });

    // Reset Event search input
    //$("#reset-search").on("click", function(event) {
		      //console.log("Clear Search text field when user clicks on the Reset button.");
		      //$("#searchText").val("");
	//});

    // Reset Event search input field with Delete key
	$(document).keyup(function (e) {
    	if (e.keyCode == 46) {
      		//console.log("Clear Search text field when the user clicks on the Delete key.");
      		$("#searchText").val("");
    	}
	});