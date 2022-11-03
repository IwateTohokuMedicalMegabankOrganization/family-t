import { FiveDiseaseRiskCommons } from '../5DiseaseRisk/5DiseaseRiskCommons';
import { FiveDiseaseRiskCommonsCounter } from '../5DiseaseRisk/5DiseaseRiskCommonsCounter';
import { FiveDiseaseRiskBase } from '../5DiseaseRisk/5DiseaseRiskBase';
import { RaceUtil, RelativeUtil, CodeUtil, NoteUtil, ValueUtil } from '../xmlTagUtil';

/**
 * 2022/-6/06
 * 
 * 家族性高コレステロール血症FH疾患リスク
 */
export class FhRisk extends FiveDiseaseRiskBase {
    findOutRisk(pi) {
        return this._isAppliesToAdultFhHeterozygotesDiagnosticCriteria(pi);
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
            || (Object.keys(pi).indexOf('ldl_cholesterol')==-1)){
                return false;
        }

        // 15際以上で高LDL-C血症
        if(FiveDiseaseRiskCommons.isAgeGreaterThanOrEqualTo(15,pi)){
            if(pi.ldl_cholesterol == 'over180'){
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
        var numberOfAnginaMale = 
            FiveDiseaseRiskCommonsCounter.countDiseaseGenderInRelativesLessThan(relatives, 'SNOMED_CT-194828000', 55, 'MALE', pi);
        var numberOfHeartAttackMale = 
            FiveDiseaseRiskCommonsCounter.countDiseaseGenderInRelativesLessThan(relatives, 'SNOMED_CT-22298006', 55, 'MALE', pi);

        // 65歳未満の女性
        var numberOfAnginaFemale = 
            FiveDiseaseRiskCommonsCounter.countDiseaseGenderInRelativesLessThan(relatives, 'SNOMED_CT-194828000', 65, 'FEMALE', pi);
        var numberOfHeartAttackFemale = 
            FiveDiseaseRiskCommonsCounter.countDiseaseGenderInRelativesLessThan(relatives, 'SNOMED_CT-22298006', 65, 'FEMALE', pi);

        var numberOfCoronaryArteryDisease = numberOfAnginaMale 
            + numberOfHeartAttackMale 
            + numberOfAnginaFemale 
            + numberOfHeartAttackFemale;
        
        if(numberOfCoronaryArteryDisease > 0){
            return true;
        }

        // 家族性高コレステロール血症があるかどうか
        var numberOfFh = FiveDiseaseRiskCommonsCounter.countDiseasePersonInRelatives(relatives, 'SNOMED_CT-238038003', pi);
        if(numberOfFh > 0){
            return true;
        }

        return false;
    }
}