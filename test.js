$(document).ready(function(){
	var ctx = $('#myChart').get(0).getContext("2d");

	var data = {
	    labels: ["Python", "Java", "C"],
	    datasets: [
        {
            label: "My First dataset",
            fillColor: "lightblue",
            strokeColor: "black",
            pointColor: "lightBlue",
            pointStrokeColor: "DarkBlue",
            pointHighlightFill: "lightBlue",
            pointHighlightStroke: "lightblue",
            data: [1,2,3]
        }
    	]
};
	var myRadarChart = new Chart(ctx).Radar(data);
});