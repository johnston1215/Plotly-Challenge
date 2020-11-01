// Step 1: Plotly

// 1. Use the D3 library to read in `samples.json`.
d3.json("../samples.json").then(function(data) {
    console.log(data);
});
// 2. Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.

//Populate dropdown menu
d3.json("../samples.json").then(function(data) {
    var s = data.samples;
    var n = data.names;
    var m = data.metadata;
    console.log(n);
    console.log(s);
    console.log(m);
});


// * Use `sample_values` as the values for the bar chart.

//0 - id
//1 - otu_ids
//2 - sample_values
//3 - otu_labels

// function makeCharts(sample) {

// * Use `otu_ids` as the labels for the bar chart.

// * Use `otu_labels` as the hovertext for the chart.

// Create bar chart
// numArray = [9.9, 6.1, 17.1, 22.7, 4.6, 8.7, 7.2];
// var sorted = numArray.sort((a, b) => a - b);
// var sliced = sorted.slice(0, 9);
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

// 3. Create a bubble chart that displays each sample.
// * Use `otu_ids` for the x values.

// * Use `sample_values` for the y values.

// * Use `sample_values` for the marker size.

// * Use `otu_ids` for the marker colors.

// * Use `otu_labels` for the text values.



// 4. Display the sample metadata, i.e., an individual's demographic information.

// 5. Display each key-value pair from the metadata JSON object somewhere on the page.


// 6. Update all of the plots any time that a new sample is selected;
