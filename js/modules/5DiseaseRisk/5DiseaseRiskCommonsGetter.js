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
     * 病気に該当する人を取得する。本人も含める。
     * @param {*} relatives 近親者(文字列の配列)
     * @param {*} snomedCode SNOMEDコード
     * @param {*} pi 本人のpersonalInformation
     */
     static getPersonMatcheDiseaseInRelative(relatives,snomedCode, pi){
        var persons = {};
        if(!FiveDiseaseRiskCommons._isParamCorrect(relatives, snomedCode, pi)) return persons;

        // 本人がマッチするか
        if(FiveDiseaseRiskCommons.isDiesaseMatch(snomedCode, pi)){
            persons["self"] = pi;
        }

        // 家族がマッチするか
        for(const relative of relatives){
            if(FiveDiseaseRiskCommons.isDiesaseMatch(snomedCode, pi[relative])){
                persons[relative] = pi[relative];
            }
        }
        return persons;
    }

    /**
     * 全ての病気に該当する人を取得する。本人も含める。
     * @param {*} relatives 近親者(文字列の配列)
     * @param {*} snomedCodeArray SNOMEDコードの配列
     * @param {*} pi 本人のpersonalInformation
     */
    static getPersonMatcheDiseaseAndInRelative(relatives,snomedCodeArray, pi){
        var persons = {};
        if(!FiveDiseaseRiskCommons._isParamCorrect(relatives, snomedCodeArray, pi)) return persons;

        // 本人がマッチするか
        if(FiveDiseaseRiskCommons.isDiesaseMatchAnd(snomedCodeArray, pi)){
            persons["self"] = pi;
        }

        // 家族がマッチするか
        for(const relative of relatives){
            if(FiveDiseaseRiskCommons.isDiesaseMatchAnd(snomedCodeArray, pi[relative])){
                persons[relative] = pi[relative];
            }
        }
        return persons;
    }

    /**
     * 何れかの病気に該当する人を取得する。本人も含める。
     * @param {*} relatives 近親者(文字列の配列)
     * @param {*} snomedCodeArray SNOMEDコードの配列
     * @param {*} pi 本人のpersonalInformation
     */
    static getPersonMatcheDiseaseOrInRelative(relatives,snomedCodeArray, pi){
        var persons = {};
        if(!FiveDiseaseRiskCommons._isParamCorrect(relatives, snomedCodeArray, pi)) return persons;

        // 本人がマッチするか
        if(FiveDiseaseRiskCommons.isDiesaseMatchOr(snomedCodeArray, pi)){
            persons["self"] = pi;
        }

        // 家族がマッチするか
        for(const relative of relatives){
            if(FiveDiseaseRiskCommons.isDiesaseMatchAnd(snomedCodeArray, pi[relative])){
                persons[relative] = pi[relative];
            }
        }
        return persons;
    }
}