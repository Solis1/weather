var i = 0;
var imgs = ["img1", "img2", "img3", "img4"];


$(document).ready(function () {

    setInterval(changeImg, 20000);

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {

            $.ajax({
                url: "http://api.openweathermap.org/data/2.5/weather?q=&units=metric&lat=" + position.coords.latitude + "&lon=" + position.coords.longitude + "&APPID=c1c00899bea54a22f66a4549f6d3eda8",
                jsonp: "callback",
                success: function (data) {
                    $("#loc").html(data.name + ", " + data.sys.country);
                    $("#wea").html(data.main.temp + "°");
                    $("#sky").html(data.weather[0].main);
                    $("#imgClima").attr("class", getIcon(data.weather[0].main));
                }
            });
    });
}
});

function changeImg() {


    $("#backImg").animate({
        opacity: 0
    }, 1000, function () {
        $("#backImg").attr("src", "img/" + imgs[i] + ".jpg");
    });

    $("#backImg").animate({
        opacity: 1
    }, 1000)


    if (i == 3) {
        i = 0;
    } else {
        i++;
    }
}

function getIcon(clime) {
    clime = clime.toLowerCase();
    console.log(clime);
    switch (clime) {
        case 'clear':
            return "wi wi-day-sunny";
            break;
        case 'drizzle':
            return "wi wi-day-hail";
            break;
        case 'clouds':
            return "wi wi-day-cloudy";
            break;
        case 'rain':
            return "wi wi-day-rain";
            break;
        case 'snow':
            return "wi wi-day-snow";
            break;
        case 'thunderstom':
            return "wi wi-day-storm-showers";
            break;

    }
}

function changeTemp(opc) {

    var temp = document.getElementById("wea").innerHTML;

    var arr = temp.split("");
    arr.pop();
    temp = arr.join("");

    switch (opc) {

        case 'C':
            temp = Math.round(parseInt(temp) * 1.8 + 32);
            document.getElementById("wea").innerHTML = temp + "°";
            document.getElementById("grados").innerHTML = 'F';
            break;
        case 'F':
            temp = Math.round((parseInt(temp) - 32) / 1.8);
            document.getElementById("wea").innerHTML = temp + "°";
            document.getElementById("grados").innerHTML = 'C';
            break;
    }

}
