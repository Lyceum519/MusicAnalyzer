
var DELAY = 1000; // delay in ms to add new data points

var strategy = document.getElementById('strategy');

// create a graph2d with an (currently empty) dataset
var container = document.getElementById('visualization');
var dataset = new vis.DataSet();

var yData = [];
var y2Data = [];

var groups = new vis.DataSet();

groups.add({
    id: 0,
    content: "test1"
});

groups.add({
    id: 1,
    content: "test2"
});


var options = {
    start: 0, // changed so its faster
    end: 10000,
    defaultGroup : "unrecognized",
    legend : true,
    dataAxis: {
        left: {
            range: {
                min:-1, max: 1
            }
        }
    },
    drawPoints: {
        style: 'circle' // square, circle
    },
    shaded: {
        orientation: 'bottom' // top, bottom
    },
    min: 0
};


// a function to generate data points
function y(x) {
    return (Math.sin(x / 2) + Math.cos(x / 4)) * 5;
}

function renderStep() {
    // move the window (you can think of different strategies).
    // var now = vis.moment();
    // var range = graph2d.getWindow();
    // var interval = range.end - range.start;
    //
    // if (now > range.end) {
    //     graph2d.setWindow(now - 0.1 * interval, now + 0.9 * interval);
    // }
    //setTimeout(renderStep, DELAY);
    var graph2d = new vis.Graph2d(container, dataset, groups, options );
}

/**
 * Add a new datapoint to the graph
 */
function addDataPoint() {
    // add a new data point to the dataset
    // var now = vis.moment();
    // dataset.add({
    //     x: now,
    //     y: y(now / 1000)
    // });

    // remove all data points which are no longer visible
    //var range = graph2d.getWindow();
    //var interval = range.end - range.start;
    // var oldIds = dataset.getIds({
    //     filter: function (item) {
    //         return item.x < range.start - interval;
    //     }
    // });
    //dataset.remove(oldIds);

    //setTimeout(addDataPoint, DELAY);
}


$(document).ready( function () {
    yData = $.getJSON( "/assets/data/y_data.json", function( data ) {

        for ( var i = 0 ; i < data.length ; i++ ) {
            dataset.add({
                x : i,
                y : data[i],
                group : 0
            })

        }

        $.getJSON( "/assets/data/y2_data.json", function( data2 ) {
            for ( var i = 0 ; i < data2.length ; i++ ) {
                dataset.add({
                    x : i,
                    y : data2[i],
                    group : 1
                })

            }

            renderStep();
        });
        //addDataPoint();

    });

});
