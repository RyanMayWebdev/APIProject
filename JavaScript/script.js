const app = {}

app.getGenre = ()=>{
   $('form').on('submit',(e)=>{
       e.preventDefault()
       let genre = $('#movie-genre').val()
       let newRelease = $('#newRelease').prop('checked')
       $('.wrapper').empty()
       $('.wrapper').append(`<img src='./Assets/popcorn.gif'>`)
       setTimeout(()=>app.apiCall(genre,newRelease),3000)
   })
}

app.apiCall = (genre,recent) =>{
    let releaseYear = ''
    if (recent == true){
        let year = new Date()
        releaseYear = year.getFullYear()
    }
    $.ajax({
        url: `https://api.themoviedb.org/3/discover/movie?api_key=31beca076158503c129b3c1228e56ad2`,
                    method : 'GET',
                    dataType : 'json',
                    data : {
                        with_original_language : 'en',
                        'vote_count.gte' : 100,
                        sort_by : 'vote_average.desc',
                        with_genres: genre,
                        primary_release_year : releaseYear
                    }
        
    }).then((res)=>{
        console.log(res.results)
        let wrapper = $('.wrapper')
        wrapper.empty()
        let results = res.results
        results.forEach((index)=>{
            let resultHTML = 
                            `<div class='result'>
                                <h2>${index.title}</h2>
                                <img class='movie-img' src='https://image.tmdb.org/t/p/w500${index.poster_path}' alt='${index.title} poster'>
                                <p>${index.overview}</p>
                                <p>Rated: ${index.vote_average}/10</p>
                            </div>`
            wrapper.append(resultHTML)
        })

    })
}

app.init = ()=>{
    app.getGenre()

}

$(function(){
    app.init()

})
    