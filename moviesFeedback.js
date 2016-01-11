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