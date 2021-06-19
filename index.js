var ctx = document.getElementById('myChart').getContext('2d');
var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'line',
    // The data for our dataset
    data: {
        labels: ["2021-06-14", "2021-06-15", "2021-06-16", "2021-06-17","2021-06-18", "2021-06-19", "2021-06-20"],
        datasets: [{
            label: "курс валюты",
            backgroundColor: ['red', 'yellow', 'green'],
            borderColor: 'rgb(255, 99, 132)',
            data: [2.5,2.4,2.45,2.43,2.55,2.47,2.43]
        }]
    },
    // Configuration options go here
    options: {}
});

var uri = 'https://www.nbrb.by/API/';
$('#btn').click(function () {
    rate();
}); 

function rate() {
        chart.data.labels =[];
        chart.data.datasets[0].data =[];
    
    $.getJSON(uri + 'ExRates/Rates/Dynamics/' + $('#model option:selected').val(), { 'startDate': $('#date1').val(), 'endDate': $('#date2').val() })
    .done(function (data) {
    $.each(data, function (key, item) {
        chart.data.labels.push(item.Date.replace(/T00:00:00/gi, ''))
        chart.data.datasets[0].data.push(item.Cur_OfficialRate)
        chart.update();
        });

        $('#btn').removeAttr("disabled");
        }).error(function (err) {
            $('#btn').removeAttr("disabled");
            alert('ошибка');
        });
        }

