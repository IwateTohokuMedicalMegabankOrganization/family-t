// 色計算クラス
class ColorIntensityCalculator extends RiskCalculatorBase {


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
				'is_alive' : "",
				'twin_status' : "",
				'health_history' : []
			};

		// リスクスコアの初期化
		this.score = {
			'is_alive' : 0,
			'twin_status' : 0,
			'health_history' : 0,
			'age_at_diagnosis' : 0
		};

		return;
	}

	// 計算可能か判定する
	isCalculatable(){
		return true;
	}

	// クライアント値をセット
	setClientValues(){

		this.clientValue.is_alive = this.pi.is_alive;

		this.clientValue.twin_status = this.pi.twin_status;

		this.clientValue.health_history = this.pi["Health History"];

		return;
	}

	// スコア計算
	calculateScore(){
		// 存命の値が「不明」でない +1
		this.score.is_alive = this._getIsPersonAliveScore(this.clientValue.is_person_alive);

		// この方は双子ですか？が選択されている +1
		this.score.twin_status = this._getTwinStatusScore(this.clientValue.twin_status);

		// 健康または病気の状態が「不明」でない +1
		this.score.health_history = this._getHealthHistoryScore(this.clientValue.health_history);

		// 選択された病気のすべての診断時の年齢が「不明」でない +1
		this.score.age_at_diagnosis = this._getAgeAtDiagScore(this.clientValue.health_history);

		return;
	}

	_getIsPersonAliveScore( is_alive ){

		if( !Boolean( is_alive ) ) return 0;

		if( is_alive == 'unknown' ) return 0;

		return 1;
	}
	
	_getTwinStatusScore( twin_status ){
		if( !Boolean( twin_status ) ) return 0;

		return 1;
	}

	_getHealthHistoryScore( health_history ){

		if( !Array.isArray( health_history ) ) return 0;

		if( health_history.length < 1 ) return 0;

		const unknownSnomedCodes = [
			'SNOMED_CT-261665006'
		];

		for (var i=0; i<health_history.length; i++) {
			if( unknownSnomedCodes.includes( health_history[i]['Disease Code'] )) return 0;
		}

		return 1;
	}

	_getAgeAtDiagScore( health_history ){
		
		if( !Array.isArray( health_history ) ) return 0;
		const unknownSnomedCodes = [
			'SNOMED_CT-261665006'
		];

		for (var i=0; i<health_history.length; i++) {
			if( !unknownSnomedCodes.includes( health_history[i]['Disease Code'] ) ){
				if( health_history[i]["Age At Diagnosis"] == "Unknown" ) return 0;
			}
		}

		return 1;

	}

	getOpacity(){
		return 0.20 + 0.80 * ( this.totalScore / 4 );
	}
}