function openDialog(dialog){
	// hidden background html
	$('.container').hide();
	
	$(dialog).dialog('open');
}

function openDialog(dialog, position){
	// hidden background html
	$('.container').hide();
	
	$(dialog).dialog('open').position(position);
}

function closeDialog(dialog){
	$(dialog).dialog('close');

	// show background html
	$('.container').show();

	// reset scrollbar
	window.scroll({
		top: 0,
		behavior: "smooth"
	  });
}