// 1. Use the D3 library to read in `samples.json`.
function init() {
    d3.json("../samples.json").then(function(data) {
        console.log(data);
        // var s = data.samples;
        var n = data.names;
        // var m = data.metadata;
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
        // var s = data.samples;
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
            // console.log(otuid);
            // console.log(sampVal);
            // console.log(otulabel);
            var trace1 = {
                x: otuid[0],
                y: sampVal[0],
                mode: 'markers',
                marker: {size: sampVal[0], color: otuid[0]},
                text: otulabel[0]
            };

            var bubData = [trace1];
            Plotly.newPlot("bubble", bubData);
            // console.log(trace1)
        });
    };
    bplot();
    //Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.
    // * Use `sample_values` as the values for the bar chart.
    // * Use `otu_ids` as the labels for the bar chart.
    // * Use `otu_labels` as the hovertext for the chart.
    function hplot(){
        d3.json("../samples.json").then(function(data) {
            var s = data.samples
            console.log(s);
            var sorted = s.sort((a,b) => b.sample_values - a.sample_values);
            console.log(sorted);
            var sliced = sorted.slice(0, 10);
            console.log(sliced);

            var trace2 = {
                x: sliced.map(object => object.sample_values),
                y: sliced.map(object => object.otu_ids),
                text: sliced.map(object => object.otu_labels),
                name: "Top 10 OTU",
                type: "bar",
                orientation: "h",
            };

            var barData = [trace2];
            Plotly.newPlot("bar", barData);
            console.log(trace2)
        });
    };
    hplot();

};
init();

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