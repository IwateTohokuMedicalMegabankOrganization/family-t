import { FiveDiseaseRiskCommons } from '../5DiseaseRisk/5DiseaseRiskCommons';
import { FiveDiseaseRiskBase } from '../5DiseaseRisk/5DiseaseRiskBase';
import { RaceUtil, RelativeUtil, CodeUtil, NoteUtil, ValueUtil } from '../xmlTagUtil';
import { FiveDiseaseRiskCommonsCounter } from './5DiseaseRiskCommonsCounter';
import { FiveDiseaseRiskCommonsGetter } from '../5DiseaseRisk/5DiseaseRiskCommonsGetter';

/**
 * 2022/06/06
 * 
 * 遺伝性乳がん卵巣がん症候群HBOC疾患リスク
 */
export class HbocRisk extends FiveDiseaseRiskBase {

    /** HBOC */
    HBOC = 'SNOMED_CT-718220008';
    /** 乳がん */
    BREAST_CANCER = 'SNOMED_CT-254837009';
    /** 前立腺がん */
    PROSTATE_CANCER = 'SNOMED_CT-399068003';
    /** 膵がん */
    PANCREATIC_CANCER = 'SNOMED_CT-363418001';
    /** 乳がん OR 卵巣がん OR 卵管がん OR 腹膜がん OR 膵がん */
    SNOMED_CODE_B5 = [
        'SNOMED_CT-254837009',
        'SNOMED_CT-363443007',
        'SNOMED_CT-363444001',
        'SNOMED_CT-363492001',
        'SNOMED_CT-363418001'
    ];
    /** 乳がん OR 卵巣がん OR 卵管がん OR 腹膜がん OR 膵がん OR 悪性黒色腫 */
    SNOMED_CODE_B6 = [
        'SNOMED_CT-254837009',
        'SNOMED_CT-363443007',
        'SNOMED_CT-363444001',
        'SNOMED_CT-363492001',
        'SNOMED_CT-363418001',
        'SNOMED_CT-372244006'
    ];
    /** 乳がん OR 卵巣がん OR 卵管がん OR 腹膜がん OR 前立腺がん OR 膵がん OR 悪性黒色腫 */
    SNOMED_CODE_B7 = [
        'SNOMED_CT-254837009',
        'SNOMED_CT-363443007',
        'SNOMED_CT-363444001',
        'SNOMED_CT-363492001',
        'SNOMED_CT-399068003',
        'SNOMED_CT-363418001',
        'SNOMED_CT-372244006'
    ];
    /** 卵管がん OR 腹膜がん */ 
    SNOMED_CODE_B8 = [
        'SNOMED_CT-363444001',
        'SNOMED_CT-363492001'
    ];
    /** 卵巣がん OR 卵管がん OR 腹膜がん */
    SNOMED_CODE_B16 = [
        'SNOMED_CT-363443007',
        'SNOMED_CT-363444001',
        'SNOMED_CT-363492001'
    ];
    /** リスク判定基準B1からB12。推奨のトーンが「推奨」 */
    CRITERIA_B1B12 = [
        '検査を検討している本人の乳癌の罹患状況を問わず，血縁者がすでにBRCA1/2に病的バリアントをもっていることがわかっている ',
        '本人が乳がんを発症かつ、45歳以下で診断された乳癌',
        '本人が乳がんを発症かつ、第血縁者（第三度近親者以内＊）に乳癌または卵巣癌，膵癌患者がいる',
        '本人が前立腺がんを発症かつ、血縁者の中で2名以上にHBOC関連（乳癌・卵巣癌・膵癌・悪性黒色腫等）の発がんが確認されている',
        '本人が膵がんを発症かつ、血縁者の中で2名以上にHBOC関連（乳癌・卵巣癌・前立腺癌・膵癌・悪性黒色腫等）の発癌が確認されている',
        '卵巣癌、卵管癌および腹膜癌を発症',
        '男性で乳癌と診断された'
    ];
    /** リスク判定基準B13からB21。推奨のトーンが「考慮」 */
    CRITERIA_B13B21 = [
        '40歳未満で乳がんを発症した人がいる',
        '年齢を問わず卵巣癌（卵管癌・腹膜癌を含む）の人がいる',
        '男性の乳がん発症者がいる',
        '自身を含め乳がん発症者が3人以上いる',
        'BRCAの遺伝子変異が確認された人がいる',
    ];
    /** リスク判定基準B1からB12の出典 */
    SOURCE_B1B12 = [
        '1)遺伝性乳癌卵巣癌症候群（HBOC）診療ガイドライン 2021年版、一般社団法人 日本遺伝性乳癌卵巣癌総合診療制度機構、2021年7月',
        '2)遺伝性乳がん卵巣がん（HBOC）をご理解いただくために ver.2022_1、一般社団法人 日本遺伝性乳癌卵巣癌総合診療制度機構、2022年1月'
    ];
    /** リスク判定基準B12からB21の出典 */
    SOURCE_B13B21 = [
        '日本HBOCコンソーシアムチェックリスト'
    ];
    /** リスク計算対象の疾患名 */
    DISEASE_NAME = '遺伝性乳がん卵巣がん症候群（HBOC）';

