// array for changing titles on splash page
drinkLines = ["STAY THIRSTY", "TELL YOUR FRIENDS", "POTENT POTABLES", "SIP, SIP, SIP"]
drinkIndex = 0
setInterval(function() {
    drinkIndex++
    if (drinkIndex == 4) {
        drinkIndex = 0
    }
    $('.slideShowText').html(drinkLines[drinkIndex])

    console.log('derp')
        // change title every 8 seconds
}, 8000)

$('#test').on('click', function() {

    var searchInput = $('#searchInput').val();
    var queryURL = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + searchInput;
    // if (searchInput !== undefined) {


    $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {
            console.log(response);
            var results = response.drinks;
            var drinkcard = $('#fadeCardFather');
            var replaceChild = $('#fadeCardFather')[0].childNodes.length;


            for (var i = 0; i < replaceChild; replaceChild--) {
                $('#fadeCardFather')[0].childNodes[i].remove();
            }

            for (var i = 0; i < results.length; i++) {
                var searchDiv = $('<div>');
                searchDiv.attr('class', 'uk-card uk-card-default uk-card-body fadeCard');
                var drinkName = $('<h3>').text(results[i].strDrink);
                drinkName.attr('class', 'uk-card-title');
                var drinkImg = $('<img>');
                drinkImg.attr('src', results[i].strDrinkThumb);
                drinkImg.attr('class', 'uk-img')
                var drinkVid = $('<button>');
                drinkVid.attr('class', 'uk-button uk-button-secondary uk-button-small');
                drinkVid.attr('id', 'video-btn');
                drinkVid.attr('data-drink', results[i].strDrink)
                drinkVid.attr('title', 'Videos');
                var drinkInst = $('<button>');
                drinkInst.attr('class', 'uk-button uk-button-secondary uk-button-small');
                drinkInst.attr('id', 'inst-btn');
                drinkInst.attr('data-drink', results[i].strDrink)
                drinkInst.attr('title', 'Instructions');
                var spanVidIcon = $('<span>').attr('uk-icon', "play-circle");
                var spanInstIcon = $('<span>').attr('class', "fas fa-glass-martini-alt");
                drinkVid.append(spanVidIcon);
                drinkInst.append(spanInstIcon);
                searchDiv.append(drinkName, drinkImg, drinkVid, drinkInst);
                drinkcard.prepend(searchDiv);
                // $('#modal-div').prepend(drinkcard);

                // videos icon button link

                $('#video-btn').on('click', function() {
                    var replaceChild = $('#fadeCardFather')[0].childNodes.length;
                    for (var i = 0; i < replaceChild; replaceChild--) {
                        $('#fadeCardFather')[0].childNodes[i].remove();
                    }
                    var searchterm = this.dataset.drink
                    var APIKey = "AIzaSyBYxVOdRUzXjdeH_epqpzN493aHA0jLnRM ";


                    // Here we are building the URL we need to query the database
                    var queryURL = "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=3&q=how+to+make+a+drink+cocktail+" + searchterm + "&key=" + APIKey;
                    // created an AJAX call
                    $.ajax({
                        url: queryURL,
                        method: "GET",
                        kind: "youtube#video",

                    }).then(function(response) {

                        console.log(queryURL)
                        console.log(response)
                        var results = response.items

                        // modal for videos
                        var modalCon = $('<div>')
                        var modalInner = $('<div>')
                        var modalSpan = $('<button>').attr('class', 'uk-modal-close close-button').html('&times;')
                        var videoTitle = $('<h2>').text(searchterm).attr('class', 'uk-modal-title')
                        modalCon.attr('style', 'uk-modal')
                        modalInner.attr('class', ' uk-modal-dialog uk-modal-body modal-content')
                        modalInner.append(modalSpan, videoTitle)
                        modalCon.append(modalInner);
                        for (var i = 0; i < 3; i++) {
                            console.log(response);
                            var videoFrame = $('<iframe>')
                            videoFrame.attr('src', ("https://www.youtube.com/embed/" + results[i].id.videoId))
                            console.log(results[i].id.videoId)
                            videoFrame.attr('width', 'auto')
                            videoFrame.attr('height', 'auto')
                            modalInner.append(videoFrame)
                        }
                        drinkcard.prepend(modalCon)
                        UIkit.modal(modalCon).show()
                    });
                })
                data.whatever = "thecategogry"
                    // instructions icon button link
                $('#inst-btn[data-drink="' + results[i].strDrink + '"').on('click', function() {
                    // drinkcard.attr('visiblity', 'hidden')
                    var query = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + this.dataset.drink;
                    console.log(query)

                    $.ajax({
                        url: query,
                        method: "GET"
                    }).then(function(response) {
                        console.log(response);
                        var results = response.drinks

                        var modalCon = $('<div>')
                        var modalInner = $('<div>')
                        var modalSpan = $('<button>').attr('class', 'uk-modal-close close-button').html('&times;')
                        var modalH2 = $('<h2>').text(results[0].strDrink).attr('class', 'uk-modal-title')
                        var modalInst = $('<div>').text(results[0].strInstructions)
                        var modalImg = $('<img>').attr('src', results[0].strDrinkThumb);
                        // var modalUL = $('<ul>')
                        // for (var y = 0; y < results[0].s)
                        // var modalLI = $('<li>')

                        // modalCon.attr('class', ' modal')
                        modalCon.attr('style', 'uk-modal')
                        modalInner.attr('class', ' uk-modal-dialog uk-modal-body modal-content')
                        modalInner.append(modalSpan, modalImg, modalH2, modalInst)
                        modalCon.append(modalInner)
                        UIkit.modal(modalCon).show();
                        drinkcard.prepend(modalCon)
                    })

                })
            }
        })
        // }
});


