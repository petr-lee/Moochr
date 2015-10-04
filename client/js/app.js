$(document).ready(function() {
	$('#search').fadeOut(0);
	$('.center').fadeOut(0);
	$('.center').fadeIn(1000);

	$('.center button').click(function() {
		// Query from landing.
		var query = $('.center input').val();
		$('.center input').val('');
		$('#landing').fadeOut(0);
		$('#search').fadeIn(0);

		$('#search input').val(query);
		showResults(query);
	});

	$('#search button').click(function() {
	    window.location.reload();
	});

	$('#textbox').keypress(handle);
	function handle(e) {
	    if (e.keyCode === 13) {
	        var query = $('.center input').val();
	        $('.center input').val('');
	        $('#landing').fadeOut(0);
	        $('#search').fadeIn(0);

	        $('#search input').val(query);
	        showResults(query);
	        return false;
	    }
	}
});

function showResults(query) {
    $('#results').empty();
    window.fbAsyncInit = function () {
		FB.init({
		    appId: '1500461180253758',
			xfbml      : true,
			version    : 'v2.4'
		});

		FB.api(
			'/search',
			'GET',
			{ "q": query, "limit": 1000, "type": "event", "access_token": "CAACEdEose0cBALnhX8gggj8uZCdQaS5DrE3F8rQdXLfnuZBUTdXlifiRVek9p8FCKLZAeCtWeStGSrVRyz3r2CfX4HOadsW2AxLsQcJrDcAFBrT0icqyv1PjJZBwUw6okOg5eQZCdNmFaQ86MFwSX37n2oeWxYntsXyDVPsWolFdm966pzA9cIrgt1OOWGDmwhvbdsDUSigZDZD" },
			function (response) {
				var currDate = new Date();
				var events = response.data;
				for (i = 0; i < events.length; ++i) {
					var descr = events[i].description;
					var eventDate = new Date(events[i].start_time);
					if ((descr != null && descr.indexOf("food") > -1) && (currDate < eventDate)) {
						var date = parseInt(eventDate.getMonth(), 10) + 1 + '/' + parseInt(parseInt(eventDate.getDate(), 10) + 1, 10) + '/' + parseInt(eventDate.getFullYear(), 10);
						var time = [ eventDate.getHours(), eventDate.getMinutes(), eventDate.getSeconds() ];
						var suffix = ( time[0] < 12 ) ? "AM" : "PM";
						time[0] = ( time[0] < 12 ) ? time[0] : time[0] - 12;
						time[0] = time[0] || 12;
						for ( var a = 1; a < 3; a++ ) {
    						if ( time[a] < 10 ) {
        						time[a] = "0" + time[a];
   							}
						}
						var link = "https://www.facebook.com/" + events[i].id;

						addResult(events[i].name + '<br/>', date, time.join(':') + ' ' + suffix, events[i].place.location.city + ', ' + events[i].place.location.country, link);
						
					}
				}
			}
		)
	};

	(function (d, s, id) {
		var js, fjs = d.getElementsByTagName(s)[0];
		if (d.getElementById(id)) { return; }
		js = d.createElement(s); js.id = id;
		js.src = "https://connect.facebook.net/en_US/sdk.js";
		fjs.parentNode.insertBefore(js, fjs);
	}(document, 'script', 'facebook-jssdk'));
};

function addResult(name, date, time, location, url) {
    var child = '<a id="linkBox" href="' + url + '>' + '<div class="result">' + '<span id = "emptyspan"></span>' + '<p class="event-name"> <B id="bold">' + name + '</B></p><p class="event-date">' + date + '</p><p class="event-time">' + time + '</p><p class="event-location">' + location + '</p></div>' + '</a>';
	$('#results').append(child);
}