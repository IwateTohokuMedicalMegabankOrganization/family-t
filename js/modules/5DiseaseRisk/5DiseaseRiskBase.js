/**
 * 2022/06/06 
 * 
 * 5疾患リスク計算の基底クラス
 */

 export class FiveDiseaseRiskBase {

    /** アラート文 */
    MESSAGE = '';
    /** リスク判定に該当した情報(オブジェクトの配列)*/
    APPLICABLE_INFO = [];
    /** リスク判定基準 */
    CRITERIA = [];

    constructor(){

    }

    /**
     * クラス変数の初期化を行う
     */
    init(){
        this.MESSAGE = '';
        this.APPLICABLE_INFO = [];
        this.CRITERIA= [];
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
     * 
     * @param {*} applicableInfo リスク判定に該当した情報(オブジェクトの配列)
     */
    setApplicableInfo(applicableInfo){
        this.APPLICABLE_INFO = applicableInfo;
    }

    /**
     * 
     * @returns リスク判定基準
     */
    getCRITERIA() {
        return this.CRITERIA;
    }

    /**
     * 
     * @param {*} criteria リスク判定基準
     */
    setCriteria(criteria){
        this.CRITERIA = criteria;
    }
}
