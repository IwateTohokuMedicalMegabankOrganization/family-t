export default function bind_help() {
  // family_main_contents_area

  // 本人入力画面 BMI
  bind_help_button_action( 'bmi' );

  return 'bind!';
}

function bind_help_button_action( prefix ){

	$("#" + prefix + "-help_dialog").dialog({
		title: 'test',
		position:['middle',0],
		autoOpen: false,
		height:'auto',
		width:600
	});

  $("." + prefix + "-help").on("click", function() {
    $("#" + prefix + "-help_dialog").dialog("open");

    // 閉じるボタン
    $('.closeHelpDialogButton').on('click', function(){
      $(".help_dialog").dialog('close');
    });
  });
}