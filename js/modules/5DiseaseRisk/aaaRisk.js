 import { FiveDiseaseRiskCommons } from '../5DiseaseRisk/5DiseaseRiskCommons';
 import { FiveDiseaseRiskCommonsCounter } from '../5DiseaseRisk/5DiseaseRiskCommonsCounter';
 import { FiveDiseaseRiskCommonsGetter } from '../5DiseaseRisk/5DiseaseRiskCommonsGetter';
 import { FiveDiseaseRiskBase } from '../5DiseaseRisk/5DiseaseRiskBase';
 import { RaceUtil, RelativeUtil, CodeUtil, NoteUtil, ValueUtil } from '../xmlTagUtil';

 /**
 * 2022/-6/06
 * 
 * 腹部大動脈瘤AAA疾患リスク
 */
export class AaaRisk extends FiveDiseaseRiskBase {

    /** 腹部大動脈瘤 */
    ABDOMINAL_AORTIC_ANEURYSM = 'SNOMED_CT-75878002';
    /** 喫煙者状況インデックス */
    SMOKER_INDEX = "5";
    /** 現在も喫煙している */
    CURRENT_SMOKER = 'current_smoker';

    findOutRisk(pi) {
        this.init();
        return this._isSmokingOrHavingPersonWhoHasAaaWithinFirstDegreeRelatives(pi);
    }

    /**
     * A1~A3：65歳以上の男性や65歳以上の喫煙女性，第一度近親者に家族歴を有する者
     */
    _isSmokingOrHavingPersonWhoHasAaaWithinFirstDegreeRelatives(pi) {
        // 65歳以上の男性
        var age = 65;
        if(FiveDiseaseRiskCommons.isAgeGreaterThanOrEqualTo(age, pi)
            && FiveDiseaseRiskCommons.isGenderMatch(this.MALE, pi)){
            var applicableInfo = {
                relative : this.SELF,
                gender : this.MALE,
                age : FiveDiseaseRiskCommons.bindJudgedAgeAsString(FiveDiseaseRiskCommons.JUDGE_AGE.gtoet, age)
            };
            this.pushApplicableInfo(applicableInfo);
            return true;
        }

        // 65歳以上で現在喫煙中の女性
        if(FiveDiseaseRiskCommons.isAgeGreaterThanOrEqualTo(65, pi)
            && FiveDiseaseRiskCommons.isGenderMatch(this.FEMALE, pi)
            && pi.smoker==this.SMOKER_INDEX){
            var applicableInfo = {
                relative : this.SELF,
                gender : this.FEMALE,
                age : FiveDiseaseRiskCommons.bindJudgedAgeAsString(FiveDiseaseRiskCommons.JUDGE_AGE.gtoet, age),
                smoker : this.CURRENT_SMOKER
            };
            this.pushApplicableInfo(applicableInfo);
            return true;
        }

        // 第一度近親者に腹部大動脈瘤の病歴がある
        var relatives = RelativeUtil.getFirstDegreeRelatives();
        var numberOfPerson = FiveDiseaseRiskCommonsCounter.countDiseasePersonInRelatives(relatives, this.ABDOMINAL_AORTIC_ANEURYSM, pi);

        if(numberOfPerson >= 1){
            var applicableInfoArray = FiveDiseaseRiskCommonsGetter.getMHHInRelatives(relatives, this.ABDOMINAL_AORTIC_ANEURYSM, pi);
            this.concatApplicableInfo(applicableInfoArray);
            return true;
        }
        return false;
    }
}