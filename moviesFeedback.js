/*
$(document).ready(function () {

    var moviesFeedback = {

        submitForm: $('#movie-feedback-form'),
        apiHost: 'https://api.parse.com/1/',
        apiAppId: '8V1SzXwjmJC1BHXqlYXVuD1pPn0Di4FdxGEUY1N7',
        apiJSId: 'Xq9y1XH9TEWai2mC7XwRQdlVdWPILnTXnINwbEBa',

        init: function () {
            console.debug('Movies feedback page initialization started...');

            moviesFeedback.bindEventHandlers();

        },

        bindEventHandlers: function () {

            $('#movie-feedback-form').submit(function (event) {
                event.preventDefault();
                console.info('Going to submit feedback form');

                if (moviesFeedback.validateForm() == true) {

                    var formData = {
                        title: $('#movie-title').val(),
                        genre: $('#movie-genre').val(),
                        year: $('#movie-year').val(),
                        description: $('#movie-description').val(),
                        imgUrl: $('#movie-img').val(),
                        postAuthor: $('#movie-post-author').val()
                    };

                    console.debug('Going to post following data:', formData);

                    $.ajax({
                        url: 'https://api.parse.com/1/classes/Movie',
                        method: 'POST',

                        headers: {
                            'X-Parse-Application-Id': moviesFeedback.apiAppId,
                            'X-Parse-JavaScript-Key': moviesFeedback.apiJSId
                        },

                        contentType: 'application/json',

                        data: JSON.stringify(formData),

                        success: function (data, textStatus) {
                            console.debug('Successful feedback post request. Response is:', data);
                            alert('Спасибо, ваш отзыв успешно сохранён');

                        },
                        error: function (error, status) {
                            console.error('Error while feedback post. Error is:', error);
                            alert('Произошла ошибка. Проверьте консоль');
                        }
                    });

                } else {
                    swal('Форма не валидна!');
                }

            });

            $('#btn-load-data').click(function () {
                console.info('Going to get some data from API server');

                $.ajax({
                    url: 'https://api.parse.com/1/classes/Movie',
                    method: 'GET',

                    headers: {
                        'X-Parse-Application-Id': moviesFeedback.apiAppId,
                        'X-Parse-JavaScript-Key': moviesFeedback.apiJSId
                    },

                    success: function (data, textStatus) {
                        console.debug('Successful feedback post request. Response is:', data);

                        var recommendation = data.results;

                        for (var i = 0; i < recommendation.length; i++) {
                            var movieTitle = $('<h3></h3>');
                            movieTitle.html(recommendation[i].title);
                            $('#movie-recommendations-feed').append(movieTitle);
                        }


                    },
                    error: function (error, status) {
                        console.error('Error while feedback post. Error is:', error);

                    }
                })

            })


        },

        validateForm: function () {
            console.debug('Performing validation');

            var titleValidation, genreValidation, yearValidation;

            var titleInput = $('#movie-title');
            var genreInput = $('#movie-genre');

            var title = titleInput.val();
            var genre = genreInput.val();

            if (title.length > 2) {

                titleInput.parent().addClass('has-success').removeClass('has-error');

                titleValidation = true;

            } else {

                titleInput.parent().addClass('has-error').removeClass('has-success');

                titleValidation = false;

            }

            if (genre.length > 2) {

                genreInput.parent().addClass('has-success').removeClass('has-error');

                genreValidation = true;

            } else {

                genreInput.parent().addClass('has-success').removeClass('has-error');

                genreValidation = false;

            }

            if (titleValidation == true && genreValidation == true) {

                return true;

            } else {

                return false;

            }

        }

    };

    moviesFeedback.init();

});










$(document).ready(function () {

    var moviesFeedback = {

        submitForm: $('#movie-feedback-form'),      
        apiHost: 'https://api.parse.com/1/',
        apiAppId: '8V1SzXwjmJC1BHXqlYXVuD1pPn0Di4FdxGEUY1N7',
        apiJSId: 'Xq9y1XH9TEWai2mC7XwRQdlVdWPILnTXnINwbEBa',


        init: function () {
            console.debug('Movies feedback page initialization started...');
            moviesFeedback.populateFormWithTestData();
            moviesFeedback.bindEventHandlers();
            moviesFeedback.displayRecommendationsOnPage();
            moviesFeedback.validationForm();

        },

        bindEventHandlers: function () {

            moviesFeedback.submitForm.submit(moviesFeedback.handleFeedBackSubmit);

        },

         validationForm: function() { 
            console.debug ('parforming validation');                     
            var titleInput =  $('#movie-title');
            var genreInput = $('#movie-genre');

            var title = titleInput.val();
            var genre = genreInput.val();
            var titleValidation, genreValidation;


            if (title.length > 2) {
               titleValidation = true;
               titleInput.parent().addClass('has-success').removeClass('has-error');

               

            } else {
                titleValidation =  false;
                titleInput.parent().addClass('has-error').removeClass('has-success');
                               

            }
             if (genre.length > 2) {
                 genreInput.parent().addClass('has-success').removeClass('has-error');
                genreValidation = true

            } else {
                genreInput.parent().addClass('has-error').removeClass('has-success');
                genreValidation =  false
                

            }
            if (titleValidation == true && genreValidation == true) {
                return true;
            } else {
                return false;
            }

        },

        handleFeedBackSubmit: function (event) {
            
            event.preventDefault(); //это чтобы форма не сабмитнулась обычным методом, ведь мы собираемся отправлять данные через AJAX   
            var formData = {
                title: $('#movie-title').val(),
                genre: $('#movie-genre').val(),
                year: $('#movie-year').val(),
                description: $('#movie-description').val(),
                imgUrl: $('#movie-img').val(),
                postAuthor: $('#movie-post-author').val(),
                loadData:$("#load-data")
            };

           
           // console.debug('Feedback form submitting:', formData);

            $.ajax({
                method: 'POST',
                url: moviesFeedback.apiHost + 'classes/Movie',
                headers: {
                    'X-Parse-Application-Id': moviesFeedback.apiAppId,
                    'X-Parse-JavaScript-Key': moviesFeedback.apiJSId
                },



                contentType: 'application/json',
                data: JSON.stringify(formData),
                success: function (data, textStatus) {
                    console.debug('Successfull feedback post request. Response is:', data);
                    alert("Спасибо, ваш отзыв принят");

                },
                error: function (response, status) {
                    console.error('Error while feedback post. Response is:', response);
                    alert("Ошибка отправки данных")
                }
            })

        },


        populateFormWithTestData: function () {

            $('#movie-title').val('');
            $('#movie-genre').val('');
            $('#movie-year').val('');
            $('#movie-description').val('');
            $('#movie-img').val('');
            $('#movie-post-author').val('Олег');


        },

        getRecommendations: function (callback) {

            $.ajax({
                method: 'GET',
                url: moviesFeedback.apiHost + 'classes/Movie',
                headers: {
                    'X-Parse-Application-Id': moviesFeedback.apiAppId,
                    'X-Parse-JavaScript-Key': moviesFeedback.apiJSId
                },
                contentType: 'application/json',
                success: function (data, textStatus) {
                    console.debug('Successful GET movies recommendations. Response is:', data);
                    callback(data.results);

                },
                error: function (response, status) {
                    console.error('Error while GET movies recommendations. Response is:', response);
                }
            })

        },

        displayRecommendationsOnPage: function () {

            moviesFeedback.getRecommendations(function (recommendations) {

                var recommendationsHolder = $('#movie-recommendations-feed');
                recommendationsHolder.html('');

                for (var i = 0; i < recommendations.length; i++) {

                    var recElement = $('<div class="col-xs-12"></div>');
                    var thumbnailElement = $('<div class="thumbnail"></div>');
                    var thumbnailCaption = $('<div class="caption"></div>');

                    var divider = $('<hr>');

                    var recTitle = $("<h4>" + recommendations[i].title + " <small>(" + recommendations[i].genre + ")</small></h4>");
                    var recYear = $("<span>Год: " + recommendations[i].year + "</span><br>");
                    var recDescription = $("<p>Описание: " + recommendations[i].description + "</p>");

                    var recImg = $("<img src='" + recommendations[i].imgUrl + "'>");

                    var recPostAuthorName = $("<p>Рекоммендация от: " + recommendations[i].postAuthor + "</p>");
                    var recPostDate = $("<p>Дата рекомендации: " + recommendations[i].createdAt + "</p>");

                    thumbnailCaption.append(recTitle);
                    thumbnailCaption.append(recYear);
                    thumbnailCaption.append(recDescription);
                    thumbnailCaption.append(recPostAuthorName);
                    thumbnailCaption.append(recPostDate);

                    thumbnailElement.append(recImg);
                    thumbnailElement.append(thumbnailCaption);

                    recElement.append(thumbnailElement);

                    recommendationsHolder.append(recElement);

                }


            })

        } 

   };


    moviesFeedback.init();

});
*/



