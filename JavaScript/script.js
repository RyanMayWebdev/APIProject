const app = {}

app.getGenre = ()=>{
   $('form').on('submit',(e)=>{
       e.preventDefault()
       let genre = $('#movie-genre').val()
       app.apiCall(genre)
   })
}

app.apiCall = (genre) =>{

    $.ajax({
        url: `https://api.themoviedb.org/3/discover/movie?api_key=31beca076158503c129b3c1228e56ad2`,
                    method : 'GET',
                    dataType : 'json',
                    data : {
                        with_original_language : 'en',
                        'vote_count.gte' : 100,
                        sort_by : 'vote_average.desc',
                        with_genres: genre
                    }
        
    }).then((res)=>{
        let wrapper = $('.wrapper')
        wrapper.empty()
        let results = res.results
        results.forEach((index)=>{
            let resultHTML = 
                            `<div class='result'>
                                <h2>${index.title}</h2>
                                <img src='https://image.tmdb.org/t/p/w500${index.poster_path}' alt='${index.title} poster'>
                                <p>${index.overview}</p>
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
    