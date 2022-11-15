/**
 * 2022/06/06 
 * 
 * 5疾患リスク計算の基底クラス
 */

 export class FiveDiseaseRiskBase {

    /** アラート文 */
    MESSAGE = '';
    /** リスク判定に該当した情報(オブジェクトの配列)
     * 
     *  APPLICABLE_INFO = [{'relative' : relative, gender' : gender, 'disease' : disease},...]
    */
    APPLICABLE_INFO = [];
    /** リスク判定基準 */
    CRITERIA = [];
    /** リスク判定基準の出典 */
    SOURCE = [];
    /** 注意書き */
    NOTE = [
        'family-tで表示するリスクアラートは、家族歴に関する推奨やスクリーニング基準であり、その他の危険因子（年齢、生化学検査値など）をすべて網羅するものではないことを記載する',
        'family-tの疾患リストに含まれない稀少な疾患の家族歴はスクリーニング基準に含まれていても、family-tではアラートの対象外となること（例：リンチ症候群のターコット症候群、ムア・トレ症候群）',
        'family-tでは判別不能な条件については、別枠で判別可能な条件も一緒に「以下に該当する場合は一般よりもリスクが高いことが考えられる」ということを表示するリスク情報提供画面を作る',
        'これらに該当しないからと言ってそうではないとは限らないことを記載する「これに該当しない家系の方でも、原因遺伝子に変異が見つかる場合もありますので注意が必要です。」',
        'アラートを表示する根拠となった本人の家族歴をアラートと一緒に表示する（理由：①家族歴に対する意識づけ・教育効果、②入力ミスに気づける）',
        '病歴で「その他」から自由記述で入力されたら判定外になること',
    ];

    /** 自分自身 */
    SELF = 'self';
    /** 男性 */
    MALE = 'MALE';
    /** 女性 */
    FEMALE = 'FEMALE'
    
    constructor(){

    }

    /**
     * クラス変数の初期化を行う
     */
    init(){
        this.MESSAGE = '';
        this.APPLICABLE_INFO = [];
        this.CRITERIA = [];
        this.SOURCE = [];
    }

    findOutRisk(pi){

    }

    /**
     * 
     * @returns アラート文
     */
    getMessage() {
        return this.MESSAGE;
    }

    getConsiderMessage(disease){
        var str1 = '以下に該当する場合、ガイドライン等で';
        var str2 = 'である可能性が考慮されています。';
        return str1 + disease + str2;
    }

    getRecommendMessage(disease){
        var str1 = '以下に該当する場合、ガイドライン等で';
        var str2 = 'である可能性があり、診断のための遺伝学的検査が推奨されています。';
        return str1 + disease + str2;
    }

    /**
     * 
     * @param {*} message アラート文
     */
    setMessage(message){
        this.MESSAGE = message;
    }

    /**
     * 
     * @returns リスク判定に該当した情報(オブジェクトの配列)
     */
    getApplicableInfo() {
        return this.APPLICABLE_INFO;
    }

    /**
     * 配列を上書きする
     * @param {*} applicableInfo リスク判定に該当した情報(オブジェクトの配列)
     */
    setApplicableInfo(applicableInfo){
        this.APPLICABLE_INFO = applicableInfo;
    }

    /**
     * 配列を末尾に結合する
     * @param {*} applicableInfo リスク判定に該当した情報(オブジェクトの配列)
     */
    pushApplicableInfo(applicableInfo){
        this.APPLICABLE_INFO.push(applicableInfo);
    }

    /**
     * 配列を末尾に結合する
     * @param {*} applicableInfo リスク判定に該当した情報(オブジェクトの配列)
     */
    concatApplicableInfo(applicableInfoArray){
        this.APPLICABLE_INFO = this.APPLICABLE_INFO.concat(applicableInfoArray);
    }

    /**
     * 
     * @returns リスク判定基準
     */
    getCriteria() {
        return this.CRITERIA;
    }

    /**
     * 
     * @param {*} criteria リスク判定基準
     */
    setCriteria(criteria){
        this.CRITERIA = criteria;
    }

    /**
     * 
     * @returns 出典
     */
    getSource(){
        return this.SOURCE;
    }

    /**
     * 
     * @param {*} source 出典
     */
    setSource(source){
        this.SOURCE = source;
    }
}
