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
     * @param {*} disease_code 
     * @param {*} pi 
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
     * @param {*} pi 
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
     * Personal Informationの年齢がage以上かどうか判定する。
     * 厳密な判定ははどうする？
     * @param {*} age 
     * @param {*} pi 
     */
    static isAgeGreaterThanOrEqualTo(age, pi) {

    }

    /**
     * Personal Informationの年齢がageより上かどうか判定する。
     * @param {*} age 
     * @param {*} pi 
     */
    static isAgeGreaterThan(age, pi) {

    }

    /**
     * Personal Informationの年齢がage以下かどうか判定する。
     * @param {*} age 
     * @param {*} pi 
     */
    static isAgeLessThanOrEquaTo(age, pi) {

    }

    /**
     * Personal Informationの年齢がageより下かどうか判定する。
     * @param {*} age 
     * @param {*} pi 
     */
    static isAgeLessThan(age, pi) {

    }

    /**
     * Personal Informationにdisease_nameと合致する疾患があるか判定する。
     * @param {*} disease_name 
     * @param {*} pi 
     */
    static isDiesaseMatch(disease_name, pi) {

    }

    /**
     * Personal Informationの性別がgenderと合致するか判定する。
     * @param {*} gender 
     * @param {*} pi 
     */
    static isGenderMatch(gender, pi) {

    }
}