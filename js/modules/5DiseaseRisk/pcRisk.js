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

    /** 前立腺がん */
    PROSTATE_CANCER = 'SNOMED_CT-399068003';
    /** 前立腺がんリスク判定基準 */
    CRITERIA_P1 = [
        '人間ドック等の受益者負担による検診においては，前立腺癌の家族歴を有する場合には40歳代からの受診を推奨',
        '日本での疫学調査により「第1度近親者に1人の前立腺癌患者がいる場合の罹患リスクは5.6倍（95％CI：1.5〜20.5）と有意差を認めた」'
    ];
    /** 前立腺がんリスク判定基準の出典 */
    SOURCE_P1 = [
        '前立腺がん検診ガイドライン 2018年版、日本泌尿器科学会　編 https://www.urol.or.jp/lib/files/other/guideline/32_prostate_cancer_screening_2018.pdf',
        'Suzuki T, Matsuo K, Wakai K, et al. Effect of familial history and smoking on common cancer risks in Japan. Cancer. 2007;109(10):2116-2123. doi:10.1002/cncr.22685'
    ];
    /** リスク計算対象の疾患名 */
    DISEASE_NAME = '前立腺がん';

    /**
     * 前立腺がんリスクを計算する。
     * 戻り値はない。
     * リスク計算クラスの内部変数に結果が格納される。
     * @param {*} pi 本人のpersonalInformation
     */
    findOutRisk(pi) {
        this.init();
        // 前立腺がん疾患リスクを判定する
        if(this._hasPersonOnsetOfProstateCanserWithinFirstDegreeRelaives(pi)){            
            this.setCriteria(this.CRITERIA_P1);
            this.setSource(this.SOURCE_P1);
            this.setMessage(this.getRecommendMessage(this.DISEASE_NAME));
        }        
    }

    /**
     * P1：CQ5.「人間ドック等の受益者負担による検診においては，前立腺癌の家族歴を有する場合には40歳代からの受診を推奨し…」
     * ◆CQ4. 日本での疫学調査により「第1度近親者に1人の前立腺癌患者がいる場合の罹患リスクは5.6倍（95％CI：1.5〜20.5）と有意差を認めた」
     */
    _hasPersonOnsetOfProstateCanserWithinFirstDegreeRelaives(pi) {
        if(!FiveDiseaseRiskCommons._isParamCorrect(pi)) return false;

        // 本人が女性かどうか判断する。
        if(FiveDiseaseRiskCommons.isGenderMatch(this.FEMALE, pi)) return false;

        // 第一近親者
        var relatives = RelativeUtil.getFirstDegreeRelatives();
        var count = FiveDiseaseRiskCommonsCounter.countDiseasePersonInRelatives(relatives, this.PROSTATE_CANCER, pi);
        if(count >= 1){
            // 本人が40歳以上
            var age = 40;
            if(FiveDiseaseRiskCommons.isAgeGreaterThanOrEqualTo(age, pi)){
                var applicableInfo = {
                    relative : this.SELF,
                    name : pi.name,
                    gender: this.MALE,
                    //age: FiveDiseaseRiskCommons.bindJudgedAgeAsString(FiveDiseaseRiskCommons.JUDGE_AGE.gtoet, age)
                    age: FiveDiseaseRiskCommons.getAge(pi)
                };
                this.pushApplicableInfo(applicableInfo);
            }

            var applicableInfoArray = FiveDiseaseRiskCommonsGetter.getMHHInRelatives(relatives, this.PROSTATE_CANCER, pi)
            this.concatApplicableInfo(applicableInfoArray);
            return true;
        }
        return false;
    }
}