    /**
     * 遺伝性乳がん卵巣がん症候群（HBOC）リスクを計算する。
     * 戻り値はない。
     * リスク計算クラスの内部変数に結果が格納される。
     * @param {*} pi 本人のpersonalInformation
     */
    findOutRisk(pi) {
        /* 考慮に該当する場合
        if(this.consider(pi)){
            // 
            if(!this.Recommend(pi)){
                // 実装上仕方がない
                this.consider(pi);
            }            
        }*/

        // 推奨のみ
        this.Recommend(pi);
    }

    /**
     * 推奨のトーンが考慮の場合
     * @param {*} pi 
     */
    consider(pi){
        // 実装上仕方がない
        this.init();

        // 疾患リスクが考慮に該当するか判定する
        var ret = false;
        ret = ret || this._hasPersonOnsetOfBreastCancerAtLessThanOrEqualTo40YearsOldInFHH(pi);
        ret = ret || this._hasPersonOnsetOfOvarianCancerInFHH(pi);
        ret = ret || this._hasPersonOnsetOfMaleOvarianCancerInFHH(pi);
        ret = ret || this._hasOver3PersonOnsetOfBreastCanserInFHH(pi);
        ret = ret || this._hasPersonOnsetOfGeneticAlterationInFHH(pi);

        // 該当する場合
        if(ret){
            this.setCriteria(this.CRITERIA_B13B21);
            this.setSource(this.SOURCE_B13B21);
            this.setMessage(this.getConsiderMessage(this.DISEASE_NAME));
        }

        return ret;
    }

    /**
     * 推奨のトーンが推奨の場合
     * @param {*} pi 
     */
    Recommend(pi) {
        // 実装上仕方がない
        this.init();

        // 疾患リスクが推奨に該当するか判定する
        var ret = false;
        ret = ret || this._isBrcaVariantDetectedRegardlessOfWhetherOnset(pi);
        ret = ret || this._isOnsetOfBreastCancerAtLessThanOrEqualTo45YearsOld(pi);
        ret = ret || this._isOnsetOfBreastCancerAndHavingPersonWhoHasBreastOrOvarianCancerWithinThirdDegreeRelatives(pi);
        ret = ret || this._isPostateCancerAndTwoORMoreHBOC(pi);
        ret = ret || this._isPancreaticCancerAndTwoORMoreHBOC(pi);
        ret = ret || this._isOnsetOfOvarianOrFallopianTubeOrPeritonealCancer(pi);
        ret = ret || this._isOnsetOfMaleBreastCancer(pi);

        // 該当する場合
        if(ret){
            this.setCriteria(this.CRITERIA_B1B12);
            this.setSource(this.SOURCE_B1B12);
            this.setMessage(this.getRecommendMessage(this.DISEASE_NAME));
        }

        return ret;
    }

    

    /**
     * B1：発症、未発症に関わらず（本人以外に）すでに家系内でBRCAバリアント保持者が確認されている場合
     * @param {*} pi 本人のpersonalInformation
     */
    _isBrcaVariantDetectedRegardlessOfWhetherOnset(pi) {
        if(!FiveDiseaseRiskCommons._isParamCorrect(pi)) return false;

        var relatives = RelativeUtil.getALLRelatives();
        var count = FiveDiseaseRiskCommonsCounter.countDiseasePersonInRelatives(relatives, this.HBOC, pi);
        if(count > 0){
            var applicableInfo = FiveDiseaseRiskCommonsGetter.getMHHInRelatives(relatives, this.HBOC, pi);
            this.concatApplicableInfo(applicableInfo);
            return true;
        }
        return false;
    }

