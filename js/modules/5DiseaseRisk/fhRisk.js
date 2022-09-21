/**
 * 2022/-6/06
 * 
 * 家族性高コレステロール血症FH疾患リスク
 */
import { FiveDiseaseRiskCommons } from '../5DiseaseRisk/5DiseaseRiskCommons';
import { FiveDiseaseRiskBase } from '../5DiseaseRisk/5DiseaseRiskBase';
import { RaceUtil, RelativeUtil, CodeUtil, NoteUtil, ValueUtil } from '../xmlTagUtil';

export class FhRisk extends FiveDiseaseRiskBase {
    inspectionAndRiskManagementAccordingToFH() {

    }

    /**
     * F1-F4：①ー２．【成人（15 歳以上）FH ヘテロ接合体診断基準】p.96
     * 1. 高LDL-C血症（未治療時のLDL-C値180 mg/dL以上）
     * 2. 腱黄色腫（手背，肘，膝等またはアキレス腱肥厚）あるいは皮膚結節性黄色腫
     * 3. FH あるいは早発性冠動脈疾患の家族歴（2親等以内）※ 早発性冠動脈疾患は男性55歳未満，女性65歳未満と定義する．
     * ※「2項目以上でFHと診断する。FHヘテロ接合体疑いは遺伝子検査による診断が望ましい」
     */
    _isAppliesToAdultFhHeterozygotesDiagnosticCriteria() {

    }

    /**
     * F1-F4-1：1. 高LDL-C血症（未治療時のLDL-C値180 mg/dL以上）
     * 本人が15歳以上で高LDL-C血症
     */
    _isHyperLDLC() {
        
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
    _isFhOrHvingPersonWhoOnsetOfCoronaryHeartDiseaseWithinSecondDegreeRelatives() {
        
    }
}