// this function use to access the internal html contents
function ajaxOnBackground(url){
    $.ajax({
        url: url, //アクセスするURL
        type: 'get',     //post or get
        cache: false,          //cacheを使うか使わないかを設定
    })
    .done(function(response) { 
        //通信成功時の処理
        //成功したとき実行したいスクリプトを記載
        console.log('----------------------------------------------------------------------------------------------');
        console.log('Ajax is successed!');
        console.log(response);
        console.log('----------------------------------------------------------------------------------------------');
    })
    .fail(function(xhr) {  
        //通信失敗時の処理
        //失敗したときに実行したいスクリプトを記載
        console.log('----------------------------------------------------------------------------------------------');
        console.log('Ajax is error!');
        console.log('----------------------------------------------------------------------------------------------');
    })
    .always(function(xhr, msg) { 
        //通信完了時の処理
        //結果に関わらず実行したいスクリプトを記載
    });   
}