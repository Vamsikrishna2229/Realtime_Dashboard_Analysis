// Init the Variables
var json=[];
var json1=[];
var json2=[];
var arrPush = [];
var uniqArr = [];
var chart3;
var chart4;
var count=0;
var graph4Data = [];
var graph3Data = [];

$(document).ready(function() {

	function reload() {
		var f = document.getElementById('tableau');
		f.src = f.src;
		}	
	
/*setInterval( function() {	
	$.ajax({
		//url: "jsp/placed_json.jsp"
	});
},90000);*/

setInterval( function() {
	reload();
},900000);

// Place Order, Sales, Auth  - Title, Icons, Relatime Numbers

setInterval(function()
    { 
       $.ajax({
        'async': false,
          'global': false,
          'url': "json/Placedtillnow.json",
          'dataType': "json",
          'success': function (data) {
              
              tyOrders1 = 'Today - ' + (data.TYORDERS / 1000).toFixed(1) + ' K';
              $("#order1").text(tyOrders1);
              
                  tySales1 = 'Today - $' + (data.TYSALES / 1000000).toFixed(2) + ' M';
                 $("#sales1").text(tySales1);
          }
        });

       $.ajax({
        'async': false,
          'global': false,
          'url': "json/placed.json",
          'dataType': "json",
          'success': function (data) {
                
                //TY Orders
                tyOrders2 = 'Last Min - ' + parseInt(data[data.length-1].TYORDERS);
                $("#order2").text(tyOrders2);

                //TY Sales
                 tySales2 = 'Last Min - ' + (parseInt(data[data.length-1].TYSALES)/1000).toFixed(1) + ' K';
                 $("#sales2").text(tySales2);
          }
        });

       $.ajax({
        'async': false,
          'global': false,
          'url': "json/AuthOrders.json",
          'dataType': "json",
          'success': function (data) {
                $("#auth").text(parseInt(data[data.length-1].TY));
          }
        });


    },2000);

// END - Place Order, Sales, Auth  - Title, Icons, Relatime Numbers

// Plot Charts for PLaced Sales, Placed Orders, Authorised Orders, Placed Sales By Channel, Placed Sales By Orders

	json = (function () {
	    var json = null;
	    $.ajax({
	        'async': false,
	        'global': false,
	        'url': "json/placed.json",
	        'dataType': "json",
	        'success': function (data) {
	            json = data;
	        }
	    });
	    return json;
	})();

	json1 = (function () {
	    var json1 = null;
	    $.ajax({
	        'async': false,
	        'global': false,
	        'url': "json/AuthOrders.json",
	        'dataType': "json",
	        'success': function (data) {
	            json1 = data;
	        }
	    });
	    return json1;
	})();

    json2 = (function () {
      var json2 = null;
      $.ajax({
          'async': false,
          'global': false,
          'url': "json/PlacedChannel.json",
          'dataType': "json",
          'success': function (data) {

						             source3Data = data;
						             json2 = getchart3Data();
          							}
      });
    
    return json2;

    })();

    json3 = (function () {
      var json3 = null;
      $.ajax({
          'async': false,
          'global': false,
          'url': "json/PlacedChannel.json",
          'dataType': "json",
          'success': function (data) {
						             source4Data = data;
						             json3 = getchart4Data();
          							}
      });
    
    return json3;

    })();
    
/**
 * Create the chart
 */

var chart = 
  AmCharts.makeChart( "chartdiv", {
  "type": "serial",
  "theme": "light",
  "zoomOutButton": {
    "backgroundColor": '#000000',
    "backgroundAlpha": 0.15
  },
  "legend": {
      "useGraphSettings": true
  },
  //"dataProvider": generateChartData(),
  //"dataProvider": [{"date":"2016-11-09 21:53","TY":125.0,"LY":"97.0"},{"date":"2016-11-09 21:55","TY":146.0,"LY":"104.0"}],
  "dataProvider": json,                 	  
  "categoryField": "Date",
  "categoryAxis": {
    "parseDates": true,
    "minPeriod": "mm",
    "dashLength": 1,
    "gridAlpha": 0.15,
    "axisColor": "#DADADA"
  },
  "graphs": [ {
    "id": "g1",
    "valueField": "TYSALES",
    "bullet": "round",
    "bulletBorderColor": "#FFFFFF",
    "bulletBorderThickness": 0,
    "lineThickness": 3,
    "lineColor": "#FE6F0F",
     "fillColorsField": "color",
    // "negativeLineColor": "#0352b5",
    "negativeLineColor": "#0352b5",
    "hideBulletsCount": 10,
    //"type": "column",
    "type": "smoothedLine",
    "title": "TY"
  },
  {
	    "id": "g2",
	    "valueField": "LYSALES",
	    "bullet": "square",
	    "bulletBorderColor": "#FFFFFF",
	    "bulletBorderThickness": 0,
	    "lineThickness": 2,
	    "lineColor": "#33809F",
	    "negativeLineColor": "#0352b5",
	    "hideBulletsCount": 10,
	    "type": "smoothedLine",
	    "title": "LY"
	  }],
  "chartCursor": {
	"categoryBalloonDateFormat": "JJ:NN, DD MMMM",
    "cursorPosition": "mouse"
  },
  "chartScrollbar": {
    // "graph": "g1",
    // "scrollbarHeight": 40,
    // "color": "#FFFFFF",
    // "autoGridCount": true
  },
  "dataDateFormat": "YYYY-MM-DD HH:NN:SS",
  "numberFormatter": {
      "precision": 2,
      "decimalSeparator": ".",
      "thousandsSeparator": ","
  }
})

var chart1 = 
  AmCharts.makeChart( "chartdiv1", {
  "type": "serial",
  "theme": "light",
  "zoomOutButton": {
    "backgroundColor": '#000000',
    "backgroundAlpha": 0.15
  },
  "legend": {
      "useGraphSettings": true
  },
  //"dataProvider": generateChartData(),
  //"dataProvider": [{"date":"2016-11-09 21:53","TY":125.0,"LY":"97.0"},{"date":"2016-11-09 21:55","TY":146.0,"LY":"104.0"}],
  "dataProvider": json,                 	  
  "categoryField": "Date",
  "categoryAxis": {
    "parseDates": true,
    "minPeriod": "mm",
    "dashLength": 1,
    "gridAlpha": 0.15,
    "axisColor": "#DADADA"
  },
  "graphs": [ {
    "id": "g1",
    "valueField": "TYORDERS",
    "bullet": "round",
    "bulletBorderColor": "#FFFFFF",
    "bulletBorderThickness": 0,
    "lineThickness": 3,
    "lineColor": "#FE6F0F",
    "negativeLineColor": "#0352b5",
    "hideBulletsCount": 10,
    "type": "smoothedLine",
    "title": "TY"
  },
  {
	    "id": "g2",
	    "valueField": "LYORDERS",
	    "bullet": "square",
	    "bulletBorderColor": "#FFFFFF",
	    "bulletBorderThickness": 0,
	    "lineThickness": 1,
	    "lineColor": "#497587",
	    "negativeLineColor": "#0352b5",
	    "hideBulletsCount": 10,
	    "type": "smoothedLine",
	    "title": "LY"
	  }],
  "chartCursor": {
	"categoryBalloonDateFormat": "JJ:NN, DD MMMM",
    "cursorPosition": "mouse"
  },
  "chartScrollbar": {
     //"backgroundColor": "red"
    // "graph": "g1",
    // "scrollbarHeight": 40,
    // "color": "#FFFFFF",
    // "autoGridCount": true
  },
  "dataDateFormat": "YYYY-MM-DD HH:NN:SS"
})


var chart2 = 
  AmCharts.makeChart( "chartdiv2", {
  "type": "serial",
  "theme": "light",
  "zoomOutButton": {
    "backgroundColor": '#000000',
    "backgroundAlpha": 0.15
  },
  "legend": {
      "useGraphSettings": true
  },
  //"dataProvider": generateChartData(),
  //"dataProvider": [{"date":"2016-11-09 21:53","TY":125.0,"LY":"97.0"},{"date":"2016-11-09 21:55","TY":146.0,"LY":"104.0"}],
  "dataProvider": json1,                 	  
  "categoryField": "Date",
  "categoryAxis": {
    "parseDates": true,
    "minPeriod": "mm",
    "dashLength": 1,
    "gridAlpha": 0.15,
    "axisColor": "#DADADA"
  },
  "graphs": [ {
    "id": "g1",
    "valueField": "TY",
    "bullet": "round",
    "bulletBorderColor": "#FFFFFF",
    "bulletBorderThickness": 0,
    "lineThickness": 3,
    "lineColor": "#FE6F0F",
    "negativeLineColor": "#0352b5",
    "hideBulletsCount": 10,
    "type": "smoothedLine",
    "title": "TY",
    //"fillAlphas": 0.9,
    //"lineAlpha": 0.2
  },
  {
	    "id": "g2",
	    "valueField": "LY",
	    "bullet": "square",
	    "bulletBorderColor": "#FFFFFF",
	    "bulletBorderThickness": 0,
	    "lineThickness": 1,
	    "lineColor": "#456370",
	    "negativeLineColor": "#33DDFF",
	    "hideBulletsCount": 10,
	    "type": "smoothedLine",
	    "title": "LY"
	    //"fillAlphas": 0.9,
	    //"lineAlpha": 0.2
	  }],
  "chartCursor": {
	"categoryBalloonDateFormat": "JJ:NN, DD MMMM",
    "cursorPosition": "mouse"
  },
  "chartScrollbar": {
    // "graph": "g1",
    // "scrollbarHeight": 40,
    // "color": "#FFFFFF",
    // "autoGridCount": true
  },
  "dataDateFormat": "YYYY-MM-DD HH:NN:SS"
})

 chart3 = 
  AmCharts.makeChart( "chartdiv3", {
  "type": "serial",
  "theme": "light",
  "zoomOutButton": {
    "backgroundColor": '#000000',
    "backgroundAlpha": 0.15
  },
  "legend": {
      "useGraphSettings": true
  },
  //"dataProvider": generateChartData(),
  //"dataProvider": [{"date":"2016-11-09 21:53","TY":125.0,"LY":"97.0"},{"date":"2016-11-09 21:55","TY":146.0,"LY":"104.0"}],
  "dataProvider": json2,                     
  "categoryField": "Date",
  "categoryAxis": {
    "parseDates": true,
    "minPeriod": "mm",
    "dashLength": 1,
    "gridAlpha": 0.15,
    "axisColor": "#DADADA"
  },
  "graphs": [ {
    "id": "g1",
    "valueField": "TYSALES",
    "bullet": "round",
    "bulletBorderColor": "#FFFFFF",
    "bulletBorderThickness": 0,
    "lineThickness": 3,
    "lineColor": "#FE6F0F",
    "negativeLineColor": "#0352b5",
    "hideBulletsCount": 10,
    "type": "smoothedLine",
    "title": "TY"
  },
  {
      "id": "g2",
      "valueField": "LYSALES",
      "bullet": "square",
      "bulletBorderColor": "#FFFFFF",
      "bulletBorderThickness": 0,
      "lineThickness": 1,
      "lineColor": "#446287",
      "negativeLineColor": "#0352b5",
      "hideBulletsCount": 10,
      "type": "smoothedLine",
      "title": "LY"
    }],
  "chartCursor": {
  "categoryBalloonDateFormat": "JJ:NN, DD MMMM",
    "cursorPosition": "mouse"
  },
  "chartScrollbar": {
    // "graph": "g1",
    // "scrollbarHeight": 40,
    // "color": "#FFFFFF",
    // "autoGridCount": true
  },
  "dataDateFormat": "YYYY-MM-DD HH:NN:SS",
  "numberFormatter": {
      "precision": 2,
      "decimalSeparator": ".",
      "thousandsSeparator": ","
  }
})



 chart4 = 
  AmCharts.makeChart( "chartdiv4", {
  "type": "serial",
  "theme": "light",
  "zoomOutButton": {
    "backgroundColor": '#000000',
    "backgroundAlpha": 0.15
  },
  "legend": {
      "useGraphSettings": true
  },
  //"dataProvider": generateChartData(),
  //"dataProvider": [{"date":"2016-11-09 21:53","TY":125.0,"LY":"97.0"},{"date":"2016-11-09 21:55","TY":146.0,"LY":"104.0"}],
  "dataProvider": json3,                     
  "categoryField": "Date",
  "categoryAxis": {
    "parseDates": true,
    "minPeriod": "mm",
    "dashLength": 1,
    "gridAlpha": 0.15,
    "axisColor": "#DADADA"
  },
  "graphs": [ {
    "id": "g1",
    "valueField": "TYORDERS",
    "bullet": "round",
    "bulletBorderColor": "#FFFFFF",
    "bulletBorderThickness": 0,
    "lineThickness": 3,
    "lineColor": "#FE6F0F",
    "negativeLineColor": "#0352b5",
    "hideBulletsCount": 10,
    "type": "smoothedLine",
    "title": "TY"
  },
  {
      "id": "g2",
      "valueField": "LYORDERS",
      "bullet": "square",
      "bulletBorderColor": "#FFFFFF",
      "bulletBorderThickness": 0,
      "lineThickness": 1,
      "lineColor": "#446287",
      "negativeLineColor": "#0352b5",
      "hideBulletsCount": 10,
      "type": "smoothedLine",
      "title": "LY",
    }],
  "chartCursor": {
  "categoryBalloonDateFormat": "JJ:NN, DD MMMM",
    "cursorPosition": "mouse"
  },
  "chartScrollbar": {
    // "graph": "g1",
    // "scrollbarHeight": 40,
    // "color": "#FFFFFF",
    // "autoGridCount": true
  },
  "dataDateFormat": "YYYY-MM-DD HH:NN:SS"
  
})


// END - Plot Charts for PLaced Sales, Placed Orders, Authorised Orders, Placed Sales By Channel, Placed Sales By Orders

/**
 * Set interval to push new data points periodically
 */

/* Chart Updates */

setInterval( function() {
	  // normally you would load new datapoints here,
	  // but we will just generate some random values
	  // and remove the value from the beginning so that
	  // we get nice sliding graph feeling

	    $.ajax({
	        'async': false,
	        'global': false,
	        'url': "json/placed.json",
	        'dataType': "json",
	        'success': function (data) {
	        	chart.dataProvider.splice(0,2);
	      	  	chart.validateData();
	      	  
	      	  	setTimeout(function () {	  
	      		chart.dataProvider.splice(0,200);
	      	  	chart.dataProvider = data;
	      	  	chart.validateData();}, 1000);
	        }
	    });	  
	  
	}, 5000 );

/* chart1 */

setInterval( function() {
	  // normally you would load new datapoints here,
	  // but we will just generate some random values
	  // and remove the value from the beginning so that
	  // we get nice sliding graph feeling

	    $.ajax({
	        'async': false,
	        'global': false,
	        'url': "json/placed.json",
	        'dataType': "json",
	        'success': function (data) {
	        	chart1.dataProvider.splice(0,2);
	      	  	chart1.validateData();
	      	  
	      	  	setTimeout(function () {	  
	      		chart1.dataProvider.splice(0,200);
	      	  	chart1.dataProvider = data;
	      	  	chart1.validateData();}, 1000);
	        }
	    });	  
	  
	}, 5000 );

/* chart2 */

setInterval( function() {
	  // normally you would load new datapoints here,
	  // but we will just generate some random values
	  // and remove the value from the beginning so that
	  // we get nice sliding graph feeling

	    $.ajax({
	        'async': false,
	        'global': false,
	        'url': "json/AuthOrders.json",
	        'dataType': "json",
	        'success': function (data) {
	        	chart2.dataProvider.splice(0,2);
	      	  	chart2.validateData();
	      	  
	      	  	setTimeout(function () {	  
	      		chart2.dataProvider.splice(0,200);
	      	  	chart2.dataProvider = data;
	      	  	chart2.validateData();}, 1000);
	        }
	    });	  
	  
	}, 5000 );

/* chart3 */

 setInterval( function() {
	  // normally you would load new datapoints here,
	  // but we will just generate some random values
	  // and remove the value from the beginning so that
	  // we get nice sliding graph feeling

	    $.ajax({
	        'async': false,
	        'global': false,
	        'url': "json/PlacedChannel.json",
	        'dataType': "json",
	        'success': function (data) {
	        	  source3Data = data;

          // remove datapoint from the beginning
          chart3.dataProvider.splice(0,2);
          chart3.validateData();
          
          setTimeout(function () {    
            
            chart3.dataProvider.splice(0,200);
            chart3.dataProvider = getchart3Data();
            chart3.validateData();}, 
            1000);
	 }
	});
	   
	}, 5000 );

/* chart4 */

 setInterval( function() {
	  // normally you would load new datapoints here,
	  // but we will just generate some random values
	  // and remove the value from the beginning so that
	  // we get nice sliding graph feeling

	  $.ajax({
	        'async': false,
	        'global': false,
	        'url': "json/PlacedChannel.json",
	        'dataType': "json",
	        'success': function (data) {
	        	source4Data = data;
                // remove datapoint from the beginning
          chart4.dataProvider.splice(0,2);
          chart4.validateData();
          
          setTimeout(function () {    
             chart4.dataProvider.splice(0,200);
             chart4.dataProvider =  getchart4Data();
             chart4.validateData();}, 
             1000);
      }
	   });
	  
	}, 5000 );


/**
 * END - Set interval to push new data points periodically
 */

/* END - Chart Updates */


/**
 * Function which applies current filters when invoked  on click event
 */

$( ".filter3-position" ).bind("click",function(e){
  
    $(".filter3-position").removeAttr("checked");
    $(e.currentTarget).prop("checked","checked");
    $(e.currentTarget).attr("checked","checked");

     chart3.dataProvider.splice(0,2000); 
     var chart3filter = getchart3Data();  
     chart3.dataProvider = chart3filter;
     chart3.validateData();
  
  });


$( ".filter4-position" ).bind("click",function(e){

    $(".filter4-position").removeAttr("checked");
    $(e.currentTarget).prop("checked","checked");
    $(e.currentTarget).attr("checked","checked");

    chart4.dataProvider.splice(0,2000); 
    var chart4filter = getchart4Data();  
    chart4.dataProvider = chart4filter;
    chart4.validateData();

});

//End Filter the Data based on SVC ID 

 });

