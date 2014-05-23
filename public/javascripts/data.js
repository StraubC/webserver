$(document).ready(function(){
	// Tabelle anzeigen bei pageload
	showAllFunc();

	$('#showAll').click(function(){

	    $("#showAllBox").show(500);
	    $("#searchBox").hide(500);
	    $("#insertBox").hide(500);
	    showAllFunc();
	});

	$('#search').click(function(){

	    $("#showAllBox").hide(500);
	    $("#searchBox").show(500);
	    $("#insertBox").hide(500);
	});

	$('#insert').click(function(){

	    $("#showAllBox").hide(500);
	    $("#searchBox").hide(500);
	    $("#insertBox").show(500);
	});

	$("#searchForm").submit(function( event ) {
		var searchName = $('#searchName').val();
		//var searchName = 'dfg';
		var getString = '/data/byName/'+ searchName;
		var searchResult ='';

		$.getJSON(getString, function(data){
			searchResult += '<table class="centerTable"><th>Name</th><th>Wert 1</th>';
			$.each(data, function(){
				searchResult += '<tr>';
				searchResult += '<td>' + this.name + '</td>';
				searchResult += '<td>' + this.value1 + '</td>';
				searchResult += '</tr>';	
			});
			searchResult += '</table>';
			$('#searchResultBox').html(searchResult);
		
		});
		event.preventDefault();	
	});
});

function showAllFunc(){
	var showAllHtml = '';

	$.getJSON('/data', function(data){
		showAllHtml += '<table class="centerTable"><th>Name</th><th>Wert 1</th>';
		$.each(data, function(){
			showAllHtml += '<tr>';
			showAllHtml += '<td>' + this.name + '</td>';
			showAllHtml += '<td>' + this.value1 + '</td>';
			showAllHtml += '</tr>';
		});
		showAllHtml += '</table>';
		$('#showAllBox').html(showAllHtml);
	});
}
