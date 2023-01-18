// Modularize and import
import {xmlToPersonalInfo} from './xmlToPersonalInfo.js';
import {personalInfoToXml} from './personalInfoToXml.js';
import {AaaRisk} from './5DiseaseRisk/aaaRisk.js';
import {FhRisk} from './5DiseaseRisk/fhRisk.js';
import {HbocRisk} from './5DiseaseRisk/hbocRisk.js';
import {HnpccRisk} from './5DiseaseRisk/hnpccRisk.js';
import {PcRisk} from './5DiseaseRisk/pcRisk.js';
import $ from 'jquery';

function component() {
  console.log( xmlToPersonalInfo( '<FamilyHistory moodCode="EVN" classCode="OBS"></FamilyHistory>'));
}

/** 家族歴をXMLファイルに変換する。fhh.js で利用。 */
function convertXml( pi ){
  console.log( personalInfoToXml( pi ));
  return personalInfoToXml( pi );
}

/** XMLファイルを家族歴に変換する。fhh.js で利用。 */
function convertPi( pi ){
  return xmlToPersonalInfo( pi );
}

/** 遺伝性乳がん卵巣がん症候群 HBOC */ 
function calcHBOC(pi){
  return new HbocRisk().judge(pi);
}

/** リンチ症候群（遺伝性非ポリポーシス大腸がん） hnpcc */
function calcHNPCC(pi){
  return new HnpccRisk().judge(pi);
}

/** 腹部大動脈瘤 aaa */
function calcAAA(pi){
  return new AaaRisk().judge(pi);
}

/** 家族性高コレステロール血症 fh */
function calcFH(pi){
  return new FhRisk().judge(pi);
}

/** 前立腺がん pc */
function calcPC(pi){
  return new PcRisk().judge(pi);
}





/*********************************************************************************
 * グローバル領域へのマッピング
 ********************************************************************************/

// fhh.js で利用する。
window.convertXml = convertXml;
window.convertPi = convertPi;

// fiveDisease.js で利用する
window.calcHBOC = calcHBOC;
window.calcHNPCC = calcHNPCC;
window.calcAAA = calcAAA;
window.calcFH = calcFH;
window.calcPC = calcPC;

component();