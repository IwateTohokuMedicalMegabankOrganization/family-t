// リスク計算基底クラス
class RiskCalculatorBase {

	// コンストラクタ
	constructor( pi )
	{
		// 初期化
		this.initialize();

		// PIの格納
		this.pi = pi;

		// リスクスコアを計算
		this.totalScore = this.getScore();
	}

	// リスクスコアを計算
	getScore(){

		// クライアント値をセット
		this.setClientValues();

		// スコアを計算
		this.calculateScore();

		return this.calculateTotal();
	}

	// スコア合計の計算
	calculateTotal(){
		var totalScore = 0;
		for ( var key in this.score ) {
			if( typeof this.score[ key ] == "undefined" ) continue;
			totalScore += this.score[ key ];
		}
		return totalScore;
	}

	// 以下、abstructメソッド。サブクラスで実装する

	// 初期化
	initialize(){
		// clientValueの初期化
		this.clientValue = {};

		// リスクスコアの初期化
		this.score = {};

		// リスクスコア合計の初期化
		this.toatalScore = 0;
	}

	// 計算可能か判定する
	isCalculatable(){
		throw new Error('function is not implemented.')
	}

	// クライアント値をセット
	setClientValues(){
		throw new Error('function is not implemented.')
	}

	// スコア計算
	calculateScore(){
		throw new Error('function is not implemented.')
	}

	// 年齢の計算
	calculateAge(pi) {

		var date = new Date;

		var currentYear = date.getFullYear();
		var currentMonth = date.getMonth()+1;
		var currentDay = date.getDate();

		var birthYear = currentYear;
		var birthMonth = currentMonth;
		var birthDay = currentDay;

		if(typeof pi.date_of_birth != "undefined"){
			if(pi.date_of_birth.length == 10){
				birthYear = pi.date_of_birth.substr(0,4);
				birthMonth = pi.date_of_birth.substr(5,2);
				birthDay = pi.date_of_birth.substr(9,2);
			}
		}

		var yob;
		if (pi.date_of_birth) yob = birthYear;
		else yob = currentYear;
		var age =  parseInt(currentYear) - parseInt(yob);

		if (currentMonth < birthMonth) age--;
		else if (currentMonth == birthMonth && currentDay < birthDay) age--;

		return age;
	}

	// BMIの計算
	calculateBmi( height_meters, weight_kg ){
		return (10000.0 * weight_kg/(height_meters*height_meters)).toFixed(1);
	}
}

// 脳卒中リスク計算クラス
class StrokeRiskCalculator extends RiskCalculatorBase{
	// コンストラクタ
	constructor( pi )
	{
		super(pi);
	}

	// 初期化
	initialize(){

		super.initialize();

		// clientValueの初期化
		this.clientValue = {
				'age' : 0,
				'gender' : 0,
				'isSmoker' : 0,
				'bmi' : 0,
				'take_hypoglycemic' : false,
				'take_antihypertensive': false,
				'systolic_blood_pressure' : 'under_119',
				'diastolic_blood_pressure' : '79_or_less',
				'hasDiabetes' : false,
				'hasStroke' : false
			};

		// リスクスコアの初期化
		this.score = {
				'age' : 0,
				'gender' : 0,
				'isSmoker' : 0,
				'bmi' : 0,
				'blood_pressure' : 0,
				'diabetes' : 0
			};

		return;
	}

	// 計算可能か判定する
	isCalculatable(){

		return true;
	}

