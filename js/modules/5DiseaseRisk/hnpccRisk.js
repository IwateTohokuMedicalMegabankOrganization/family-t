/**
 * 2022/06/06
 * 
 * リンチ症候群（遺伝性非ポリポーシス大腸がん）HNPCC疾患リスク
 */
 import { FiveDiseaseRiskCommons } from '../5DiseaseRisk/5DiseaseRiskCommons';
 import { FiveDiseaseRiskBase } from '../5DiseaseRisk/5DiseaseRiskBase';
 import { RaceUtil, RelativeUtil, CodeUtil, NoteUtil, ValueUtil } from '../xmlTagUtil';
import { FiveDiseaseRiskCommonsCounter } from './5DiseaseRiskCommonsCounter';

export class HnpccRisk extends FiveDiseaseRiskBase {

    // 大腸がん
    COLORECTAL_CANCER = 'SNOMED_CT-1000001';

    // 家族性大腸腺腫症（FAP）
    FAP = 'SNOMED_CT-72900001';

    // 大腸がん OR 子宮内膜がん OR 小腸がん OR 腎盂がん OR 尿管がん
    SNOMED_CODE_C1 = [
        'SNOMED_CT-1000001',
        'SNOMED_CT-188192002',
        'SNOMED_CT-363509000',
        'SNOMED_CT-448215006',
        'SNOMED_CT-363458004'
    ];

    // 大腸がん OR 結腸がん OR 直腸がん
    SNOMED_CODE_C2 = [
        'SNOMED_CT-1000001',
        'SNOMED_CT-363406005',
        'SNOMED_CT-254582000'
    ];

    // 胃がん OR 卵巣がん OR 膵がん OR 脳腫瘍 OR 胆道がん
    SNOMED_CODE_C3C5C6 = [
        'SNOMED_CT-363349007',
        'SNOMED_CT-363443007',
        'SNOMED_CT-363418001',
        'SNOMED_CT-1000000',
        'SNOMED_CT-363415003'
    ];

    // 大腸がん OR 子宮内膜癌
    SNOMED_CODE_C7 = [
        'SNOMED_CT-1000001',
        'SNOMED_CT-188192002'
    ];

    /**
     * C1：少なくとも3人の血縁者がHNPCC（リンチ症候群）関連腫瘍（大腸癌，子宮内膜癌，腎盂・尿管癌，小腸癌）に罹患しており，以下のすべてを満たしている。
     *  1．1人の罹患者はその他の2人に対して第1度近親者である。
     *  2．少なくとも連続する2世代で罹患している。
     *  3．少なくとも1人の癌は50歳未満で診断されている。
     *  4．腫瘍は病理学的に癌であることが確認されている。
     *  5．FAPが除外されている。
     */
    appliesToAmsterdamStanderd2(pi) {
        // 疾患に該当する人を配列で取得する
        var relatives = RelativeUtil.getALLRelatives();
        var persons = FiveDiseaseRiskCommons.getPersonMatcheAnyDisNotDisAadLessThan(relatives, this.SNOMED_CODE_C1, this.FAP, 50, pi);
        if(persons.length < 3){
            return false;
        }

        // アムステルダム基準Ⅱ（1999）に該当するか判定する
        return this._isOnePersonBelongToFirstDegreeRelatives(persons)
            && this._isOnsetFor2ConsecutiveGenerations(persons)
            && this._isOnePersonOnsetOfHnpccAtlessThan50YearsOlds(persons)
            && this._isPolypDetectedAsCanser(persons)
            && this._isFapExcluded(persons);
    }

    /**
     * C1-1：1．1人の罹患者はその他の2人に対して第1度近親者である。
     */
    _isOnePersonBelongToFirstDegreeRelatives(persons) {
        // 世代のつながりをデータとして持っていないため、判定できない。要改修
    }

    /**
     * C1-2：2．少なくとも連続する2世代で罹患している。
     */
    _isOnsetFor2ConsecutiveGenerations(persons) {
        // 世代のつながりをデータとして持っていないため、判定できない。要改修
    }

    /**
     * C1-3：3．少なくとも1人の癌は50歳未満で診断されている。
     */
    _isOnePersonOnsetOfHnpccAtlessThan50YearsOlds(persons) {
        return true;
    }

    /**
     * C1-4：4．腫瘍は病理学的に癌であることが確認されている。※実装無のため常にtrueを返す。
     */
    _isPolypDetectedAsCanser(persons) {
        return true;
    }

    /**
     * C1-5：5．FAPが除外されている。※実装無のため常にtrueを返す。
     */
    _isFapExcluded(persons) {
        return true;
    }

