'use strict';
/**
 * Определение следующего палиндрома
 * @param {string} valueString строковое представление числа, для которого необходимо определить 
 * следующий палиндром
 * @return {number} число-палиндром
 */
function getNextPalindrome(valueString) {
    
    var initValue = parseInt(valueString, 10);
    var initValueString = String(initValue);
    var initValueLength = valueString.length;
    var initValueArray = valueString.split('');
  
    if ( isNaN(initValue) || initValueLength < 2) {
        return 'Введенное значение "' + valueString + '" некорректно: необходимо многозначное целое число.';
    };
  
    /*
    Вариант 1:
    Если число полностью состоит из девяток, достаточно добавить к нему 2
    */
    var isOnly9 = true;
    var initValueArrayCopy = initValueArray.slice(0);
    initValueArrayCopy.forEach( function(item, index, array) {
        if (item !== '9') {
            isOnly9 = false;
            return;
        };
    });
    if (isOnly9) {
        return initValue + 2;
    };
  
    /*
    Вариант 2:
    Основная идея: делим строковое представление числа пополам (если четко пополам не
    делится, берем на один символ больше), и дописываем в конец цифры первой части в обратном
    порядке (если всего цифр нечетное количество, то за вычетом последней цифры первой части).
    Например:
        Число:      5632                    63212
        Половина:   '56'                    '632'
        Получим:    '56' + '65' = 5665      '632' + '36' = 63236
    */
    var isOddSymbolCount = (initValueString.length % 2 === 0);
    var firstPartCount = isOddSymbolCount ? initValueLength / 2 : Math.floor(initValueLength / 2) + 1;  

    var firstPartString = initValueArray.slice(0, firstPartCount).join('');
    var firstPartNumber = parseInt(firstPartString, 10);
    var firstPartArray = String(firstPartNumber).split('').reverse();

    var resultString = firstPartString;
    if ( !isOddSymbolCount ) {
        firstPartArray.shift();
    }

    firstPartArray.forEach( function(item, index, array) {
        resultString += item;
    });

    var resValue = parseInt(resultString, 10);
    if (resValue > initValue) {
        var resPalindrome = String(resValue).split('').reverse().join('');
        if ( String(resValue) === resPalindrome ) {
            return resValue;
        }
    };
    
    /*
    Вариант 3:
    Основная идея: делим строковое представление числа пополам (если четко пополам не
    делится, берем на один символ больше), к первой части прибавляем единицу и потом 
    дописываем цифры инкрементированной первой части в обратном порядке (если всего
    цифр нечетное количество, то за вычетом последней цифры инкрементированной половины).
    Например:
        Число:      5682                    63281
        Половина:   '56'                    '632'
        Инкремент:  57                      633
        Получим:    '57' + '75' = 5775      '633' + '36' = 63336
    */
    var isOddSymbolCount = (initValueString.length % 2 === 0);
    var firstPartCount = isOddSymbolCount ? initValueLength / 2 : Math.floor(initValueLength / 2) + 1;  

    var firstPartString = initValueArray.slice(0, firstPartCount).join('');
    var firstPartNumber = parseInt(firstPartString, 10);
    var firstPartNumberInc = ++firstPartNumber;
    var firstPartStringInc = String(firstPartNumberInc);
    var firstPartArrayInc = String(firstPartNumberInc).split('').reverse();

    var resultString = firstPartStringInc;
    if ( !isOddSymbolCount ) {
        firstPartArrayInc.shift();
    }

    firstPartArrayInc.forEach( function(item, index, array) {
        resultString += item;
    });

    return Number(resultString);
};