# Movie Reel

## What is it?
Movie Reel is an application coded using HTML, CSS and JQuery. Have you ever been scrolling through your favourite streaming service and can't decide what to watch? 
This application will help you decide. Simply enter a genre, whether you want new releases or a specific year and hit the search button. You'll then be presented with the top 20 movies
as rated by viewers for that category and year. Each movie poster will also give you a description and a trailer.

## How does it work?
Magic of course. After the user fills out the options they want to search for these parameters are taken and using JQuery's Ajax method, an API call is made to The Movie Database.
The results are then passed to a display function that will use the forEach method on the array of results in order to display them onto the screen. Each result will display as a title and a movie poster.
When these psoters are hovered over, a description of the movie as well as a view trailer button are presented. If the user clicks the view trailer button and api call is made to TMDB
with the movie's ID in order to get trailer information, if a trailer link is provided it is then displayed to the user using an iframe. The results are darkened with an overlay and the user can watch the trailer.


## Challenges
There weren't too many issues when creating this application however when planning out the process, the original API did not provide the proper details and info I needed
and so I had to find another API, TMDB. Additionally, this was the first time I had made API calls using JQuery as well as namespacing, so these were both new learning experiences.