	// クライアント値をセット
	setClientValues(){

		// 年齢
		this.clientValue.age = this.calculateAge(this.pi);

		// 性別
		this.clientValue.gender = this.pi.gender;

		// 喫煙有無
//		this.clientValue.isSmoker = ( this.pi.smoker != 1 );
		this.clientValue.isSmoker = ( this.pi.smoker == 5 );

		// BMI
		this.clientValue.bmi = this.calculateBmi( this.pi.height, this.pi.weight );

		// 血圧
//		this.clientValue.take_hypoglycemic = this.pi.take_hypoglycemic;
		this.clientValue.take_antihypertensive = (  this.pi.take_antihypertensive == true || this.pi.take_antihypertensive == "true" );
		this.clientValue.systolic_blood_pressure  = this.pi.systolic_blood_pressure;
		this.clientValue.diastolic_blood_pressure = this.pi.diastolic_blood_pressure;

		// 糖尿病
		this.clientValue.take_hypoglycemic = (  this.pi.take_hypoglycemic == true || this.pi.take_hypoglycemic == "true" );
		this.clientValue.hasDiabetes = this.hasDiabetes( this.pi["Health History"], this.pi.fasting_blood_glucose_lebel, this.pi.occasionally_blood_glucose_lebel, this.pi.ogtt_blood_glucose_lebel, this.clientValue.take_hypoglycemic );

		// リスク計算可否
		this.clientValue.hasStroke = this.hasStroke( this.pi["Health History"] );
		//this.clientValue.riskCalcNGFlg = this.riskCalcNGFlg( this.clientValue.age, this.clientValue.hasStroke );
		//this.clientValue.stroke_checkNecessaryItems = this.stroke_checkNecessaryItems();

		return;
	}

	// 糖尿病疾患の有無を確認
	hasDiabetes( h, fasting_blood_glucose_lebel, occasionally_blood_glucose_lebel, ogtt_blood_glucose_lebel, take_hypoglycemic ){

		if( typeof h == "undefined") return false;
		// 既往歴に糖尿病疾患がある場合は糖尿病として扱う
		const diabatesSnomedCodes = [
			'SNOMED_CT-73211009',
			'SNOMED_CT-11687002',
			'SNOMED_CT-82141001',
			'SNOMED_CT-9414007',
			'SNOMED_CT-32284009',
			'SNOMED_CT-472972006',
			'SNOMED_CT-PREDIABE',
			'SNOMED_CT-46635009',
			'SNOMED_CT-44054006',
			'SNOMED_CT-OTDIABET',
			'SNOMED_CT-UNDIABET'
		];

		for (var i=0; i<h.length; i++) {
			if( diabatesSnomedCodes.includes( h[i]['Disease Code'] )) return true;
		}

		// 服薬がある場合は糖尿病あり
		if( take_hypoglycemic ) return true;

		// 空腹時血糖値「126以上」は糖尿病あり
		if( fasting_blood_glucose_lebel == "over126" ) return true;

		// 随時血糖値「200以上」は糖尿病あり
		if( occasionally_blood_glucose_lebel == "over200" ) return true;

		// 75g経口糖負荷「200以上」は糖尿病あり
		if( ogtt_blood_glucose_lebel == "over200" ) return true;



		return false;
	}

	// 脳卒中疾患の有無を確認
	hasStroke( h ){


		if( typeof h == "undefined" ) return false;
		const strokeSnomedCodes = [
			'SNOMED_CT-116288000',
			'SNOMED_CT-230690007',
			'SNOMED_CT-413758000',
			'SNOMED_CT-274100004'
		];

		for (var i=0; i<h.length; i++) {
			if( strokeSnomedCodes.includes( h[i]['Disease Code'] )) return true;
		}

		return false;
	}

	// スコア計算
	calculateScore(){

		// 年齢
		this.score.age = this.calculateAgeScore(this.clientValue.age);

		// 性別
		this.score.gender = this.calculateGenderScore(this.clientValue.gender);

		// 喫煙有無
		this.score.isSmoker = this.calculateSmokerScore(this.clientValue.isSmoker, this.clientValue.gender);

		// BMI
		this.score.bmi = this.calculateBMIScore(this.clientValue.bmi);

		// 血圧
		this.score.blood_pressure = this.calculateBloodPressureScore(this.clientValue.take_antihypertensive, this.clientValue.systolic_blood_pressure, this.clientValue.diastolic_blood_pressure);

		// 糖尿病
		this.score.diabetes = this.calculateDiabetesScore(this.clientValue.hasDiabetes);

	}