$(document).ready(function () {

    var moviesFeedback = {

        submitForm: $('#movie-feedback-form'),
        apiHost: 'https://api.parse.com/1/',
        apiAppId: '8V1SzXwjmJC1BHXqlYXVuD1pPn0Di4FdxGEUY1N7',
        apiJSId: 'Xq9y1XH9TEWai2mC7XwRQdlVdWPILnTXnINwbEBa',
        recommendations: [],

        init: function () {
            console.debug('Movies feedback page initialization started...');

            moviesFeedback.bindEventHandlers();

        },

        bindEventHandlers: function () {

            $('#movie-feedback-form').submit(function (event) {
                event.preventDefault();
                console.info('Going to submit feedback form');

                if (moviesFeedback.validateForm() == true) {

                    var formData = {
                        title: $('#movie-title').val(),
                        genre: $('#movie-genre').val(),
                        year: $('#movie-year').val(),
                        description: $('#movie-description').val(),
                        imgUrl: $('#movie-img').val(),
                        postAuthor: $('#movie-post-author').val()
                    };

                    console.debug('Going to post following data:', formData);

                    $.ajax({
                        url: 'https://api.parse.com/1/classes/Movie',
                        method: 'POST',

                        headers: {
                            'X-Parse-Application-Id': moviesFeedback.apiAppId,
                            'X-Parse-JavaScript-Key': moviesFeedback.apiJSId
                        },

                        contentType: 'application/json',

                        data: JSON.stringify(formData),

                        success: function (data, textStatus) {
                            console.debug('Successful feedback post request. Response is:', data);
                            alert('Спасибо, ваш отзыв успешно сохранён');

                        },
                        error: function (error, status) {
                            console.error('Error while feedback post. Error is:', error);
                            alert('Произошла ошибка. Проверьте консоль');
                        }
                    });

                } else {
                    swal('Форма не валидна!');
                }

            });

            $('#btn-load-data').click(function () {
                console.info('Going to get some data from API server');

                moviesFeedback.getRecommendations(
                    function (data) {
                        console.debug('Successful feedback post request. Response is:', data);

                        moviesFeedback.buildList(data.results);

                    },
                    function (error) {
                        console.error('Error while getting feedbacks list. Error is:', error);
                    })

            })

        },

        validateForm: function () {
            console.debug('Performing validation');

            var titleValidation, genreValidation, yearValidation, urlValidation, nameValidation;

            var titleInput = $('#movie-title');
            var genreInput = $('#movie-genre');
            var yearInput = $('#movie-year');
            var imgInput = $('#movie-img');
            var nameInput = $('#movie-post-author');

            var title = titleInput.val();
            var genre = genreInput.val();
            var year = yearInput.val();
            var imgUrl = imgInput.val();
            var name = nameInput.val();

            if (title.length > 2) {

                titleInput.parent()
                    .addClass('has-success')
                    .removeClass('has-error')
                    .find('.help-block').hide();

                titleValidation = true;

            } else {

                titleInput.parent().addClass('has-error').removeClass('has-success').find('.help-block').show();

                titleValidation = false;

            }

            if (genre.length > 2) {

                genreInput.parent().addClass('has-success').removeClass('has-error');

                genreValidation = true;

            } else {

                genreInput.parent().addClass('has-error').removeClass('has-success');

                genreValidation = false;

            }

            year = parseInt(year, 10);

            if (Number.isInteger(year)) {

                if (year > 1900 && year <= moment().year()) {

                    yearInput.parent().addClass('has-success').removeClass('has-error');
                    yearValidation = true;

                } else {
                    yearInput.parent().addClass('has-error').removeClass('has-success');
                    yearValidation = false;
                }
            } else {
                yearInput.parent().addClass('has-error').removeClass('has-success');
                yearValidation = false;
            }

            if (imgUrl.substr(0, 8) == 'https://' || imgUrl.substr(0, 7) == 'http://') {
                imgInput.parent().addClass('has-success').removeClass('has-error');
                urlValidation = true;
            } else {
                imgInput.parent().addClass('has-error').removeClass('has-success');
                urlValidation = false;

            }

            if (name.length > 2) {

                nameInput.parent().addClass('has-success').removeClass('has-error');

                nameValidation = true;

            } else {

                nameInput.parent().addClass('has-error').removeClass('has-success');

                nameValidation = false;

            }


            if (titleValidation && genreValidation && yearValidation && urlValidation && nameValidation) {

                return true;

            } else {

                return false;

            }

        },

        getRecommendations: function (successCallback, errorCallback) {

            $.ajax({
                url: 'https://api.parse.com/1/classes/Movie',
                method: 'GET',

                headers: {
                    'X-Parse-Application-Id': moviesFeedback.apiAppId,
                    'X-Parse-JavaScript-Key': moviesFeedback.apiJSId
                },

                success: successCallback,

                error: errorCallback


            })

        },

        buildList: function (recArray) {


            //var existentRecIds = moviesFeedback.getExistentRecomendationIds();
            $('#movie-recommendations-feed').html('');

            var recommendations = recArray;

            var recTemplate = _.template(
                '<div class="col-xs-12 rec-wrapper" id="<%= rec.objectId %>">' +
                '<div class="thumbnail">' +
                '<img src="<%= rec.imgUrl %>">' +
                '<div class="caption">' +
                '<h3><%= rec.title %></h3>' +
                '<p>Жанр: <%= rec.genre %></p>' +
                '<p>Год: <%= rec.year %></p>' +
                '<p>Описание: <%= rec.description %> </p>' +
                '<p>Автор рекоммендации: <%= rec.postAuthor %></p>' +
                '<p>Дата рекоммендации: <%= rec.createdAt %></p>' +
                '</div></div></div>');

            for (var i = 0; i < recommendations.length; i++) {

                var recElement = recTemplate({
                    rec: recommendations[i]
                });

                $('#movie-recommendations-feed').append(recElement);

                $('.rec-wrapper').slideDown('slow');

            }

        },
        getExistentRecomendationIds: function () {
                var existentRecArray = [];

                    alert("existentRecArray");
                $('.rec-wrapper').each(function () {

                    $(this).existentRecArray.push([i]);

                });


                return existentRecArray;






            },
        
        
        createRecElement: function (recObject) {
            
            
            var recTemplate = _.template(
                '<div class="col-xs-12 rec-wrapper" id="<%= rec.objectId %>">' +
                '<div class="thumbnail">' +
                '<img src="<%= rec.imgUrl %>">' +
                '<div class="caption">' +
                '<h3><%= rec.title %></h3>' +
                '<p>Жанр: <%= rec.genre %></p>' +
                '<p>Год: <%= rec.year %></p>' +
                '<p>Описание: <%= rec.description %> </p>' +
                '<p>Автор рекоммендации: <%= rec.postAuthor %></p>' +
                '<p>Дата рекоммендации: <%= rec.createdAt %></p>' +
                '</div></div></div>');
            
             var recElement = recTemplate({
                    rec: recommendations[i]
                });

        }
        
        
        
            /*switchAutoupdate: function () {

            }*/

    };

    moviesFeedback.init();

});