$('.uk-button').on('click', function() {
    var queryCategory = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=' + this.dataset.category + '';
    $.ajax({
        url: queryCategory,
        method: "GET"
    }).then(function(response) {
        console.log(queryCategory)
        console.log(response);


        var resultsList = response.drinks;
        var drinkcard = $('#fadeCardFather');


        // empty the displaying div
        var replaceChild = $('#fadeCardFather')[0].childNodes.length;
        for (var i = 0; i < replaceChild; replaceChild--) {
            $('#fadeCardFather')[0].childNodes[i].remove();
        }

        console.log(replaceChild);


        for (var i = 0; i < resultsList.length; i++) {
            //randomize a number variable 
            // var randomDrink = 1 + Math.floor(Math.random() * 100);
            var searchDiv = $('<div>');
            searchDiv.attr('class', 'uk-card uk-card-default uk-card-body fadeCard');
            var drinkName = $('<h3>').text(resultsList[i].strDrink);
            drinkName.attr('class', 'uk-card-title');
            var drinkImg = $('<img>');
            drinkImg.attr('src', resultsList[i].strDrinkThumb);
            drinkImg.attr('class', 'uk-img')
            var drinkVid = $('<button>');
            drinkVid.attr('class', 'uk-button uk-button-secondary uk-button-small');
            drinkVid.attr('id', 'video-btn');
            drinkVid.attr('title', 'Videos');
            var drinkInst = $('<button>');
            drinkInst.attr('class', 'uk-button uk-button-secondary uk-button-small');
            drinkInst.attr('id', 'inst-btn');
            drinkInst.attr('data-drink', resultsList[i].strDrink)
            drinkInst.attr('title', 'Instructions');
            var spanVidIcon = $('<span>').attr('uk-icon', "play-circle");
            var spanInstIcon = $('<span>').attr('class', "fas fa-glass-martini-alt");
            drinkVid.append(spanVidIcon);
            drinkInst.append(spanInstIcon);
            searchDiv.append(drinkName, drinkImg, drinkVid, drinkInst);
            drinkcard.prepend(searchDiv);

            // videos icon button link

            $('#video-btn').on('click', function() {
                var replaceChild = $('#fadeCardFather')[0].childNodes.length;
                for (var i = 0; i < replaceChild; replaceChild--) {
                    $('#fadeCardFather')[0].childNodes[i].remove();
                }
                var searchterm = this.dataset.drink
                var APIKey = "AIzaSyBYxVOdRUzXjdeH_epqpzN493aHA0jLnRM ";


                // Here we are building the URL we need to query the database
                var queryURL = "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=3&q=how+to+make+a+drink+cocktail+" + searchterm + "&key=" + APIKey;
                // created an AJAX call
                $.ajax({
                    url: queryURL,
                    method: "GET",
                    kind: "youtube#video",

                }).then(function(response) {

                    console.log(queryURL)
                    console.log(response)
                    var results = response.items

                    // modal for videos
                    var modalCon = $('<div>')
                    var modalInner = $('<div>')
                    var modalSpan = $('<button>').attr('class', 'uk-modal-close close-button').html('&times;')
                    var videoTitle = $('<h2>').text(searchterm).attr('class', 'uk-modal-title')
                    modalCon.attr('style', 'uk-modal')
                    modalInner.attr('class', ' uk-modal-dialog uk-modal-body modal-content')
                    modalInner.append(modalSpan, videoTitle)
                    modalCon.append(modalInner);
                    for (var i = 0; i < 3; i++) {
                        console.log(response);
                        var videoFrame = $('<iframe>')
                        videoFrame.attr('src', ("https://www.youtube.com/embed/" + results[i].id.videoId))
                        console.log(results[i].id.videoId)
                        videoFrame.attr('width', 'auto')
                        videoFrame.attr('height', 'auto')
                        modalInner.append(videoFrame)
                    }
                    drinkcard.prepend(modalCon)
                    UIkit.modal(modalCon).show()
                });
            })

            // instructions modal
            $('#inst-btn[data-drink="' + resultsList[i].strDrink + '"').on('click', function() {
                // drinkcard.attr('visiblity', 'hidden')
                var query = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + this.dataset.drink;
                console.log(query)

                $.ajax({
                    url: query,
                    method: "GET"
                }).then(function(response) {
                    console.log(response);
                    var results = response.drinks

                    var modalCon = $('<div>')
                    var modalInner = $('<div>')
                    var modalSpan = $('<button>').attr('class', 'uk-modal-close close-button').html('&times;')
                    var modalH2 = $('<h2>').text(results[0].strDrink).attr('class', 'uk-modal-title')
                    var modalInst = $('<div>').text(results[0].strInstructions)
                    var modalImg = $('<img>').attr('src', results[0].strDrinkThumb);
                    var modalUL = $('<ul>')


                    // var ingred1 = results[0].strIngredient1;
                    // var ingred2 = results[0].strIngredient2;
                    // var ingred3 = results[0].strIngredient3;
                    // var ingred4 = results[0].strIngredient4;
                    //     for (var y = 0; y < 4; y++) {



                    //         var modalLI = $('<li>').text(ingredArr[y]);
                    //         modalUL.append(modalLI)
                    //     }


                    // modalCon.attr('class', ' modal')
                    modalCon.attr('style', 'uk-modal')
                    modalInner.attr('class', ' uk-modal-dialog uk-modal-body modal-content')
                    modalInner.append(modalSpan, modalImg, modalH2, modalInst, modalUL)
                    modalCon.append(modalInner)
                    UIkit.modal(modalCon).show();
                    drinkcard.prepend(modalCon)
                })

            })

        }


    })

})








// $('#random').on('click', function(){
//     var queryURL = "https://www.thecocktaildb.com/api/json/v1/1/random.php";
//      $.ajax({
//         url: queryURL,
//         method: "GET"
//       }).then(function(response){
//         console.log(response);
//         var randomDiv = $('#randomDiv');
//         var drinkName = $('<h1>').text(response.drinks[0].strDrink);
//         console.log(drinkName);
//         var drinkImg = $('<img>');
//         drinkImg.attr('src', response.drinks[0].strDrinkThumb);
//         randomDiv.append(drinkName, drinkImg)

//     });

// });