// End jQuery - Document Ready Function.


/**
 * Function that checks which data is selected and generates a new data set
 */
function getchart3Data() {
  //var name = document.getElementById( "filter-position" ).value;

//$('#someid').find($('option')).attr('selected',false)
// $("p:not(.intro)")
  var filters = {};

  // get all filter checkboxes
  var fields = document.getElementsByClassName( "filter3-position" );
  for ( var i = 0; i < fields.length; i++ ) {
    if ( fields[ i ].checked ) {
      filters[ fields[ i ].value ] = true;
    }
  }

  // init new data set
  var newChart3Data = [];

  // cycle through source data and filter out required data points
  for ( var i = 0; i < source3Data.length; i++ ) {
    var dataPoint = source3Data[ i ];

    if ( filters[ dataPoint.SVC_ID ] ) {

      newChart3Data.push( {
        "TYSALES": dataPoint.TYSALES,
        "LYSALES": dataPoint.LYSALES,
         "Date": dataPoint.Date      
      } );
    }
  }
  // return new data set

  for(var j=0;j<newChart3Data.length;j++){
      graph3Data.push(newChart3Data[j]);}

    	graph3Data.sort(function(a,b) {
      	
        if ( a.Date < b.Date )
      	 return -1;
      	if ( a.Date > b.Date )
      	 return 1;

      	return 0;
      	});

      return graph3Data;

}


