import { EstimatedAgeValue } from  '../xmlTag';
import { RaceUtil, RelativeUtil, CodeUtil, NoteUtil, ValueUtil } from '../xmlTagUtil';
import { FiveDiseaseRiskCommons } from './5DiseaseRiskCommons';

/**
 * 2022/10/21
 * 
 * 5疾患リスク計算共通クラス。カウンターを提供する。
 */
export class FiveDiseaseRiskCommonsCounter {

    /**
     * 近親者で任意の病歴を有する人数を数える。
     * @param {*} relatives 近親者(文字列の配列)
     * @param {*} snomedCode SNOMEDコード(文字列)
     * @param {*} pi 本人のpersonalinfomation
     */
    static countDiseasePersonInRelatives(relatives, snomedCode, pi){
        if(!FiveDiseaseRiskCommons._isParamCorrect(relatives, snomedCode, pi)) return 0;

        var count = 0;

        for(const relative of relatives){
            if(FiveDiseaseRiskCommons.isDiesaseMatch(snomedCode, pi[relative])){
                count++;
            }
        }
        return count;
    }

    static countAllDiseasePersonInRelatives(relatives, snomedCodeArray, pi){}
    static countAnyDiseasePersonInRelatives(relatives, snomedCodeArray, pi){}

    
    /**
     * 近親者で任意の病歴を任意の年齢以上で有する人数を数える。
     * @param {*} relatives 近親者(文字列の配列)
     * @param {*} snomedCode SNOMEDコード(文字列)
     * @param {*} age 診断時の年齢
     * @param {*} pi 本人のpersonalinfomation
     */
    static countDiseasePersonInRelativesGreaterThanOrEqualTo(relatives, snomedCode, age, pi){
        if(!FiveDiseaseRiskCommons._isParamCorrect(relatives, snomedCode, age, pi)) return 0;

        var count = 0;

        for(const relative of relatives){
            if(FiveDiseaseRiskCommons.isAgeAtDiagnosisGreaterThanOrEqualTo(snomedCode, age, pi[relative])){
                count++;
            }
        }
        return count;
    }

    /**
     * 近親者で任意の病歴を任意の年齢よりも上で有する人数を数える。
     * @param {*} relatives 近親者(文字列の配列)
     * @param {*} snomedCode SNOMEDコード(文字列)
     * @param {*} age 診断時の年齢
     * @param {*} pi 本人のpersonalinfomation
     */
    static countDiseasePersonInRelativesGreaterThan(relatives, snomedCode, age, pi){
        if(!FiveDiseaseRiskCommons._isParamCorrect(relatives, snomedCode, age, pi)) return 0;

        var count = 0;

        for(const relative of relatives){
            if(FiveDiseaseRiskCommons.isAgeAtDiagnosisGreaterThan(snomedCode, age, pi[relative])){
                count++;
            }
        }
        return count;
    }

    /**
     * 近親者で任意の病歴を任意の年齢以下で有する人数を数える。
     * @param {*} relatives 近親者(文字列の配列)
     * @param {*} snomedCode SNOMEDコード(文字列)
     * @param {*} age 診断時の年齢
     * @param {*} pi 本人のpersonalinfomation
     */
    static countDiseasePersonInRelativesLessThanOrEqualTo(relatives, snomedCode, age, pi){
        if(!FiveDiseaseRiskCommons._isParamCorrect(relatives, snomedCode, age, pi)) return 0;

        var count = 0;

        for(const relative of relatives){
            if(FiveDiseaseRiskCommons.isAgeAtDiagnosisLessThanOrEquaTo(snomedCode, age, pi[relative])){
                count++;
            }
        }
        return count;
    }

