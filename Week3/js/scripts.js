$(function() {
    var zip = zip || '75243';
    WeatherApp(zip);
});

function trace(trace){
    console.log(trace);
}

function WeatherApp(zip){

    //var urlBase = 'http://api.weatherunlocked.com/api/forecast/', dallas = 'us.75243', app_id = '?app_id=aa774944', app_key = '&app_key=922933cebcda8a518d1f342408d23827';
    var urlBaseForecast = 'http://api.openweathermap.org/data/2.5/forecast/daily?zip=',
    urlBaseCurrent = 'http://api.openweathermap.org/data/2.5/weather/?zip=',
    app_id = ',us?app_id=aa774944',
    app_key = '&app_key=922933cebcda8a518d1f342408d23827',
    forecastResponse = [],
    currentWeatherResponse = [],
    weekdayArray = [],
    zip = zip,
    d;

    $('.zipcode').val('');
    $('div.city-tb').hide();
    $('div.city').show();
    $('div.weather-info').html('');

//     window.navigator.geolocation.getCurrentPosition(function(){
//         console.log('pos');
//         // $http.get('http://maps.googleapis.com/maps/api/geocode/json?latlng='+pos.coords.latitude+','+pos.coords.longitude+'&sensor=true').then(function(res){
//         //     console.log(res.data);
//         // });
//     });
// window.navigator.geolocation.getCurrentPosition();

    $('.info-btn').click(function(){
        $('div.city').hide();
        $('div.city-tb').show();
    });

    $('.zip-search').click(function(){
        var zip = $('.zipcode').val();
        WeatherApp(zip);
    });

    function retrieveForecast(){
        $.ajax({
            //url: urlBase + dallas + app_id + app_key,
            url: urlBaseForecast + zip + '&mode=json&units=imperial&cnt=7',
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                //alert('suc');
                console.log(data);
                forecastResponse = data;
                buildWeekdayArray();
            },
            error: function (error) {
                //alert('fail');
                console.log(error);
            }
        });
    }

    function retrieveCurrentWeather(){
        $.ajax({
            //url: urlBase + dallas + app_id + app_key,
            url: urlBaseCurrent + zip + '&mode=json&units=imperial',
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                //alert('suc');
                console.log(data);
                currentWeatherResponse = data;
                displayCurrentWeather(currentWeatherResponse);
            },
            error: function (error) {
                //alert('fail');
                console.log(error);
            }
        });
    }
    
    function updateWeatherIcon( $icon, id ) {

        var icon;
        switch(id) {
            case 200:
            case 210:
            case 211:
            case 230:
            case 231:
                icon = 'icon-thunderstorm-light';
                break;

            case 201:
            case 202:
            case 212:
            case 221:
            case 232:
                icon = 'icon-thunderstorm-heavy';
                break;
                
            case 300:
            case 301:
            case 302:
            case 310:
            case 311:
            case 312:
            case 313:
            case 314:
            case 321:
                icon = 'icon-rain-light';
                break;
                
            case 500:
            case 501:
            case 502:
            case 503:
            case 504:
            case 520:
            case 521:
            case 522:
            case 531:
                icon = 'icon-rain-heavy';
                break;
            
            case 511:
            case 611:
            case 612:
            case 615:
            case 616:
            case 906:
                icon = 'icon-rain-freezing';
                break;
                
            case 600:
            case 620:
                icon = 'icon-snow-light';
                break;
            
            case 601:
            case 602:
            case 621:
            case 622:
                icon = 'icon-snow-heavy';
                break;
                
            case 701:
            case 711:
            case 721:
            case 731:
            case 741:
            case 751:
            case 761:
                icon = 'icon-mist';
                break;
            
            case 800:
            case 951:
                icon = 'icon-clear';
                break;
            
            case 801:
            case 802:
            case 803:
                icon = 'icon-cloudy-partly';
                break;
            
            case 804:
                icon = 'icon-cloudy';
                break;
                
            case 905:
            case 952:
            case 953:
            case 954:
            case 955:
            case 956:
            case 957:
            case 958:
            case 959:
                icon = 'icon-windy';
                break;
                
            case 960:
            case 961:
            case 962:
                icon = 'icon-storm';
                break;
                
            default:
                icon = 'icon-unknown';
        }
        
        return icon;
    }

    function buildWeekdayArray(){
        var weekday = [],
        d = new Date(),
        count = 0;

        weekday[0]="Sun";
        weekday[1]="Mon";
        weekday[2]="Tue";
        weekday[3]="Wed";
        weekday[4]="Thu";
        weekday[5]="Fri";
        weekday[6]="Sat";
        d = d.getDay();

        while(count < 7){
            weekdayArray.push(weekday[d]);
            count++;
            d++;
            if(d == 7){
                d = 0
            }
        }

        displayForecast(d, weekday);
    }

    function displayCurrentWeather(data){
        var currentWeather = data, city, currentTemp, $icon = $('div.currentIcon'), id;
        city = currentWeather.name;
        currentTemp = currentWeather.main.temp;
        id = currentWeather.weather[0].id;
        $('div.city').text(city);
        $('div.currentTemp').text(currentTemp + '°');
        $('div.currentIcon').attr('class',updateWeatherIcon( $icon, id ));
    }

    function displayForecast(d, weekday){
        for(b=0;b < 7;b++){
            var maxTemp, icon, $icon = $('div.icon>div>div'), weatherData, id;
            weatherData = forecastResponse.list[b];
            id = weatherData.weather[0].id;
            maxTemp = Math.round(weatherData.temp.max);
            minTemp = Math.round(weatherData.temp.min);
            updateWeatherIcon( $icon, id );
            
            //console.log(weekday[d] + '  ' + weatherResponse.Days[d].temp_max_f);

            $('div.weather-info').append(
                '<div class="col-xs-1">'+
                    '<div class="weekday">'+weekdayArray[b]+'</div>'+
                    '<div class="icon">'+
                        '<div>'+
                            '<div class="'+ updateWeatherIcon($icon,id) +'"></div>'+
                        '</div>'+
                    '</div>'+
                    '<div class="maxtemp">'+maxTemp+'°</div>'+
                    '<div class="mintemp">'+minTemp+'°</div>'+
                    '<div class="space">&nbsp;</div>'+
                '</div>'
            );
        }
    }

    retrieveCurrentWeather();
    retrieveForecast();
}
    

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

