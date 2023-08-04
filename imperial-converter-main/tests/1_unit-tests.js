const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
    
    test('convertHandler should correctly read a whole number input.', function() {
        let input = '5',
            initNum = convertHandler.getNum(input);
        assert.isOk(initNum, 'initNum isOk');
    });

    test('convertHandler should correctly read a decimal number input.', function() {
        let input = '5.5',
            initNum = convertHandler.getNum(input);
        assert.isOk(initNum, 'initNum isOk');
    });

    test('convertHandler should correctly read a fractional input.', function() {
        let input = '5/5',
            initNum = convertHandler.getNum(input);
        assert.isOk(initNum, 'initNum isOk');
    });

    test('convertHandler should correctly read a fractional input with a decimal.', function() {
        let input = '5.5/5.5',
            initNum = convertHandler.getNum(input);
        assert.isOk(initNum, 'initNum isOk');
    });

    test('convertHandler should correctly return an error on a double-fraction (i.e. 3/2/3).', function() {
        let input = '3/2/3',
            initNum = convertHandler.getNum(input);
        assert.isNotOk(initNum, 'initNum isNotOk');
    });

    test('convertHandler should correctly default to a numerical input of 1 when no numerical input is provided.', function() {
        let input = '',
            initNum = convertHandler.getNum(input);
        assert.strictEqual(initNum, 1, 'input is empty and initNum is strict equal to 1');
    });

    test('convertHandler should correctly read each valid input unit.', function() {
       let input = ['gal', 'L', 'mi', 'km', 'lbs', 'kg'];
       input.forEach(n => {
        let initUnit = convertHandler.getUnit(n);
        assert.isOk(initUnit, 'initUnit is ok"');
       }); 
    });

    test('convertHandler should correctly return an error for an invalid input unit.', function() {
        let input = ['gaal', 'lt', 'mil', 'kmm', 'lbvs', 'kjg'];
        input.forEach(n => {
            let initUnit = convertHandler.getUnit(n);
            assert.isNotOk(initUnit, 'initUnit is not ok');
        });
    });

    test('convertHandler should return the correct return unit for each valid input unit.', function() {
        let input = ['gal', 'L', 'mi', 'km', 'lbs', 'kg'];
        input.forEach(n => {
            let returnUnit = convertHandler.getReturnUnit(n);
            switch(n) {
                case 'gal':
                    assert.strictEqual(returnUnit, 'L', 'input is "gal" & returnUnit is strict equal to "L"');
                    break;
                case 'L':
                    assert.strictEqual(returnUnit, 'gal', 'input is "L" & returnUnit is strict equal to "gal"');
                    break;
                case 'mi':
                    assert.strictEqual(returnUnit, 'km', 'input is "mi" & returnUnit is strict equal to "km"');
                    break;
                case 'km':
                    assert.strictEqual(returnUnit, 'mi', 'input is "km" & returnUnit is strict equal to "mi"');
                    break;
                case 'lbs':
                    assert.strictEqual(returnUnit, 'kg', 'input is "lbs" & returnUnit is strict equal to "kg"');
                    break;
                case 'kg':
                    assert.strictEqual(returnUnit, 'lbs', 'input is "kg" & returnUnit is strict equal to "lbs"');
                    break;
                default:
                    break;
            }
        });
    });

    test('convertHandler should correctly return the spelled-out string unit for each valid input unit.', function() {
        let input = ['gal', 'L', 'mi', 'km', 'lbs', 'kg'];
        input.forEach(n => {
            let unitSO = convertHandler.spellOutUnit(n);
            switch(n) {
                case 'gal':
                    assert.strictEqual(unitSO, 'gallons', 'input is "gal" & returnUnit is strict equal to "gallons"');
                    break;
                case 'L':
                    assert.strictEqual(unitSO, 'liters', 'input is "L" & returnUnit is strict equal to "liters"');
                    break;
                case 'mi':
                    assert.strictEqual(unitSO, 'miles', 'input is "mi" & returnUnit is strict equal to "miles"');
                    break;
                case 'km':
                    assert.strictEqual(unitSO, 'kilometers', 'input is "km" & returnUnit is strict equal to "kilometers"');
                    break;
                case 'lbs':
                    assert.strictEqual(unitSO, 'pounds', 'input is "lbs" & returnUnit is strict equal to "pounds"');
                    break;
                case 'kg':
                    assert.strictEqual(unitSO, 'kilograms', 'input is "kg" & returnUnit is strict equal to "kilograms"');
                    break;
                default:
                    break;
            }
        });
    });

    test('convertHandler should correctly convert gal to L.', function() {
        let initNum = 1,
            initUnit = 'gal',
            returnNum = convertHandler.convert(initNum, initUnit);
        assert.closeTo(returnNum, 3.78541, 0.1, 'input is "1gal" output is close to "3.78541L"');
    });

    test('convertHandler should correctly convert L to gal.', function() {
        let initNum = 1,
            initUnit = 'L',
            returnNum = convertHandler.convert(initNum, initUnit);
        assert.closeTo(returnNum, 0.26417, 0.1, 'input is "1L" output is close to "0.26417gal"');
    });

    test('convertHandler should correctly convert mi to km.', function() {
        let initNum = 1,
            initUnit = 'mi',
            returnNum = convertHandler.convert(initNum, initUnit);
        assert.closeTo(returnNum, 1.60934, 0.1, 'input is "1mi" output is close to "1.60934km"');
    });

    test('convertHandler should correctly convert km to mi.', function() {
        let initNum = 1,
            initUnit = 'km',
            returnNum = convertHandler.convert(initNum, initUnit);
        assert.closeTo(returnNum, 0.62137, 0.1, 'input is "1km" output is close to "0.62137mi"');
    });

    test('convertHandler should correctly convert lbs to kg.', function() {
        let initNum = 1,
            initUnit = 'lbs',
            returnNum = convertHandler.convert(initNum, initUnit);
        assert.closeTo(returnNum, 0.45359, 0.1, 'input is "1lbs" output is close to "0.45359kg"');
    });

    test('convertHandler should correctly convert kg to lbs.', function() {
        let initNum = 1,
            initUnit = 'kg',
            returnNum = convertHandler.convert(initNum, initUnit);
        assert.closeTo(returnNum, 2.20462, 0.1, 'input is "1kg" output is close to "2.20462lbs"');
    });

});