    /**
     * B2：本人が乳がんを発症かつ、45歳以下で発症
     * @param {*} pi 本人のpersonalInformation
     */
    _isOnsetOfBreastCancerAtLessThanOrEqualTo45YearsOld(pi) {
        if(!FiveDiseaseRiskCommons._isParamCorrect(pi)) return false;

        var age = 45;
        if(FiveDiseaseRiskCommons.isAgeAtDiagnosisLessThanOrEquaTo(this.BREAST_CANCER, age, pi)){
            var applicableInfo = {
                relative : this.SELF,
                name : pi.name,
                //age : FiveDiseaseRiskCommons.bindJudgedAgeAsString(FiveDiseaseRiskCommons.JUDGE_AGE.gtoet, age),
                disease : FiveDiseaseRiskCommonsGetter.getMHHLessThanOrEqualTo(this.BREAST_CANCER, age, pi)
            };
            this.pushApplicableInfo(applicableInfo);
            return true;
        }
        return false;
    }

    /**
     * B5：本人が乳がんを発症かつ、第3度近親者内に乳癌または卵巣癌発症者が1名以上いる
     * @param {*} pi 本人のpersonalInformation
     */
    _isOnsetOfBreastCancerAndHavingPersonWhoHasBreastOrOvarianCancerWithinThirdDegreeRelatives(pi) {
        if(!FiveDiseaseRiskCommons._isParamCorrect(pi)) return false;

        // 本人
        if(!FiveDiseaseRiskCommons.isDiesaseMatch(this.BREAST_CANCER, pi)) return false;

        // 家族
        var relatives = RelativeUtil.getALLRelatives();
        var count = FiveDiseaseRiskCommonsCounter.countAnyDiseasePersonInRelatives(relatives, this.SNOMED_CODE_B5, pi);
        if(count >= 1){
            var applicableInfo = {
                relative : this.SELF,
                name : pi.name,
                disease : FiveDiseaseRiskCommonsGetter.getMatchedHealthHistory(this.BREAST_CANCER, pi)
            };
            this.pushApplicableInfo(applicableInfo);
            applicableInfo = FiveDiseaseRiskCommonsGetter.getAnyMHHInRelatives(relatives, this.SNOMED_CODE_B5, pi);
            this.concatApplicableInfo(applicableInfo);
            return true;
        }
        return false;
    }

    /**
     * B6：本人が前立腺がんを発症かつ、血縁者の中で2名以上にHBOC関連（乳癌・卵巣癌・膵癌・悪性黒色腫等）の発がんが確認されている
     * @param {*} pi 本人のpersonalInformation
     */
    _isPostateCancerAndTwoORMoreHBOC(pi){
        if(!FiveDiseaseRiskCommons._isParamCorrect(pi)) return false;

        // 本人
        if(!FiveDiseaseRiskCommons.isDiesaseMatch(this.PROSTATE_CANCER, pi)) return false;

        // 家族
        var relatives = RelativeUtil.getALLRelatives();
        var count = FiveDiseaseRiskCommonsCounter.countAnyDiseasePersonInRelatives(relatives, this.SNOMED_CODE_B6, pi);
        if(count >= 2){
            var applicableInfo = {
                relative : this.SELF,
                name : pi.name,
                disease : FiveDiseaseRiskCommonsGetter.getMatchedHealthHistory(this.PROSTATE_CANCER, pi)
            };
            this.pushApplicableInfo(applicableInfo);
            applicableInfo = FiveDiseaseRiskCommonsGetter.getAnyMHHInRelatives(relatives, this.SNOMED_CODE_B6, pi);
            this.concatApplicableInfo(applicableInfo);
            return true;
        }
        return false
    }

