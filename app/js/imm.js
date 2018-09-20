
$(document).ready(function() {
	$('#languageSelect').hide();
	$('div[data-i18n="fhh_index.talking"]').after('<br>自ら（<u><b>I</b></u>）集めた、家族の健康に関する情報（<u><b>M</b></u>y family Health History）を、家族や自分のため（for <u><b>M</b></u>e）に活用してください');
	$('a[data-i18n="fhh_index.accessability"]').attr('href','http://iwate-megabank.org/')
		.attr('target','_blank');
	$('a[href="https://www.nih.gov/"]').remove();
	$('.footerTdLogos').remove();
	$('title').text('IMM Portrait');

});

