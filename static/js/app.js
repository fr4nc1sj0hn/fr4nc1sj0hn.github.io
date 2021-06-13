const url = "samples.json";

function optionChanged(value) {
  getData(value)
}
// Fetch the JSON data and console log it

function getData(value){
	d3.json(url).then(function(data) {
		console.log(data);
		var names = data.names;
		var samples = data.samples;
		var metadata = data.metadata;

		let selector = d3.select("#selDataset");
	    let sampleNames = samples.map(ele =>ele.id);
	            
	    sampleNames.forEach((sample) => {
	        selector
	            .append("option")
	            .text(sample)
	            .property("value", sample);
	    });

		function filterPerson(samples) {
		  return samples.id == value;
		};

		function filterMetadata(metadata) {
		  return metadata.id == value;
		}

		var metadata = metadata.filter(filterMetadata)[0];
		// 2. Use filter() to pass the function as its argument
		var testperson = samples.filter(filterPerson);

		console.log(names);
		console.log("samples: ",samples);

		personsample = testperson[0]

		sample_values = testperson[0].sample_values
		sample_labels = testperson[0].otu_labels

		ids = testperson[0].otu_ids   
		ids = ids.map(i => 'otu - ' + i);

		//1) combine the arrays:
		var list = [];
		for (var j = 0; j < ids.length; j++) 
		    list.push({'id': ids[j], 'samples': sample_values[j],"labels": sample_labels[j]});

		//2) sort:
		list.sort(function(a, b) {
		    return ((a.sample_values < b.sample_values) ? -1 : ((a.sample_values == b.sample_values) ? 0 : 1));
		});
		console.log("940 Data: ",list);


		// Slice the first 10 objects for plotting
		slicedData = list.slice(0, 10);

		console.log("slicedData: ",slicedData);

		// Reverse the array to accommodate Plotly's defaults
		reversedData = slicedData.reverse();

		// 5. Create your trace.
		var trace = {
			x: reversedData.map(object => object.samples),
	  		y: reversedData.map(object => object.id),
	  		text: reversedData.map(object => object.labels),
		  	type: "bar",
		  	orientation: 'h'
		};

		// 6. Create the data array for our plot
		var data = [trace];

		// 7. Define our plot layout
		var layout = {
		  title: "Samples for "+ value

		};

		// 8. Plot the chart to a div tag with id "bar"
		Plotly.newPlot("bar", data, layout);

		var trace1 = {
			  x: testperson[0].otu_ids,
			  y: testperson[0].sample_values,
			  text: testperson[0].otu_labels,
			  mode: 'markers',
			  marker: {
			    size: testperson[0].sample_values,
			    color: testperson[0].otu_ids
			  }
			};

		var data1 = [trace1];

		var layout1 = {
			  xaxis: { title: "OTU ID" },
			  showlegend: false,
			  height: 600
			};

		Plotly.newPlot('bubble', data1, layout1);

		var ul = d3.select('#sample-metadata').html('')
		
		console.log("filtered: ", metadata)
		ul = d3.select('#sample-metadata').append('ul');

		//For the Panel
		for (var key of Object.keys(metadata)) {
			ul.append('li').text(key + ": " + metadata[key]).style("font-size", "12px")
		};
	});
};
//Initial Load
d3.json(url).then(function(data) {
		console.log(data);
		var names = data.names;
		var samples = data.samples;
		var metadata = data.metadata;

		
		let selector = d3.select("#selDataset");
	    let sampleNames = samples.map(ele =>ele.id);
	            
	    sampleNames.forEach((sample) => {
	        selector
	            .append("option")
	            .text(sample)
	            .property("value", sample);
	    });

	    currentvalue = names[0]
		function filterPerson(samples) {
		  return samples.id == currentvalue;
		}

		function filterMetadata(metadata) {
		  return metadata.id == currentvalue;
		}

		var metadata = metadata.filter(filterMetadata)[0];
		console.log("metadata: ",metadata)
		
		

		// 2. Use filter() to pass the function as its argument
		var testperson = samples.filter(filterPerson);

		console.log(names);
		console.log("samples: ",samples);

		personsample = testperson[0]

		sample_values = testperson[0].sample_values
		sample_labels = testperson[0].otu_labels

		ids = testperson[0].otu_ids   
		ids = ids.map(i => 'otu - ' + i);

		//1) combine the arrays:
		var list = [];
		for (var j = 0; j < ids.length; j++) 
		    list.push({'id': ids[j], 'samples': sample_values[j],"labels": sample_labels[j]});

		//2) sort:
		list.sort(function(a, b) {
		    return ((a.sample_values < b.sample_values) ? -1 : ((a.sample_values == b.sample_values) ? 0 : 1));
		});
		console.log("All Data: ",list);


		// Slice the first 10 objects for plotting
		slicedData = list.slice(0, 10);

		console.log("slicedData: ",slicedData);

		// Reverse the array to accommodate Plotly's defaults
		reversedData = slicedData.reverse();

		console.log("reversedData: ",reversedData);

		// 5. Create your trace.
		var trace = {
			x: reversedData.map(object => object.samples),
	  		y: reversedData.map(object => object.id),
	  		text: reversedData.map(object => object.labels),
		  	type: "bar",
		  	orientation: 'h'
		};

		// 6. Create the data array for our plot
		var data = [trace];
		console.log("test: ",reversedData.map(object => object.labels))
		// 7. Define our plot layout
		var layout = {
		  title: "Samples for "+ currentvalue
		};

		// 8. Plot the chart to a div tag with id "bar-plot"
		Plotly.newPlot("bar", data, layout);


		var trace1 = {
			  x: testperson[0].otu_ids,
			  y: testperson[0].sample_values,
			  text: testperson[0].otu_labels,
			  mode: 'markers',
			  marker: {
			    size: testperson[0].sample_values,
			    color: testperson[0].otu_ids
			  }
			};

		var data1 = [trace1];

		var layout1 = {
			  xaxis: { title: "OTU ID" },
			  showlegend: false,
			  height: 600
			};

		Plotly.newPlot('bubble', data1, layout1);

		var ul = d3.select('#sample-metadata').append('ul');

		//Panel
		for (var key of Object.keys(metadata)) {
			ul.append('li').text(key + ": " + metadata[key]).style("font-size", "12px")
		};

	});
// Promise Pending
const dataPromise = d3.json(url);
console.log("Data Promise: ", dataPromise);
