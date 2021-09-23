function getMetadata(sample) {
// get samples data from samples.json file
    d3.json("samples.json").then((data) => {
        console.log(data);
        var metadata = data.metadata;
        console.log(metadata);

        var resultFilter = metadata.filter(sampleObj => sampleObj.id == sample);
        console.log(resultFilter)

        var result = resultFilter[0]
        console.log(result)


        var panel = d3.select("#sample-metadata");
        panel.html("");

        // add text to h5 tag for each key value pair
        Object.entries(result).forEach(([key, value]) => {
            panel.append("h5").text(`${key.toUpperCase()}: ${value}`);
        });


    });
}


function getCharts (sample) {
    d3.json("samples.json").then((data) => {
    console.log(data);
    
    var samples = data.samples;
    console.log(samples);

    var resultFilter = samples.filter(sampleObj => sampleObj.id == sample);
    console.log(resultFilter);

    var result = resultFilter[0];
    console.log(result);

    // Use sample_values as the values for the bar chart.
    var sample_values = result.sample_values;
    console.log(sample_values);
    
    // Use otu_ids as the labels for the bar chart.
    var otu_ids = result.otu_ids;
    console.log(otu_ids);
    
    // Use otu_labels as the hovertext for the chart.
    var otu_labels = result.otu_labels;
    console.log(otu_labels);

    // build bar chart
    
    var yticks = otu_ids.slice(0,10).map(otuID => `OTU ${otuID}`).reverse();

    var barLayout = {
        title: "Top Ten Bacteria Cultures Found",
        margin: {
            t: 30,
            r: 0,
            b: 20,
            l: 145
        },
    };

    var barData = [{
        y: yticks,
        x: sample_values.slice(0,10).reverse(),
        text: otu_labels.slice(0,10).reverse(),
        type: "bar",
        orientation: "h",
    }];
    
    Plotly.newPlot("bar", barData, barLayout);

    // build bubble chart

    var bubbleData = [{
        x: otu_ids,
        y: sample_values,
        text: otu_labels,
        mode: "markers,",
        marker: {
            size: sample_values,
            color: otu_ids,
            colorscale: "Earth",
        }
    }];

    var bubbleLayout = {
        title: "Bacteria Cultures Per Sample",
        margin: {
            t: 30,
            r: 10,
            b: 40,
            l: 30,

        },
        hovermode: "closest",
        xaxis: {title: "OTU ID"},
    };

    Plotly.newPlot("bubble", bubbleData, bubbleLayout);



    });
}



// get 940 data
function init() {

    var dropdownMenu = d3.select("#selDataset");

    d3.json("samples.json").then((data) => {
        var names = data.names;
        console.log(data.names);
        names.forEach((sample) => {
            dropdownMenu.append("option").property("value", sample).text(sample);
        })
    }); 

    getMetadata(940);
    getCharts(940);
}

function optionChanged(newData) {
    getMetadata(newData);
    getCharts(newData);
}

init();
