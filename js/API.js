let ipCity, urlApi, urlApiDay;
let map, mapp;
const preload = document.querySelector('.preload');

fetch('https://ipapi.co/json/')
   .then((response) => response.json())
   .then((data) => {
      ipCity = data.city;
   });
setTimeout(function bigfunc() {
   urlApi = `https://api.openweathermap.org/data/2.5/weather?q=${ipCity}&lang=kr&units=metric&appid=0cad72b53e05925e97f52883d9a978aa&lang=kr`;
   urlApiDay = `https://api.openweathermap.org/data/2.5/forecast?q=${ipCity}&cnt=40&units=metric&appid=0cad72b53e05925e97f52883d9a978aa`
   apiPogoda();
   preload.style.display = 'none';
}, 2000);
// ==========создание карты=============================================================
const columnMap = document.querySelector('.column_rows');
const columnMaps = document.querySelector('.column__coordinats');
let maps;
// maps.classList.add('column__map');
// maps.setAttribute('id', 'map');


function mapUpdate(a, b) {
   maps = document.createElement('div');
   maps.classList.add('column__map');
   maps.setAttribute('id', 'map');
   columnMap.insertBefore(maps, columnMaps)
   DG.then(function () {
      // lat = data.coord.lat;
      // lon = data.coord.lon;
      map = DG.map('map', {
         center: [a, b],
         zoom: 8
      });
      DG.marker([a, b]).addTo(map).bindPopup('html-контент');
   });
}
function apiPogoda(url) {
   fetch(urlApi)
      .then((response) => response.json())
      .then((data) => {
         // console.log(data);
         document.querySelector('.citi-name').textContent = data.name;
         document.querySelector('.country-name').textContent = data.sys.country;
         document.querySelector('.temp').textContent = Math.round(data.main.temp);
         document.querySelector('.overcast').textContent = data.clouds.all + '%';
         document.querySelector('.wind').textContent = Math.round(data.wind.speed) + ' m/s';
         document.querySelector('.humidity').textContent = data.main.humidity + ' %';
         document.querySelector('.pogoda-picture').innerHTML = `<img src="http://openweathermap.org/img/wn/${data.weather[0]['icon']}@2x.png">`;
         document.querySelector('.lat').innerHTML = `${data.coord.lat}${'&deg'}`;
         document.querySelector('.lon').innerHTML = `${data.coord.lon}${'&deg'}`;
         let lat = data.coord.lat;
         let lon = data.coord.lon;
         mapUpdate(lat, lon)
      })
      .catch((err) => {
         alert("Перезагрузите Страницу")
         console.error("Произошла ошибка!", err)
      });
   fetch(urlApiDay)
      .then((response) => response.json())
      .then((data) => {
         // console.log(data);
         function getWeekDay(date) {
            let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            return days[date.getDay()];
         }
         let dateTwo = new Date(data.list[8]['dt_txt']);
         document.querySelector('.days__week_two').textContent = getWeekDay(dateTwo);
         document.querySelector('.temp-two').innerHTML = `${Math.round(data.list[8].main.temp)}`;
         document.querySelector('.icon-weather-two').innerHTML = `<img src="http://openweathermap.org/img/wn/${data.list[8].weather[0]['icon']}@2x.png">`;
         // ==================третий день========================================================
         let dateThree = new Date(data.list[17]['dt_txt']);
         document.querySelector('.days__week_three').textContent = getWeekDay(dateThree);
         document.querySelector('.temp-three').innerHTML = `${Math.round(data.list[17].main.temp)}`;
         document.querySelector('.icon-weather-three').innerHTML = `<img src="http://openweathermap.org/img/wn/${data.list[17].weather[0]['icon']}@2x.png">`;
         // ===================день четвертый=====================================
         let dateFour = new Date(data.list[25]['dt_txt']);
         document.querySelector('.days__week_four').textContent = getWeekDay(dateFour);
         document.querySelector('.temp-four').innerHTML = `${Math.round(data.list[25].main.temp)}`;
         document.querySelector('.icon-weather-four').innerHTML = `<img src="http://openweathermap.org/img/wn/${data.list[25].weather[0]['icon']}@2x.png">`;
      })
      .catch((err) => {
         console.error("Произошла ошибка!", err)
      })
};
// =======изменение города========================================================================

