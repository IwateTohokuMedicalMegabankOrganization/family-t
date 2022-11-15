import { EstimatedAgeValue } from  '../xmlTag';
import { RaceUtil, RelativeUtil, CodeUtil, NoteUtil, ValueUtil } from '../xmlTagUtil';
import { FiveDiseaseRiskCommons } from './5DiseaseRiskCommons';

/**
 * 2022/10/21
 * 
 * 5疾患リスク計算共通クラス。各種getterを提供する。
 */
export class FiveDiseaseRiskCommonsGetter {
    diseases;

    constructor(){
        this.diseases = require("../../../data/diseases.json");
    }

    /**
     * 健康歴から任意の疾患を取得する。取得できない場合はnullを返す。
     * Detailed Disease Nameは日本語と英語があるため、任意の疾患名に該当するかどうかは、
     * pi[Health History]のDisease Codeとdata/disease.jsonのデータを用いる
     * @param {*} snomedCode SNOMEDコード(文字列)
     * @param {*} pi personalinformation
     */
    static getDisease(snomedCode, pi) {
        for(const history of pi['Health History']){
            if(history['Disease Code'] == snomedCode){
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

    /**
     * snomedCodeに該当する病歴を取得する。
     * 該当しない場合はnullを返却する。
     * @param {*} snomedCode 
     * @param {*} pi 
     */
    static getMatchedHealthHistory(snomedCode, pi){
        var ret = null; 
        // 引数チェック
        if(!FiveDiseaseRiskCommons._isParamCorrect(snomedCode, pi)) return ret;
        if(pi["Health History"]==null) return ret;
        if(pi["Health History"]==undefined) return ret;

        // 該当する疾患を取得する。
        for(const history of pi['Health History']){
            if(history['Disease Code'] == snomedCode){
                ret = history;
            }
        }
        return ret;
    }
    
    /**
     * snomedCodeArrayのいづれかに該当する疾患を取得する
     * 該当がない場合は空の配列を返却する
     * @param {*} snomedCodeArray 
     * @param {*} pi 
     * @returns 疾患の配列
     */
     static getAnyMatchedHealthHistory(snomedCodeArray, pi){
        var disease = [];
        // 引数チェック
        if(!FiveDiseaseRiskCommons._isParamCorrect(snomedCodeArray, pi)) return disease;
        if(pi["Health History"]==null) return disease;
        if(pi["Health History"]==undefined) return disease;

        // 該当する全ての疾患を取得する。        
        for(const snomedCode of snomedCodeArray){
            if(this.getMatchedHealthHistory(snomedCode, pi) != null){
                disease = disease.concat(this.getMatchedHealthHistory(snomedCode, pi));
            }
        }        
        return disease;
    }

    /**
     * snomedCodeArrayのそれぞれに該当する疾患を取得する
     * 1つでも該当しない場合は空の配列を返却する
     * @param {*} snomedCodeArray 
     * @param {*} pi 
     * @returns 
     */
    static getAllMatchedHealthHistory(snomedCodeArray, pi){
        var disease = [];
        // 引数チェック
        if(!FiveDiseaseRiskCommons._isParamCorrect(snomedCodeArray, pi)) return disease;
        if(pi["Health History"]==null) return disease;
        if(pi["Health History"]==undefined) return disease;

        // 全ての疾患を取得する。
        for(const snomedCode of snomedCodeArray){
            if(this.getMatchedHealthHistory(snomedCode, pi) == null){
                return disease;
            }else{
                disease = disease.concat(this.getMatchedHealthHistory(snomedCode, pi));
            }
        }        
        return disease;
    }

    /**
     * 任意の病気の診断時の年齢を取得する。
     * @param {*} snomedCode SNOMEDコード(文字列)
     * @param {*} pi personalinformation
     */
     static getAgeAtDiagnosis(snomedCode, pi){
        if(!FiveDiseaseRiskCommons._isParamCorrect(snomedCode, pi)) return '';

        for(const history of pi['Health History']){
            if(history['Disease Code'] == snomedCode){
                return history['Age At Diagnosis'];
            }
        }      
    }

    /**
     * snomedCodeの疾患がage歳以上で診断されている場合その疾患情報を取得する
     * 該当しない場合はnullを返却する。
     * @param {*} snomedCode SNOMEDコード（文字列）
     * @param {*} age 診断時の年齢
     * @param {*} pi personalinfomation
     * @returns 
     */
    static getMHHGreaterThanOrEqualTo(snomedCode, age, pi){
        // 引数チェック
        if(!FiveDiseaseRiskCommons._isParamCorrect(snomedCode, age, pi)) return null;

        // 判定
        if(!FiveDiseaseRiskCommons.isAgeAtDiagnosisGreaterThanOrEqualTo(snomedCode, age, pi)) return null;   
        
        // データの取得
        return this.getMatchedHealthHistory(snomedCode, pi);
    }

    /**
     * snomedCodeの疾患がage歳より上で診断されている場合その疾患情報を取得する
     * 該当しない場合はnullを返却する。
     * @param {*} snomedCode SNOMEDコード（文字列）
     * @param {*} age 診断時の年齢
     * @param {*} pi personalinfomation
     * @returns 
     */
    static getMHHGreaterThan(snomedCode, age, pi){
        // 引数チェック
        if(!FiveDiseaseRiskCommons._isParamCorrect(snomedCode, age, pi)) return null;

        // 判定
        if(!FiveDiseaseRiskCommons.isAgeAtDiagnosisGreaterThan(snomedCode, age, pi)) return null;   
        
        // データの取得
        return this.getMatchedHealthHistory(snomedCode, pi);
    }

    /**
     * snomedCodeの疾患がage歳以下で診断されている場合その疾患情報を取得する
     * 該当しない場合はnullを返却する。
     * @param {*} snomedCode SNOMEDコード（文字列）
     * @param {*} age 診断時の年齢
     * @param {*} pi personalinfomation
     * @returns 
     */
    static getMHHLessThanOrEqualTo(snomedCode, age, pi){
        // 引数チェック
        if(!FiveDiseaseRiskCommons._isParamCorrect(snomedCode, age, pi)) return null;

        // 判定
        if(!FiveDiseaseRiskCommons.isAgeAtDiagnosisLessThanOrEquaTo(snomedCode, age, pi)) return null;   
        
        // データの取得
        return this.getMatchedHealthHistory(snomedCode, pi);
    }

    /**
     * snomedCodeの疾患がage歳未満で診断されている場合その疾患情報を取得する
     * 該当しない場合はnullを返却する。
     * @param {*} snomedCode SNOMEDコード（文字列）
     * @param {*} age 診断時の年齢
     * @param {*} pi personalinfomation
     * @returns 
     */
    static getMHHLessThan(snomedCode, age, pi){
        // 引数チェック
        if(!FiveDiseaseRiskCommons._isParamCorrect(snomedCode, age, pi)) return null;

        // 判定
        if(!FiveDiseaseRiskCommons.isAgeAtDiagnosisLessThan(snomedCode, age, pi)) return null;   
        
        // データの取得
        return this.getMatchedHealthHistory(snomedCode, pi);
    }

    /**
     * snomedCodeArrayの全ての疾患についてage歳以上で診断されている場合はそれぞれの疾患情報を取得する。
     * 一つでも該当しない場合は空の配列を返却する。
     * @param {*} snomedCodeArray SNOMEDコード（文字列）の配列
     * @param {*} age 診断時の年齢
     * @param {*} pi personalinformation
     * @returns 疾患情報の配列
     */
    static getAllMHHGreaterThanOrEqualTo(snomedCodeArray, age, pi){
        var ret = [];
        // 引数チェック
        if(!FiveDiseaseRiskCommons._isParamCorrect(snomedCode, age, pi)) return ret;

        // 該当する疾患情報を取得する
        for(const snomedCode of snomedCodeArray){
            var history = this.getMHHGreaterThanOrEqualTo(snomedCode, age, pi);
            if(history == null){
                return [];
            }else{
                ret = ret.concat(history);
            }
        }    
        return ret;
    }

    /**
     * snomedCodeArrayの全ての疾患についてage歳より上で診断されている場合はそれぞれの疾患情報を取得する。
     * 一つでも該当しない場合は空の配列を返却する。
     * @param {*} snomedCodeArray SNOMEDコード（文字列）の配列
     * @param {*} age 診断時の年齢
     * @param {*} pi personalinformation
     * @returns 疾患情報の配列
     */
    static getAllMHHGreaterThan(snomedCodeArray, age, pi){
        var ret = [];
        // 引数チェック
        if(!FiveDiseaseRiskCommons._isParamCorrect(snomedCode, age, pi)) return ret;

        // 該当する疾患情報を取得する
        for(const snomedCode of snomedCodeArray){
            var history = this.getMHHGreaterThan(snomedCode, age, pi);
            if(history == null){
                return [];
            }else{
                ret = ret.concat(history);
            }
        }    
        return ret;
    }

    /**
     * snomedCodeArrayの全ての疾患についてage歳以下で診断されている場合はそれぞれの疾患情報を取得する。
     * 一つでも該当しない場合は空の配列を返却する。
     * @param {*} snomedCodeArray SNOMEDコード（文字列）の配列
     * @param {*} age 診断時の年齢
     * @param {*} pi personalinformation
     * @returns 疾患情報の配列
     */
    static getAllMHHLessThanOrEqualTo(snomedCodeArray, age, pi){
        var ret = [];
        // 引数チェック
        if(!FiveDiseaseRiskCommons._isParamCorrect(snomedCode, age, pi)) return ret;

        // 該当する疾患情報を取得する
        for(const snomedCode of snomedCodeArray){
            var history = this.getMHHLessThanOrEqualTo(snomedCode, age, pi);
            if(history == null){
                return [];
            }else{
                ret = ret.concat(history);
            }
        }    
        return ret;
    }

    /**
     * snomedCodeArrayの全ての疾患についてage歳未満で診断されている場合はそれぞれの疾患情報を取得する。
     * 一つでも該当しない場合は空の配列を返却する。
     * @param {*} snomedCodeArray SNOMEDコード（文字列）の配列
     * @param {*} age 診断時の年齢
     * @param {*} pi personalinformation
     * @returns 疾患情報の配列
     */
    static getAllMHHLessThan(snomedCodeArray, age, pi){
        var ret = [];
        // 引数チェック
        if(!FiveDiseaseRiskCommons._isParamCorrect(snomedCode, age, pi)) return ret;

        // 該当する疾患情報を取得する
        for(const snomedCode of snomedCodeArray){
            var history = this.getMHHLessThan(snomedCode, age, pi);
            if(history == null){
                return [];
            }else{
                ret = ret.concat(history);
            }
        }    
        return ret;
    }

    /**
     * snomedCodeArrayのいづれか疾患についてage歳以上で診断されている場合はその疾患情報を取得する。
     * いづれの疾患にも該当しない場合は空の配列を返却する。
     * @param {*} snomedCodeArray SNOMEDコード（文字列）の配列
     * @param {*} age 診断時の年齢
     * @param {*} pi personalinformation
     * @returns 疾患情報の配列
     */
    static getAnyMHHGreaterThanOrEqualTo(snomedCodeArray, age, pi){
        var ret = [];
        // 引数チェック
        if(!FiveDiseaseRiskCommons._isParamCorrect(snomedCode, age, pi)) return ret;

        // 該当する疾患情報を取得する
        for(const snomedCode of snomedCodeArray){
            var history = this.getMHHGreaterThanOrEqualTo(snomedCode, age, pi);
            if(history != null){
                ret = ret.concat(history);
            }
        }    
        return ret;
    }

    /**
     * snomedCodeArrayのいづれか疾患についてage歳より上で診断されている場合はその疾患情報を取得する。
     * いづれの疾患にも該当しない場合は空の配列を返却する。
     * @param {*} snomedCodeArray SNOMEDコード（文字列）の配列
     * @param {*} age 診断時の年齢
     * @param {*} pi personalinformation
     * @returns 疾患情報の配列
     */
    static getAnyMHHGreaterThan(snomedCodeArray, age, pi){
        var ret = [];
        // 引数チェック
        if(!FiveDiseaseRiskCommons._isParamCorrect(snomedCode, age, pi)) return ret;

        // 該当する疾患情報を取得する
        for(const snomedCode of snomedCodeArray){
            var history = this.getMHHGreaterThan(snomedCode, age, pi);
            if(history != null){
                ret = ret.concat(history);
            }
        }    
        return ret;
    }

    /**
     * snomedCodeArrayのいづれか疾患についてage歳以下で診断されている場合はその疾患情報を取得する。
     * いづれの疾患にも該当しない場合は空の配列を返却する。
     * @param {*} snomedCodeArray SNOMEDコード（文字列）の配列
     * @param {*} age 診断時の年齢
     * @param {*} pi personalinformation
     * @returns 疾患情報の配列
     */
    static getAnyMHHLessThanOrEqualTo(snomedCodeArray, age, pi){
        var ret = [];
        // 引数チェック
        if(!FiveDiseaseRiskCommons._isParamCorrect(snomedCode, age, pi)) return ret;

        // 該当する疾患情報を取得する
        for(const snomedCode of snomedCodeArray){
            var history = this.getMHHLessThanOrEqualTo(snomedCode, age, pi);
            if(history != null){
                ret = ret.concat(history);
            }
        }    
        return ret;
    }

    /**
     * snomedCodeArrayのいづれか疾患についてage歳未満で診断されている場合はその疾患情報を取得する。
     * いづれの疾患にも該当しない場合は空の配列を返却する。
     * @param {*} snomedCodeArray SNOMEDコード（文字列）の配列
     * @param {*} age 診断時の年齢
     * @param {*} pi personalinformation
     * @returns 疾患情報の配列
     */
    static getAnyMHHLessThan(snomedCodeArray, age, pi){
        var ret = [];
        // 引数チェック
        if(!FiveDiseaseRiskCommons._isParamCorrect(snomedCodeArray, age, pi)) return ret;

        // 該当する疾患情報を取得する
        for(const snomedCode of snomedCodeArray){
            var history = this.getMHHLessThan(snomedCode, age, pi);
            if(history != null){
                ret = ret.concat(history);
            }
        }    
        return ret;
    }

    /**
     * 近親者で任意の病歴を有する人数とその疾患情報を取得する。
     * 該当しない場合は空の配列を返却する。
     * @param {*} relatives 近親者(文字列の配列)
     * @param {*} snomedCode SNOMEDコード(文字列)
     * @param {*} pi 本人のpersonalinfomation
     * @returns 疾患情報の配列
     */
     static getMHHInRelatives(relatives, snomedCode, pi){
        var ret = [];
        // 引数チェック
        if(!FiveDiseaseRiskCommons._isParamCorrect(relatives, snomedCode, pi)) return ret;

        // 各relativeにおいて該当する疾患情報を取得する
        for(const relative of relatives){
            var disease = this.getMatchedHealthHistory(snomedCode, pi[relative]);
            if(disease != null){
                var obj = {relative : relative, disease : disease};
                ret = ret.concat(obj);
            }
        }
        return ret;
    }

    /**
     * 近親者でsnomedCodeArrayの疾患のいづれかに該当する人と疾患情報を取得する。
     * 該当しない場合は空の配列を返却する。
     * @param {*} relatives 近親者(文字列の配列)
     * @param {*} snomedCodeArray SNOMEDコード(文字列)の配列
     * @param {*} pi 本人のpersonalinfomation
     * @returns 疾患情報の配列
     */
    static getAnyMHHInRelatives(relatives, snomedCodeArray, pi){
        var ret = [];
        // 引数チェック
        if(!FiveDiseaseRiskCommons._isParamCorrect(relatives, snomedCodeArray, pi)) return ret;

        // 各relativeにおいて該当する疾患情報を取得する
        for(const relative of relatives){
            var disease = this.getAnyMatchedHealthHistory(snomedCode, pi[relative]);
            if(disease.length > 0){
                var obj = {relative : relative, disease : disease};
                ret = ret.concat(obj);
            }
        }
        return ret;
    }
    
    /**
     * 近親者でsnomedCodeArrayの疾患の全てに該当する人と疾患情報を取得する。
     * 該当しない場合は空の配列を返却する。
     * @param {*} relatives 近親者(文字列の配列)
     * @param {*} snomedCode SNOMEDコード(文字列)
     * @param {*} age 診断時の年齢
     * @param {*} pi 本人のpersonalinfomation
     * @returns 疾患情報の配列
     */
    static getAllMHHInRelatives(relatives, snomedCode, age, pi){
        var ret = [];
        // 引数チェック
        if(!FiveDiseaseRiskCommons._isParamCorrect(relatives, snomedCodeArray, pi)) return ret;

        // 各relativeにおいて該当する疾患情報を取得する
        for(const relative of relatives){
            var disease = this.getAllMatchedHealthHistory(snomedCode, pi[relative]);
            if(disease.length > 0){
                var obj = {relative : relative, disease : disease};
                ret = ret.concat(obj);
            }
        }
        return ret;
    }

    /**
     * 近親者で任意の病歴を任意の年齢以上で有する人と疾患情報を取得する。
     * 該当しない場合は空の配列を返却する。
     * @param {*} relatives 近親者(文字列の配列)
     * @param {*} snomedCode SNOMEDコード(文字列)
     * @param {*} age 診断時の年齢
     * @param {*} pi 本人のpersonalinfomation
     * @returns 疾患情報の配列
     */
     static getMHHInRelativesGreaterThanOrEqualTo(relatives, snomedCode, age, pi){
        var ret = [];
        // 引数チェック
        if(!FiveDiseaseRiskCommons._isParamCorrect(relatives, snomedCode, age, pi)) return ret;

        // 各relativeにおいて該当する疾患情報を取得する
        for(const relative of relatives){
            var disease = this.getMHHGreaterThanOrEqualTo(snomedCode, age, pi[relative]);
            if(disease != null){
                var obj = {
                    relative : relative,
                    age : FiveDiseaseRiskCommons.bindJudgedAgeAsString(FiveDiseaseRiskCommons.JUDGE_AGE.gtoet, age),
                    disease : disease
                };
                ret = ret.concat(obj);
            }
        }
        return ret;
    }

    /**
     * 近親者で任意の病歴を任意の年齢よりも上で有する人と疾患情報を取得する。
     * 該当しない場合は空の配列を返却する。
     * @param {*} relatives 近親者(文字列の配列)
     * @param {*} snomedCode SNOMEDコード(文字列)
     * @param {*} age 診断時の年齢
     * @param {*} pi 本人のpersonalinfomation
     * @returns 疾患情報の配列
     */
    static getMHHInRelativesGreaterThan(relatives, snomedCode, age, pi){
        var ret = [];
        // 引数チェック
        if(!FiveDiseaseRiskCommons._isParamCorrect(relatives, snomedCode, age, pi)) return ret;

        // 各relativeにおいて該当する疾患情報を取得する
        for(const relative of relatives){
            var disease = this.getMHHGreaterThan(snomedCode, age, pi[relative]);
            if(disease != null){
                var obj = {
                    relative : relative,
                    age : FiveDiseaseRiskCommons.bindJudgedAgeAsString(FiveDiseaseRiskCommons.JUDGE_AGE.gt, age),
                    disease : disease
                };
                ret = ret.concat(obj);
            }
        }
        return ret;
    }

    /**
     * 近親者で任意の病歴を任意の年齢以下で有する人と疾患情報を取得する。
     * 該当しない場合は空の配列を返却する。
     * @param {*} relatives 近親者(文字列の配列)
     * @param {*} snomedCode SNOMEDコード(文字列)
     * @param {*} age 診断時の年齢
     * @param {*} pi 本人のpersonalinfomation
     * @returns 疾患情報の配列
     */
    static getMHHInRelativesLessThanOrEqualTo(relatives, snomedCode, age, pi){
        var ret = [];
        // 引数チェック
        if(!FiveDiseaseRiskCommons._isParamCorrect(relatives, snomedCode, age, pi)) return ret;

        // 各relativeにおいて該当する疾患情報を取得する
        for(const relative of relatives){
            var disease = this.getMHHLessThanOrEqualTo(snomedCode, age, pi[relative]);
            if(disease != null){
                var obj = {
                    relative : relative,
                    age : FiveDiseaseRiskCommons.bindJudgedAgeAsString(FiveDiseaseRiskCommons.JUDGE_AGE.ltoet, age),
                    disease : disease
                };
                ret = ret.concat(obj);
            }
        }
        return ret;
    }

    /**
     * 近親者で任意の病歴を任意の年齢未満で有する人と疾患情報を取得する。
     * 該当しない場合は空の配列を返却する。
     * @param {*} relatives 近親者(文字列の配列)
     * @param {*} snomedCode SNOMEDコード(文字列)
     * @param {*} age 診断時の年齢
     * @param {*} pi 本人のpersonalinfomation
     * @returns 疾患情報の配列
     */
    static getMHHInRelativesLessThan(relatives, snomedCode, age, pi){
        var ret = [];
        // 引数チェック
        if(!FiveDiseaseRiskCommons._isParamCorrect(relatives, snomedCode, age, pi)) return ret;

        // 各relativeにおいて該当する疾患情報を取得する
        for(const relative of relatives){
            var disease = this.getMHHLessThan(snomedCode, age, pi[relative]);
            if(disease != null){
                var obj = {
                    relative : relative,
                    age : FiveDiseaseRiskCommons.bindJudgedAgeAsString(FiveDiseaseRiskCommons.JUDGE_AGE.lt, age),
                    disease : disease
                };
                ret = ret.concat(obj);
            }
        }
        return ret;
    }

    
    /**
     * 近親者のうち、任意の性別で任意の病歴を持つ人と疾患情報を取得する。
     * 該当しない場合は空の配列を返却する。
     * @param {*} relatives 近親者(文字列の配列)
     * @param {*} snomedCode SNOMEDコード(文字列)
     * @param {*} gender 性別
     * @param {*} pi 本人のpersonalinfomation
     * @returns 疾患情報の配列
     */
    static getMHHGenderInRelatives(relatives, snomedCode, gender, pi){
        var ret = [];
        // 引数チェック
        if(!FiveDiseaseRiskCommons._isParamCorrect(relatives, snomedCode, gender, pi)) return ret;

        // 各relativeにおいて該当する疾患情報を取得する
        for(const relative of relatives){
            if(!FiveDiseaseRiskCommons.isGenderMatch(gender, pi[relative])) continue;

            var disease = this.getMatchedHealthHistory(snomedCode, pi[relative]);
            if(disease != null){
                var obj = {relative: relative, gender : gender, disease : disease};
                ret = ret.concat(obj);
            }
        }
        return ret;
    }

    /**
     * 近親者のうち、任意の性別で任意の病歴を任意の年齢以上で有する人と疾患情報を取得する。
     * 該当しない場合は空の配列を返却する。
     * @param {*} relatives 近親者(文字列の配列)
     * @param {*} snomedCode SNOMEDコード(文字列)
     * @param {*} age 診断時の年齢
     * @param {*} pi 本人のpersonalinfomation
     * @returns 疾患情報の配列
     */
    static getMHHGenderInRelativesGreaterThanOrEqualTo(relatives, snomedCode, age, gender, pi){
        var ret = [];
        // 引数チェック
        if(!FiveDiseaseRiskCommons._isParamCorrect(relatives, snomedCode, age, gender, pi)) return ret;

        // 各relativeにおいて該当する疾患情報を取得する
        for(const relative of relatives){
            if(!FiveDiseaseRiskCommons.isGenderMatch(gender, pi[relative])) continue;

            var disease = this.getMHHGreaterThanOrEqualTo(snomedCode, age, pi[relative]);
            if(disease != null){
                var obj = {
                    relative: relative,
                    gender : gender,
                    age: FiveDiseaseRiskCommons.bindJudgedAgeAsString(FiveDiseaseRiskCommons.JUDGE_AGE.gtoet, age),
                    disease : disease
                };
                ret = ret.concat(obj);
            }
        }
        return ret;
    }

    /**
     * 近親者のうち、任意の性別で任意の病歴を任意の年齢より上で有する人と疾患情報を取得する。
     * 該当しない場合は空の配列を返却する。
     * @param {*} relatives 近親者(文字列の配列)
     * @param {*} snomedCode SNOMEDコード(文字列)
     * @param {*} age 診断時の年齢
     * @param {*} pi 本人のpersonalinfomation
     * @returns 疾患情報の配列
     */
    static getMHHGenderInRelativesGreaterThan(relatives, snomedCode, age, gender, pi){
        var ret = [];
        // 引数チェック
        if(!FiveDiseaseRiskCommons._isParamCorrect(relatives, snomedCode, age, gender, pi)) return ret;

        // 各relativeにおいて該当する疾患情報を取得する
        for(const relative of relatives){
            if(!FiveDiseaseRiskCommons.isGenderMatch(gender, pi[relative])) continue;

            var disease = this.getMHHGreaterThan(snomedCode, age, pi[relative]);
            if(disease != null){
                var obj = {
                    relative: relative,
                    gender : gender,
                    age: FiveDiseaseRiskCommons.bindJudgedAgeAsString(FiveDiseaseRiskCommons.JUDGE_AGE.gt, age),
                    disease : disease
                };
                ret = ret.concat(obj);
            }
        }
        return ret;
    }

    /**
     * 近親者のうち、任意の性別で任意の病歴を任意の年齢以下で有する人と疾患情報を取得する。
     * 該当しない場合は空の配列を返却する。
     * @param {*} relatives 近親者(文字列の配列)
     * @param {*} snomedCode SNOMEDコード(文字列)
     * @param {*} age 診断時の年齢
     * @param {*} pi 本人のpersonalinfomation
     * @returns 疾患情報の配列
     */
    static getMHHGenderInRelativesLessThanOrEqualTo(relatives, snomedCode, age, gender, pi){
        var ret = [];
        // 引数チェック
        if(!FiveDiseaseRiskCommons._isParamCorrect(relatives, snomedCode, age, gender, pi)) return ret;

        // 各relativeにおいて該当する疾患情報を取得する
        for(const relative of relatives){
            if(!FiveDiseaseRiskCommons.isGenderMatch(gender, pi[relative])) continue;

            var disease = this.getMHHLessThanOrEqualTo(snomedCode, age, pi[relative]);
            if(disease != null){
                var obj = {
                    relative: relative,
                    gender : gender,
                    age: FiveDiseaseRiskCommons.bindJudgedAgeAsString(FiveDiseaseRiskCommons.JUDGE_AGE.ltoet, age),
                    disease : disease
                };
                ret = ret.concat(obj);
            }
        }
        return ret;
    }

    /**
     * 近親者のうち、任意の性別で任意の病歴を任意の年齢未満で有する人と疾患情報を取得する。
     * 該当しない場合は空の配列を返却する。
     * @param {*} relatives 近親者(文字列の配列)
     * @param {*} snomedCode SNOMEDコード(文字列)
     * @param {*} age 診断時の年齢
     * @param {*} pi 本人のpersonalinfomation
     * @returns 疾患情報の配列
     */
    static getMHHGenderInRelativesLessThan(relatives, snomedCode, age, gender, pi){
        var ret = [];
        // 引数チェック
        if(!FiveDiseaseRiskCommons._isParamCorrect(relatives, snomedCode, age, gender, pi)) return ret;

        // 各relativeにおいて該当する疾患情報を取得する
        for(const relative of relatives){
            if(!FiveDiseaseRiskCommons.isGenderMatch(gender, pi[relative])) continue;

            var disease = this.getMHHLessThan(snomedCode, age, pi[relative]);
            if(disease != null){
                var obj = {
                    relative: relative,
                    gender : gender,
                    age: FiveDiseaseRiskCommons.bindJudgedAgeAsString(FiveDiseaseRiskCommons.JUDGE_AGE.lt, age),
                    disease : disease
                };
                ret = ret.concat(obj);
            }
        }
        return ret;
    }

    /**
     * 近親者のうち、任意の疾患Aに該当かつ任意の疾患Bのいづれかに該当する人と疾患情報を取得する。
     * 該当しない場合は空の配列を返却する。
     * @param {*} relatives 近親者(文字列の配列)
     * @param {*} snomedCode SNOMEDコード(文字列)
     * @param {*} snomedCodeArray SNOMEDコード(文字列)の配列
     * @param {*} pi 本人のpersonalinfomation
     * @returns 疾患情報の配列
     */
    static getMHHAndAnyMHH(relatives, snomedCode, snomedCodeArray, pi){
        var ret = [];
        // 引数チェック
        if(!FiveDiseaseRiskCommons._isParamCorrect(relatives, snomedCode, snomedCodeArray, pi)) return ret;

        // 各relativeにおいて該当する疾患情報を取得する
        for(const relative of relatives){
            // 任意の疾患A(snomedCode)があるかどうか。無い場合はスキップ
            // 任意の疾患B(snomedCodeArray)いづれかに該当するかどうか。無い場合はスキップ
            if(!FiveDiseaseRiskCommons.isDiesaseMatch(snomedCode, pi[relative])
                && !FiveDiseaseRiskCommons.isDiesaseMatchOr(snomedCodeArray, pi[relative])) continue;

            var disease = []
            disease = disease.concat(this.getMatchedHealthHistory(snomedCode, pi[relative]));
            disease = disease.concat(this.getAnyMatchedHealthHistory(snomedCodeArray, pi[relative]));

            if(disease.length > 1){
                var obj = {relative : relative ,disease : disease};
                ret = ret.concat(obj);
            }
        }
        return ret;
    }
}