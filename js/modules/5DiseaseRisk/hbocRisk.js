/**
 * 2022/06/06
 * 
 * HBOC疾患リスク
 */
class HbocRisk extends FiveDiseaseRiskBase {

    recomendBrcaGenericInspection() {

    }

    highPossibilityOfHboc() {

    }

    /**
     * B1：発症、未発症に関わらず（本人以外に）すでに家系内でBRCAバリアント保持者が確認されている場合
     */
    _isBrcaVariantDetectedRegardlessOfWhetherOnset() {

    }

    /**
     * B2：本人が乳がんを発症かつ、45歳以下で発症
     */
    _isOnsetOfBreastCancerAtLessThanOrEqualTo45YearsOld() {

    }

    /**
     * B5：本人が乳がんを発症かつ、第3度近親者内に乳癌または卵巣癌発症者が1名以上いる
     */
    _isOnsetOfBreastCancerAndHavingPersonWhoHasBreastOrOvarianCancerWithinThirdDegreeRelatives() {

    }

    /**
     * B6：卵巣癌、卵管癌および腹膜癌を発症
     */
    _isOnsetOfOvarianOrFallopianTubeOrPeritonealCancer() {

    }

    /**
     * B7：男性乳癌を発症
     */
    _isOnsetOfMaleBreastCancer() {

    }

    /**
     * B10：40歳未満で乳がんを発症した人がいる
     */
    _hasPersonOnsetOfBreastCancerAtLessThanOrEqualTo40YearsOldInFHH() {

    }

    /**
     * B11：年齢を問わず卵巣癌（卵管癌・腹膜癌を含む）の人がいる
     */
    _hasPersonOnsetOfOvarianCancerInFHH() {

    }

    /**
     * B13：男性の乳がん発症者がいる
     */
    _hasPersonOnsetOfMaleOvarianCancerInFHH() {

    }

    /**
     * B14：自身を含め乳がん発症者が3人以上いる
     */
    _hasOver3PersonOnsetOfBreastCanserInFHH() {

    }

    /**
     * B16：BRCAの遺伝子変異が確認された人がいる
     */
    _hasPersonOnsetOfGeneticAlterationInFHH() {

    }
}