let searchInput = document.querySelector('.search__input');
let searchButton = document.querySelector('.search__button');

function searchCity(event) {
   event.preventDefault()
   if (!(searchInput.value == '')) {
      maps.remove();
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&units=${units}&appid=0cad72b53e05925e97f52883d9a978aa`)
         .then((response) => response.json())
         .then((data) => {
            document.querySelector('.citi-name').textContent = data.name;
            document.querySelector('.country-name').textContent = data.sys.country;
            document.querySelector('.temp').textContent = Math.round(data.main.temp);
            document.querySelector('.overcast').textContent = data.clouds.all + '%';
            document.querySelector('.wind').textContent = Math.round(data.wind.speed) + ' m/s';
            document.querySelector('.humidity').textContent = data.main.humidity + ' %';
            document.querySelector('.pogoda-picture').innerHTML = `<img src="http://openweathermap.org/img/wn/${data.weather[0]['icon']}@2x.png">`;
            document.querySelector('.lat').innerHTML = `${data.coord.lat}${'&deg'}`;
            document.querySelector('.lon').innerHTML = `${data.coord.lon}${'&deg'}`;
            let lat = data.coord.lat;
            let lon = data.coord.lon;
            mapUpdate(lat, lon);
         })
         .catch((err) => {
            console.error("Произошла ошибка!", err)
         });
      fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${searchInput.value}&cnt=40&units=${units}&appid=0cad72b53e05925e97f52883d9a978aa`)
         .then((response) => response.json())
         .then((data) => {
            // console.log(data);
            function getWeekDay(date) {
               let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
               return days[date.getDay()];
            }
            let dateTwo = new Date(data.list[8]['dt_txt']);
            document.querySelector('.days__week_two').textContent = getWeekDay(dateTwo);
            document.querySelector('.temp-two').innerHTML = `${Math.round(data.list[8].main.temp)}`;
            document.querySelector('.icon-weather-two').innerHTML = `<img src="http://openweathermap.org/img/wn/${data.list[8].weather[0]['icon']}@2x.png">`;
            // ==================третий день========================================================
            let dateThree = new Date(data.list[17]['dt_txt']);
            document.querySelector('.days__week_three').textContent = getWeekDay(dateThree);
            document.querySelector('.temp-three').innerHTML = `${Math.round(data.list[17].main.temp)}`;
            document.querySelector('.icon-weather-three').innerHTML = `<img src="http://openweathermap.org/img/wn/${data.list[17].weather[0]['icon']}@2x.png">`;
            // ===================день четвертый=====================================
            let dateFour = new Date(data.list[25]['dt_txt']);
            document.querySelector('.days__week_four').textContent = getWeekDay(dateFour);
            document.querySelector('.temp-four').innerHTML = `${Math.round(data.list[25].main.temp)}`;
            document.querySelector('.icon-weather-four').innerHTML = `<img src="http://openweathermap.org/img/wn/${data.list[25].weather[0]['icon']}@2x.png">`;
         })
         .catch((err) => {
            alert('Неправильное название')
            window.location.reload();
            console.error("Произошла ошибка!", err)
         });
      // ============смена картинки рандомно=============================================================================
      let img = Math.round(Math.random() * (3 - 1) + 1);
      document.body.style.background = `linear-gradient(180deg, rgba(8, 15, 26, 0.59) 0%, rgba(17, 17, 46, 0.46) 100%),url('../img/images${img}.jpg') 50% / cover no-repeat`
      // ==============очищение инпута==================================================================
      searchInput.value = '';
   }
}


searchButton.addEventListener("click", searchCity);