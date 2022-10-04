/**
 * 2022/06/06
 * 
 * リンチ症候群（遺伝性非ポリポーシス大腸がん）HNPCC疾患リスク
 */
 import { FiveDiseaseRiskCommons } from '../5DiseaseRisk/5DiseaseRiskCommons';
 import { FiveDiseaseRiskBase } from '../5DiseaseRisk/5DiseaseRiskBase';
 import { RaceUtil, RelativeUtil, CodeUtil, NoteUtil, ValueUtil } from '../xmlTagUtil';

export class HnpccRisk extends FiveDiseaseRiskBase {
    appliesToAmsterdamStanderd2(pi) {
        // 疾患に該当する人を配列で取得する
        var piArray = FiveDiseaseRiskCommons.getDiseasePerson(diseaseCodeArray, pi);
        if(piArray.length < 3){
            return false;
        }

        // アムステルダム基準Ⅱ（1999）に該当するか判定する
        return this._areOver3PersonOnsetOfHnpcc(piArray);
    }

    appliesToTheRevisedBethesdaGuideline2004(pi) {

    }

    appliesToUniversalScreening(pi) {

    }

    /**
     * C1：少なくとも3人の血縁者がHNPCC（リンチ症候群）関連腫瘍（大腸癌，子宮内膜癌，腎盂・尿管癌，小腸癌）に罹患しており，以下のすべてを満たしている。
     *  1．1人の罹患者はその他の2人に対して第1度近親者である。
     *  2．少なくとも連続する2世代で罹患している。
     *  3．少なくとも1人の癌は50歳未満で診断されている。
     *  4．腫瘍は病理学的に癌であることが確認されている。
     *  5．FAPが除外されている。
     */
    _areOver3PersonOnsetOfHnpcc(piArray) {
        return this._isOnePersonBelongToFirstDegreeRelatives(piArray)
            && this._isOnsetFor2ConsecutiveGenerations(piArray)
            && this._isOnePersonOnsetOfHnpccAtlessThan50YearsOlds(piArray)
            && this._isPolypDetectedAsCanser(piArray)
            && this._isFapExcluded(piArray);
    }

    /**
     * C1-1：1．1人の罹患者はその他の2人に対して第1度近親者である。
     */
     _isOnePersonBelongToFirstDegreeRelatives(piArray) {

    }

    /**
     * C1-2：2．少なくとも連続する2世代で罹患している。
     */
     _isOnsetFor2ConsecutiveGenerations(piArray) {

    }

    /**
     * C1-3：3．少なくとも1人の癌は50歳未満で診断されている。
     */
     _isOnePersonOnsetOfHnpccAtlessThan50YearsOlds(piArray) {

    }

    /**
     * C1-4：4．腫瘍は病理学的に癌であることが確認されている。※実装無のため常にtrueを返す。
     */
     _isPolypDetectedAsCanser(piArray) {
        return true;
    }

    /**
     * C1-5：5．FAPが除外されている。※実装無のため常にtrueを返す。
     */
     _isFapExcluded(piArray) {
        return true;
    }

    /**
     * C2：本人が大腸がん患者かつ、50歳未満で診断された大腸癌
     */
    _isOnsetOfColorectalCancerAtLessThanOrEqualTo45YearsOld() {

    }

    /**
     * C3：本人が大腸がん患者かつ、年齢に関わりなく，同時性あるいは異時性大腸癌あるいはその他のリンチ症候群関連腫瘍＊がある。
     * ＊：大腸癌，子宮内膜癌，胃癌，卵巣癌，膵癌，胆道癌，小腸癌，腎盂・尿管癌，脳腫瘍（通常はターコット症候群にみられるglioblastoma），ムア・トレ症候群の皮脂腺腫や角化棘細胞腫
     */
     _isOnsetOfColorectalCancerAndHnpcc() {

    }

    /**
     * C5：本人が大腸がん患者かつ、第1度近親者が1人以上リンチ症候群関連腫瘍に罹患しており，そのうち一つは50歳未満で診断された大腸癌
     */
     _isOnsetOfColorectalCancerAndOnePersonOnsetOfHnpccAtLessThan50YearsOld() {

    }

    /**
     * C6：本人が大腸がん患者かつ、年齢に関わりなく，第1度あるいは第2度近親者の2人以上がリンチ症候群関連腫瘍と診断されている患者の大腸癌
     */
     _isOnsetOfColorectalCancer() {

    }

    /**
     * C7：全て（あるいは 70 歳以下）の大腸癌、子宮内膜がん
     */
     _isOnsetOfColorectalOrEndometrialCancer() {

    }
}