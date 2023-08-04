function ConvertHandler() {
  
  this.getNum = function(input) {
    let result,
      valid = /^\d*\.?\d+\/?\d*\.?\d+$|^\.\d+$/g,
      frc = /\//g,
      invalid = /\D/g; 
    result = input.replace(/[a-z]/gi, '');
    if (result === '') result = '1';
    if (!valid.test(result) && invalid.test(result)) result = 'invalid';
    if (frc.test(result)) {
      let idx = result.indexOf('/'),
        x = result.slice(0,idx),
        y = result.slice(idx+1);
      result = Number(x) / Number(y);
    }
    if (isNaN(result)) {
      result = NaN;
    } else {
      result = Math.round(Number(result) * 100000) / 100000;
    }
    return result;
  };
  
  this.getUnit = function(input) {
    let result,
      valid = /^gal$|^l$|^mi$|^km$|^lbs$|^kg$/gi,
      num = /[\d*\.{1}\d+]|[\d+\/{1}\d+]|[\d+]/g;
    result = input.replace(num, '');
    result = result.match(valid);
    if (result !== null) {
      result = result[0].toLowerCase();
    }
    if (result === 'l') result = result.toUpperCase();
    return result;
  };
  
  this.getReturnUnit = function(initUnit) {
    let result;
    switch(initUnit) {
      case 'gal':
        result = 'L';
        break;
      case 'L':
        result = 'gal';
        break;
      case 'mi':
        result = 'km';
        break;
      case 'km':
        result = 'mi';
        break;
      case 'lbs':
        result = 'kg';
        break;
      case 'kg':
        result = 'lbs';
        break;
      default:
        break;
    }
    return result;
  };

  this.spellOutUnit = function(unit) {
    let result;
    switch(unit) {
      case 'gal':
        result = 'gallons';
        break;
      case 'L':
        result = 'liters';
        break;
      case 'mi':
        result = 'miles';
        break;
      case 'km':
        result = 'kilometers';
        break;
      case 'lbs':
        result = 'pounds';
        break;
      case 'kg':
        result = 'kilograms';
        break;
      default:
        break;
    }
    return result;
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;
    switch(initUnit) {
      case 'gal':
        result = initNum * galToL;
        break;
      case 'L':
        result = initNum / galToL;
        break;
      case 'mi':
        result = initNum * miToKm;
        break;
      case 'km':
        result = initNum / miToKm;
        break;
      case 'lbs':
        result = initNum * lbsToKg;
        break;
      case 'kg':
        result = initNum / lbsToKg;
        break;
      default:
        break;
    }
    result = Math.round(result * 100000) / 100000;
    return result;
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let result = `${initNum} ${initUnit} converts to ${returnNum} ${returnUnit}`;
    return result;
  };
  
}

module.exports = ConvertHandler;
