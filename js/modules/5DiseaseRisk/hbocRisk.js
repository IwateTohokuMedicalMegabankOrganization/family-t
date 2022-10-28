import { FiveDiseaseRiskCommons } from '../5DiseaseRisk/5DiseaseRiskCommons';
import { FiveDiseaseRiskBase } from '../5DiseaseRisk/5DiseaseRiskBase';
import { RaceUtil, RelativeUtil, CodeUtil, NoteUtil, ValueUtil } from '../xmlTagUtil';
import { FiveDiseaseRiskCommonsCounter } from './5DiseaseRiskCommonsCounter';

/**
 * 2022/06/06
 * 
 * HBOC疾患リスク
 */
export class HbocRisk extends FiveDiseaseRiskBase {

    // HBOC
    HBOC = '';

    // 乳がん
    BREAST_CANCER = 'SNOMED_CT-254837009';

    // 前立腺がん
    PROSTATE_CANCER = 'SNOMED_CT-399068003';

    // 膵がん
    PANCREATIC_CANCER = 'SNOMED_CT-363418001';

    // 乳がん OR 卵巣がん OR 卵管がん OR 腹膜がん OR 膵がん
    SNOMED_CODE_B5 = [
        'SNOMED_CT-254837009',
        'SNOMED_CT-363443007',
        'SNOMED_CT-rankangan',
        'SNOMED_CT-363492001',
        'SNOMED_CT-363418001'
    ];

    // 乳がん OR 卵巣がん OR 卵管がん OR 腹膜がん OR 膵がん OR 悪性黒色腫
    SNOMED_CODE_B6 = [
        'SNOMED_CT-254837009',
        'SNOMED_CT-363443007',
        'SNOMED_CT-rankangan',
        'SNOMED_CT-363492001',
        'SNOMED_CT-363418001',
        'SNOMED_CT-akuseikokusyoku'
    ];

    // 乳がん OR 卵巣がん OR 卵管がん OR 腹膜がん OR 前立腺がん OR 膵がん OR 悪性黒色腫
    SNOMED_CODE_B7 = [
        'SNOMED_CT-254837009',
        'SNOMED_CT-363443007',
        'SNOMED_CT-rankangan',
        'SNOMED_CT-363492001',
        'SNOMED_CT-399068003',
        'SNOMED_CT-363418001',
        'SNOMED_CT-akuseikokusyoku'
    ];

    // 卵管がん OR 腹膜がん
    SNOMED_CODE_B8 = [
        'SNOMED_CT-rankangan',
        'SNOMED_CT-363492001'
    ];

    // 卵巣がん OR 卵管がん OR 腹膜がん
    SNOMED_CODE_B16 = [
        'SNOMED_CT-363443007',
        'SNOMED_CT-rankangan',
        'SNOMED_CT-363492001'
    ];

    recomendBrcaGenericInspection() {

    }

    highPossibilityOfHboc() {

    }

    /**
     * B1：発症、未発症に関わらず（本人以外に）すでに家系内でBRCAバリアント保持者が確認されている場合
     * @param {*} pi 本人のpersonalInformation
     */
    _isBrcaVariantDetectedRegardlessOfWhetherOnset(pi) {
        if(!FiveDiseaseRiskCommons._isParamCorrect(pi)) return false;

        var relatives = RelativeUtil.getALLRelatives();
        return FiveDiseaseRiskCommonsCounter.countDiseasePersonInRelatives(relatives, this.HBOC, pi);
    }

    /**
     * B2：本人が乳がんを発症かつ、45歳以下で発症
     * @param {*} pi 本人のpersonalInformation
     */
    _isOnsetOfBreastCancerAtLessThanOrEqualTo45YearsOld(pi) {
        if(!FiveDiseaseRiskCommons._isParamCorrect(pi)) return false;
        return FiveDiseaseRiskCommons.isAgeAtDiagnosisLessThanOrEquaTo(this.BREAST_CANCER, 45, pi);
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
        return FiveDiseaseRiskCommonsCounter.countAnyDiseasePersonInRelatives(relatives, this.SNOMED_CODE_B5, pi) >= 1;
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
        return FiveDiseaseRiskCommonsCounter.countAnyDiseasePersonInRelatives(relatives, this.SNOMED_CODE_B6, pi) >= 2;
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
        return FiveDiseaseRiskCommonsCounter.countAnyDiseasePersonInRelatives(relatives, this.SNOMED_CODE_B7, pi) >= 2;
    }

