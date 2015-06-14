$(function () {
    $('#search').on('click', function (evt) {
        var query = $('#query').val();
        search(query);
        
        // Prevent form submission to server
        // Normally, when you click a submit button on a form, a call is made to the server.
        // Returning false prevents this
        // Ref: http://stackoverflow.com/questions/1357118/event-preventdefault-vs-return-false
        return false;
    });
});

function search(query) {
    var apiKey = 'AIzaSyDgN9qwEHmxUGkpZVeegH0rvoHNT0a_rsc';
    $.getJSON('https://www.googleapis.com/youtube/v3/search?part=snippet&key=' + apiKey + '&q=' + query, function (data) {
        $('#results li').remove(); // Clear existing search results
        if (data.items && data.items.length > 0) {
            console.log(data);
            showResults(data.items);
        } else {
            $('#error').text('No results');
        }
    });
}

function showResults(results){
  $.each(results, function(index,value){
    var videoUrl = 'https://www.youtube.com/watch?v=' + value.id.videoId;
    var innerHtml = '<a href="' + videoUrl + '">';
    innerHtml += '<h3 class="title">' + value.snippet.title + '</h3>';
    innerHtml += '<img src="' + value.snippet.thumbnails.default.url + '" />';
    innerHtml += '<span class="description">' + value.snippet.description + '</span>';
    innerHtml += '</a>';
    $('#results').append('<li>' + innerHtml + '</li>');
  });
}
