import { FiveDiseaseRiskCommons } from '../5DiseaseRisk/5DiseaseRiskCommons';
import { FiveDiseaseRiskCommonsCounter } from '../5DiseaseRisk/5DiseaseRiskCommonsCounter';
import { FiveDiseaseRiskCommonsGetter } from '../5DiseaseRisk/5DiseaseRiskCommonsGetter';
import { FiveDiseaseRiskBase } from '../5DiseaseRisk/5DiseaseRiskBase';
import { RaceUtil, RelativeUtil, CodeUtil, NoteUtil, ValueUtil } from '../xmlTagUtil';

/**
 * 2022/06/06
 * 
 * 前立腺がん疾患リスク
 */
export class PcRisk extends FiveDiseaseRiskBase {

    ALERT = '以下に該当する場合、ガイドライン等で前立腺がんである可能性や、診断のための遺伝学的検査が考慮または推奨されています。';
    NO_RISK = '前立腺がんのリスクは低いと考えられます。';

    findOutRisk(pi) {
        this.init();
        // 前立腺がん疾患リスクを判定する
        if(this._hasPersonOnsetOfProstateCanserWithinFirstDegreeRelaives(pi)){            
            // 該当する場合のアラート文を設定する
            this.MESSAGE = this.ALERT;
        } else {
            // 該当しない場合のアラート文を設定する
            this.MESSAGE = this.NO_RISK;
        }        
    }

    /**
     * P1：CQ5.「人間ドック等の受益者負担による検診においては，前立腺癌の家族歴を有する場合には40歳代からの受診を推奨し…」
     * ◆CQ4. 日本での疫学調査により「第1度近親者に1人の前立腺癌患者がいる場合の罹患リスクは5.6倍（95％CI：1.5〜20.5）と有意差を認めた」
     */
    _hasPersonOnsetOfProstateCanserWithinFirstDegreeRelaives(pi) {
        if(!FiveDiseaseRiskCommons._isParamCorrect(pi)) return false;

        // 本人が女性かどうか判断する。
        if(FiveDiseaseRiskCommons.isGenderMatch("FEMALE", pi)) return false;

        // 本人が40歳以上
        if(FiveDiseaseRiskCommons.isAgeGreaterThanOrEqualTo(40, pi)){
            var applicableInfo = {'relative' : 'self', 'gender':'FEMALE', 'age':'greater_than_or_equal_to_40'};
            this.pushApplicableInfo(applicableInfo);
            return true;
        }

        // 第一
        var relatives = RelativeUtil.getFirstDegreeRelatives();
        var count = FiveDiseaseRiskCommonsCounter.countDiseasePersonInRelatives(relatives, 'SNOMED_CT-399068003', pi);
        if(count >= 1){
            var applicableInfoArray = FiveDiseaseRiskCommonsGetter.getMHHInRelatives(relatives, 'SNOMED_CT-399068003', pi)
            this.concatApplicableInfo(applicableInfoArray);
            return true;
        }
        return false;
    }
}