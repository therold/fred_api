google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(loadData);
var source = [{"name": "Unemployment Rate", "query": "UNRATE"},
              {"name": "Real Gross Domestic Product", "query": "A191RL1Q225SBEA"}];

function loadData() {
  var sourceType = parseInt($("input[name='chartType']:checked").val());
  var today = new Date();
  var startYear = today.getFullYear() - 10;
  var yql_url = 'https://query.yahooapis.com/v1/public/yql';
  var url = "https://api.stlouisfed.org/fred/series/observations?series_id=" + source[sourceType].query + "&api_key=2789c4d318db644e3b5523eb731bd171&file_type=json&observation_start=" + startYear + "-01-01";
  var data = {"cols": [{"type": "string"}, {"type": "number"}], "rows": []};
    $.ajax({
      'url': yql_url,
      'data': {
        'q': 'SELECT * FROM json WHERE url="' + url + '"',
        'format': 'json',
        'jsonCompat': 'new',
      },
      'dataType': 'jsonp',
      'success': function(response) {
        response.query.results.json.observations.forEach(function(result) {
          data.rows.push({"c": [{"v": result.date}, {"v": result.value}]});
        });
        drawChart(data, source[sourceType].name);
      }
    });
}

function drawChart(chartData, title) {
  var gData = new google.visualization.DataTable(chartData);
  var options = {
      title: title,
      legend: 'none',
      hAxis: { showTextEvery: Math.ceil(chartData.rows.length / 10), slantedText: true, slantedTextAngle: 90 }
    };
      var chart = new google.visualization.LineChart(document.getElementById('chart'));
      chart.draw(gData, options);
}


$(document).ready(function() {
  $("input[type=radio]").click(function() {
    loadData();
  });
});
