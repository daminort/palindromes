document.addEventListener('DOMContentLoaded', function() {

    // основные переменные
    var mode = 'single'; // режим работы

    // переключатели
    var modeInputSingle = document.getElementById('modeInputSingle');
    var modeInputMultiple = document.getElementById('modeInputMultiple');

    // кнопки
    var buttonSearch = document.getElementById('buttonSearch');

    // поля ввода
    var startNumber = document.getElementById('startNumber');
    var numbersCount = document.getElementById('numbersCount');

    // события переключателей
    modeInputSingle.addEventListener('click', function() {
        mode = (this.checked === true ? 'single' : 'multiple');
        showForm(mode);
    });
    modeInputMultiple.addEventListener('click', function() {
        mode = (this.checked === true ? 'multiple' : 'single');
        showForm(mode);
    });

    // события кнопок
    buttonSearch.addEventListener('click', function() {
        if (mode === 'single') {
            getSingleResult(startNumber.value);
        } else {
            getMultipleResult(startNumber.value, numbersCount.value);
        }    
    });

});

/*------------------------------------------------------------------
События
------------------------------------------------------------------*/

// отображение формы ввода в зависимости от режима работы
function showForm(mode) {

    var rowNumbersCount = document.getElementById('rowNumbersCount'); 
    rowNumbersCount.className = (mode === 'single' ? 'form-main-row unvisible' : 'form-main-row visible');
};

// отображение массива с результатами
function showResults(resList, eraseresultBlock) {

    var resultBlock = document.getElementById('resultBlock');
    if ( eraseresultBlock ) {
        resultBlock.innerHTML = '';
    }; 

    var resRow = document.createElement('div');
    resRow.className = 'res-row';

    resList.forEach(function(item, index, array) {
        var resCell = document.createElement('div');
        resCell.className = 'res-cell';
        resCell.innerHTML = item;
        resRow.appendChild(resCell);
    });
    resultBlock.appendChild(resRow);
    fadeElement(resRow);   
};

// отображение массива с ошибками
function showErrors(resList) {
    var resultBlock = document.getElementById('resultBlock');
    resultBlock.innerHTML = '';

    resList.forEach(function(item, index, array) {
        var resItem = document.createElement('div');
        resItem.className = 'res-row-error';
        resItem.innerHTML = item;
        resultBlock.appendChild(resItem);
    });
    resList.splice(0);
};

// постепенное отображение элемента
function fadeElement(element) {
    var currentOpacity = 0;
    var speed = 5;
    var timerID = setTimeout(function fade() {
        element.style.opacity = currentOpacity / 100;
        element.style.filter = 'alpha(opacity=' + (currentOpacity * 10) + ')';
        currentOpacity++;
        if (currentOpacity < 100) {
            setTimeout(fade, speed);
        };    
    }, speed);
};

// получение результата в одиночном режиме
function getSingleResult(startNumber) {
    
    var nextNumber = getNextPalindrome(startNumber);
    if (typeof nextNumber === 'number') {
        var resList = [nextNumber];
        showResults(resList, true);
    } else {
        var resList = [nextNumber];
        showErrors(resList);
    };
};

// получение результата во множественном режиме
function getMultipleResult(startNumber, numbersCount) {

    var numbersCount = parseInt(numbersCount, 10);
    if ( isNaN(numbersCount) ) {
        return 'Введенное количество чисел "' + valueString + '" некорректно: ожидается целое число.';
    };

    var curItem = startNumber;
    var numCount = 0;
    var maxIndex = 10;
    var isFirst = true;
    var resList = [];

    while ( numCount < numbersCount ) {

        var item = getNextPalindrome( String(curItem) );
        if ( typeof item !== 'number') {
            resList.push(item);
            showErrors(resList);
            break;
        };
        resList.push(item);
        curItem = ++item;
        numCount++;
        if ( resList.length === maxIndex ) {
            showResults(resList, isFirst);
            resList = [];
            isFirst = false;
        };
    };
    if ( resList.length > 0 ) {
        showResults(resList, isFirst);
    };
};


