google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(loadData);
var test = 1;

function drawChart(chartData, title) {
  var gData = new google.visualization.DataTable(chartData);
  var options = {
      title: title,
      legend: 'none',
      hAxis: { showTextEvery: Math.ceil(chartData.rows.length / 10), slantedText: true, slantedTextAngle: 90 }
    };
      var chart = new google.visualization.LineChart(document.getElementById('curve_chart'));
      chart.draw(gData, options);
}

function loadData() {
  var query = "A191RL1Q225SBEA";
  // var query = "UNRATE";
  var yql_url = 'https://query.yahooapis.com/v1/public/yql';
  var url = "https://api.stlouisfed.org/fred/series/observations?series_id=" + query + "&api_key=2789c4d318db644e3b5523eb731bd171&file_type=json&observation_start=2007-01-01";
  var data = {"cols": [{"type": "string"}, {"type": "number"}], "rows": []};
    $.ajax({
      'url': yql_url,
      'data': {
        'q': 'SELECT * FROM json WHERE url="'+url+'"',
        'format': 'json',
        'jsonCompat': 'new',
      },
      'dataType': 'jsonp',
      'success': function(response) {
        response.query.results.json.observations.forEach(function(result) {
          data.rows.push({"c": [{"v": result.date}, {"v": result.value}]});
        });
        drawChart(data, "Title");
      }
    });
}

$(document).ready(function() {
  $("input[type=radio]").click(function() {
    var radioValue = $("input[name='chartType']:checked").val();
    console.log(radioValue);
  });
});