	// 年齢によるリスクスコアを計算する
	calculateAgeScore( age ){

		if( age < 45 ) return 0;
		if( 45 <= age && age < 50 ) return 5;
		if( 50 <= age && age  < 55 ) return 6;
		if( 55 <= age && age < 60 ) return 12;
		if( 60 <= age && age < 65 ) return 16;
		if( 65 <= age && age < 70 ) return 19;

		return 0;
	}

	// 性別によるリスクスコアを計算する
	calculateGenderScore( gender ){

		if( gender == 'MALE') return 6;

		return 0;
	}

	// 喫煙有無によるリスクスコアを計算する
	calculateSmokerScore( isSmoker , gender ) {

		if( !isSmoker ) return 0;

		if( gender == 'MALE' ) return 4;

		return 8;
	}

	// BMIによるリスクスコアを計算する
	// 25 未満： 0点、 25 以上 30 未満： 2点、 30 以上： 3点
	calculateBMIScore( bmi ){
		if( bmi < 25 ) return 0;
		if( 25 <= bmi && bmi < 30 ) return 2;
		if( 30 <= bmi ) return 3;
	}

	// 血圧によるリスクスコアを計算する
	// 降圧剤服用の有無で場合わけ
	//No antihypertensive medication
	//<120/80 0
	//120–129/80–84 3
	//130–139/85–89 6
	//140–159/90–99 8
	//160–179/100–109 11
	//>180–/110 13
	//On antihypertensive medication
	//<120/80 10
	//120–129/80–84 10
	//130–139/85–89 10
	//140–159/90–99 11
	//160–179/100–109 11
	//>180–/110 15
	calculateBloodPressureScore( take_antihypertensive, systolic_blood_pressure, diastolic_blood_pressure ){

		// 服用していない場合
		if( !take_antihypertensive ) {
			if( systolic_blood_pressure == 'over180' || diastolic_blood_pressure == 'over110' ) return 13;
			if( systolic_blood_pressure == '160-179' || diastolic_blood_pressure == '100-109' ) return 11;
			if( systolic_blood_pressure == '140-159' || diastolic_blood_pressure == '90-99' ) return 8;
			if( systolic_blood_pressure == '130-139' || diastolic_blood_pressure == '85-89' ) return 6;
			if( systolic_blood_pressure == '120-129' || diastolic_blood_pressure == '80-84' ) return 3;
			if( systolic_blood_pressure == 'under_119' || diastolic_blood_pressure == '79_or_less' ) return 0;
		}

		// 服用している場合
		if( systolic_blood_pressure == 'over180' || diastolic_blood_pressure == 'over110' ) return 15;
		if( systolic_blood_pressure == '160-179' || diastolic_blood_pressure == '100-109' ) return 11;
		if( systolic_blood_pressure == '140-159' || diastolic_blood_pressure == '90-99' ) return 11;
		if( systolic_blood_pressure == '130-139' || diastolic_blood_pressure == '85-89' ) return 10;
		if( systolic_blood_pressure == '120-129' || diastolic_blood_pressure == '80-84' ) return 10;
		if( systolic_blood_pressure == 'under_119' || diastolic_blood_pressure == '79_or_less' ) return 10;
	}

	// 糖尿病（あり： 7点、なし： 0点）
	calculateDiabetesScore( hasDiabetes ){
		if( hasDiabetes ) return 7;
		return 0;
	}

	// リスク計算可否判定
	riskCalcNGFlg() {
		if(this.clientValue.age < 40 || this.clientValue.age >= 70){
			return true;
		}
		if( this.clientValue.hasStroke ){
			return true;
		}
		return false;
	}

