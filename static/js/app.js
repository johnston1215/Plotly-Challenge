// 1. Use the D3 library to read in `samples.json`.
function init() {
    d3.json("../samples.json").then(function(data) {
        console.log(data);
        var n = data.names;
        //Populate DD menu
        var select = d3.select("#selDataset");
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
            var trace1 = {
                x: otuid[0],
                y: sampVal[0],
                mode: 'markers',
                marker: {size: sampVal[0], color: otuid[0]},
                text: otulabel[0]
            };

            var bubData = [trace1];
            Plotly.newPlot("bubble", bubData);
        });
    };
    bplot();
    //Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.
    // * Use `sample_values` as the values for the bar chart.
    // * Use `otu_ids` as the labels for the bar chart.
    // * Use `otu_labels` as the hovertext for the chart.
    function hplot(){
        d3.json("../samples.json").then(function(data) {
            data = data.samples.filter(otu => otu.id == sampleID)[0];
            console.log(data);
            var sv = data.sample_values.slice(0, 10);
            // console.log(sv);
            var otuid = data.otu_ids.slice(0,10);
            // console.log(otuid);
            var otulab = data.otu_labels.slice(0,10);
            // console.log(otulab);

            var trace2 = {
                x: sv.reverse(),
                y: otuid.map(function(x){return `otu id - ${x}`}).reverse(),
                text: otulab.reverse(),
                name: "Top 10 OTU",
                type: "bar",
                orientation: "h",
            };
            // console.log(trace2["x"]);
            // console.log(trace2["y"]);
            var barData = [trace2];
            Plotly.newPlot("bar", barData);
            // console.log(trace2)
        });
    };
    hplot();

};
init();