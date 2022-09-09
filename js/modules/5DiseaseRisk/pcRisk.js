/**
 * 2022/06/06
 * 
 * 前立腺がん疾患リスク
 */
export class PcRisk extends FiveDiseaseRiskBase {
    recomendInspectProstateCancer() {

    }

    /**
     * P1：CQ5.「人間ドック等の受益者負担による検診においては，前立腺癌の家族歴を有する場合には40歳代からの受診を推奨し…」
     * ◆CQ4. 日本での疫学調査により「第1度近親者に1人の前立腺癌患者がいる場合の罹患リスクは5.6倍（95％CI：1.5〜20.5）と有意差を認めた」
     */
    _hasPersonOnsetOfProstateCanserWithinFirstDegreeRelaives() {

    }
}