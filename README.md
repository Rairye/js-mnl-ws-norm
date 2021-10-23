# js-mnl-ws-norm

Light-weight tool for normalizing whitespace and accurately tokenizing words. Multiple natural languages supported. Useful for scrapping, machine learning, and data analysis.

## Installation

1. Download the tgz file
2. In the project directory, excute:

npm install mnl-ws-norm-1.0.0.tgz

## function isWhiteSpace(char)

returns true if char is a whitespace character.

char must be passed as a string with a length of 1.

```javascript
import {isWhiteSpace} from 'mnl-ws-norm';

console.log("Half-width space isWhiteSpace: " + isWhiteSpace(" "));
console.log("Tab is white space: " + isWhiteSpace("	"));
console.log("'A' is white space: " + isWhiteSpace("A"));
console.log("'\\n' is white space: " + isWhiteSpace("\n"));
```

## function isLineBreak(char)

returns true if char is a line break.

char must be passed as a string with a length of 1.

```javascript
import {isLineBreak} from 'mnl-ws-norm';

console.log("'\\n' is line break: " + isLineBreak("\n"));
console.log("Half-width space is line break: " + isLineBreak(" "));
```

## function splitBySpaces(inputStr)

inputStr is the string from which words are to be tokenized. 

inputStr must be passed as a string.

Note: This function splits inputStr by all whitespace characters (spaces, line breaks, etc.).

```javascript
import {splitBySpaces} from 'mnl-ws-norm';

//Source string 1 with half-width spaces (Unicode: U+0020) and a tab (Unicode: U+0009).
var sourceStr1 = "Hey, everybody,  how are you doing?";

//Source string 2 with half-width spaces and a \n character (Unicode: U+000A).
var sourceStr2 = "Hey, everybody\nhow are you doing?";

//Source string 3 with half-width spaces and a full-width space (Unicode: U+3000).
var sourceStr3 = "Hey, everybody,	how are you doing?";

//The join method is used in this example to separate the elements in the returned array.

console.log("sourceStr1: " + splitBySpaces(sourceStr1).join("-"));
console.log("sourceStr2: " + splitBySpaces(sourceStr2).join("-"));
console.log("sourceStr3: " + splitBySpaces(sourceStr3).join("-"));
```

## function splitByLines(inputStr, removeExtraSpaces = false)

Required parameter -> inputStr

inputStr is the string from which lines are to be tokenized.

inputStr must be passed as a string.

Optional parameter -> removeExtraSpaces

By default, leading/trailing spaces are not removed from lines. Specifying removeExtraSpace as true removes leading/trailing spaces.

```javascript
import {splitBySpaces, splitByLines} from 'mnl-ws-norm';

var sourceStr = "Hey, everybody.\nHow are you doing?\rI am alright.";

var lines = splitByLines(sourceStr);

//The join method is used in this example to separate the elements in the returned array.

for (var i = 0; i < lines.length; i++) {
	console.log("Line " + i.toString() + " : " + (splitBySpaces(lines[i])).join("-"));
}
```

## function normSpaces(inputStr, spaceType, removeExtraSpaces = false)

Required parameters -> inputStr, spaceType

inputStr is the string in which the whitespace characters are to be replaced.

inputStr must be passed as a string.

spaceType is the string used to replace all whitespace characters in inputStr.

spaceType must be passed as a string.

Optional parameter -> removeExtraSpaces

By default, extra whitespace characters are not removed from inputStr.

Specifying removeExtraSpaces as true removes extra whitespace characters from inputStr.

Note: Regardless of the value of removeExtraSpaces, the returned string may have leading/trailing whitespace characters, so you may want to use the trim() method as necessary.

```javascript
import {normSpaces} from 'mnl-ws-norm';

//Source string with consecutive half-width spaces (Unicode: U+0020) and a tab (Unicode: U+0009).
var sourceStr = "  Hey,  everybody, 	how  are  you  doing?  ";

//Spaces in sourceStr are replaced with a half-width space, while extra spaces are ignored.
console.log(normSpaces(sourceStr, " "));

//Spaces in sourceStr are replaced with a half-width space, and extra spaces are removed.
console.log(normSpaces(sourceStr, " ", true));

//Spaces in source_str are replaced with a full-width space (Unicode: U+3000), and extra spaces are removed.
console.log(normSpaces(sourceStr, "　", true));
```

# Other languages

1. Python -> https://github.com/Rairye/mnl-ws-norm
