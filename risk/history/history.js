// 家族歴の質計算クラス
class QualityOfFamilyHistoryCalculator extends RiskCalculatorBase{
	// コンストラクタ
	constructor( pi )
	{
		super(pi);
	}

	// 初期化
	initialize(){

		super.initialize();

		this.relations_list = [
			'brother'
			,'sister'
			,'son'
			,'daughter'
			,'niece'
			,'nephew'
			,'paternal_uncle'
			,'paternal_aunt'
			,'maternal_uncle'
			,'maternal_aunt'
			,'paternal_grandfather'
			,'paternal_grandmother'
			,'maternal_grandfather'
			,'maternal_grandmother'
			,'paternal_cousin'
			,'paternal_halfbrother'
			,'paternal_halfsister'
			,'maternal_cousin'
			,'maternal_halfbrother'
			,'maternal_halfsister'
			,'grandson'
			,'granddaughter'
			,'father'
			,'mother'
			];

		// clientValueの初期化
		this.clientValue = {
				// 全家系構成人数（本人は含まない）
				'numberOfFamily' : 0,

				// 病名の記入がある家系構成員数
				'numberOfDisease' : 0,

				// 発症年齢の記入がある疾患数
				'numberOfDiseaseAge' : 0,

				// 家系内の疾患数
				'numberOfHealthHistory' : 0,

				// 死因となった疾患の記入がある死者数
				'numberOfCauseOfDeath' : 0,

				// 家系内の死者数
				'numberOfDead' : 0,

				// 死亡年齢の記入がある死者数
				'numberOfAgeAtDeath' : 0
			};

		// リスクスコアの初期化
		this.qualityOfFamilyHistoryScore = {
				// 病歴がわかっている人割合 病歴（％）
				'rateOfHelthHistory' : 0.0,
				//  発症年齢（％）
				'rateOfAgeAtDisease': 0.0,
				// 死因がわかっている人割合
				'rateOfCauseOfDeath' : 0.0,
				// 死亡年齢がわかっている人割合 死亡年齢（％）
				'rateOfAgeAtDeath' : 0.0
			};

		return;
	}

	setClientValues(){

		// id取得
		var ids = getRelationshipIds( this.relations_list, this.pi );

		// 構成員の人数
		this.clientValue.numberOfFamily = this._getNumberOfFamily();

		// 病名の記入がある家系構成員数
		this.clientValue.numberOfDisease = this._getNumberOfDisease(ids);

		// 発症年齢の記入がある疾患数
		this.clientValue.numberOfDiseaseAge = this._getNumberOfDiseaseAge(ids);

		// 家系内の疾患数
		this.clientValue.numberOfHealthHistory = this._getNumberOfHealthHistory(ids);

		// 死因となった疾患の記入がある死者数
		this.clientValue.numberOfCauseOfDeath = this._getNumberOfCauseOfDeath(ids);

		// 家系内の死者数
		this.clientValue.numberOfDead = this._getNumberOfDead(ids);

		// 死亡年齢の記入がある死者数
		this.clientValue.numberOfAgeAtDeath = this._getNumberOfAgeAtDeath(ids);

		return;
	}

	// 計算可能か判定する
	isCalculatable(){
		return true;
	}

	// 構成員の人数
	_getNumberOfFamily(){
		var retval = 0;
		var pi = this.pi;
		this.relations_list.forEach( function( relationshipName ){
			retval += getNumberOfRelations( relationshipName, pi );
		});
		return retval;
	}

	// 病名の記入がある家系構成員数
	_getNumberOfDisease(ids){
		const unknownSnomedCodes = [
			'SNOMED_CT-315645005'
		];

		var pi = this.pi;
		var retval = 0;
		ids.forEach( function(id){
			if(pi[id]["Health History"].length <= 0 ) return;

			if(pi[id]["Health History"].length >= 2 ){
				retval ++;
				return;
			}

			if ( !unknownSnomedCodes.includes ( pi[id]['Health History'][0]['Disease Code'] )){
				retval ++;
			}
		});

		return retval;
	}

