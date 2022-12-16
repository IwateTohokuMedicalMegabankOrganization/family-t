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
    /** 腹部大動脈瘤リスク判定基準 */
    CRITERIA_A1A3 = [
        '65歳以上の男性や65歳以上の喫煙女性，第一度近親者に家族歴を有する者'
    ];
    /** 腹部大動脈瘤リスク判定基準の出典 */
    SOURCE_A1A3 = [
        '2020年改訂版 大動脈瘤・大動脈解離診療ガイドライン https://www.j-circ.or.jp/cms/wp-content/uploads/2020/07/JCS2020_Ogino.pdf',
        '2020年改訂版　大動脈瘤・大動脈解離診療ガイドライン—腹部— https://www.jstage.jst.go.jp/article/jsvs/30/4/30_21-00018/_pdf/-char/ja'
    ];
    /** リスク計算対象の疾患名 */
    DISEASE_NAME = '腹部大動脈瘤';

    /**
     * 腹部大動脈瘤リスクを計算する。
     * 戻り値はない。
     * リスク計算クラスの内部変数に結果が格納される。
     * @param {*} pi 本人のpersonalInformation
     */
    findOutRisk(pi) {
        this.init();
        if(this._isSmokingOrHavingPersonWhoHasAaaWithinFirstDegreeRelatives(pi)){
            this.setCriteria(this.CRITERIA_A1A3);
            this.setSource(this.SOURCE_A1A3);
            this.setMessage(this.getConsiderMessage(this.DISEASE_NAME));
        }
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
                name : pi.name,
                gender : this.MALE,
                //age : FiveDiseaseRiskCommons.bindJudgedAgeAsString(FiveDiseaseRiskCommons.JUDGE_AGE.gtoet, age)
                age : FiveDiseaseRiskCommons.getAge(pi)
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
                name : pi.name,
                gender : this.FEMALE,
                //age : FiveDiseaseRiskCommons.bindJudgedAgeAsString(FiveDiseaseRiskCommons.JUDGE_AGE.gtoet, age),
                age : FiveDiseaseRiskCommons.getAge(pi),
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