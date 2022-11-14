import { FiveDiseaseRiskCommons } from '../5DiseaseRisk/5DiseaseRiskCommons';
import { FiveDiseaseRiskBase } from '../5DiseaseRisk/5DiseaseRiskBase';
import { RaceUtil, RelativeUtil, CodeUtil, NoteUtil, ValueUtil } from '../xmlTagUtil';
import { FiveDiseaseRiskCommonsCounter } from './5DiseaseRiskCommonsCounter';
import { FiveDiseaseRiskCommonsGetter } from '../5DiseaseRisk/5DiseaseRiskCommonsGetter';

/**
 * 2022/06/06
 * 
 * リンチ症候群（遺伝性非ポリポーシス大腸がん）HNPCC疾患リスク
 */
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

    findOutRisk(pi){
        this.init();
    }

    /**
     * 改訂ベセスダガイドライン（2004）にがいとうするかどうか
     * @param {*} pi 本人のpersonalInformation
     */
    appliesToTheRevisedBethesdaGuideline2004(pi) {
        return this._isOnsetOfColorectalCancerAtLessThanOrEqualTo45YearsOld(pi)
            || this._isOnsetOfColorectalCancerAndHnpcc(pi)
            || this._isOnsetOfColorectalCancerAndOnePersonOnsetOfHnpccAtLessThan50YearsOld(pi)
            || this._isOnsetOfColorectalCancer(pi);
    }

    /**
     * C2：本人が大腸がん患者かつ、50歳未満で診断された大腸癌
     * @param {*} pi 本人のpersonalInformation
     */
    _isOnsetOfColorectalCancerAtLessThan50YearsOld(pi) {
        // 引数チェック
        if(!FiveDiseaseRiskCommons._isParamCorrect(pi)) return false;

        // 大腸がん OR 結腸がん OR 直腸がん
        if(FiveDiseaseRiskCommons.areAnyDisAgadLessThan(this.SNOMED_CODE_C2, 50, pi)){
            var applicableInfo = {
                'relative' : 'self',
                'age': FiveDiseaseRiskCommons.bindJudgedAgeAsString(FiveDiseaseRiskCommons.JUDGE_AGE.lt, 50),
                'disease' : FiveDiseaseRiskCommonsGetter.getAnyMHHLessThan(this.SNOMED_CODE_C2, 50, pi)
            };            
            this.pushApplicableInfo(applicableInfo);
            return true;
        }
        return false;
    }

    /**
     * C3：本人が大腸がん患者かつ、年齢に関わりなく，同時性あるいは異時性大腸癌あるいはその他のリンチ症候群関連腫瘍＊がある。
     * ＊：大腸癌，子宮内膜癌，胃癌，卵巣癌，膵癌，胆道癌，小腸癌，腎盂・尿管癌，脳腫瘍（通常はターコット症候群にみられるglioblastoma），ムア・トレ症候群の皮脂腺腫や角化棘細胞腫
     * @param {*} pi 本人のpersonalInformation
     */
    _isOnsetOfColorectalCancerAndHnpcc(pi) {
        // 引数チェック
        if(!FiveDiseaseRiskCommons._isParamCorrect(pi)) return false;

        // 大腸がん
        if(FiveDiseaseRiskCommons.isDiesaseMatch(this.COLORECTAL_CANCER, pi)){
            if(FiveDiseaseRiskCommons.isDiesaseMatchOr(this.SNOMED_CODE_C3C5C6, pi)){
                var disease = [];
                disease = disease.concat(FiveDiseaseRiskCommonsGetter.getMatchedHealthHistory(this.COLORECTAL_CANCER, pi));
                disease = disease.concat(FiveDiseaseRiskCommonsGetter.getAnyMatchedHealthHistory(this.SNOMED_CODE_C3C5C6, pi))
                var applicableInfo = {
                    'relative' : 'self',
                    'disease' : disease
                };            
                this.pushApplicableInfo(applicableInfo);
                return true;
            }
        }
        return false;        
    }

    /**
     * C5：本人が大腸がん患者かつ、第1度近親者が1人以上リンチ症候群関連腫瘍に罹患しており，そのうち一つは50歳未満で診断された大腸癌
     * @param {*} pi 本人のpersonalInformation
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
        if(count >= 1){
            var applicableInfo = {
                'relative' : 'self',
                'disease' : FiveDiseaseRiskCommonsGetter.getMatchedHealthHistory(this.COLORECTAL_CANCER, pi)
            };   
            this.pushApplicableInfo(applicableInfo);
            applicableInfo =FiveDiseaseRiskCommonsGetter.getMHHAndAnyMHH(relatives, this.COLORECTAL_CANCER, this.SNOMED_CODE_C3C5C6, pi);
            this.concatApplicableInfo(applicableInfo);
            return true;
        }
        return false;
    }

    /**
     * C6：本人が大腸がん患者かつ、年齢に関わりなく，第1度あるいは第2度近親者の2人以上がリンチ症候群関連腫瘍と診断されている患者の大腸癌
     * @param {*} pi 本人のpersonalInformation
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
        if(count >= 2){
            var applicableInfo = {
                'relative' : 'self',
                'disease' : FiveDiseaseRiskCommonsGetter.getMatchedHealthHistory(this.COLORECTAL_CANCER, pi)
            }; 
            this.pushApplicableInfo(applicableInfo);
            applicableInfo =FiveDiseaseRiskCommonsGetter.getMHHAndAnyMHH(relatives, this.COLORECTAL_CANCER, this.SNOMED_CODE_C3C5C6, pi);
            this.concatApplicableInfo(applicableInfo);
            return true;
        }
        return false;
    }

    /**
     * ユニバーサルスケーリングに該当するかどうか
     * @param {*} pi 本人のpersonalInformation
     * @returns 
     */
    appliesToUniversalScreening(pi) {
        return this._isOnsetOfColorectalOrEndometrialCancer(pi);
    }

    /**
     * C7：全て（あるいは 70 歳以下）の大腸癌、子宮内膜がん
     * @param {*} pi 本人のpersonalInformation
     */
    _isOnsetOfColorectalOrEndometrialCancer(pi) {
        if(FiveDiseaseRiskCommons.isDiesaseMatchOr(this.SNOMED_CODE_C7, pi)){
            var applicableInfo = {
                'relative' : 'self',
                'disease' : FiveDiseaseRiskCommonsGetter.getAnyMatchedHealthHistory(this.SNOMED_CODE_C7, pi)
            };            
            this.pushApplicableInfo(applicableInfo);
            return true;
        }
        return false;
    }
}