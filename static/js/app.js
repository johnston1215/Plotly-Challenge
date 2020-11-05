// Step 1: Plotly

// 1. Use the D3 library to read in `samples.json`.
function init() {
    d3.json("../samples.json").then(function(data) {
        console.log(data);
        var s = data.samples;
        var n = data.names;
        var m = data.metadata;
        // console.log(n);
        // console.log(s);
        // console.log(m);
        //Populate DD menu
        var select = d3.select("#selDataset");
        // console.log(select);
        n.forEach(name => {
            select
            .append("option")
            .property("value", name)
            .text(name);
        });
    });
};
    
function optionChanged(sampleID) {
    var clear = d3.select("#sample-metadata");
    clear.html("");
    d3.json("../samples.json").then(function(data) {
        var s = data.samples;
        var m = data.metadata;
        var targetMeta = m.filter(metadata => metadata.id == sampleID);
        console.log(targetMeta);
        //populate metadata table
        var fill = d3.select("#sample-metadata");
        Object.entries(targetMeta[0])
        .forEach(function([key,value]) {
            fill.append("p").text(`${key}: ${value}`)
        })
    });
// 3. Create a bubble chart that displays each sample.
// * Use `otu_ids` for the x values.
// * Use `sample_values` for the y values.
// * Use `sample_values` for the marker size.
// * Use `otu_ids` for the marker colors.
// * Use `otu_labels` for the text values.
    function bplot(){
        d3.json("../samples.json").then(function(data) {
            data = data.samples.filter(otu => otu.id == sampleID);
            var otuid = data.map(oi => oi.otu_ids);
            var sampVal = data.map(sv => sv.sample_values);
            var otulabel = data.map(ol => ol.otu_labels);
            console.log(otuid);
            console.log(sampVal);
            console.log(otulabel);
            var trace1 = {
                x: otuid[0],
                y: sampVal[0],
                // type: "bubble",
                mode: 'markers',
                marker: {size: sampVal[0], color: otuid[0]},
                text: otulabel[0]
            };

            var barData = [trace1];
            Plotly.newPlot("bubble", barData);
            console.log(trace1)
        });
    };
    bplot();
};
init();
// Day 2 exercise 4 --  Data must be deleted before selecting another ID

             //render bar chart
// NewFunction, call optionChanged


// 2. Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.

// * Use `sample_values` as the values for the bar chart.
// * Use `otu_ids` as the labels for the bar chart.
// * Use `otu_labels` as the hovertext for the chart.

// Create bar chart
// numArray = [9.9, 6.1, 17.1, 22.7, 4.6, 8.7, 7.2];
// var sorted = numArray.sort((a, b) => a - b);
// var sliced = sorted.slice(0, 10);
// console.log(sliced);
// var trace1 = {
//     type: "hbar",
//     mode: "lines",
//     name: "Top 10",
//     x: value,
//     y: id,
//     line: {
//       color: "#17BECF"
//     }
//   };



// 6. Update all of the plots any time that a new sample is selected;
