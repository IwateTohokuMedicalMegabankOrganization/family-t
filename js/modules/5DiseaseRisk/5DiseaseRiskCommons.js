/**
 * 2022/06/06 
 * 
 * 5疾患リスク計算の基底クラス
 */
import { EstimatedAgeValue } from  '../xmlTag';
import { RaceUtil, RelativeUtil, CodeUtil, NoteUtil, ValueUtil } from '../xmlTagUtil';

 export class FiveDiseaseRiskCommons {

    diseases;   // 疾患関連で必要になる可能性が高い。

    constructor(){
        this.diseases = require("../../../data/diseases.json");
    }

    /**
     * 健康歴から任意の疾患を取得する。取得できない場合はnullを返す。
     * Detailed Disease Nameは日本語と英語があるため、任意の疾患名に該当するかどうかは、
     * pi[Health History]のDisease Codeとdata/disease.jsonのデータを用いる
     * @param {*} disease_code SNOMEDコード(文字列)
     * @param {*} pi personalinformation
     */
    static getDisease(disease_code, pi) {
        for(const history of pi['Health History']){
            if(history['Disease Code'] == disease_code){
                return CodeUtil.getCode(history['Disease Code']);
            }
        }        
        return null;
    }

    /**
     * Personal Informationからrelativeに合致する健康歴を取得する。
     * relativesに空文字が設定された場合は本人の健康歴を取得する。
     * 取得できない場合はnullを返す。
     * @param {*} relatives 
     * @param {*} pi personalinformation
     */
    static getHealthHistory(relatives, pi) {
        if(relatives == null) return null;
        if(relatives == undefined) return null;

        // 本人の場合
        if(relatives == '') return pi['Health History'];
        
        // 家族の場合
        var ret = null;
        Object.keys(pi).forEach(function (key) {
            if (key == relatives) {
                ret = pi[key]['Health History'];
            }
        });
        return ret;
    }

    static _isParamCorrect(param1,  ...params){
        if(param1 == null || param1 == undefined || param1 == '') return false;

        for(var param of params){
            if(param == null || param == undefined || param == '') return false;
        }

        return true;
    }

    static _canUseAge(pi){
        return pi.age != null && pi.age != undefined;
    }

    static _canUseBirth(pi){
        return (pi.date_of_birth != null && pi.date_of_birth != undefined)
        && (pi.year_of_birth != null && pi.year_of_birth != undefined)
        && (pi.month_of_birth != null && pi.month_of_birth != undefined);
    }

    static _canUseEstimatedAge(pi){
        return pi.estimated_age != null && pi.estimated_age != undefined;
    }

    /**
     * Personal Informationの年齢がage以上かどうか判定する。
     * 厳密な判定ははどうする？
     * @param {*} age 
     * @param {*} pi personalinformation
     */
    static isAgeGreaterThanOrEqualTo(age, pi) {
        // 引数チェック
        if(!this._isParamCorrect(age, pi)) return false;

        // 年齢の場合
        if(this._canUseAge(pi)){
            return age <= Number(pi.age);
        }

        // 生年月の場合
        if(this._canUseBirth(pi)){
            var thisYear = (new Date()).getFullYear();
            return age <= (Number(thisYear) - Number(pi.year_of_birth));
        }

        // 年齢幅の場合
        if(this._canUseEstimatedAge(pi)){
            const eav = (new EstimatedAgeValue()).ESTIMATED_AGE_VALUE;
            var low_age = eav[pi.estimated_age].low.value;
            return age <= Number(low_age);
        }
        return false;
    }

    /**
     * Personal Informationの年齢がageより上かどうか判定する。
     * @param {*} age 
     * @param {*} pi personalinformation
     */
    static isAgeGreaterThan(age, pi) {
        // 引数チェック
        if(!this._isParamCorrect(age, pi)) return false;

        // 年齢の場合
        if(this._canUseAge(pi)){
            return age < Number(pi.age);
        }

        // 生年月の場合
        if(this._canUseBirth(pi)){
            var thisYear = (new Date()).getFullYear();
            return age < (Number(thisYear) - Number(pi.year_of_birth));
        }

        // 年齢幅の場合
        if(this._canUseEstimatedAge(pi)){
            const eav = (new EstimatedAgeValue()).ESTIMATED_AGE_VALUE;
            var low_age = eav[pi.estimated_age].low.value;
            return age < Number(low_age);
        }
        return false;
    }

    /**
     * Personal Informationの年齢がage以下かどうか判定する。
     * @param {*} age 
     * @param {*} pi personalinformation
     */
    static isAgeLessThanOrEquaTo(age, pi) {
        // 引数チェック
        if(!this._isParamCorrect(age, pi)) return false;

        // 年齢の場合
        if(this._canUseAge(pi)){
            return age >= Number(pi.age);
        }

        // 生年月の場合
        if(this._canUseBirth(pi)){
            var thisYear = (new Date()).getFullYear();
            return age >= (Number(thisYear) - Number(pi.year_of_birth));
        }

        // 年齢幅の場合
        if(this._canUseEstimatedAge(pi)){
            const eav = (new EstimatedAgeValue()).ESTIMATED_AGE_VALUE;
            var high_age = eav[pi.estimated_age].high.value;
            return age >= Number(high_age);
        }
        return false;
    }

    /**
     * Personal Informationの年齢がageより下かどうか判定する。
     * @param {*} age 
     * @param {*} pi personalinformationv
     */
    static isAgeLessThan(age, pi) {
        // 引数チェック
        if(!this._isParamCorrect(age, pi)) return false;

        // 年齢の場合
        if(this._canUseAge(pi)){
            return age > Number(pi.age);
        }

        // 生年月の場合
        if(this._canUseBirth(pi)){
            var thisYear = (new Date()).getFullYear();
            return age > (Number(thisYear) - Number(pi.year_of_birth));
        }

        // 年齢幅の場合
        if(this._canUseEstimatedAge(pi)){
            const eav = (new EstimatedAgeValue()).ESTIMATED_AGE_VALUE;
            var high_age = eav[pi.estimated_age].high.value;
            return age > Number(high_age);
        }
        return false;
    }

    /**
     * Personal Informationにdisease_codeと合致する疾患があるか判定する。
     * @param {*} disease_code SNOMEDコード(文字列)
     * @param {*} pi personalinformation
     */
    static isDiesaseMatch(disease_code, pi) {
        // 引数チェック
        if(!this._isParamCorrect(disease_code, pi)) return false;

        // 該当する疾患があるかどうか判断する。
        if(this.getDisease(disease_code, pi) != null){
            return true;
        }
        return false;
    }

    /**
     * Personal Informationの性別がgenderと合致するか判定する。
     * @param {*} gender 
     * @param {*} pi personalinformation
     */
    static isGenderMatch(gender, pi) {
        // 引数チェック
        if(!this._isParamCorrect(gender, pi)) return false;

        // 性別が該当するか判断する。
        if(pi.gender == gender){
            return true;
        }
        return false;
    }

    /**
     * 近親者で任意の病歴を有する人数を数える。
     * @param {*} relatives 近親者(文字列の配列)
     * @param {*} disease_code SNOMEDコード(文字列)
     * @param {*} pi 本人のpersonalinfomation
     */
    static countDiseasePersonInRelatives(relatives, disease_code, pi){
        if(!this._isParamCorrect(relatives, disease_code, pi)) return 0;

        var count = 0;

        for(const relative of relatives){
            if(this.isDiesaseMatch(disease_code, pi[relative])){
                count++;
            }
        }
        return count;
    }

    /**
     * 任意の病気の診断時の年齢を取得する。
     * @param {*} disease_code SNOMEDコード(文字列)
     * @param {*} pi personalinformation
     */
    static getAgeAtDiagnosis(disease_code, pi){
        if(!this._isParamCorrect(disease_code, pi)) return '';

        for(const history of pi['Health History']){
            if(history['Disease Code'] == disease_code){
                return history['Age At Diagnosis'];
            }
        }      
    }

    /**
     * 
     * @param {*} disease_code SNOMEDコード(文字列)
     * @param {*} age 診断時の年齢
     * @param {*} pi personalinformation
     */
    static isAgeAtDiagnosisGreaterThanOrEqualTo(disease_code, age, pi){
        if(!this._isParamCorrect(disease_code, age, pi)) return false;

        var ageAtDiagnosis = this.getAgeAtDiagnosis(disease_code, pi);
        if(!this._isParamCorrect(ageAtDiagnosis) || ageAtDiagnosis == 'prebirth' || ageAtDiagnosis == 'unknown'){
            return false;
        }
        const eav = (new EstimatedAgeValue()).ESTIMATED_AGE_VALUE;
        var low_age = eav[ageAtDiagnosis].low.value;
        return age <= Number(low_age);
    }

    /**
     * 
     * @param {*} disease_code SNOMEDコード(文字列)
     * @param {*} age 診断時の年齢
     * @param {*} pi personalinformation
     */
    static isAgeAtDiagnosisGreaterThan(disease_code, age, pi){
        if(!this._isParamCorrect(disease_code, age, pi)) return false;

        var ageAtDiagnosis = this.getAgeAtDiagnosis(disease_code, pi);
        if(!this._isParamCorrect(ageAtDiagnosis) || ageAtDiagnosis == 'prebirth' || ageAtDiagnosis == 'unknown'){
            return false;
        }
        const eav = (new EstimatedAgeValue()).ESTIMATED_AGE_VALUE;
        var low_age = eav[ageAtDiagnosis].low.value;
        return age < Number(low_age);
    }

    /**
     * 
     * @param {*} disease_code SNOMEDコード(文字列)
     * @param {*} age 診断時の年齢
     * @param {*} pi personalinformation
     */
    static isAgeAtDiagnosisLessThanOrEquaTo(disease_code, age, pi){
        if(!this._isParamCorrect(disease_code, age, pi)) return false;

        var ageAtDiagnosis = this.getAgeAtDiagnosis(disease_code, pi);
        if(!this._isParamCorrect(ageAtDiagnosis) || ageAtDiagnosis == 'prebirth' || ageAtDiagnosis == 'unknown'){
            return false;
        }
        const eav = (new EstimatedAgeValue()).ESTIMATED_AGE_VALUE;
        var high_age = eav[ageAtDiagnosis].high.value;
        return age >= Number(high_age);
    }

    /**
     * 
     * @param {*} disease_code SNOMEDコード(文字列)
     * @param {*} age 診断時の年齢
     * @param {*} pi personalinformation
     */
    static isAgeAtDiagnosisLessThan(disease_code, age, pi){
        if(!this._isParamCorrect(disease_code, age, pi)) return false;

        var ageAtDiagnosis = this.getAgeAtDiagnosis(disease_code, pi);
        if(!this._isParamCorrect(ageAtDiagnosis) || ageAtDiagnosis == 'prebirth' || ageAtDiagnosis == 'unknown'){
            return false;
        }
        const eav = (new EstimatedAgeValue()).ESTIMATED_AGE_VALUE;
        var high_age = eav[ageAtDiagnosis].high.value;
        return age > Number(high_age);
    }

    /**
     * 近親者で任意の病歴を任意の年齢以上で有する人数を数える。
     * @param {*} relatives 近親者(文字列の配列)
     * @param {*} disease_code SNOMEDコード(文字列)
     * @param {*} age 診断時の年齢
     * @param {*} pi 本人のpersonalinfomation
     */
     static countDiseasePersonInRelativesGreaterThanOrEqualTo(relatives, disease_code, age, pi){
        if(!this._isParamCorrect(relatives, disease_code, age, pi)) return 0;

        var count = 0;

        for(const relative of relatives){
            if(this.isAgeAtDiagnosisGreaterThanOrEqualTo(disease_code, age, pi[relative])){
                count++;
            }
        }
        return count;
    }

    /**
     * 近親者で任意の病歴を任意の年齢よりも上で有する人数を数える。
     * @param {*} relatives 近親者(文字列の配列)
     * @param {*} disease_code SNOMEDコード(文字列)
     * @param {*} age 診断時の年齢
     * @param {*} pi 本人のpersonalinfomation
     */
     static countDiseasePersonInRelativesGreaterThan(relatives, disease_code, age, pi){
        if(!this._isParamCorrect(relatives, disease_code, age, pi)) return 0;

        var count = 0;

        for(const relative of relatives){
            if(this.isAgeAtDiagnosisGreaterThan(disease_code, age, pi[relative])){
                count++;
            }
        }
        return count;
    }

    /**
     * 近親者で任意の病歴を任意の年齢以下で有する人数を数える。
     * @param {*} relatives 近親者(文字列の配列)
     * @param {*} disease_code SNOMEDコード(文字列)
     * @param {*} age 診断時の年齢
     * @param {*} pi 本人のpersonalinfomation
     */
     static countDiseasePersonInRelativesLessThanOrEqualTo(relatives, disease_code, age, pi){
        if(!this._isParamCorrect(relatives, disease_code, age, pi)) return 0;

        var count = 0;

        for(const relative of relatives){
            if(this.isAgeAtDiagnosisLessThanOrEquaTo(disease_code, age, pi[relative])){
                count++;
            }
        }
        return count;
    }

    /**
     * 近親者で任意の病歴を任意の年齢未満で有する人数を数える。
     * @param {*} relatives 近親者(文字列の配列)
     * @param {*} disease_code SNOMEDコード(文字列)
     * @param {*} age 診断時の年齢
     * @param {*} pi 本人のpersonalinfomation
     */
     static countDiseasePersonInRelativesLessThan(relatives, disease_code, age, pi){
        if(!this._isParamCorrect(relatives, disease_code, age, pi)) return 0;

        var count = 0;

        for(const relative of relatives){
            if(this.isAgeAtDiagnosisLessThan(disease_code, age, pi[relative])){
                count++;
            }
        }
        return count;
    }
}