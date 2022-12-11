// =================== get current day=======================
 let dayName=document.getElementById("day");
  mounthName=document.getElementById("mounth"),
  datenumber=document.getElementById("date")
  cityName=document.getElementById("city"),
  tempC=document.getElementById("tempc"),
  icon=document.getElementById("icon"),
  condition=document.getElementById("condition"),
  humadity=document.getElementById("humadity"),
  windName=document.getElementById("wind"),
  windDirection=document.getElementById("wind-dir"),
  regionName=document.getElementById("region");
// ========================get Next Day==============================
let nextDay=document.getElementsByClassName("nextday"),
    nextIcon=document.getElementsByClassName("nextIcon"),
    nexttempC=document.getElementsByClassName("nextTempC"),
    nextStatus=document.getElementsByClassName("nextSataus");
// ========================global variable===========================
 let country='cairo',
  data,
  mounth = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ],
   days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
 async function getWeatherApi(){
    let resbonse= await fetch( `http://api.weatherapi.com/v1/forecast.json?key=a9a49e764a4644ef945111522220312&q=${country}&days=4`)
    data=await resbonse.json();
    getCurrentData();
    getNextDayData();
    console.log(data);
}
getWeatherApi();

function getCurrentData() {
 let date=new Date;
 let dayname=days[date.getDay()];
 dayName.innerHTML=dayname;
 let mounthname=mounth[date.getMonth()];
 mounthName.innerHTML=mounthname;
 let datename=date.getDate();
 datenumber.innerHTML=datename;
 cityName.innerHTML=data.location.name;
 regionName.innerHTML=data.location.region;
 tempC.innerHTML=data.current.temp_c + " C"
 icon.setAttribute("src",`${data.current.condition.icon}`)
 condition.innerHTML= data.current.condition.text
 humadity.innerHTML= data.current.humidity + "%"
windName.innerHTML=data.current.wind_kph
windDirection.innerHTML= data.current.wind_dir
}
function getNextDayData(){
    for (let i = 0; i < nextDay.length; i++) {
        let date=new Date(data.forecast.forecastday[i+1].date);
        nextDay[i].innerHTML=days[date.getDay()];
        nextIcon[i].setAttribute("src",`https://${data.forecast.forecastday[i+1].day.condition.icon}`)
        nexttempC[i].innerHTML=data.forecast.forecastday[i+1].day.maxtemp_c +" C"
        nextStatus[i].innerHTML=data.forecast.forecastday[i+1].day.condition.text
    }
}

  let input= document.getElementById("search");
  console.log(input);
  input.addEventListener("keydown",()=>{
    country=input.value;
    getWeatherApi();
  })

