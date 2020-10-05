// ライフスタイルスコア計算クラス
class LifeStyleScoreCalculator extends RiskCalculatorBase{
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
				// １．喫煙状況
				'isSmoker' : 0,
				// ２．BMI
				'bmi' : 0,
				// ３．運動状況
				'trainingFamily' : false,
				'trainingStrengthFamily' : '',
				'countForTrainingAtWeekFamily' : '',
				'timeForTrainingAtWeekFamily' : '',
				// ４．食習慣
				'dietary_frequency_to_eat_fruits_in_day' : '',
				'dietary_frequency_to_eat_vegetables_in_day' : '',
				'dietary_frequency_to_eat_nuts_in_week' : '',
				'dietary_frequency_to_eat_whole_grains_in_day' : '',
				'dietary_frequency_to_eat_fishes_in_week' : '',
				'dietary_frequency_to_eat_dairy_products_in_day' : '',
				'dietary_frequency_to_eat_processed_meat_in_week' : '',
				'dietary_frequency_to_eat_unprocessed_meat_in_week' : '',
				'dietary_frequency_to_drink_suger_drin_in_week' : '',
			};

		// リスクスコアの初期化
		this.score = {
				'smoker' : 0,
				'bmi' : 0,
				'trainingFamily' : 0,
				'dietary' : 0
			};

		return;
	}

	// 計算可能か判定する
	isCalculatable(){
		return true;
	}

	// クライアント値をセット
	setClientValues(){

		// １．喫煙状況
		// 過去に喫煙していても、現在喫煙していなければ、非喫煙に該当
		this.clientValue.isSmoker = ( this.pi.smoker == 5 );

		// ２．BMI
		this.clientValue.bmi = this.calculateBmi( this.pi.height, this.pi.weight );

		// ３．運動状況
		this.clientValue.trainingFamily = this.pi.training_family;
		this.clientValue.trainingStrengthFamily = this.pi.training_strength;
		this.clientValue.countForTrainingAtWeekFamily = this.pi.training_frequency_to_walk_in_week;
		this.clientValue.timeForTrainingAtWeekFamily = this.pi.training_time_for_training_at_week;

		// ４．食習慣
		this.clientValue.dietary_frequency_to_eat_fruits_in_day = this.pi.dietary_frequency_to_eat_fruits_in_day;
		this.clientValue.dietary_frequency_to_eat_vegetables_in_day = this.pi.dietary_frequency_to_eat_vegetables_in_day;
		this.clientValue.dietary_frequency_to_eat_nuts_in_week = this.pi.dietary_frequency_to_eat_nuts_in_week;
		this.clientValue.dietary_frequency_to_eat_whole_grains_in_day = this.pi.dietary_frequency_to_eat_whole_grains_in_day;
		this.clientValue.dietary_frequency_to_eat_fishes_in_week = this.pi.dietary_frequency_to_eat_fishes_in_week;
		this.clientValue.dietary_frequency_to_eat_dairy_products_in_day = this.pi.dietary_frequency_to_eat_dairy_products_in_day;
		this.clientValue.dietary_frequency_to_eat_processed_meat_in_week = this.pi.dietary_frequency_to_eat_processed_meat_in_week;
		this.clientValue.dietary_frequency_to_eat_unprocessed_meat_in_week = this.pi.dietary_frequency_to_eat_unprocessed_meat_in_week;
		this.clientValue.dietary_frequency_to_drink_suger_drin_in_week = this.pi.dietary_frequency_to_drink_suger_drin_in_week;

		return;
	}


	// スコア計算
	calculateScore(){

		// １．喫煙状況
		this.score.smoker = this.calculateSmokerScore(this.clientValue.isSmoker);

		// ２．BMI
		this.score.bmi = this.calculateBMIScore(this.clientValue.bmi);

		// ３．運動状況
		this.score.trainingFamily = this.calculateTraining(
				this.clientValue.trainingFamily
				, this.clientValue.trainingStrengthFamily
				, this.clientValue.countForTrainingAtWeekFamily
				, this.clientValue.timeForTrainingAtWeekFamily
				);

		// ４．食習慣
		this.score.dietary = this.calculateDietary(
			this.clientValue.dietary_frequency_to_eat_fruits_in_day
			, this.clientValue.dietary_frequency_to_eat_vegetables_in_day
			, this.clientValue.dietary_frequency_to_eat_nuts_in_week
			, this.clientValue.dietary_frequency_to_eat_whole_grains_in_day
			, this.clientValue.dietary_frequency_to_eat_fishes_in_week
			, this.clientValue.dietary_frequency_to_eat_dairy_products_in_day
			, this.clientValue.dietary_frequency_to_eat_processed_meat_in_week
			, this.clientValue.dietary_frequency_to_eat_unprocessed_meat_in_week
			, this.clientValue.dietary_frequency_to_drink_suger_drin_in_week
		);
	}

	// 喫煙によるスコアを計算する
	calculateSmokerScore( isSmoker ){
		// 非喫煙0点
		if( isSmoker ) return 0;
		// 非喫煙1点
		return 1;
	}

	// BMIによるスコアを計算する
	//  BMI 30未満 0点 1点
	calculateBMIScore( bmi ){
		if( bmi < 30 ) return 1;
		return 0;
	}

	// 週1回以上の定期的な運動によるスコアを計算する
	// 1) 一週間で、以下のいずれかを行っていたら1点
	// ・中等度の運動を150分以上
	// ・集中的（重度）な運動を75分以上
	calculateTraining(
			trainingFamily
			,trainingStrengthFamily
			,countForTrainingAtWeekFamily
			,timeForTrainingAtWeekFamily
	) {
		// ・中等度の運動を150分以上
		if( trainingStrengthFamily == '中程度' ){
			if( timeForTrainingAtWeekFamily >= 150 )
				return 1;
		}
		// ・集中的（重度）な運動を75分以上
		if( trainingStrengthFamily == '重度' ){
			if( timeForTrainingAtWeekFamily >= 75 )
				return 1;
		}
		return 0;
	}

	//	2) 以下を4項目以上満たしていたら1点
	//	・果物を毎日に3品目以上
	//	・野菜を毎日に3品目以上
	//	・ナッツ類を週に1品目以上
	//	・全粒穀物を毎日に3品目以上
	//	・魚を週に2品目以上
	//	・乳製品を毎日2～3品目
	//	・加工肉を週に1品目以下
	//	・非加工の赤身肉を週に1～2品目以下
	//	・砂糖入り飲料を週に1品目以下
	calculateDietary(
			  dietary_frequency_to_eat_fruits_in_day
			, dietary_frequency_to_eat_vegetables_in_day
			, dietary_frequency_to_eat_nuts_in_week
			, dietary_frequency_to_eat_whole_grains_in_day
			, dietary_frequency_to_eat_fishes_in_week
			, dietary_frequency_to_eat_dairy_products_in_day
			, dietary_frequency_to_eat_processed_meat_in_week
			, dietary_frequency_to_eat_unprocessed_meat_in_week
			, dietary_frequency_to_drink_suger_drin_in_week
	){
		var point = 0;

		//	・果物を毎日に3品目以上
		if(typeof dietary_frequency_to_eat_fruits_in_day != 'undefined'){
			if( dietary_frequency_to_eat_fruits_in_day == true
				|| dietary_frequency_to_eat_fruits_in_day == "true"
			){
				point ++;
			}
		}

		//	・野菜を毎日に3品目以上
		if(typeof dietary_frequency_to_eat_vegetables_in_day != 'undefined'){
			if( dietary_frequency_to_eat_vegetables_in_day == '3times'){
				point ++;
			}
		}

		//	・ナッツ類を週に1品目以上
		if(typeof dietary_frequency_to_eat_nuts_in_week != 'undefined'){
			if( dietary_frequency_to_eat_nuts_in_week == '5times' ){
				point ++;
			}
		}

		//	・全粒穀物を毎日に3品目以上
		if(typeof dietary_frequency_to_eat_whole_grains_in_day != 'undefined'){
			if( dietary_frequency_to_eat_whole_grains_in_day == true
				|| dietary_frequency_to_eat_whole_grains_in_day == "true"
			){
				point ++;
			}
		}

		//	・魚を週に2品目以上
		if(typeof dietary_frequency_to_eat_fishes_in_week != 'undefined'){
			if( dietary_frequency_to_eat_fishes_in_week == true
				||  dietary_frequency_to_eat_fishes_in_week == "true"
			){
				point ++;
			}
		}

		//	・乳製品を毎日2～3品目
		if(typeof dietary_frequency_to_eat_dairy_products_in_day != 'undefined'){
			if( dietary_frequency_to_eat_dairy_products_in_day == true
				|| dietary_frequency_to_eat_dairy_products_in_day == "true"
			){
				point ++;
			}
		}

		//	・加工肉を週に1品目以下
		if(typeof dietary_frequency_to_eat_processed_meat_in_week != 'undefined'){
			if( dietary_frequency_to_eat_processed_meat_in_week == true
				|| dietary_frequency_to_eat_processed_meat_in_week == "true"
			){
				point ++;
			}
		}

		//	・非加工の赤身肉を週に1～2品目以下
		if(typeof dietary_frequency_to_eat_unprocessed_meat_in_week != 'undefined'){
			if( dietary_frequency_to_eat_unprocessed_meat_in_week == true
				|| dietary_frequency_to_eat_unprocessed_meat_in_week == "true"
			){
				point ++;
			}
		}

		//	・砂糖入り飲料を週に1品目以下
		if(typeof dietary_frequency_to_drink_suger_drin_in_week != 'undefined'){
			if( dietary_frequency_to_drink_suger_drin_in_week == true
				|| dietary_frequency_to_drink_suger_drin_in_week == "true"
			){
				point ++;
			}
		}

		// 4項目以上満たしていたら1点
		return (point > 3)? 1 : 0;
	}
	// ライフスタイルスコアが計算可能か
	// 可能:TRUE , 不能:FALSE
	canBeDetermineLifeStyleScore (){
		return this.canBeDetermineScore();
	}

	canBeDetermineScore(){
		var ret = true;

		var validatedEntries = this.getValidatedEntries();

		// 一つでも入力されていない項目があればfalse
		Object.keys(validatedEntries).forEach(function( entry ){
			if( validatedEntries[ entry ] == false ) ret = false;
		});

		return ret;
	}

	// 入力有無を取得する
	getValidatedEntries(){
		var ret = {
				// 身長
				"height" : false,
				// 体重
				"weight" : false,
				// 喫煙
				"smoker" : false,
				// 運動状況（定期的）
				"training_strength" : false,
				// 運動状況（時間）
				"training_time_for_training_at_week" : false
		};

		// 身長
		ret.height = !(this.pi.height == "" || this.pi.height == 0);

		// 体重
		ret.weight = !(this.pi.weight == "");

		// 喫煙
		ret.smoker = !(typeof this.pi.smoker == "undefined" );

		// 運動状況
		ret.training_strength = !(typeof this.pi.training_strength  == "undefined"
								|| this.pi.training_strength == "" );

		// 運動状況（時間）
		ret.training_time_for_training_at_week = !(typeof this.pi.training_time_for_training_at_week  == "undefined"
												|| this.pi.training_time_for_training_at_week == "" );

		return ret;
	}

	// 入力有無検証
	lifestyle_checkNecessaryItems() {
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

		// 運動状況
		if(typeof this.pi.training_strength  == "undefined" ||
				this.pi.training_strength == "" ){
			cond = false;
		}
		if(typeof this.pi.training_time_for_training_at_week  == "undefined" ||
				this.pi.training_time_for_training_at_week == "" ){
			cond = false;
		}

		return cond;
	}
}

function showLifeStyleScore(){
	var calculator = new LifeStyleScoreCalculator( personal_information );

	if( !calculator.lifestyle_checkNecessaryItems() ){
		$("#lifestyle_ok_mode").hide();
		$("#lifestyle_ng_mode").hide();
		$("#lifestyle_calc_ng").show();
	} else {

		$('#risk_range_lifestyle').text(calculator.getRiskRange());
		$('#risk_parcentile_lifestyle').text(calculator.getRiskPercentile());
		$('#risk_image_lifestyle').attr('src', calculator.getColorImagePatternPath());
	}

	return calculator;
}