    /**
     * 近親者で任意の病歴を任意の年齢未満で有する人数を数える。
     * @param {*} relatives 近親者(文字列の配列)
     * @param {*} snomedCode SNOMEDコード(文字列)
     * @param {*} age 診断時の年齢
     * @param {*} pi 本人のpersonalinfomation
     */
    static countDiseasePersonInRelativesLessThan(relatives, snomedCode, age, pi){
        if(!FiveDiseaseRiskCommons._isParamCorrect(relatives, snomedCode, age, pi)) return 0;

        var count = 0;

        for(const relative of relatives){
            if(FiveDiseaseRiskCommons.isAgeAtDiagnosisLessThan(snomedCode, age, pi[relative])){
                count++;
            }
        }
        return count;
    }

    
    /**
     * 近親者のうち、任意の性別で任意の病歴を持つ人数を数える。
     * @param {*} relatives 近親者(文字列の配列)
     * @param {*} snomedCode SNOMEDコード(文字列)
     * @param {*} gender 性別
     * @param {*} pi 本人のpersonalinfomation
     */
     static countDiseaseGenderInRelatives(relatives, snomedCode, gender, pi){
        if(!FiveDiseaseRiskCommons._isParamCorrect(relatives, snomedCode, gender, pi)) return 0;

        var count = 0;

        for(const relative of relatives){
            if(FiveDiseaseRiskCommons.areDiseaseAndGenderMatch(snomedCode, gender, pi[relative])){
                count++;
            }
        }
        return count;
    }

    /**
     * 近親者のうち、任意の性別で任意の病歴を任意の年齢以上で有する人数を数える。
     * @param {*} relatives 近親者(文字列の配列)
     * @param {*} snomedCode SNOMEDコード(文字列)
     * @param {*} age 診断時の年齢
     * @param {*} pi 本人のpersonalinfomation
     */
    static countDiseaseGenderInRelativesGreaterThanOrEqualTo(relatives, snomedCode, age, gender, pi){
        if(!FiveDiseaseRiskCommons._isParamCorrect(relatives, snomedCode, age, gender, pi)) return 0;

        var count = 0;

        for(const relative of relatives){
            if(FiveDiseaseRiskCommons.areGenderMatchAndAgeAtDiagnosisGreaterThanOrEqualTo(snomedCode, age, gender, pi[relative])){
                count++;
            }
        }
        return count;
    }

    /**
     * 近親者のうち、任意の性別で任意の病歴を任意の年齢より上で有する人数を数える。
     * @param {*} relatives 近親者(文字列の配列)
     * @param {*} snomedCode SNOMEDコード(文字列)
     * @param {*} age 診断時の年齢
     * @param {*} pi 本人のpersonalinfomation
     */
    static countDiseaseGenderInRelativesGreaterThan(relatives, snomedCode, age, gender, pi){
        if(!FiveDiseaseRiskCommons._isParamCorrect(relatives, snomedCode, age, gender, pi)) return 0;

        var count = 0;

        for(const relative of relatives){
            if(FiveDiseaseRiskCommons.areGenderMatchAndAgeAtDiagnosisGreaterThan(snomedCode, age, gender, pi[relative])){
                count++;
            }
        }
        return count;
    }

    /**
     * 近親者のうち、任意の性別で任意の病歴を任意の年齢以下で有する人数を数える。
     * @param {*} relatives 近親者(文字列の配列)
     * @param {*} snomedCode SNOMEDコード(文字列)
     * @param {*} age 診断時の年齢
     * @param {*} pi 本人のpersonalinfomation
     */
    static countDiseaseGenderInRelativesLessThanOrEqualTo(relatives, snomedCode, age, gender, pi){
        if(!FiveDiseaseRiskCommons._isParamCorrect(relatives, snomedCode, age, gender, pi)) return 0;

        var count = 0;

        for(const relative of relatives){
            if(FiveDiseaseRiskCommons.areGenderMatchAndAgeAtDiagnosisLessThanOrEqualTo(snomedCode, age, gender, pi[relative])){
                count++;
            }
        }
        return count;
    }

    /**
     * 近親者のうち、任意の性別で任意の病歴を任意の年齢未満で有する人数を数える。
     * @param {*} relatives 近親者(文字列の配列)
     * @param {*} snomedCode SNOMEDコード(文字列)
     * @param {*} age 診断時の年齢
     * @param {*} pi 本人のpersonalinfomation
     */
    static countDiseaseGenderInRelativesLessThan(relatives, snomedCode, age, gender, pi){
        if(!FiveDiseaseRiskCommons._isParamCorrect(relatives, snomedCode, age, gender, pi)) return 0;

        var count = 0;

        for(const relative of relatives){
            if(FiveDiseaseRiskCommons.areGenderMatchAndAgeAtDiagnosisLessThan(snomedCode, age, gender, pi[relative])){
                count++;
            }
        }
        return count;
    }

}