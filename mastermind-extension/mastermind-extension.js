// ==UserScript==
// @name         MasterMind Extension
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Adds labor paths to MasterMind tags
// @author       Dylan Miller
// @match        file:///*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=tampermonkey.net
// @grant        none
// ==/UserScript==
const inverted = "#" + invertHex(bgColor.slice(1));

addGlobalStyle("input[type=checkbox] {width: 10px; height: 10px; margin-right: 5px; margin-bottom: 1px; vertical-align: bottom; float:left;}");

addGlobalStyle("input[type=checkbox]:after {content: ''; border-bottom: 5px solid " + bgColor + "; border-top: 10px solid " + bgColor + "; display: block; opacity: 1;}");

addGlobalStyle("input[type=checkbox]:checked:after {border-bottom: 5px solid " + inverted + "; border-top: 5px solid " + inverted + "; opacity: 1; display: block; border-radius: 5px;}");

addGlobalStyle("table, th, td {border: 1px solid black; border-collapse: collapse;}");

addGlobalStyle("label {display: block; font-size: 10px; margin-right: 5px; margin-bottom: 5px;}");

addGlobalStyle("table.name-tag {background-color: " + bgColor + ";}");

const collection = document.getElementsByClassName("name-tag-list");
const firstPaths = ["path 1", "path 2", "path 3", "path 4"];
const secondPaths = ["path 5", "path 6", "path 7", "path 8"];

(function() {
    'use strict';

    for (let i = 0; i < collection.length; i++) {
        let parent = collection[i].parentNode;
        let first = collection[i];
        let second = collection[i].cloneNode();
        second.className = "name-tag-list2";
        parent.appendChild(second);

        for (let f = 0; f < firstPaths.length; f++) {
            let label = createMarker(firstPaths[f]);
            if (firstPaths[f] == "path 3" || firstPaths[f] == "path 1") {
                label.defaultChecked = true;
            }
            first.appendChild(label);
        }
        for (let s = 0; s < secondPaths.length; s++) {
            let label = createMarker(secondPaths[s]);
            second.appendChild(label);
        }
    }
})();

function createMarker(path) {
    let label = document.createElement("label");
    let input = document.createElement("input");
    if (path === "path 1" || path === "path 3") {
        input.checked = "true";
    }
    label.textContent += path;
    input.type = "checkbox";
    input.className = "labor-marker";
    label.appendChild(input);

    return label
}

function invertHex(hex) {
  return (Number(`0x1${hex}`) ^ 0xFFFFFF).toString(16).substr(1).toUpperCase()
}

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}