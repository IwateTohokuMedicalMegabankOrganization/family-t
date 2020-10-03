
function saveToServer(){
	$("#save_personal_history_dialog" ).dialog( "open" );

	if( created_datetime === null ){
		$('#createdDate').val( getNowDate() );
		$('#createdTime').val( getNowTime() );
	}else{
		$('#createdDate').val( created_datetime.substr(0,10) );
		$('#createdTime').val( created_datetime.substr(11,10) );
	}

	$('#updatedDate').val( getNowDate() );
	$('#updatedTime').val( getNowTime() );
}

function saveToServerPost(){
		$('#personal_information_text').val(JSON.stringify(personal_information));


		$.post("../../operation/save"
				, $('#personal_information_form').serialize() )
				.done(function(data, textStatus, jqXHR){
					if( data == 'true' ) {
						// ここをモーダルからモードレス表示に変更。
						Materialize.toast('family-tサーバに保存しました。', 6000, 'rounded') // 'rounded' is the class I'm applying to the toast
//						alert('family-tサーバに保存しました。');
						$("#save_personal_history_dialog").dialog("close");
						loadOldList();
					}else{
						alert('family-tサーバへの保存に失敗しました。\n' + textStatus);
						$("#save_personal_history_dialog").dialog("close");
					}
				})
				.fail(function(jqXHR, textStatus, errorThrown){
					alert('family-tサーバへの保存に失敗しました。\n code: ' + jqXHR.status + '\n status: ' + textStatus + '\n error: ' + errorThrown);
					$("#save_personal_history_dialog").dialog("close");
				});
}

function saveToServerWithDate( createdDatetime,  updatedDatetime){
	$('#created_timestamp').val( createdDatetime );
	$('#updated_timestamp').val( updatedDatetime );
	saveToServerPost();
}

$(function(){
	$('#saveToServer').on('click', function(){
		saveToServer();
	});

	$('#savePersonalInfoToServerButton').on('click', function(){
		saveToServerWithDate(
			$('#createdDate').val() + " " + $('#createdTime').val()
			,$('#updatedDate').val() + " " + $('#updatedTime').val()
		);
	});

	$('#savePersonalInfoToServerCancelButton').on('click', function(){
		$("#save_personal_history_dialog" ).dialog("close");
	});

	loadOldList();

	$('#selectedCreatedDatetime').on('change', function(){
		_setCreated_timestamp();
	});
});

function _setCreated_timestamp(){
	personal_informations.forEach( function( v ){
		if( v.formedCreated_timestamp === $('#selectedCreatedDatetime').val() ){
			personal_information = JSON.parse(v.personal_information);
			$('#created_timestamp').val(v.formedCreated_timestamp);
			created_datetime = $('#selectedCreatedDatetime').val();
			build_family_history_data_table();
			return ;
		}
	});
}

var personal_informations = null;
function loadOldList(){
	$.get("../../operation/loadList")
		.done(function(data, textStatus, jqXHR){
			if( data === jqXHR.responseJSON ){
				$('#selectedCreatedDatetime').empty();
				data['results'].forEach(function ( result ){
					$('#selectedCreatedDatetime').append( '<option value="' + result.formedCreated_timestamp + '">' + result.formedCreated_timestamp + '</option>' );
				});
				personal_informations = data['results'];

				if( created_datetime == null ){
					created_datetime = $('#selectedCreatedDatetime').val();
					$('#created_timestamp').val($('#selectedCreatedDatetime').val());
				}

			}else{
				console.log( data );
			}
		})
		.fail(function(){
			console.log( 'load old list failure.')
		});
}