    /**
     * B7：本人が膵がんを発症かつ、血縁者の中で2名以上にHBOC関連（乳癌・卵巣癌・前立腺癌・膵癌・悪性黒色腫等）の発癌が確認されている
     * @param {*} pi 本人のpersonalInformation
     */
    _isPancreaticCancerAndTwoORMoreHBOC(pi){
        if(!FiveDiseaseRiskCommons._isParamCorrect(pi)) return false;

        // 本人
        if(!FiveDiseaseRiskCommons.isDiesaseMatch(this.PANCREATIC_CANCER, pi)) return false;

        // 家族
        var relatives = RelativeUtil.getALLRelatives();
        var count = FiveDiseaseRiskCommonsCounter.countAnyDiseasePersonInRelatives(relatives, this.SNOMED_CODE_B7, pi);
        if(count >= 2){
            var applicableInfo = {
                relative : this.SELF,
                name : pi.name,
                disease : FiveDiseaseRiskCommonsGetter.getMatchedHealthHistory(this.PANCREATIC_CANCER, pi)
            };
            this.pushApplicableInfo(applicableInfo);
            applicableInfo = FiveDiseaseRiskCommonsGetter.getAnyMHHInRelatives(relatives, this.SNOMED_CODE_B7, pi);
            this.concatApplicableInfo(applicableInfo);
            return true;
        }
        return false;
    }

    /**
     * B8：卵巣癌、卵管癌および腹膜癌を発症
     * @param {*} pi 本人のpersonalInformation
     */
    _isOnsetOfOvarianOrFallopianTubeOrPeritonealCancer(pi) {
        if(!FiveDiseaseRiskCommons._isParamCorrect(pi)) return false;
        if(FiveDiseaseRiskCommons.isDiesaseMatchOr(this.SNOMED_CODE_B8, pi)){
            var applicableInfo = {
                relative : this.SELF,
                name : pi.name,
                disease : FiveDiseaseRiskCommonsGetter.getAnyMatchedHealthHistory(this.SNOMED_CODE_B8, pi)
            };            
            this.pushApplicableInfo(applicableInfo);
            return true;
        }
        return false;
    }

    /**
     * B9：男性乳癌を発症
     * @param {*} pi 本人のpersonalInformation
     */
    _isOnsetOfMaleBreastCancer(pi) {
        if(!FiveDiseaseRiskCommons._isParamCorrect(pi)) return false;
        if(FiveDiseaseRiskCommons.areDiseaseAndGenderMatch(this.BREAST_CANCER, this.MALE, pi)){
            var applicableInfo = {
                relative : this.SELF,
                name : pi.name,
                gender : this.MALE,
                disease : FiveDiseaseRiskCommonsGetter.getMatchedHealthHistory(this.BREAST_CANCER, pi)
            };            
            this.pushApplicableInfo(applicableInfo);
            return true;
        }
        return false;
    }

    /**
     * B15：40歳未満で乳がんを発症した人がいる
     * @param {*} pi 本人のpersonalInformation
     */
    _hasPersonOnsetOfBreastCancerAtLessThanOrEqualTo40YearsOldInFHH(pi) {
        if(!FiveDiseaseRiskCommons._isParamCorrect(pi)) return false;
        
        // 本人
        var age = 40;
        if(FiveDiseaseRiskCommons.isAgeAtDiagnosisLessThan(this.BREAST_CANCER, age, pi)){
            var applicableInfo = {
                relative : this.SELF,
                name : pi.name,
                //age : FiveDiseaseRiskCommons.bindJudgedAgeAsString(FiveDiseaseRiskCommons.JUDGE_AGE.lt, age),
                disease : FiveDiseaseRiskCommonsGetter.getMatchedHealthHistory(this.BREAST_CANCER, pi)
            };            
            this.pushApplicableInfo(applicableInfo);
            return true;
        }

        // 家族
        var relatives = RelativeUtil.getALLRelatives();
        var count = FiveDiseaseRiskCommonsCounter.countDiseasePersonInRelativesLessThan(relatives, this.BREAST_CANCER, age, pi);
        if(count > 0){
            var applicableInfo = FiveDiseaseRiskCommonsGetter.getMHHInRelativesLessThan(relatives, this.BREAST_CANCER, age, pi);
            this.concatApplicableInfo(applicableInfo);
            return true;
        }
        return false;
    }

