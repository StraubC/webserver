$(document).ready(function(){
	// Tabelle anzeigen bei pageload
	showAllFunc();

	$('#showAll').click(function(){

	    $("#showAllBox").show(500);
	    $("#searchBox").hide(500);
	    $("#insertBox").hide(500);
	    $("#editBox").hide(500);
	    showAllFunc();
	});

	$('#search').click(function(){

	    $("#showAllBox").hide(500);
	    $("#searchBox").show(500);
	    $("#insertBox").hide(500);
	    $("#editBox").hide(500);
	});

	$('#insert').click(function(){

	    $("#showAllBox").hide(500);
	    $("#searchBox").hide(500);
	    $("#insertBox").show(500);
	    $("#editBox").hide(500);
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
				searchResult += '<td><div class="Button_small" id="' + this._id + '">bearbeiten</div></td>';
				searchResult += '</tr>';	
			});
			searchResult += '</table>';
			$('#searchResultBox').html(searchResult);
		
		});
		event.preventDefault();	
	});

	$("body").on('click', '.Button_small', function(){
		var id = $(this).attr('id');

		$("#editBox").show(500);
		$("#updateId").val(id);
		$("#deleteId").val(id);
		//$("#editBox").html(id);

	});

	$("#updateForm").submit(function( event ) {
		var updateName = $('#updateName').val();
		var updateValue1 = $('#updateValue1').val();
		var updateId = $('#updateId').val();
		$("#updateForm").attr("action", "/data/:" + updateId);
		
	});

	$("#deleteForm").submit(function( event ) {
		event.preventDefault();
		var deleteId = $('#deleteId').val();
		//$("#deleteForm").attr("action", "/data/:" + deleteId);
		$.ajax({   
			url: '/data/:' + deleteId,
			type: 'DELETE',
			success: function(data) { 
				location.reload();
			}
		});
		
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
			showAllHtml += '<td><div class="Button_small" id="' + this._id + '">bearbeiten</div></td>';
			showAllHtml += '</tr>';
		});
		showAllHtml += '</table>';
		$('#showAllBox').html(showAllHtml);
	});
}
