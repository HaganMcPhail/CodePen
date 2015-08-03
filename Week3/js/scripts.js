var app = angular.module('weather', []);
var urlBase = 'http://api.weatherunlocked.com/api/forecast/us.75243?', app_id = 'aa774944', app_key = '922933cebcda8a518d1f342408d23827'

app.controller('7DayForecast', function($scope, $http) {
    
    $.ajax({
        url: 'http://api.openweathermap.org/data/2.5/weather?q=Dallas,US',
        type: 'GET',
        dataType: 'jsonp',
        jsonpCallback: 'photos'
    });
    
    function photos(data) {
        console.log(data);
    }



});

$(document).ready(function(){
    function getCurrentDay(){
        var weekday = new Array(7), d = new Date();
        weekday[0]="Sun";
        weekday[1]="Mon";
        weekday[2]="Tue";
        weekday[3]="Wed";
        weekday[4]="Thu";
        weekday[5]="Fri";
        weekday[6]="Sat";
        d = d.getDay();
        loopWeek(d, weekday);
    }

    function loopWeek(d, weekday){
        for(b=0;b < 7;b++){
            d++;
            if(d == 7){
                d = 0
            }
        }
    }
    getCurrentDay();
});

// $.ajax({
//     url: 'http://api.weatherunlocked.com/api/forecast/51.50,-0.12?app_id=aa774944&app_key=922933cebcda8a518d1f342408d23827',
//     type: 'GET',
//     success: function () {
//         alert('suc');
//     },
//     error: function (error) {
//         alert('fail');
//     }
// });


// ("http://api.weatherunlocked.com/api/forecast/51.50,-0.12?app_id=aa774944&app_key=922933cebcda8a518d1f342408d23827", function(data){
//     console.log(data);
// });

