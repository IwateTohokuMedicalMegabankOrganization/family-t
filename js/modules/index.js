// Modularize and import
import xmlToPersonalInfo from './xmlToPersonalInfo.js';
import personalInfoToXml from './personalInfoToXml.js';
import $ from 'jquery';

function component() {
  console.log( xmlToPersonalInfo( '<FamilyHistory moodCode="EVN" classCode="OBS"></FamilyHistory>'));
}

function convertXml( pi ){
  console.log( personalInfoToXml( pi ));
  return personalInfoToXml( pi );
}

function convertPi( pi ){
  return xmlToPersonalInfo( pi );
}


window.convertXml = convertXml;
window.convertPi = convertPi;

component();