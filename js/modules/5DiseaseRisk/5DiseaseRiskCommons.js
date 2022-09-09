/**
 * 2022/06/06 
 * 
 * 5疾患リスク計算の基底クラス
 */
import { EstimatedAgeValue } from  '../xmlTag';

 export class FiveDiseaseRiskCommons {

    constructor(){

    }

    /**
     * 健康歴から疾患名を取得する。取得できない場合はnullを返す。
     * @param {*} disease_name 
     * @param {*} pi 
     */
    static getDisease(disease_name, pi) {

    }

    /**
     * Personal Informationからrelativeに合致する健康歴を取得する。
     * relativesに空文字が設定された場合は本人の健康歴を取得する。
     * 取得できない場合はnullを返す。
     * @param {*} relatives 
     * @param {*} pi 
     */
    static getHealthHistory(relatives, pi) {

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