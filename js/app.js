var app = {

	init: function() {
		console.log('app.init');
		var hash = window.location.hash.replace(/^.*?#/,'');

		if (hash == '') {
			app.getPosts();
		}

		$('.app-menu a').on('click', app.menus);

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
    		'<div class="home"><ul class="topcoat-list"></ul></div>';

		var singlePost =
		    '<div><article class="single-post">' +
		    '<a class="topcoat-button" href="#">Back</a>' +
		    '<h2 class="title"></h2>' +
		    '<div class="content"></div>' +
		    '</article></div>';

		var samplePage = 
			'<div><article class="static-page">' +
			'<a class="topcoat-button" href="#">Back</a>' +
			'<p>Static Page Content</p>' +
			'<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</p>' +
			'</article></div>';

		var page,
        hash = window.location.hash.replace(/^.*?#/,'');
        console.log(hash);

        /* If the hash is sample, show the samplePage. If it's anything else, load the singlePost view, otherwise it's the homePage */

        if (hash == 'sample') {
        	page = samplePage;
        } else if (hash != '') {
        	page = singlePost;
        	app.getSinglePost(hash);
        } else {
        	console.log('home page');
    		page = homePage;
    		app.init();
    	}

    	slider.slidePage($(page));
	},

	menus: function(event) {

		// Close the slide panel if a menu button is clicked
		$('.js-app-container').removeClass('slideIn').addClass('slideOut');

	}

}

var slider = new PageSlider($("#container"));

$(window).on('hashchange', app.route);

app.route();