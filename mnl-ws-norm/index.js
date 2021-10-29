/*
Copyright 2021 Rairye
Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    https://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

*/

var spaces = new Set([9, 10, 11, 12, 13, 28, 29, 30, 31, 32, 133, 160, 5760, 8192, 8193, 8194, 8195, 8196, 8197, 8198, 8199, 8200, 8201, 8202, 8232, 8233, 8239, 8287, 12288]);
var linebreaks = new Set([10, 11, 12, 13, 28, 29, 30, 133, 8232, 8233]);

export function isWhiteSpace(char) {
	
	if (char.length > 1 || char.length == 0) {
		return false;
	}
	
	var ord = char.charCodeAt(0);
	
	if (spaces.has(ord)) {
		return true;
	}
	
	return false;
	
}

export function isLineBreak(char) {
	
	if (char.length > 1 || char.length == 0) {
		return false;
	}
	
	var ord = char.charCodeAt(0);
	
	if (linebreaks.has(ord)) {
		return true;
	}
	
	return false;
	
}

function trimResult(result) {
		    
	var beginningSpaces = 0;

	var i = 0;

    while (i < result.length){
        if (isWhiteSpace(result.charAt(i))) {
            beginningSpaces++;
			i++;
		}
		
        else {
            break;
		}
	}

    if (beginningSpaces > 1) {
        result = result.substring(i);
	}

    var endingSpaces = 0;
    var j = result.length-1;

    while (j >= 0) {
		var currentChar = result.charAt(j);
        if (isWhiteSpace(currentChar)) {
            endingSpaces++;
            j--;
			
		}
            
        else {
            break;
        }
	
	}
		
    if (endingSpaces > 1) {
        result = result.substring(0, j+1)
	}
	
    return result;
	
}

function getCategory(char) {
    if (isWhiteSpace(char)) {
        return "SPACE";
	}

    return "NOTSPACE";

}

function getLBCategory(char) {
    if (isLineBreak(char)) {
        return "LINEBREAK";
	}

    return "NOTLINEBREAK";

}

export function normSpaces(inputStr, spaceType, removeExtraSpaces = false) {
    if (!typeof inputStr == "string" || !typeof spaceType == "string") {
        return inputStr;
	}

    if (inputStr.length == 0) {
        return inputStr;
	}
    
    var result = [];
    var lastCategory = "";
	var lastReplacement = null;
	var stringLength = inputStr.length;
	
    for (var i = 0; i < stringLength; i++) {
        var currentChar = inputStr.charAt(i);
        var currentCategory = getCategory(currentChar);

        if (currentCategory == "SPACE") {
            if ((lastCategory == "SPACE" && removeExtraSpaces == false) || lastCategory != "SPACE") {
                result.push((inputStr.substring(lastReplacement == null ? 0 : lastReplacement + 1, i) + spaceType));
			}

			lastReplacement = i;
			lastCategory = currentCategory;
			continue;

		}
        lastCategory = currentCategory;
    
	}
	
	if (lastReplacement == null) {
		return inputStr;
	}
	
	if (lastReplacement < stringLength - 1) {
        result.push(inputStr.substring(lastReplacement+1));
	
	}

	if (removeExtraSpaces == false) {
		return result.join("");
	}
	
    return trimResult(result.join(""));
	
}

export function splitBySpaces(inputStr) {
    if (typeof inputStr != "string") {
        return inputStr;
	}

    var words = [];
    var lastCategory = "";
    var i = 0;
    var j = 0;

    while (j < inputStr.length) {
        var currentChar = inputStr.charAt(j);
        var currentCategory = getCategory(currentChar);

        if (currentCategory == "SPACE" && lastCategory == "NOTSPACE") {
            words.push(inputStr.substring(i,j));
            j++;
            i=j;
		}
		
        else if (currentCategory == "SPACE" && lastCategory == "SPACE") {
            j++;
            i=j;
		}

        else if (currentCategory == "NOTSPACE" && lastCategory == "SPACE") {
            i=j;
            j+=1;
		}
            
        else {
            j++;

		}
		
        lastCategory = currentCategory;

	}

    if (j-i > 0) {
        words.push(inputStr.substring(i));
	}

    return words;
    
}

export function splitByLines(inputStr, removeExtraSpaces = false) {
    if (typeof inputStr != "string") {
        return inputStr;
	}

    var words = [];
    var lastCategory = "";
    var i = 0;
    var j = 0;

    while (j < inputStr.length) {
        var currentChar = inputStr.charAt(j);
        var currentCategory = getLBCategory(currentChar);

        if (currentCategory == "LINEBREAK" && lastCategory == "NOTLINEBREAK") {
			var subString = inputStr.substring(i,j)
            words.push(removeExtraSpaces == false ? subString : subString.trim());
            j++;
            i=j;
		}
		
        else if (currentCategory == "LINEBREAK" && lastCategory == "NOTLINEBREAK") {
            j++;
            i=j;
		}

        else if (currentCategory == "NOTLINEBREAK" && lastCategory == "LINEBREAK") {
            i=j;
            j+=1;
		}
            
        else {
            j++;

		}
		
        lastCategory = currentCategory;

	}

    if (j-i > 0) {
		var subString = inputStr.substring(i);
        words.push(removeExtraSpaces == false ? subString : subString.trim());
	}

    return words;
    
}