    /**
     * B8：卵巣癌、卵管癌および腹膜癌を発症
     * @param {*} pi 本人のpersonalInformation
     */
    _isOnsetOfOvarianOrFallopianTubeOrPeritonealCancer(pi) {
        if(!FiveDiseaseRiskCommons._isParamCorrect(pi)) return false;
        return FiveDiseaseRiskCommons.isDiesaseMatchOr(this.SNOMED_CODE_B8, pi);
    }

    /**
     * B9：男性乳癌を発症
     * @param {*} pi 本人のpersonalInformation
     */
    _isOnsetOfMaleBreastCancer(pi) {
        if(!FiveDiseaseRiskCommons._isParamCorrect(pi)) return false;
        return FiveDiseaseRiskCommons.areDiseaseAndGenderMatch(this.BREAST_CANCER, 'MALE', pi);
    }

    /**
     * B15：40歳未満で乳がんを発症した人がいる
     * @param {*} pi 本人のpersonalInformation
     */
    _hasPersonOnsetOfBreastCancerAtLessThanOrEqualTo40YearsOldInFHH(pi) {
        if(!FiveDiseaseRiskCommons._isParamCorrect(pi)) return false;
        
        // 本人
        if(FiveDiseaseRiskCommons.isAgeAtDiagnosisLessThan(this.BREAST_CANCER, 40, pi)) return true;

        // 家族
        var relatives = RelativeUtil.getALLRelatives();
        return FiveDiseaseRiskCommonsCounter.countDiseasePersonInRelativesLessThan(relatives, this.BREAST_CANCER, pi) > 0;
    }

    /**
     * B16：年齢を問わず卵巣癌（卵管癌・腹膜癌を含む）の人がいる
     * @param {*} pi 本人のpersonalInformation
     */
    _hasPersonOnsetOfOvarianCancerInFHH(pi) {
        if(!FiveDiseaseRiskCommons._isParamCorrect(pi)) return false;

        // 本人
        if(FiveDiseaseRiskCommons.isDiesaseMatchOr(this.SNOMED_CODE_B16, pi)) return true;

        // 家族
        var relatives = RelativeUtil.getALLRelatives();
        return FiveDiseaseRiskCommonsCounter.countAnyDiseasePersonInRelatives(relatives, this.SNOMED_CODE_B16, pi) > 0;
    }

    /**
     * B18：男性の乳がん発症者がいる
     * @param {*} pi 本人のpersonalInformation
     */
    _hasPersonOnsetOfMaleOvarianCancerInFHH(pi) {
        if(!FiveDiseaseRiskCommons._isParamCorrect(pi)) return false;

        // 本人
        if(FiveDiseaseRiskCommons.areDiseaseAndGenderMatch(this.BREAST_CANCER, 'MALE', pi)) return true;

        // 家族
        var relatives = RelativeUtil.getALLRelatives();
        return FiveDiseaseRiskCommonsCounter.countDiseaseGenderInRelatives(relatives, this.BREAST_CANCER, 'MALE', pi) > 0;
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
        return count >= 3;
    }

    /**
     * B21：BRCAの遺伝子変異が確認された人がいる
     * @param {*} pi 本人のpersonalInformation
     */
    _hasPersonOnsetOfGeneticAlterationInFHH(pi) {
        if(!FiveDiseaseRiskCommons._isParamCorrect(pi)) return false;

        // 本人
        if(FiveDiseaseRiskCommons.isDiesaseMatch(this.HBOC, pi)) return true;

        // 家族
        var relatives = RelativeUtil.getALLRelatives();
        return FiveDiseaseRiskCommonsCounter.countDiseasePersonInRelatives(relatives, this.HBOC, pi) > 0;

    }
}