    /**
     * 改訂ベセスダガイドライン（2004）にがいとうするかどうか
     * @param {*} pi 
     */
    appliesToTheRevisedBethesdaGuideline2004(pi) {
        return this._isOnsetOfColorectalCancerAtLessThanOrEqualTo45YearsOld(pi)
            || this._isOnsetOfColorectalCancerAndHnpcc(pi)
            || this._isOnsetOfColorectalCancerAndOnePersonOnsetOfHnpccAtLessThan50YearsOld(pi)
            || this._isOnsetOfColorectalCancer(pi);
    }

    /**
     * C2：本人が大腸がん患者かつ、50歳未満で診断された大腸癌
     */
    _isOnsetOfColorectalCancerAtLessThan50YearsOld(pi) {
        // 引数チェック
        if(!FiveDiseaseRiskCommons._isParamCorrect(pi)) return false;

        // 大腸がん OR 結腸がん OR 直腸がん
        return FiveDiseaseRiskCommons.areAnyDisAgadLessThan(this.SNOMED_CODE_C2, 50, pi);
    }

    /**
     * C3：本人が大腸がん患者かつ、年齢に関わりなく，同時性あるいは異時性大腸癌あるいはその他のリンチ症候群関連腫瘍＊がある。
     * ＊：大腸癌，子宮内膜癌，胃癌，卵巣癌，膵癌，胆道癌，小腸癌，腎盂・尿管癌，脳腫瘍（通常はターコット症候群にみられるglioblastoma），ムア・トレ症候群の皮脂腺腫や角化棘細胞腫
     */
    _isOnsetOfColorectalCancerAndHnpcc(pi) {
        // 引数チェック
        if(!FiveDiseaseRiskCommons._isParamCorrect(pi)) return false;

        // 大腸がん
        if(FiveDiseaseRiskCommons.isDiesaseMatch(this.COLORECTAL_CANCER, pi)){
            return FiveDiseaseRiskCommons.isDiesaseMatchOr(this.SNOMED_CODE_C3C5C6, pi);
        }
        return false;        
    }

    /**
     * C5：本人が大腸がん患者かつ、第1度近親者が1人以上リンチ症候群関連腫瘍に罹患しており，そのうち一つは50歳未満で診断された大腸癌
     */
    _isOnsetOfColorectalCancerAndOnePersonOnsetOfHnpccAtLessThan50YearsOld(pi) {
        // 引数チェック
        if(!FiveDiseaseRiskCommons._isParamCorrect(pi)) return false;

        // 本人が大腸がんでない場合はfalse
        if(!FiveDiseaseRiskCommons.isDiesaseMatch(this.COLORECTAL_CANCER, pi)){
            return false;  
        }
        
        // 家族歴の判定
        var relatives = RelativeUtil.getFirstDegreeRelatives();
        var count = FiveDiseaseRiskCommonsCounter.countDisAndAnyDisAadLessThan(relatives, this.COLORECTAL_CANCER, this.SNOMED_CODE_C3C5C6, 50, pi)
        return count >= 1;
    }

    /**
     * C6：本人が大腸がん患者かつ、年齢に関わりなく，第1度あるいは第2度近親者の2人以上がリンチ症候群関連腫瘍と診断されている患者の大腸癌
     */
    _isOnsetOfColorectalCancer(pi) {
        // 引数チェック
        if(!FiveDiseaseRiskCommons._isParamCorrect(pi)) return false;

        // 本人が大腸がんでない場合はfalse
        if(!FiveDiseaseRiskCommons.isDiesaseMatch(this.COLORECTAL_CANCER, pi)){
            return false;  
        }
        
        // 家族歴の判定
        var relatives = RelativeUtil.getFirstDegreeRelatives();
        relatives = relatives.concat(RelativeUtil.getSecondDegreeRelatives());
        var count = FiveDiseaseRiskCommonsCounter.countDiseaseAndAnyDisease(relatives, this.COLORECTAL_CANCER, this.SNOMED_CODE_C3C5C6, pi);
        return count >= 2;
    }

    /**
     * ユニバーサルスケーリングに該当するかどうか
     * @param {*} pi 
     * @returns 
     */
    appliesToUniversalScreening(pi) {
        return this._isOnsetOfColorectalOrEndometrialCancer(pi);
    }

    /**
     * C7：全て（あるいは 70 歳以下）の大腸癌、子宮内膜がん
     */
    _isOnsetOfColorectalOrEndometrialCancer(pi) {
        return FiveDiseaseRiskCommons.isDiesaseMatchOr(this.SNOMED_CODE_C7, pi);
    }
}