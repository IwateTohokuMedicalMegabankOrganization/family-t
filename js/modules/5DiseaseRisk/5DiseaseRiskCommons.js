/**
 * 2022/06/06 
 * 
 * 5疾患リスク計算共通クラス。判定ロジックを提供する。
 */
import { EstimatedAgeValue } from  '../xmlTag';
import { RaceUtil, RelativeUtil, CodeUtil, NoteUtil, ValueUtil } from '../xmlTagUtil';
import { FiveDiseaseRiskCommonsGetter } from './5DiseaseRiskCommonsGetter';

 export class FiveDiseaseRiskCommons {

    diseases;   // 疾患関連で必要になる可能性が高い。

    /** 年齢判定 */
    static JUDGE_AGE = {
        gtoet : 'greater_than_or_equal_to',
        gt : 'greater_than',
        ltoet : 'less_than_or_equal_to',
        lt : 'less_than',
    };

    constructor(){
        this.diseases = require("../../../data/diseases.json");
    }

    /**
     * AとBを文字列として結合する
     * @param {*} A object
     * @param {*} B object
     * @returns 
     */
    static bindAsString(A, B){
        return A + '' +  B;
    }

    /**
     * JudgedAge:age の文字列として結合する
     * @param {*} JudgedAge 
     * @param {*} age 
     * @returns 
     */
    static bindJudgedAgeAsString(JudgedAge, age){
        return JudgedAge + ':' + age;
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
     * 年齢を返却する。計算できなかった場合はnullを返却する。
     * @param {*} pi 
     * @returns 
     */
    static getAge(pi){
        
        // 引数チェック
        if(!this._isParamCorrect(pi)) return null;

        // 年齢の場合
        if(this._canUseAge(pi)){
            return Number(pi.age);
        }

        // 生年月の場合
        if(this._canUseBirth(pi)){
            var thisYear = (new Date()).getFullYear();
            return (Number(thisYear) - Number(pi.year_of_birth));
        }

        // 年齢幅の場合
        if(this._canUseEstimatedAge(pi)){
            const eav = (new EstimatedAgeValue()).ESTIMATED_AGE_VALUE;
            var low_age = eav[pi.estimated_age].low.value;
            return Number(low_age);
        }
        return null;
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
     * Personal InformationにsnomedCodeと合致する疾患があるか判定する。
     * @param {*} snomedCode SNOMEDコード(文字列)
     * @param {*} pi personalinformation
     */
    static isDiesaseMatch(snomedCode, pi) {
        // 引数チェック
        if(!this._isParamCorrect(snomedCode, pi)) return false;
        if(pi["Health History"]==null) return false;
        if(pi["Health History"]==undefined) return false;

        // 該当する疾患があるかどうか判断する。
        if(FiveDiseaseRiskCommonsGetter.getDisease(snomedCode, pi) != null){
            return true;
        }
        return false;
    }

    /**
     * いづれかの疾患に該当するかどうか判断する。
     * @param {*} snomedCode SNOMEDコード(文字列)の配列
     * @param {*} pi personalinformation
     */
    static isDiesaseMatchOr(snomedCodArray, pi) {
        // 引数チェック
        if(!this._isParamCorrect(snomedCodArray, pi)) return false;
        if(pi["Health History"]==null) return false;
        if(pi["Health History"]==undefined) return false;

        // 該当する疾患があるかどうか判断する。
        for(const snomedCode of snomedCodArray){
            if(FiveDiseaseRiskCommonsGetter.getDisease(snomedCode, pi) != null){
                return true;
            }
        }        
        return false;
    }

    /**
     * 全ての疾患が該当するかどうか判断する。
     * @param {*} snomedCodArray SNOMEDコード(文字列)の破裂
     * @param {*} pi personalinformation
     */
    static isDiesaseMatchAnd(snomedCodArray, pi) {
        // 引数チェック
        if(!this._isParamCorrect(snomedCodArray, pi)) return false;
        if(pi["Health History"]==null) return false;
        if(pi["Health History"]==undefined) return false;

        // 全ての疾患が該当するかどうか判断する。
        for(const snomedCode of snomedCodArray){
            if(FiveDiseaseRiskCommonsGetter.getDisease(snomedCode, pi) == null){
                return false;
            }
        }        
        return true;
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
     * 
     * @param {*} snomedCode SNOMEDコード(文字列)
     * @param {*} age 診断時の年齢
     * @param {*} pi personalinformation
     */
    static isAgeAtDiagnosisGreaterThanOrEqualTo(snomedCode, age, pi){
        if(!this._isParamCorrect(snomedCode, age, pi)) return false;

        var ageAtDiagnosis = FiveDiseaseRiskCommonsGetter.getAgeAtDiagnosis(snomedCode, pi);
        if(!this._isParamCorrect(ageAtDiagnosis) || ageAtDiagnosis == 'prebirth' || ageAtDiagnosis == 'unknown'){
            return false;
        }
        const eav = (new EstimatedAgeValue()).ESTIMATED_AGE_VALUE;
        var low_age = eav[ageAtDiagnosis].low.value;
        return age <= Number(low_age);
    }

    /**
     * 
     * @param {*} snomedCode SNOMEDコード(文字列)
     * @param {*} age 診断時の年齢
     * @param {*} pi personalinformation
     */
    static isAgeAtDiagnosisGreaterThan(snomedCode, age, pi){
        if(!this._isParamCorrect(snomedCode, age, pi)) return false;

        var ageAtDiagnosis = FiveDiseaseRiskCommonsGetter.getAgeAtDiagnosis(snomedCode, pi);
        if(!this._isParamCorrect(ageAtDiagnosis) || ageAtDiagnosis == 'prebirth' || ageAtDiagnosis == 'unknown'){
            return false;
        }
        const eav = (new EstimatedAgeValue()).ESTIMATED_AGE_VALUE;
        var low_age = eav[ageAtDiagnosis].low.value;
        return age < Number(low_age);
    }

    /**
     * 
     * @param {*} snomedCode SNOMEDコード(文字列)
     * @param {*} age 診断時の年齢
     * @param {*} pi personalinformation
     */
    static isAgeAtDiagnosisLessThanOrEquaTo(snomedCode, age, pi){
        if(!this._isParamCorrect(snomedCode, age, pi)) return false;

        var ageAtDiagnosis = FiveDiseaseRiskCommonsGetter.getAgeAtDiagnosis(snomedCode, pi);
        if(!this._isParamCorrect(ageAtDiagnosis) || ageAtDiagnosis == 'prebirth' || ageAtDiagnosis == 'unknown'){
            return false;
        }
        const eav = (new EstimatedAgeValue()).ESTIMATED_AGE_VALUE;
        var high_age = eav[ageAtDiagnosis].high.value;
        return age >= Number(high_age);
    }

    /**
     * 
     * @param {*} snomedCode SNOMEDコード(文字列)
     * @param {*} age 診断時の年齢
     * @param {*} pi personalinformation
     */
    static isAgeAtDiagnosisLessThan(snomedCode, age, pi){
        if(!this._isParamCorrect(snomedCode, age, pi)) return false;

        var ageAtDiagnosis = FiveDiseaseRiskCommonsGetter.getAgeAtDiagnosis(snomedCode, pi);
        if(!this._isParamCorrect(ageAtDiagnosis) || ageAtDiagnosis == 'prebirth' || ageAtDiagnosis == 'unknown'){
            return false;
        }
        const eav = (new EstimatedAgeValue()).ESTIMATED_AGE_VALUE;
        var high_age = eav[ageAtDiagnosis].high.value;
        return age > Number(high_age);
    }

    /**
     * 任意の性別で任意の病気に該当するかどうか
     * @param {*} snomedCode SNOMEDコード(文字列)
     * @param {*} gender 性別
     * @param {*} pi personalinformation
     */
    static areDiseaseAndGenderMatch(snomedCode, gender, pi){
        // 引数チェック
        if(!this._isParamCorrect(snomedCode, gender, pi)) return false;

        // 性別と病歴が合致するか判定する。
        return this.isGenderMatch(gender, pi) && this.isDiesaseMatch(snomedCode, pi);
    }

    /**
     * 任意の性別で任意の病歴を任意の年齢以上で有するかどうか
     * @param {*} snomedCode SNOMEDコード(文字列)
     * @param {*} age 診断時の年齢
     * @param {*} gender 性別
     * @param {*} pi personalinformation
     */
    static areGenderMatchAndAgeAtDiagnosisGreaterThanOrEqualTo(snomedCode, age, gender, pi){
        // 引数チェック
        if(!this._isParamCorrect(snomedCode, age, gender, pi)) return false;

        // 性別と病歴および診断時の年齢が合致するか判定する。
        return this.isGenderMatch(gender, pi) && this.isAgeAtDiagnosisGreaterThanOrEqualTo(snomedCode, age, pi);
    }

    /**
     * 任意の性別で任意の病歴を任意の年齢より上で有するかどうか
     * @param {*} snomedCode SNOMEDコード(文字列)
     * @param {*} age 診断時の年齢
     * @param {*} gender 性別
     * @param {*} pi personalinformation
     */
     static areGenderMatchAndAgeAtDiagnosisGreaterThan(snomedCode, age, gender, pi){
        // 引数チェック
        if(!this._isParamCorrect(snomedCode, age, gender, pi)) return false;

        // 性別と病歴および診断時の年齢が合致するか判定する。
        return this.isGenderMatch(gender, pi) && this.isAgeAtDiagnosisGreaterThan(snomedCode, age, pi);
    }

    /**
     * 任意の性別で任意の病歴を任意の年齢以下で有するかどうか
     * @param {*} snomedCode SNOMEDコード(文字列)
     * @param {*} age 診断時の年齢
     * @param {*} gender 性別
     * @param {*} pi personalinformation
     */
     static areGenderMatchAndAgeAtDiagnosisLessThanOrEqualTo(snomedCode, age, gender, pi){
        // 引数チェック
        if(!this._isParamCorrect(snomedCode, age, gender, pi)) return false;

        // 性別と病歴および診断時の年齢が合致するか判定する。
        return this.isGenderMatch(gender, pi) && this.isAgeAtDiagnosisLessThanOrEquaTo(snomedCode, age, pi);
    }

    /**
     * 任意の性別で任意の病歴を任意の年齢未満で有するかどうか
     * @param {*} snomedCode SNOMEDコード(文字列)
     * @param {*} age 診断時の年齢
     * @param {*} gender 性別
     * @param {*} pi personalinformation
     */
     static areGenderMatchAndAgeAtDiagnosisLessThan(snomedCode, age, gender, pi){
        // 引数チェック
        if(!this._isParamCorrect(snomedCode, age, gender, pi)) return false;

        // 性別と病歴および診断時の年齢が合致するか判定する。
        return this.isGenderMatch(gender, pi) && this.isAgeAtDiagnosisLessThan(snomedCode, age, pi);
    }

    /**
     * 任意の病歴を全て任意の年齢以上で有するかどうか
     * @param {*} snomedCodeArray SNOMEDコード(文字列)の配列
     * @param {*} age 診断時の年齢
     * @param {*} pi personalinformation
     */
    static areAllDisAgadGreaterThanOrEqualTo(snomedCodeArray, age, pi){
        // 引数チェック
        if(!this._isParamCorrect(snomedCodeArray, age, pi)) return false;

        // 全てのSNOMEDコードについて判定
        for(const snomedCode of snomedCodeArray){
            if(!this.isAgeAtDiagnosisGreaterThanOrEqualTo(snomedCode, age, pi)){
                return false;
            }
        }    
        return true;
    }

    /**
     * 任意の病歴を全て任意の年齢より上で有するかどうか
     * @param {*} snomedCodeArray SNOMEDコード(文字列)の配列
     * @param {*} age 診断時の年齢
     * @param {*} pi personalinformation
     */
    static areAllDisAgadGreaterThan(snomedCodeArray, age, pi){
        // 引数チェック
        if(!this._isParamCorrect(snomedCodeArray, age, pi)) return false;

        // 全てのSNOMEDコードについて判定
        for(const snomedCode of snomedCodeArray){
            if(!this.isAgeAtDiagnosisGreaterThan(snomedCode, age, pi)){
                return false;
            }
        }    
        return true;
    }

    /**
     * 任意の病歴を全て任意の年齢以下で有するかどうか
     * @param {*} snomedCodeArray SNOMEDコード(文字列)の配列
     * @param {*} age 診断時の年齢
     * @param {*} pi personalinformation
     */
    static areAllDisAgadLessThanOrEqualTo(snomedCodeArray, age, pi){
        // 引数チェック
        if(!this._isParamCorrect(snomedCodeArray, age, pi)) return false;

        // 全てのSNOMEDコードについて判定
        for(const snomedCode of snomedCodeArray){
            if(!this.isAgeAtDiagnosisLessThanOrEquaTo(snomedCode, age, pi)){
                return false;
            }
        }    
        return true;
    }

    /**
     * 任意の病歴を全て任意の年齢未満で有するかどうか
     * @param {*} snomedCodeArray SNOMEDコード(文字列)の配列
     * @param {*} age 診断時の年齢
     * @param {*} pi personalinformation
     */
    static areAllDisAgadLessThan(snomedCodeArray, age, pi){
        // 引数チェック
        if(!this._isParamCorrect(snomedCodeArray, age, pi)) return false;

        // 全てのSNOMEDコードについて判定
        for(const snomedCode of snomedCodeArray){
            if(!this.isAgeAtDiagnosisLessThan(snomedCode, age, pi)){
                return false;
            }
        }    
        return true;
    }
    
    /**
     * 任意の病歴のいづれかを任意の年齢以上で有するかどうか
     * @param {*} snomedCodeArray SNOMEDコード(文字列)の配列
     * @param {*} age 診断時の年齢
     * @param {*} pi personalinformation
     */
    static areAnyDisAgadGreaterThanOrEqualTo(snomedCodeArray, age, pi){
        // 引数チェック
        if(!this._isParamCorrect(snomedCodeArray, age, pi)) return false;

        // 全てのSNOMEDコードについて判定
        for(const snomedCode of snomedCodeArray){
            if(this.isAgeAtDiagnosisGreaterThanOrEqualTo(snomedCode, age, pi)){
                return true;
            }
        }    
        return false;
    }

    /**
     * 任意の病歴のいづれかを任意の年齢より上で有するかどうか
     * @param {*} snomedCodeArray SNOMEDコード(文字列)の配列
     * @param {*} age 診断時の年齢
     * @param {*} pi personalinformation
     */
    static areAnyDisAgadGreaterThan(snomedCodeArray, age, pi){
        // 引数チェック
        if(!this._isParamCorrect(snomedCodeArray, age, pi)) return false;

        // 全てのSNOMEDコードについて判定
        for(const snomedCode of snomedCodeArray){
            if(this.isAgeAtDiagnosisGreaterThan(snomedCode, age, pi)){
                return true;
            }
        }    
        return false;
    }

    /**
     * 任意の病歴のいづれかを任意の年齢以下で有するかどうか
     * @param {*} snomedCodeArray SNOMEDコード(文字列)の配列
     * @param {*} age 診断時の年齢
     * @param {*} pi personalinformation
     */
    static areAnyDisAgadLessThanOrEqualTo(snomedCodeArray, age, pi){
        // 引数チェック
        if(!this._isParamCorrect(snomedCodeArray, age, pi)) return false;

        // 全てのSNOMEDコードについて判定
        for(const snomedCode of snomedCodeArray){
            if(this.isAgeAtDiagnosisLessThanOrEquaTo(snomedCode, age, pi)){
                return true;
            }
        }    
        return false;
    }

    /**
     * 任意の病歴のいづれかを任意の年齢未満で有するかどうか
     * @param {*} snomedCodeArray SNOMEDコード(文字列)の配列
     * @param {*} age 診断時の年齢
     * @param {*} pi personalinformation
     */
    static areAnyDisAgadLessThan(snomedCodeArray, age, pi){
        // 引数チェック
        if(!this._isParamCorrect(snomedCodeArray, age, pi)) return false;

        // 全てのSNOMEDコードについて判定
        for(const snomedCode of snomedCodeArray){
            if(this.isAgeAtDiagnosisLessThan(snomedCode, age, pi)){
                return true;
            }
        }    
        return false;
    }
    
    /**
     * 任意の病歴を全て任意の性別かつ任意の年齢以上で有するかどうか
     * @param {*} snomedCodeArray SNOMEDコード(文字列)の配列
     * @param {*} age 診断時の年齢
     * @param {*} gender 性別
     * @param {*} pi personalinformation
     */
    static areAllDisGenAadGreaterThanOrEqualTo(snomedCodeArray, age, gender, pi){
        // 引数チェック
        if(!this._isParamCorrect(snomedCodeArray, age, gender, pi)) return false;

        // 全てのSNOMEDコードについて判定
        for(const snomedCode of snomedCodeArray){
            if(!this.areGenderMatchAndAgeAtDiagnosisGreaterThanOrEqualTo(snomedCode, age, gender, pi)){
                return false;
            }
        }    
        return true;
    }

    /**
     * 任意の病歴を全て任意の性別かつ任意の年齢より上で有するかどうか
     * @param {*} snomedCodeArray SNOMEDコード(文字列)の配列
     * @param {*} age 診断時の年齢
     * @param {*} gender 性別
     * @param {*} pi personalinformation
     */
    static areAllDisGenAadGreaterThan(snomedCodeArray, age, gender, pi){
        // 引数チェック
        if(!this._isParamCorrect(snomedCodeArray, age, gender, pi)) return false;

        // 全てのSNOMEDコードについて判定
        for(const snomedCode of snomedCodeArray){
            if(!this.areGenderMatchAndAgeAtDiagnosisGreaterThan(snomedCode, age, gender, pi)){
                return false;
            }
        }    
        return true;
    }

    /**
     * 任意の病歴を全て任意の性別かつ任意の年齢以下で有するかどうか
     * @param {*} snomedCodeArray SNOMEDコード(文字列)の配列
     * @param {*} age 診断時の年齢
     * @param {*} gender 性別
     * @param {*} pi personalinformation
     */
    static areAllDisGenAadLessThanOrEqualTo(snomedCodeArray, age, gender, pi){
        // 引数チェック
        if(!this._isParamCorrect(snomedCodeArray, age, gender, pi)) return false;

        // 全てのSNOMEDコードについて判定
        for(const snomedCode of snomedCodeArray){
            if(!this.areGenderMatchAndAgeAtDiagnosisLessThanOrEqualTo(snomedCode, age, gender, pi)){
                return false;
            }
        }    
        return true;
    }

    /**
     * 任意の病歴を全て任意の性別かつ任意の年齢未満で有するかどうか
     * @param {*} snomedCodeArray SNOMEDコード(文字列)の配列
     * @param {*} age 診断時の年齢
     * @param {*} gender 性別
     * @param {*} pi personalinformation
     */
    static areAllDisGenAadLessThan(snomedCodeArray, age, gender, pi){
        // 引数チェック
        if(!this._isParamCorrect(snomedCodeArray, age, gender, pi)) return false;

        // 全てのSNOMEDコードについて判定
        for(const snomedCode of snomedCodeArray){
            if(!this.areGenderMatchAndAgeAtDiagnosisLessThan(snomedCode, age, gender, pi)){
                return false;
            }
        }    
        return true;
    }

    /**
     * 任意の病歴のいづれかを任意の性別かつ任意の年齢以上で有するかどうか
     * @param {*} snomedCodeArray SNOMEDコード(文字列)の配列
     * @param {*} age 診断時の年齢
     * @param {*} gender 性別
     * @param {*} pi personalinformation
     */
    static areAnyDisGenAadGreaterThanOrEqualTo(snomedCodeArray, age, gender, pi){
        // 引数チェック
        if(!this._isParamCorrect(snomedCodeArray, age, gender, pi)) return false;

        // 全てのSNOMEDコードについて判定
        for(const snomedCode of snomedCodeArray){
            if(this.areGenderMatchAndAgeAtDiagnosisGreaterThanOrEqualTo(snomedCode, age, gender, pi)){
                return true;
            }
        }    
        return false;
    }

    /**
     * 任意の病歴のいづれかを任意の性別かつ任意の年齢より上で有するかどうか
     * @param {*} snomedCodeArray SNOMEDコード(文字列)の配列
     * @param {*} age 診断時の年齢
     * @param {*} gender 性別
     * @param {*} pi personalinformation
     */
    static areAnyDisGenAadGreaterThan(snomedCodeArray, age, gender, pi){
        // 引数チェック
        if(!this._isParamCorrect(snomedCodeArray, age, gender, pi)) return false;

        // 全てのSNOMEDコードについて判定
        for(const snomedCode of snomedCodeArray){
            if(this.areGenderMatchAndAgeAtDiagnosisGreaterThan(snomedCode, age, gender, pi)){
                return true;
            }
        }    
        return false;
    }

    /**
     * 任意の病歴のいづれかを任意の性別かつ任意の年齢以下で有するかどうか
     * @param {*} snomedCodeArray SNOMEDコード(文字列)の配列
     * @param {*} age 診断時の年齢
     * @param {*} gender 性別
     * @param {*} pi personalinformation
     */
    static areAnyDisGenAadLessThanOrEqualTo(snomedCodeArray, age, gender, pi){
        // 引数チェック
        if(!this._isParamCorrect(snomedCodeArray, age, gender, pi)) return false;

        // 全てのSNOMEDコードについて判定
        for(const snomedCode of snomedCodeArray){
            if(this.areGenderMatchAndAgeAtDiagnosisLessThanOrEqualTo(snomedCode, age, gender, pi)){
                return true;
            }
        }    
        return false;
    }

    /**
     * 任意の病歴のいづれかを任意の性別かつ任意の年齢未満で有するかどうか
     * @param {*} snomedCodeArray SNOMEDコード(文字列)の配列
     * @param {*} age 診断時の年齢
     * @param {*} gender 性別
     * @param {*} pi personalinformation
     */
    static areAnyDisGenAadLessThanOrEqualTo(snomedCodeArray, age, gender, pi){
        // 引数チェック
        if(!this._isParamCorrect(snomedCodeArray, age, gender, pi)) return false;

        // 全てのSNOMEDコードについて判定
        for(const snomedCode of snomedCodeArray){
            if(this.areGenderMatchAndAgeAtDiagnosisLessThan(snomedCode, age, gender, pi)){
                return true;
            }
        }    
        return false;
    }


}