	// 糖尿病・糖尿病型判定が可能か
	// 可能:TRUE , 不能:false
	canBeDetermineDiabate(){

		// 服薬している場合は糖尿病と判定できる
		if( this.pi.take_hypoglycemic == "true" ) return true;
		if( this.pi.take_hypoglycemic == true ) return true;

		// 空腹時血糖値のうち、「わからない」「検査していない」以外が選択されている場合は判定できる
		if(
			// 選択されていない
			( typeof this.pi.fasting_blood_glucose_lebel != "undefined" )
			// わからない
			&& ( this.pi.fasting_blood_glucose_lebel != "unknown" )
			// 検査していない
			&& ( this.pi.fasting_blood_glucose_lebel != "not_inspected" )
			// 「選択してください」が選ばれている
			&& ( this.pi.fasting_blood_glucose_lebel != "" )
			// 選択されていない（disabled）
			&& ( this.pi.fasting_blood_glucose_lebel != null )
		) return true;


		// 随時血糖値のうち、「わからない」「検査していない」以外が選択されている場合は判定できる
		if(
			// 選択されていない
			( typeof this.pi.occasionally_blood_glucose_lebel != "undefined" )
			// わからない
			&& ( this.pi.occasionally_blood_glucose_lebel != "unknown" )
			// 検査していない
			&& ( this.pi.occasionally_blood_glucose_lebel != "not_inspected" )
			// 「選択してください」が選ばれている
			&& ( this.pi.occasionally_blood_glucose_lebel != "" )
			// 選択されていない（disabled）
			&& ( this.pi.occasionally_blood_glucose_lebel != null )
		) return true;

		// OGTTのうち、「わからない」「検査していない」以外が選択されている場合は判定できる
		if(
			// 選択されていない
			( typeof this.pi.ogtt_blood_glucose_lebel != "undefined" )
			// わからない
			&& ( this.pi.ogtt_blood_glucose_lebel != "unknown" )
			// 検査していない
			&& ( this.pi.ogtt_blood_glucose_lebel != "not_inspected" )
			// 「選択してください」が選ばれている
			&& ( this.pi.ogtt_blood_glucose_lebel != "" )
			// 選択されていない（disabled）
			&& ( this.pi.ogtt_blood_glucose_lebel != null )
		) return true;

		// HbA1cのうち、「わからない」「検査していない」以外が選択されている場合は判定できる
		if(
			// 選択されていない
			( typeof this.pi.hba1c != "undefined" )
			// わからない
			&& ( this.pi.hba1c != "unknown" )
			// 検査していない
			&& ( this.pi.hba1c != "not_inspected" )
			// 「選択してください」が選ばれている
			&& ( this.pi.hba1c != "" )
			// 選択されていない（disabled）
			&& ( this.pi.hba1c != null )
		) return true;

		return false;
	}


	// 入力有無検証
	stroke_checkNecessaryItems() {
		var cond = true;

		// 身長
		if(this.pi.height == "" || this.pi.height == 0){
			cond = false;
		}

		// 体重
		if(this.pi.weight == ""){
			cond = false;
		}

		// 喫煙
		if(typeof this.pi.smoker == "undefined" ||
				(this.pi.smoker == "5" && typeof this.pi.number_of_cigarettes_per_day == "undefined") ){
			cond = false;
		}

		// 降圧剤
		if(typeof this.pi.take_antihypertensive == "undefined"){
			cond = false;
		}

		// 糖尿病・糖尿病型
		if( !this.canBeDetermineDiabate() ){
			cond = false;
		}

		return cond;
	}

	// 性別と年齢によるカラーバー画像パターンを求める
	getColorImagePatternPrefix(){

		// 男性の場合
		if( this.clientValue.gender == 'MALE'){
			if( this.clientValue.age < 45 ) return 'pattern1';
			if( this.clientValue.age < 50 ) return 'pattern2';
			if( this.clientValue.age < 55 ) return 'pattern2';
			if( this.clientValue.age < 60 ) return 'pattern3';
			if( this.clientValue.age < 65 ) return 'pattern3';
			if( this.clientValue.age < 70 ) return 'pattern4';
			return 'pattern4';
		}

		// 女性の場合
		if( this.clientValue.age < 45 ) return 'pattern5';
		if( this.clientValue.age < 50 ) return 'pattern6';
		if( this.clientValue.age < 55 ) return 'pattern6';
		if( this.clientValue.age < 60 ) return 'pattern7';
		if( this.clientValue.age < 65 ) return 'pattern7';
		if( this.clientValue.age < 70 ) return 'pattern3';
		return 'pattern3';
	}

