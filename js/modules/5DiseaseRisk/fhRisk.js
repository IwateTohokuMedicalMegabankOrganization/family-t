import { FiveDiseaseRiskCommons } from '../5DiseaseRisk/5DiseaseRiskCommons';
import { FiveDiseaseRiskCommonsCounter } from '../5DiseaseRisk/5DiseaseRiskCommonsCounter';
import { FiveDiseaseRiskCommonsGetter } from '../5DiseaseRisk/5DiseaseRiskCommonsGetter';
import { FiveDiseaseRiskBase } from '../5DiseaseRisk/5DiseaseRiskBase';
import { RaceUtil, RelativeUtil, CodeUtil, NoteUtil, ValueUtil } from '../xmlTagUtil';

/**
 * 2022/-6/06
 * 
 * 家族性高コレステロール血症FH疾患リスク
 */
export class FhRisk extends FiveDiseaseRiskBase {

    /** 狭心症（冠動脈疾患） */
    ANGINA = 'SNOMED_CT-194828000';
    /** 心筋梗塞（冠動脈疾患） */
    HEART_ATTACK = 'SNOMED_CT-22298006';
    /** 家族性高コレステロール血症 */
    FH = 'SNOMED_CT-238038003';
    /** LDLコレステロールのkey名 */
    KEY_NAME_LDL_CHOLESTEROL = 'ldl_cholesterol';
    /** LDLコレステロールの値 */
    LDL_CHOLESTEROL = 'over180';
    /** 家族性高コレステロール血症リスク判定基準 */
    CRITERIA_F1F4 = [
        '高LDL-C血症（未治療時のLDL-C値180 mg/dL以上）',
        '腱黄色腫（手背，肘，膝等またはアキレス腱肥厚）あるいは皮膚結節性黄色腫',
        'FH あるいは早発性冠動脈疾患の家族歴（2親等以内）※ 早発性冠動脈疾患は男性55歳未満，女性65歳未満と定義する．',
        '※「2項目以上でFHと診断する。FHヘテロ接合体疑いは遺伝子検査による診断が望ましい」'
    ];
    /** 家族性高コレステロール血症リスク判定基準の出典 */
    SOURCE_F1F4 = [
        '慢性冠動脈疾患診断ガイドライン（2018年改訂版） https://www.j-circ.or.jp/cms/wp-content/uploads/2020/02/JCS2018_yamagishi_tamaki.pdf'
    ];
    /** リスク計算対象の疾患名 */
    DISEASE_NAME = '家族性高コレステロール血症';

    /**
     * 家族性高コレステロール血症リスクを計算する。
     * 戻り値はない。
     * リスク計算クラスの内部変数に結果が格納される。
     * @param {*} pi 本人のpersonalInformation
     */
    findOutRisk(pi) {
        this.init();
        if(this._isAppliesToAdultFhHeterozygotesDiagnosticCriteria(pi)){
            this.setCriteria(this.CRITERIA_F1F4);
            this.setSource(this.SOURCE_F1F4);
            this.setMessage(this.getRecommendMessage(this.DISEASE_NAME));
        }
    }

    /**
     * F1-F4：①ー２．【成人（15 歳以上）FH ヘテロ接合体診断基準】p.96
     * 1. 高LDL-C血症（未治療時のLDL-C値180 mg/dL以上）
     * 2. 腱黄色腫（手背，肘，膝等またはアキレス腱肥厚）あるいは皮膚結節性黄色腫
     * 3. FH あるいは早発性冠動脈疾患の家族歴（2親等以内）※ 早発性冠動脈疾患は男性55歳未満，女性65歳未満と定義する．
     * ※「2項目以上でFHと診断する。FHヘテロ接合体疑いは遺伝子検査による診断が望ましい」
     */
    _isAppliesToAdultFhHeterozygotesDiagnosticCriteria(pi) {
        return this._isHyperLDLC(pi) || this._isFhOrHvingPersonWhoOnsetOfCoronaryHeartDiseaseWithinSecondDegreeRelatives(pi);
    }