    /**
     * B16：年齢を問わず卵巣癌（卵管癌・腹膜癌を含む）の人がいる
     * @param {*} pi 本人のpersonalInformation
     */
    _hasPersonOnsetOfOvarianCancerInFHH(pi) {
        if(!FiveDiseaseRiskCommons._isParamCorrect(pi)) return false;

        // 本人
        if(FiveDiseaseRiskCommons.isDiesaseMatchOr(this.SNOMED_CODE_B16, pi)){
            var applicableInfo = {
                relative : this.SELF,
                name : pi.name,
                disease : FiveDiseaseRiskCommonsGetter.getAnyMatchedHealthHistory(this.SNOMED_CODE_B16, pi)
            };            
            this.pushApplicableInfo(applicableInfo);
            return true;
        }

        // 家族
        var relatives = RelativeUtil.getALLRelatives();
        var count = FiveDiseaseRiskCommonsCounter.countAnyDiseasePersonInRelatives(relatives, this.SNOMED_CODE_B16, pi);
        if(count > 0){
            var applicableInfo = FiveDiseaseRiskCommonsGetter.getAnyMHHInRelatives(relatives, this.SNOMED_CODE_B16, pi);
            this.concatApplicableInfo(applicableInfo);
            return true;
        }
        return false;
    }

    /**
     * B18：男性の乳がん発症者がいる
     * @param {*} pi 本人のpersonalInformation
     */
    _hasPersonOnsetOfMaleOvarianCancerInFHH(pi) {
        if(!FiveDiseaseRiskCommons._isParamCorrect(pi)) return false;

        // 本人
        if(FiveDiseaseRiskCommons.areDiseaseAndGenderMatch(this.BREAST_CANCER, this.MALE, pi)){
            var applicableInfo = {
                relative : this.SELF,
                name : pi.name,
                gender : this.MALE,
                disease : FiveDiseaseRiskCommonsGetter.getMatchedHealthHistory(this.BREAST_CANCER, pi)
            };            
            this.pushApplicableInfo(applicableInfo);
            return true;
        }

        // 家族
        var relatives = RelativeUtil.getALLRelatives();
        var count = FiveDiseaseRiskCommonsCounter.countDiseaseGenderInRelatives(relatives, this.BREAST_CANCER, this.MALE, pi);
        if(count > 0){
            var applicableInfo = FiveDiseaseRiskCommonsGetter.getMHHGenderInRelatives(relatives, this.BREAST_CANCER, this.MALE, pi);
            this.concatApplicableInfo(applicableInfo);
            return true;
        }
        return false;
    }

    /**
     * B19：自身を含め乳がん発症者が3人以上いる
     * @param {*} pi 本人のpersonalInformation
     */
    _hasOver3PersonOnsetOfBreastCanserInFHH(pi) {
        if(!FiveDiseaseRiskCommons._isParamCorrect(pi)) return false;

        // 本人
        if(!FiveDiseaseRiskCommons.isDiesaseMatch(this.BREAST_CANCER, pi)) return false;

        // 家族
        var relatives = RelativeUtil.getALLRelatives();
        var count = FiveDiseaseRiskCommonsCounter.countDiseasePersonInRelatives(relatives, this.BREAST_CANCER, pi) + 1;
        if(count >= 3){
            var applicableInfo = {
                relative : this.SELF,
                name : pi.name,
                disease : FiveDiseaseRiskCommonsGetter.getMatchedHealthHistory(this.BREAST_CANCER, pi)
            };            
            this.pushApplicableInfo(applicableInfo);
            applicableInfo = FiveDiseaseRiskCommonsGetter.getMHHInRelatives(relatives, this.BREAST_CANCER, pi);
            this.concatApplicableInfo(applicableInfo);
            return true;
        }
        return false;
    }

    /**
     * B21：BRCAの遺伝子変異が確認された人がいる
     * @param {*} pi 本人のpersonalInformation
     */
    _hasPersonOnsetOfGeneticAlterationInFHH(pi) {
        if(!FiveDiseaseRiskCommons._isParamCorrect(pi)) return false;

        // 本人
        if(FiveDiseaseRiskCommons.isDiesaseMatch(this.HBOC, pi)){
            var applicableInfo = {
                relative : this.SELF,
                name : pi.name,
                disease : FiveDiseaseRiskCommonsGetter.getMatchedHealthHistory(this.HBOC, pi)
            };            
            this.pushApplicableInfo(applicableInfo);
            return true;
        }

        // 家族
        var relatives = RelativeUtil.getALLRelatives();
        var count = FiveDiseaseRiskCommonsCounter.countDiseasePersonInRelatives(relatives, this.HBOC, pi);
        if(count > 0){
            var applicableInfo = FiveDiseaseRiskCommonsGetter.getMHHInRelatives(relatives, this.HBOC, pi);
            this.concatApplicableInfo(applicableInfo);
            return true;
        }
        return false;

    }
}