	// 発症年齢の記入がある疾患数
	_getNumberOfDiseaseAge(ids){

		var pi = this.pi;

		var retval = 0;
		ids.forEach( function(id){

			if(pi[id]["Health History"].length <= 0 ) return;

			pi[id]['Health History'].forEach( function(healthHistory){
				if( typeof healthHistory['Age At Diagnosis'] == 'undefined') return;
				if( healthHistory['Age At Diagnosis'] == '') return;
				if( healthHistory['Age At Diagnosis'] == 'Unknown') return;
				retval ++;
			});
		});

		return retval;
	}

	// 家系内の疾患数
	_getNumberOfHealthHistory(ids){
		var retval = 0;
		var pi = this.pi;

		ids.forEach( function(id){
			if(typeof pi[id]["Health History"] == 'undefined' ) return;
			retval += pi[id]["Health History"].length;
		});

		return retval;
	}

	// 家系内の死者数
	_getNumberOfDead(ids){
		var retval = 0;
		var pi = this.pi;

		ids.forEach( function(id){

			// 存命かどうかわからない人はカウントしない
			if(typeof pi[id].is_alive == 'undefined' ) return;
			if(pi[id].is_alive == '' ) return;
			if(pi[id].is_alive === 'unknown' ) return;

			// 存命の人はカウントしない
			if(pi[id].is_alive === 'alive' ) return;

			if(pi[id].is_alive === 'dead' ) retval ++;
		});

		return retval;
	}


	// 死因となった疾患の記入がある死者数
	_getNumberOfAgeAtDeath(ids){

		var pi = this.pi;

		var retval = 0;
		ids.forEach( function(id){

			// 存命かどうかわからない人はカウントしない
			if(typeof pi[id].is_alive == 'undefined' ) return;
			if(pi[id].is_alive == '' ) return;
			if(pi[id].is_alive === 'unknown' ) return;
			// 存命の人はカウントしない
			if(pi[id].is_alive === 'alive' ) return;

			// 亡くなった方のうち、死亡年齢不明の人はカウントしない

			if(pi[id].is_alive === 'dead' ){
				if( pi[id].estimated_death_age == 'Unknown' ) return;

				retval ++;
			}
		});

		return retval;
	}

	// 死亡年齢の記入がある死者数
	_getNumberOfCauseOfDeath(ids){
		const unknownSnomedCodes = [
			'SNOMED_CT-315645005'
		];
		var pi = this.pi;

		var retval = 0;
		ids.forEach( function(id){

			// 存命かどうかわからない人はカウントしない
			if(typeof pi[id].is_alive == 'undefined' ) return;
			if(pi[id].is_alive == '' ) return;
			if(pi[id].is_alive === 'unknown' ) return;
			// 存命の人はカウントしない
			if(pi[id].is_alive === 'alive' ) return;

			// 「不明の疾患」以外の死因が入力されている。
			if(pi[id].is_alive === 'dead' ){

				if ( !unknownSnomedCodes.includes ( pi[id].cause_of_death_code )){
					retval ++;
				}
			}
		});

		return retval;
	}

	// スコア計算
	calculateScore(){
//		１．病歴（％）= 病名の記入がある家系構成員数 ÷ 全家系構成人数（本人は含まない）
		this.qualityOfFamilyHistoryScore.rateOfHelthHistory = this._getPercentage( this.clientValue.numberOfDisease, this.clientValue.numberOfFamily );

//		２．発症年齢（％）= 発症年齢の記入がある疾患数 ÷ 家系内の疾患数
		this.qualityOfFamilyHistoryScore.rateOfAgeAtDisease = this._getPercentage( this.clientValue.numberOfDiseaseAge, this.clientValue.numberOfHealthHistory );

//		３．死因（％）= 死因となった疾患の記入がある死者数 ÷ 家系内の死者数
		this.qualityOfFamilyHistoryScore.rateOfCauseOfDeath = this._getPercentage( this.clientValue.numberOfCauseOfDeath, this.clientValue.numberOfDead );

//		４．死亡年齢（％）= 死亡年齢の記入がある死者数 ÷ 家系内の死者数
		this.qualityOfFamilyHistoryScore.rateOfAgeAtDeath = this._getPercentage( this.clientValue.numberOfAgeAtDeath, this.clientValue.numberOfDead );
	}

	_getPercentage( numerator , dominator ){
		if( dominator <= 0 ) return 0;
		return Math.round( 100 * ( numerator / dominator ) );
	}

}
