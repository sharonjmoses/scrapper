const express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();



app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

/*app.get('/api/customers', (req,res) =>{
    const customers = [
        {id: 1, firstName: 'Chaal', lastName: 'pritam' },
        {id: 2, firstName: 'Ezhu' , lastName: 'Malai' },
        {id: 3, firstName: 'si', lastName:'co'  }
    ];

    res.json(customers);
})*/

app.get('/api/scrap/:name', (req,res,name)=>{
   // name="undisputed";
    var movieName=req.params.name;
    url = 'https://www.imdb.com/find?ref_=nv_sr_fn&q='+movieName+'&s=all';
    request(url, function(error, response, html){
        if(!error){
            var $ = cheerio.load(html);
            var result=[];
            $('.article').filter(function(){           
                var data = $(this);       
                resultUrl = data.children().eq(2).children().eq(1).find('.result_text').find('a').attr('href');
                result = resultUrl
                finalResult ='http://www.imdb.com'+result;
               return finalResult       
            })
            conUrl= finalResult;
            request(conUrl, function(error, response, html){
                if(!error){
                    var $ = cheerio.load(html);
                    var title, release, rating;
                    var resultMovie = { title : "", release : "", rating : "", imagePoster : ""};
                   
                    $('.title_wrapper').filter(function(){
                     var data = $(this);
                     title = data.children().first().text();
                     titlex = title.replace(/\s\s+/g,'');
                     resultMovie.title = titlex;               
                 })
                 $('#titleYear').filter(function(){
                    var datayear = $(this);
                    release = datayear.children().first().text();
                    resultMovie.release = release;
                })
                $('.ratingValue').filter(function(){
                    var dataRating = $(this);
                    rating = dataRating.children().first().text();
                    resultMovie.rating = rating;
                })
                $('.poster').filter(function(){
                    var posterx = $(this);
                    poster = posterx.children().last().children();
                    posterUrl=poster.attr('src');
                    resultMovie.imagePoster = posterUrl;
                })
                //console.log(resultMovie);
                res.json(resultMovie);
                return resultMovie
    
                }
                
                

            })  
        }
        console.log("Fetching Url",finalResult);
        //console.log(resultMovie);
        
        
    })
    
    
    })
    


const port = 5000;

app.listen(port, ()=> console.log(`server starting ${port}`))