function getchart4Data() {
	  //var name = document.getElementById( "filter-position" ).value;

	  var filters = {};

	  // get all filter checkboxes
	  var fields = document.getElementsByClassName( "filter4-position" );
	  for ( var i = 0; i < fields.length; i++ ) {
	    if ( fields[ i ].checked ) {
	      filters[ fields[ i ].value ] = true;
	    }
	  }

	  // init new data set
	  var newChart4Data = [];

	  // cycle through source data and filter out required data points
	  for ( var i = 0; i < source4Data.length; i++ ) {
	    var dataPoint = source4Data[ i ];

	    if ( filters[ dataPoint.SVC_ID ] ) {

	      newChart4Data.push( {
	         "Date": dataPoint.Date,
	         "TYORDERS": dataPoint.TYORDERS,
	         "LYORDERS": dataPoint.LYORDERS       
	      } );
	    }
	  }
	  // return new data set

	  for(var j=0;j<newChart4Data.length;j++){
	      graph4Data.push(newChart4Data[j]);}

    		graph4Data.sort(function(a,b) {
        		
            if ( a.Date < b.Date )
        		  return -1;
        		if ( a.Date > b.Date )
        		  return 1;

        		return 0;
    		});

    	  return graph4Data;
	}

/**
 * END - Function that checks which data is selected and generates a new data set
 */