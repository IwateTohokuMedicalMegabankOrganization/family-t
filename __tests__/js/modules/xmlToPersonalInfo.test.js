import { xmlToPersonalInfo } from '../../../js/modules/xmlToPersonalInfo';

test('load', () => {
    var input = `<FamilyHistory moodCode="EVN" classCode="OBS">
    <id extention="gov.hhs.fhh:718163810183" />
    <effectiveTime value="10/1/2021" />
    <methodCode displayName="Surgeon General's Family Heath History Tool" />
    <subject typeCode="SBJ">
        <patient classCode="PAT">
            <patientPerson>
                <id extension="c95f399c-c3e7-4d46-aabf-0d721f639965" />
                <name formatted="testName" />
                <birthTime value="10/01/1981" />
                <administrativeGenderCode codeSystemName="SNOMED_CT" displayName="male" code="248153007" />
                <raceCode displayName="Asian" code="1000000" codeSystemName="TBD" id="2" />
                <raceCode displayName="Japanese" code="2039-6" codeSystemName="HL7" id="14" />
                <subjectOf2>
                    <clinicalObservation>
                        <code displayName="height" codeSystemName="SNOMED_CT" code="271603002" />
                        <value value="180" unit="centimeters" />
                    </clinicalObservation>
                    <clinicalObservation>
                        <code displayName="weight" codeSystemName="SNOMED_CT" code="107647005" />
                        <value value="70" unit="kilogram" />
                    </clinicalObservation>
                    <clinicalObservation>
                        <code originalText="Parental consanguinity indicated" />
                    </clinicalObservation>
                    <clinicalObservation>
                        <code codeSystemName="SNOMED_CT" code="269466003" displayName="Bone Cancer" originalText="Bone Cancer" />
                        <subject>
                            <dataEstimatedAge>
                                <code displayName="Estimated Age" codeSystemName="LOINC" code="21611-9" originalText="pre-birth" />
                            </dataEstimatedAge>
                        </subject>
                    </clinicalObservation>
                </subjectOf2>
                <relative>
                    <code displayName="Mother" codeSystemName="HL7 Family History Model" code="NMTH" />
                    <relationshipHolder>
                        <relative>
                            <code displayName="Parent" codeSystemName="HL7 Family History Model" code="PAR" />
                            <relationshipHolder />
                        </relative>
                        <administrativeGenderCode codeSystemName="SNOMED_CT" displayName="female" code="248152002" />
                        <subjectOf2 />
                        <id extension="ceb26763-458f-4133-802e-bcb9e49f031d" />
                        <name formatted="" />
                    </relationshipHolder>
                </relative>
                <relative>
                    <code displayName="Father" codeSystemName="HL7 Family History Model" code="NFTH" />
                    <relationshipHolder>
                        <relative>
                            <code displayName="Parent" codeSystemName="HL7 Family History Model" code="PAR" />
                            <relationshipHolder />
                        </relative>
                        <administrativeGenderCode codeSystemName="SNOMED_CT" displayName="male" code="248153007" />
                        <subjectOf2 />
                        <id extension="56a783a6-0424-43ae-8248-589653fcaa9b" />
                        <name formatted="" />
                    </relationshipHolder>
                </relative>
                <relative>
                    <code displayName="Maternal Grandmother" codeSystemName="HL7 Family History Model" code="MGRMTH" />
                    <relationshipHolder>
                        <relative>
                            <code displayName="Parent" codeSystemName="HL7 Family History Model" code="PAR" />
                            <relationshipHolder />
                        </relative>
                        <administrativeGenderCode codeSystemName="SNOMED_CT" displayName="female" code="248152002" />
                        <subjectOf2 />
                        <id extension="7187c3af-5ebd-4d12-b3a8-48e323d5409b" />
                        <name formatted="" />
                    </relationshipHolder>
                </relative>
                <relative>
                    <code displayName="Maternal Grandfather" codeSystemName="HL7 Family History Model" code="MGRFTH" />
                    <relationshipHolder>
                        <relative>
                            <code displayName="Parent" codeSystemName="HL7 Family History Model" code="PAR" />
                            <relationshipHolder />
                        </relative>
                        <administrativeGenderCode codeSystemName="SNOMED_CT" displayName="male" code="248153007" />
                        <subjectOf2 />
                        <id extension="7cdc7a5a-0bb7-4f84-9fe7-0450da0f3639" />
                        <name formatted="" />
                    </relationshipHolder>
                </relative>
                <relative>
                    <code displayName="Paternal Grandmother" codeSystemName="HL7 Family History Model" code="PGRMTH" />
                    <relationshipHolder>
                        <relative>
                            <code displayName="Parent" codeSystemName="HL7 Family History Model" code="PAR" />
                            <relationshipHolder />
                        </relative>
                        <administrativeGenderCode codeSystemName="SNOMED_CT" displayName="female" code="248152002" />
                        <subjectOf2 />
                        <id extension="c35b2ee2-afe8-4ba3-a3c3-928bd3e767c1" />
                        <name formatted="" />
                    </relationshipHolder>
                </relative>
                <relative>
                    <code displayName="Paternal Grandfather" codeSystemName="HL7 Family History Model" code="PGRFTH" />
                    <relationshipHolder>
                        <relative>
                            <code displayName="Parent" codeSystemName="HL7 Family History Model" code="PAR" />
                            <relationshipHolder />
                        </relative>
                        <administrativeGenderCode codeSystemName="SNOMED_CT" displayName="male" code="248153007" />
                        <subjectOf2 />
                        <id extension="9f5e6464-cd70-4625-995c-c9f5047e974b" />
                        <name formatted="" />
                    </relationshipHolder>
                </relative>
                <relative>
                    <code displayName="Brother" codeSystemName="HL7 Family History Model" code="NBRO" />
                    <relationshipHolder>
                        <relative>
                            <code displayName="Parent" codeSystemName="HL7 Family History Model" code="PAR" />
                            <relationshipHolder />
                        </relative>
                        <administrativeGenderCode codeSystemName="SNOMED_CT" displayName="male" code="248153007" />
                        <subjectOf2 />
                        <id extension="98edd975-d38c-40be-bdae-13a5deedab13" />
                        <name formatted="" />
                    </relationshipHolder>
                </relative>
            </patientPerson>
        </patient>
    </subject>
</FamilyHistory>`;
    var output = {
        "American Indian or Alaska Native": false,
        "Asian": true,
        "Asian Indian": false,
        "Black or African-American": false,
        "Chamorro": false,
        "Chinese": false,
        "Filipino": false,
        "Guamanian": false,
        "Health History": [
            {
                "Age At Diagnosis": "pre-birth",
                "Detailed Disease Name": "Bone Cancer",
                "Disease Code": "SNOMED_CT-269466003",
                "Disease Name": "Bone Cancer",
            },
        ],
        "Japanese": true,
        "Korean": false,
        "Native Hawaiian": false,
        "Native Hawaiian or Other Pacific Islander": false,
        "Other Asian": false,
        "Samoan": false,
        "Unknown Asian": false,
        "Unknown South Pacific Islander": false,
        "Vietnamese": false,
        "White": false,
        "adopted": false,
        "brother_0":  {
            "gender": "MALE",
            "id": "98edd975-d38c-40be-bdae-13a5deedab13",
            "name": "",
        },
        "consanguinity": undefined,
        "date_of_birth": "1981/10/01",
        "father":  {
            "gender": "MALE",
            "id": "56a783a6-0424-43ae-8248-589653fcaa9b",
            "name": "",
        },
        "flg_race_ethnic": 1,
        "gender": "MALE",
        "height": "180",
        "height_unit": "centimeters",
        "id": "c95f399c-c3e7-4d46-aabf-0d721f639965",
        "maternal_grandfather":  {
            "gender": "MALE",
            "id": "7cdc7a5a-0bb7-4f84-9fe7-0450da0f3639",
            "name": "",
        },
        "maternal_grandmother":  {
            "gender": "FEMALE",
            "id": "7187c3af-5ebd-4d12-b3a8-48e323d5409b",
            "name": "",
        },
        "month_of_birth": "10",
        "mother":  {
            "gender": "FEMALE",
            "id": "ceb26763-458f-4133-802e-bcb9e49f031d",
            "name": "",
        },
        "name": "testName",
        "paternal_grandfather":  {
            "gender": "MALE",
            "id": "9f5e6464-cd70-4625-995c-c9f5047e974b",
            "name": "",
        },
        "paternal_grandmother":  {
            "gender": "FEMALE",
            "id": "c35b2ee2-afe8-4ba3-a3c3-928bd3e767c1",
            "name": "",
        },
        "twin_status": "NO",
        "weight": "70",
        "weight_unit": "kilogram",
        "year_of_birth": "1981",
    };
    expect(xmlToPersonalInfo(input)).toEqual( output);

});