	// スコアによるカラーバー画像パターンを求める
	getColorImagePatternSuffix(){

		if( this.totalScore < 11 ) return 'score0-10.png';
		if( this.totalScore < 18 ) return 'score11-17.png';
		if( this.totalScore < 23 ) return 'score18-22.png';
		if( this.totalScore < 26 ) return 'score23-25.png';
		if( this.totalScore < 28 ) return 'score26-27.png';
		if( this.totalScore < 30 ) return 'score28-29.png';
		if( this.totalScore < 31 ) return 'score30.png';
		if( this.totalScore < 33 ) return 'score31-32.png';
		if( this.totalScore < 34 ) return 'score33.png';
		if( this.totalScore < 35 ) return 'score34.png';
		if( this.totalScore < 37 ) return 'score35-36.png';
		if( this.totalScore < 40 ) return 'score37-39.png';
		if( this.totalScore < 43 ) return 'score40-42.png';
		return 'score43.png';
	}

	// 同性、同年代の発症率を求める
	getRiskRange(){

		var dicPatternRange = {
			'pattern1': $.t("family-t_risk_range.pattern1"),
			'pattern2': $.t("family-t_risk_range.pattern2"),
			'pattern3': $.t("family-t_risk_range.pattern3"),
			'pattern4': $.t("family-t_risk_range.pattern4"),
			'pattern5': $.t("family-t_risk_range.pattern5"),
			'pattern6': $.t("family-t_risk_range.pattern6"),
			'pattern7': $.t("family-t_risk_range.pattern7")
		};

		return dicPatternRange[this.getColorImagePatternPrefix()];
	}

	// リスクスコアによる予想リスクを求める
	getRiskPercentile(){
		if( this.totalScore < 11 ) return '1%未満';
		if( this.totalScore < 18 ) return '1 - 2%';
		if( this.totalScore < 23 ) return '2 - 3%';
		if( this.totalScore < 26 ) return '3 - 4%';
		if( this.totalScore < 28 ) return '4 - 5%';
		if( this.totalScore < 30 ) return '5 - 6%';
		if( this.totalScore < 31 ) return '6 - 7%';
		if( this.totalScore < 33 ) return '7 - 8%';
		if( this.totalScore < 34 ) return '8 - 9%';
		if( this.totalScore < 35 ) return '9 - 10%';
		if( this.totalScore < 37 ) return '10 - 12%';
		if( this.totalScore < 40 ) return '12 - 15%';
		if( this.totalScore < 43 ) return '15 - 20%';
		return '20%以上';
	}

	// 画像ファイルパス
	getColorImagePatternPath(){
		return '../risk/result_image/stroke/' + this.getColorImagePatternPrefix() + '_' + this.getColorImagePatternSuffix();
	}
}

function showStrokeRisk(){
	var calculator = new StrokeRiskCalculator( personal_information );

	if( !calculator.stroke_checkNecessaryItems() ){
		$("#stroke_ok_mode").hide();
		$("#stroke_ng_mode").hide();
		$("#stroke_calc_ng").show();
	} else {

		$('#risk_range_stroke').text(calculator.getRiskRange());
		$('#risk_parcentile_stroke').text(calculator.getRiskPercentile());
		$('#risk_image_stroke').attr('src', calculator.getColorImagePatternPath());

		if( calculator.riskCalcNGFlg() ){
			$('#stroke_ok_mode').hide();
			$('#stroke_ng_mode').show();
			$("#stroke_calc_ng").hide();
		} else {
			$('#stroke_ok_mode').show();
			$('#stroke_ng_mode').hide();
			$("#stroke_calc_ng").hide();
		}
	}

	return calculator;
}
