var jsdiff = require('diff');
Date.prototype.Format = function(fmt)
{ //author: meizz
  var o = {
    "M+" : this.getMonth()+1,                 //月份
    "d+" : this.getDate(),                    //日
    "h+" : this.getHours(),                   //小时
    "m+" : this.getMinutes(),                 //分
    "s+" : this.getSeconds(),                 //秒
    "q+" : Math.floor((this.getMonth()+3)/3), //季度
    "S"  : this.getMilliseconds()             //毫秒
  };
  if(/(y+)/.test(fmt))
    fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
  for(var k in o)
    if(new RegExp("("+ k +")").test(fmt))
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
  return fmt;
};


const sprintfWrapper = {
  init : function () {
    if (typeof arguments == "undefined") { return null; }
    if (arguments.length < 1) { return null; }
    if (typeof arguments[0] != "string") { return null; }
    if (typeof RegExp == "undefined") { return null; }
    var string = arguments[0];
    var exp = new RegExp(/(%([%]|(\-)?(\+|\x20)?(0)?(\d+)?(\.(\d)?)?([bcdfosxX])))/g);
    var matches = new Array();
    var strings = new Array();
    var convCount = 0;
    var stringPosStart = 0;
    var stringPosEnd = 0;
    var matchPosEnd = 0;
    var newString = '';
    var match = null;
    while (match = exp.exec(string)) {
      if (match[9]) { convCount += 1; }
      stringPosStart = matchPosEnd;
      stringPosEnd = exp.lastIndex - match[0].length;
      strings[strings.length] = string.substring(stringPosStart, stringPosEnd);
      matchPosEnd = exp.lastIndex;
      matches[matches.length] = {
        match: match[0],
        left: match[3] ? true : false,
        sign: match[4] || '',
        pad: match[5] || ' ',
        min: match[6] || 0,
        precision: match[8],
        code: match[9] || '%',
        negative: parseInt(arguments[convCount]) < 0 ? true : false,
        argument: String(arguments[convCount])
      };
    }
    strings[strings.length] = string.substring(matchPosEnd);
    if (matches.length == 0) { return string; }
    if ((arguments.length - 1) < convCount) { return null; }
    var code = null;
    var match = null;
    var i = null;
    var substitution = null;

    for (i=0; i<matches.length; i++) {
      if (matches[i].code == '%') { substitution = '%' }
      else if (matches[i].code == 'b') {
        matches[i].argument = String(Math.abs(parseInt(matches[i].argument)).toString(2));
        substitution = sprintfWrapper.convert(matches[i], true);
      }
      else if (matches[i].code == 'c') {
        matches[i].argument = String(String.fromCharCode(parseInt(Math.abs(parseInt(matches[i].argument)))));
        substitution = sprintfWrapper.convert(matches[i], true);
      }
      else if (matches[i].code == 'd') {
        matches[i].argument = String(Math.abs(parseInt(matches[i].argument)));
        substitution = sprintfWrapper.convert(matches[i]);
      }
      else if (matches[i].code == 'f') {
        matches[i].argument = String(Math.abs(parseFloat(matches[i].argument)).toFixed(matches[i].precision ? matches[i].precision : 6));
        substitution = sprintfWrapper.convert(matches[i]);
      }
      else if (matches[i].code == 'o') {
        matches[i].argument = String(Math.abs(parseInt(matches[i].argument)).toString(8));
        substitution = sprintfWrapper.convert(matches[i]);
      }
      else if (matches[i].code == 's') {
        matches[i].argument = matches[i].argument.substring(0, matches[i].precision ? matches[i].precision : matches[i].argument.length)
        substitution = sprintfWrapper.convert(matches[i], true);
      }
      else if (matches[i].code == 'x') {
        matches[i].argument = String(Math.abs(parseInt(matches[i].argument)).toString(16));
        substitution = sprintfWrapper.convert(matches[i]);
      }
      else if (matches[i].code == 'X') {
        matches[i].argument = String(Math.abs(parseInt(matches[i].argument)).toString(16));
        substitution = sprintfWrapper.convert(matches[i]).toUpperCase();
      }
      else {
        substitution = matches[i].match;
      }
      newString += strings[i];
      newString += substitution;
    }
    newString += strings[i];
    return newString;
  },
  convert : function(match, nosign){
    if (nosign) {
      match.sign = '';
    } else {
      match.sign = match.negative ? '-' : match.sign;
    }
    var l = match.min - match.argument.length + 1 - match.sign.length;
    var pad = new Array(l < 0 ? 0 : l).join(match.pad);
    if (!match.left) {
      if (match.pad == "0" || nosign) {
        return match.sign + pad + match.argument;
      } else {
        return pad + match.sign + match.argument;
      }
    } else {
      if (match.pad == "0" || nosign) {
        return match.sign + match.argument + pad.replace(/0/g, ' ');
      } else {
        return match.sign + match.argument + pad;
      }
    }
  }
}


const Helper= {
  apply () {
    let result = {};
    for (let i = 0; i < arguments.length; i++) {
      for (let name in arguments[i]) {
        result[name] = arguments[i][name];
      }
    }
    return result;
  },
  stringLen(str){
    var l = str.length;
    var result = 0;
    for (let i = 0; i < l; i++) {
      if ((str.charCodeAt(i) & 0xff00) != 0) {
        result++;
      }
      result++;
    }
    return result;
  },
  setStringLen(str, len){
    let result = "";
    let strlen = Helper.stringLen(str);
    len = len * 2;
    if (strlen > len) {
      result = str.substring(0, len / 2 - 1) + "...";
    } else {
      result = str;
    }
    return result;
  },
  formatDate(value){
    if (value instanceof Date) {
      return `D:${value.getTime()}`;
    } else {
      return `D:${value.getTime()(new Date(value)).getTime()}`;
    }
  },
  toDate(value){
    if (typeof value == "string") {
      if (value.length > 3 && value.substring(0, 2) == "D:") {
        let date = new Date();
        date.setTime(parseFloat(value.substring(2, value.length)));
        return date;
      }
    }
    return value;
  },
  forPush(arr, count, colfun, linefun, enditem){
    let result = [];
    let line = [];
    for (let i = 0; i < arr.length; i++) {
      let item = arr[i];
      line.push(colfun(i, item));
      if (i % count == count - 1) {
        result.push(linefun(line));
        line = [];
      }
    }
    line.push(enditem);
    if (line.length % count == count - 1) {
      result.push(linefun(line));
      line = [];
    }
    if (line.length > 0) {
      result.push(linefun(line));
    }
    return result;
  },
  now(){
    return new Date(Date.now());
  },
  remove(array, index){
    let result = [];
    for (let i = 0; i < array.length; i++) {
      if (index != i)
        result.push(array[i])
    }
    return result;
  },
  diffChars(value1,value2){
    return jsdiff.diffChars(value1, value2);
  },
  sprintf : sprintfWrapper.init,


  stringSplitBySpaceToHexArray(string){
    let result =[];
    if(string.length <= 0)
      return result;
    let stringList = string.split(' ');
    if(stringList.length < 1)
      return result;
    stringList.map(value=>{
      let hex = parseInt(value, 16);
      if (hex >= 0x00 && hex <= 0xFF) {
        result.push(hex);
      }
    });
    return result;
  }

};

export default Helper;
