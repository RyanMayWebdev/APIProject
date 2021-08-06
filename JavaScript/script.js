const app = {}

//variables
app.key = '31beca076158503c129b3c1228e56ad2'

app.resultHTML = (index) => {
    return `<div class='result'>
        <h2>${index.title}</h2>
        <img class='movie-img' src='https://image.tmdb.org/t/p/w500${index.poster_path}' alt='${index.title} poster'>
        <div class='details-wrapper'>
            <p>${index.overview}</p>
            <p>Rated: ${index.vote_average}/10</p>
            <button class='trailer-btn' id="${index.id}" type='button'>View Trailer</button>
        </div>
    </div>`
}

//functions

//Get user selections upon form submit and then run the appropriate API call function
app.getSelections = () => {
    $('form').on('submit', (e) => {
        e.preventDefault()
        let genre = $('#movie-genre').val()
        let newRelease = $('#newRelease').prop('checked')
        let releaseYear = $('#release-year').val()
        let title = $('#title-search').val()
        $('.wrapper').empty()
        $('.wrapper').append(`<img src='./Assets/popcorn.gif'>`)
        if (title != '') {
            setTimeout(() => app.apiCallSearch(title), 3000)
        } else
            setTimeout(() => app.apiCall(genre, newRelease, releaseYear), 3000)
    })
}

//Display results function
app.displayResults = (res) => {
    let wrapper = $('.wrapper')
    let results = res.results
    wrapper.empty()
    results.forEach((index) => {
        wrapper.append(app.resultHTML(index))
    })
}

//API call for mvoies by genre and release year
app.apiCall = (genre, recent, year) => {

    //if user wants a new release set the release year to the current year
    if (recent == true) {
        let currentYear = new Date()
        year = currentYear.getFullYear()
    }

    $.ajax({
        url: `https://api.themoviedb.org/3/discover/movie?api_key=${app.key}`,
        method: 'GET',
        dataType: 'json',
        data: {
            with_original_language: 'en',
            'vote_count.gte': 100,
            sort_by: 'vote_average.desc',
            with_genres: genre,
            primary_release_year: year
        }

    }).then((res) => {
        app.displayResults(res)
    })
}

//API call by movie title
app.apiCallSearch = (search) => {

    $.ajax({
        url: `https://api.themoviedb.org/3/search/movie?api_key=${app.key}&language=en-US`,
        method: 'GET',
        dataType: 'json',
        data: {
            with_original_language: 'en',
            include_adult: false,
            query: search
        }

    }).then((res) => {
        app.displayResults(res)
    })
}

//If user clicks the view trailer button, make an API call for the trailer id, then load the youtube url for it and display on screen
app.viewTrailer = function () {
    $('.wrapper').on('click', '.trailer-btn', function () {

        let movieId = $(this).prop('id')

        $.ajax({
            url: `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${app.key}&language=en-US`,
            method: 'GET',
            dataType: 'json',
        }).then((res) => {
            let overlay = '<div class="video-overlay"><div>'
            let videoHtml
            console.log(res)
            //If the movie does not have a video display no video text
            if (res.results.length == 0) {
                videoHtml =
                    `<div class="video-player">
                        <div class='no-trailer'><p>No trailer available</p></div>
                        <span class="icon">X</span>
                    </div>`
            } else {
                let site = res.results[0].site
                let key = res.results[0].key
                if (site === 'YouTube') {
                    videoHtml = `
                    <div class="video-player">
                    <span class="icon">X</span>
                        <iframe width="420" height="315" src='https://www.youtube.com/embed/${key}'>
                        </iframe>
                    </div>`
                }
            }

            //Add the overlay which darkens the background and then add video player on top of it
            $('body').append(overlay)
            $('body').append(videoHtml)
            //When user clicks the x icon, remove video player and overlay
            $('body').on('click', '.icon', () => {
                $('.video-player').remove()
                $('.video-overlay').remove()
            })

        })
    })
}

app.init = () => {
    app.getSelections()
    app.viewTrailer()
}

$(function () {
    app.init()

})