 import { FiveDiseaseRiskCommons } from '../5DiseaseRisk/5DiseaseRiskCommons';
 import { FiveDiseaseRiskCommonsCounter } from '../5DiseaseRisk/5DiseaseRiskCommonsCounter';
 import { FiveDiseaseRiskBase } from '../5DiseaseRisk/5DiseaseRiskBase';
 import { RaceUtil, RelativeUtil, CodeUtil, NoteUtil, ValueUtil } from '../xmlTagUtil';

 /**
 * 2022/-6/06
 * 
 * 腹部大動脈瘤AAA疾患リスク
 */
export class AaaRisk extends FiveDiseaseRiskBase {
    findOutRisk(pi) {
        return this._isSmokingOrHavingPersonWhoHasAaaWithinFirstDegreeRelatives(pi);
    }

    /**
     * A1~A3：65歳以上の男性や65歳以上の喫煙女性，第一度近親者に家族歴を有する者
     */
    _isSmokingOrHavingPersonWhoHasAaaWithinFirstDegreeRelatives(pi) {
        // 65歳以上の男性
        if(FiveDiseaseRiskCommons.isAgeGreaterThanOrEqualTo(65, pi)
            && FiveDiseaseRiskCommons.isGenderMatch("MALE", pi)){
            return true;
        }

        // 65歳以上で現在喫煙中の女性
        if(FiveDiseaseRiskCommons.isAgeGreaterThanOrEqualTo(65, pi)
            && FiveDiseaseRiskCommons.isGenderMatch("FEMALE", pi)
            && pi.smoker=="5"){
            return true;
        }

        // 第一度近親者に腹部大動脈瘤の病歴がある
        var relatives = RelativeUtil.getFirstDegreeRelatives();
        var numberOfPerson = FiveDiseaseRiskCommonsCounter.countDiseasePersonInRelatives(relatives, 'SNOMED_CT-75878002', pi);

        if(numberOfPerson >= 1){
            return true;
        }
        return false;
    }
}