    /**
     * F1-F4-1：1. 高LDL-C血症（未治療時のLDL-C値180 mg/dL以上）
     * 本人が15歳以上で高LDL-C血症
     */
    _isHyperLDLC(pi) {
        // 引数チェック
        if(!FiveDiseaseRiskCommons._isParamCorrect(pi) 
            || (Object.keys(pi).indexOf(this.KEY_NAME_LDL_CHOLESTEROL)==-1)){
                return false;
        }

        // 15際以上で高LDL-C血症
        if(FiveDiseaseRiskCommons.isAgeGreaterThanOrEqualTo(15,pi)){
            if(pi.ldl_cholesterol == this.LDL_CHOLESTEROL){
                var applicableInfo = {
                    relative : this.SELF,
                    name : pi.name,
                    ldlCholesterol :this.LDL_CHOLESTEROL
                };
                this.pushApplicableInfo(applicableInfo);
                return true;
            }
        }
        return false;
    }

    /**
     * F1-F4-2：2. 腱黄色腫（手背，肘，膝等またはアキレス腱肥厚）あるいは皮膚結節性黄色腫
     * 実装しない。利用しないこと
     */
    _isTendonXanthomaOrCutaneousNodularXanthoma() {
        
    }

    /**
     * F1-F4-3：3. FH あるいは早発性冠動脈疾患の家族歴（2親等以内）※ 早発性冠動脈疾患は男性55歳未満，女性65歳未満と定義する．
     */
    _isFhOrHvingPersonWhoOnsetOfCoronaryHeartDiseaseWithinSecondDegreeRelatives(pi) {
        // 第一度近親者および第二度近親者を取得する。
        var relatives = [];
        relatives = relatives.concat(RelativeUtil.getFirstDegreeRelatives());
        relatives = relatives.concat(RelativeUtil.getSecondDegreeRelatives());

        // 冠動脈疾患があるか
        // 55歳未満の男性
        var age55 = 55;
        var numberOfAnginaMale = 
            FiveDiseaseRiskCommonsCounter.countDiseaseGenderInRelativesLessThan(relatives, this.ANGINA, age55, this.MALE, pi);
        var numberOfHeartAttackMale = 
            FiveDiseaseRiskCommonsCounter.countDiseaseGenderInRelativesLessThan(relatives, this.HEART_ATTACK, age55, this.MALE, pi);

        // 65歳未満の女性
        var age65 = 65;
        var numberOfAnginaFemale = 
            FiveDiseaseRiskCommonsCounter.countDiseaseGenderInRelativesLessThan(relatives, this.ANGINA, age65, this.FEMALE, pi);
        var numberOfHeartAttackFemale = 
            FiveDiseaseRiskCommonsCounter.countDiseaseGenderInRelativesLessThan(relatives, this.HEART_ATTACK, age65, this.FEMALE, pi);

        var numberOfCoronaryArteryDisease = numberOfAnginaMale 
            + numberOfHeartAttackMale 
            + numberOfAnginaFemale 
            + numberOfHeartAttackFemale;
        
        if(numberOfCoronaryArteryDisease > 0){
            var applicableInfoArray = FiveDiseaseRiskCommonsGetter.getMHHGenderInRelativesLessThan(relatives, this.ANGINA, age55, this.MALE, pi);
            applicableInfoArray = applicableInfoArray.concat(
                    FiveDiseaseRiskCommonsGetter.getMHHGenderInRelativesLessThan(relatives, this.HEART_ATTACK, age55, this.MALE, pi)
                );
            applicableInfoArray = applicableInfoArray.concat(
                    FiveDiseaseRiskCommonsGetter.getMHHGenderInRelativesLessThan(relatives, this.ANGINA, age65, this.FEMALE, pi)
                );
            applicableInfoArray = applicableInfoArray.concat(
                    FiveDiseaseRiskCommonsGetter.getMHHGenderInRelativesLessThan(relatives, this.HEART_ATTACK, age65, this.FEMALE, pi)
                );
            this.concatApplicableInfo(applicableInfoArray);
            return true;
        }

        // 家族性高コレステロール血症があるかどうか
        var numberOfFh = FiveDiseaseRiskCommonsCounter.countDiseasePersonInRelatives(relatives, this.FH, pi);
        if(numberOfFh > 0){
            var applicableInfoArray = FiveDiseaseRiskCommonsGetter.getMHHInRelatives(relatives, this.FH, pi);
            this.concatApplicableInfo(applicableInfoArray);
            return true;
        }

        return false;
    }
}