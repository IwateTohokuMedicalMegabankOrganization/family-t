// Modularize and import
import xmlToPersonalInfo from './xmlToPersonalInfo.js';
import personalInfoToXml from './personalInfoToXml.js';
import $ from 'jquery';

function component() {
  console.log( xmlToPersonalInfo( '<FamilyHistory moodCode="EVN" classCode="OBS"></FamilyHistory>'));
}

function convertXml( pi ){
  console.log( personalInfoToXml( pi ));
}

window.convertXml = convertXml;
component();