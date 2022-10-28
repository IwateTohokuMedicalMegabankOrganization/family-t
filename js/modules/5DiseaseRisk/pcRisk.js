/**
 * 2022/06/06
 * 
 * 前立腺がん疾患リスク
 */

import { FiveDiseaseRiskCommons } from '../5DiseaseRisk/5DiseaseRiskCommons';
import { FiveDiseaseRiskCommonsCounter } from '../5DiseaseRisk/5DiseaseRiskCommonsCounter';
import { FiveDiseaseRiskBase } from '../5DiseaseRisk/5DiseaseRiskBase';
import { RaceUtil, RelativeUtil, CodeUtil, NoteUtil, ValueUtil } from '../xmlTagUtil';

export class PcRisk extends FiveDiseaseRiskBase {
    recomendInspectProstateCancer(pi) {
        return this._hasPersonOnsetOfProstateCanserWithinFirstDegreeRelaives(pi);
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
        if(FiveDiseaseRiskCommons.isAgeGreaterThanOrEqualTo(40, pi)) return true;

        // 第一
        var relative = RelativeUtil.getFirstDegreeRelatives();
        return FiveDiseaseRiskCommonsCounter.countDiseasePersonInRelatives(relative, 'SNOMED_CT-399068003', pi) >= 1;
    }
}