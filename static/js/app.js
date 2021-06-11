// from data.js
var tableData = data;
console.log(tableData)



// YOUR CODE HERE!
function tabulate(data, columns) {
	//var table = d3.select('body').append('table')
	//var thead = table.append('thead')
	//var	tbody = table.append('tbody');

	var	tbody = d3.select('tbody')

	// append the header row
	//thead.append('tr')
	  //.selectAll('th')
	  //.data(columns).enter()
	  //.append('th')
	    //.text(function (column) { return column; });

	// create a row for each object in the data
	var rows = tbody.selectAll('tr')
	  .data(data)
	  .enter()
	  .append('tr');

	// create a cell in each row for each column
	var cells = rows.selectAll('td')
	  .data(function (row) {
	    return columns.map(function (column) {
	      return {column: column, value: row[column]};
	    });
	  })
	  .enter()
	  .append('td')
	    .text(function (d) { return d.value; });

  //return table;
}
d3.select("#filter-btn")
.on("click", buttonClick) ////// Why no parentheses here?

function buttonClick() {
	var selection = d3.select("#datetime").node().value
	console.log(selection.length);

	d3.select('tbody').html('')
	
	if( selection.length == 0 ) {
   		tabulate(data, ['datetime', 'city', 'state', 'country', 'shape', 'durationMinutes', 'comments']); 
	}
	var newData = data.filter(function (el)
	{
  		return el.datetime == selection
	});
	console.log(newData);
	tabulate(newData, ['datetime', 'city', 'state', 'country', 'shape', 'durationMinutes', 'comments']); 
}