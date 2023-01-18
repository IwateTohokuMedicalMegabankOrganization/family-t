// 5大疾患計算クラス
class FiveDiseaseRiskCalculator extends RiskCalculatorBase{
	// コンストラクタ
	constructor( pi )
	{
		super(pi);
	}

	// 初期化
	initialize(){

		super.initialize();

		/** 遺伝性乳がん卵巣がん症候群 HBOC */ 
		this.hboc = {
			applicableInfo : [],
			judge : false
		};

		/** リンチ症候群（遺伝性非ポリポーシス大腸がん） hnpcc */
		this.hnpcc = {
			applicableInfo : [],
			judge : false
		};

		/** 腹部大動脈瘤 aaa */
		this.aaa = {
			applicableInfo : [],
			judge : false
		};

		/** 家族性高コレステロール血症 fh */
		this.fh  = {
			applicableInfo : [],
			judge : false
		};

		/** 前立腺がん pc */
		this.pc = {
			applicableInfo : [],
			judge : false
		};

		return;
	}

	setClientValues(){
		
	}

	// 計算可能か判定する
	isCalculatable(){
		// 家族歴が登録されているかチェックする。
		var keys = Object.keys(this.pi);
		if(keys.includes('Health History')){
			return true;
		}
		return false;
	}

	// スコア計算
	calculateScore(){
		/** 遺伝性乳がん卵巣がん症候群 HBOC */ 
		this.hboc = calcHBOC(this.pi);

		/** リンチ症候群（遺伝性非ポリポーシス大腸がん） hnpcc */
		this.hnpcc = calcHNPCC(this.pi);

		/** 腹部大動脈瘤 aaa */
		this.aaa = calcAAA(this.pi);

		/** 家族性高コレステロール血症 fh */
		this.fh = calcFH(this.pi);

		/** 前立腺がん pc */
		this.pc = calcPC(this.pi);
	}
}
