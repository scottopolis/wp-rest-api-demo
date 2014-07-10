var app = {

	init: function() {
		console.log('app.init');
		var hash = window.location.hash.replace(/^.*?#/,'');

		if (hash == '') {
			app.getPosts();
		}

	},

	getPosts: function() {
		console.log('app.getPosts');
		var rootURL = 'http://www.wp4.dev/wp-json';

		$.ajax({
			type: 'GET',
			url: rootURL + '/posts?type=news',
			dataType: 'json',
			success: function(data){
				
				$.each(data, function(index, value) {
			      $('ul.topcoat-list').append('<li class="topcoat-list__item">' +
			      	'<a class="view-link" href="#'+value.ID+'">' +
			      	'<img src="'+value.featured_image.attachment_meta.sizes.medium.url+'" /></a><br>' +
			      	'<h3>'+value.title+'</h3>' +
			      	'<p>'+value.excerpt+'</p></li>');
			    });
			},
			error: function(error){
				console.log(error);
			}

		});

	},

	getSinglePost: function(postID) {
		console.log('getSinglePost');
		var rootURL = 'http://www.wp4.dev/wp-json';

		$.ajax({
			type: 'GET',
			url: rootURL + '/posts/' + postID,
			dataType: 'json',
			success: function(data){
				console.log(data);
				$('.single-post .title').append(data.title);
				$('.single-post .content').append(data.content);

			},
			error: function(error){
				console.log(error);
			}

		});

	},

	route: function(event) {
		var homePage =
    		'<div><ul class="topcoat-list"></ul></div>';

		var singlePost =
		    '<div><article class="single-post">' +
		    '<a class="topcoat-button" href="#">Back</a>' +
		    '<h2 class="title"></h2>' +
		    '<div class="content"></div>' +
		    '</article></div>';

		var page,
        hash = window.location.hash.replace(/^.*?#/,'');
        console.log(hash);

        if (hash != '') {
        	page = singlePost;
        	app.getSinglePost(hash);
        } else {
    		page = homePage;
    		app.init();
    	}

    	slider.slidePage($(page));
	}

}

var slider = new PageSlider($("#container"));

$(window).on('hashchange', app.route);

app.route();