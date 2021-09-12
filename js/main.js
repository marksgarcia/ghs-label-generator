var currentLabel = {
    header: '',
    formula: null,
    generator: '',
    date: '',
    diamond: {
        health: '',
        flammability: '',
        reactivity: ''
    },
    diamond_hazard: null,
    diamond_visibility: 'diamond hide',
    warning: '',
    hazards: {}
};
var setFormattedDate = function () {
    var todayTime = new Date();
    var month = (todayTime.getMonth() + 1);
    var day = todayTime.getDate();
    var year = todayTime.getFullYear();
    var monthString = (month < 10) ? "0" + month : month;
    var dayString = (day < 10) ? "0" + day : day;
    var yearString = year.toString().slice(-2);
    return monthString + "/" + dayString + "/" + yearString;
};
document.querySelector('input[name="date"]').value = setFormattedDate();
var body = document.querySelector('body');
body.addEventListener("click", function () {
    updateCurrentLabel();
    console.log(currentLabel);
});
body.addEventListener("keyup", function () {
    updateCurrentLabel();
    console.log(currentLabel);
});
var unitsMenu = document.querySelector('#unitsMenu');
unitsMenu.onclick = function (event) {
    event.stopPropagation();
    var menu = unitsMenu.querySelector('.menu');
    var selectedUnits = unitsMenu.querySelector('.units.selected');
    menu.classList.toggle('active');
    var units = menu.querySelectorAll('li');
    units.forEach.call(units, function (unit) {
        unit.onclick = function (event) {
            event.stopPropagation();
            var currentUnits = unit.innerText;
            selectedUnits.innerText = currentUnits;
            updateCurrentLabel();
            menu.classList.remove('active');
        };
    });
};
var getChemical = function () {
    var amount = document.querySelector('input[name="amount"]').value;
    var units = (document.querySelector('.units.selected').textContent === ('Units') || document.querySelector('.units.selected').textContent === ('N/A')) ? '' : document.querySelector('.units.selected').textContent;
    var chemical = document.querySelector('input[name="chemicalName"]').value;
    var fullChemical = "" + amount + units + " " + chemical;
    return fullChemical;
};
var getGenerator = function () {
    var generator = document.querySelector('input[name="generator"]').value;
    return generator;
};
var getFormula = function () {
    var formula = document.querySelector('input[name="formula"]').value;
    var finalFormula = '';
    var formulaValues = formula.split('');
    for (var _i = 0, formulaValues_1 = formulaValues; _i < formulaValues_1.length; _i++) {
        var index = formulaValues_1[_i];
        if (index.match(/[a-zA-Z]+/gi)) {
            finalFormula += index;
        }
        else {
            finalFormula += "<sub>" + index + "</sub>";
        }
    }
    return finalFormula;
};
var getDate = function () {
    var dateInput = document.querySelector('input[name="date"]');
    var date = dateInput.value;
    var getDateNums = date.split('').filter(function (integer) {
        return integer !== '/';
    });
    var finalizedDate = '';
    getDateNums.forEach(function (value, index) {
        finalizedDate += value;
        if ((index + 1) % 2 == 0 && (index + 1) < 6) {
            finalizedDate += '/';
        }
    });
    dateInput.value = finalizedDate;
    return finalizedDate;
};
var getWarning = function () {
    var warnings = document.querySelectorAll('input[name="hazard-type"]');
    var finalWarning = '';
    for (var _i = 0, _a = warnings; _i < _a.length; _i++) {
        var warning = _a[_i];
        if (warning.checked && warning.value !== 'none') {
            finalWarning = warning.value;
        }
    }
    return finalWarning;
};
var hazards = document.querySelectorAll('#hazardsForm .hazards-list .hazard');
hazards.forEach.call(hazards, function (hazard) {
    hazard.onclick = function () {
        if (hazard.closest('li').classList.contains('selected')) {
            hazard.closest('li').classList.remove('selected');
        }
        else {
            hazard.closest('li').classList.add('selected');
        }
        updateCurrentLabel();
    };
});
var getHazardsList = function () {
    var selectedHazards = document.querySelectorAll('#hazardsForm .hazards-list .selected');
    return Array.prototype.slice.call(selectedHazards);
};
var returnObjAsHTML = function (obj) {
    var outputHTML = '';
    for (var _i = 0, obj_1 = obj; _i < obj_1.length; _i++) {
        var index = obj_1[_i];
        outputHTML += "<li class=\"hazard\">" + index.innerHTML + "</li>";
    }
    return outputHTML;
};
var getDiamondRatings = function () {
    var getDiamondValues = Array.prototype.slice.call(document.querySelectorAll('.safety-diamond-categories input'));
    var values = {};
    var valuesSum = 0;
    for (var _i = 0, getDiamondValues_1 = getDiamondValues; _i < getDiamondValues_1.length; _i++) {
        var category = getDiamondValues_1[_i];
        values[category.name] = category.value;
        valuesSum += category.value;
    }
    if (valuesSum == 0) {
        values['health'] = '', values['flammability'] = '', values['reactivity'] = '';
    }
    setDiamondVisibility();
    return values;
};
var diamondHazards = document.querySelectorAll('.safety-diamond-categories .specific-hazards .hazard');
diamondHazards.forEach.call(diamondHazards, function (hazard) {
    hazard.onclick = function () {
        var getCurrentHazard = document.querySelector('.safety-diamond-categories .hazard.selected');
        var isExistingHazard;
        try {
            isExistingHazard = compareElements(getCurrentHazard, hazard);
        }
        catch (error) {
            isExistingHazard = false;
        }
        if (getCurrentHazard != null) {
            getCurrentHazard.classList.remove('selected');
            currentLabel.diamond_hazard = null;
        }
        if (!isExistingHazard) {
            hazard.classList.add('selected');
            currentLabel.diamond_hazard = "" + hazard.innerHTML;
        }
    };
});
var setDiamondVisibility = function () {
    var health = currentLabel.diamond.health;
    var flammability = currentLabel.diamond.flammability;
    var reactivity = currentLabel.diamond.reactivity;
    var diamondHazard = currentLabel.diamond_hazard;
    if (health == '' && flammability == '' && reactivity == '' && diamondHazard == null) {
        currentLabel.diamond_visibility = 'diamond hide';
    }
    else {
        currentLabel.diamond_visibility = 'diamond show';
    }
};
var getDiamondHazard = function (selectedHazard) {
    if (selectedHazard === void 0) { selectedHazard = currentLabel.diamond_hazard; }
    return selectedHazard;
};
var compareElements = function (element1, element2) {
    return element1 == element2;
};
var colorControls = document.querySelectorAll('.color-option-btn');
colorControls.forEach.call(colorControls, function (control) {
    control.onclick = function (event) {
        event.preventDefault();
        var btnID = control.id;
        var swatchesPanel = document.querySelector('#swatchesPanel');
        var currentColor = control.querySelector('a').className;
        swatchesPanel.querySelector('.swatches-list .selected').classList.remove('selected');
        var targetColor = swatchesPanel.querySelector(".swatches-list .color ." + currentColor);
        targetColor.closest('.color').classList.add('selected');
        if (swatchesPanel.classList.contains(btnID)) {
            swatchesPanel.classList.toggle(btnID);
        }
        else {
            swatchesPanel.className = btnID;
        }
    };
});
var colorOptions = document.querySelectorAll('.swatches-list .color a');
colorOptions.forEach.call(colorOptions, function (option) {
    option.onclick = function (event) {
        event.preventDefault();
        var currentlySelected = document.querySelector('.color.selected');
        var colorClass = option.className;
        var parent = option.closest('.color');
        var attribute = document.querySelector('#swatchesPanel').className;
        currentlySelected.classList.remove('selected');
        parent.classList.add('selected');
        setColor(attribute, colorClass);
    };
});
var setColor = function (attribute, color) {
    var targetButton = document.querySelector("#" + attribute + " > a");
    targetButton.className = color;
    var labelHeader = document.querySelector('#labelPreview .substance');
    var background = document.getElementById('selectedBGColor');
    var bgColor = window.getComputedStyle(background).getPropertyValue('background-color');
    var font = document.getElementById('selectedFontColor');
    var fontColor = window.getComputedStyle(font).getPropertyValue('color');
    document.querySelector('#swatchesPanel').className = '';
    labelHeader.style.backgroundColor = bgColor;
    labelHeader.style.color = fontColor;
};
var addButton = document.querySelector('.add-button');
addButton.onclick = function (event) {
    event.preventDefault();
    var numOfLabels = document.querySelector('input[name="copies"]').value;
    addToPrintSheet(numOfLabels);
    addedMicroInteraction();
};
var addedMicroInteraction = function () {
    var getConfirmation = document.querySelector('.added-confirmation');
    getConfirmation.classList.add('visible');
    setTimeout(function () {
        getConfirmation.classList.remove('visible');
    }, 3000);
};
var controls = document.querySelectorAll('.control a');
controls.forEach.call(controls, function (control) {
    control.onclick = function (event) {
        event.preventDefault();
        event.stopPropagation();
        if (control.id == 'print') {
            window.print();
        }
        else if (control.id == 'reset') {
            resetPage();
        }
    };
});
var resetPage = function () {
    var textInputs = document.querySelectorAll('input[type="text"]');
    textInputs.forEach.call(textInputs, function (textInput) {
        textInput.value = '';
    });
    var numberInputs = document.querySelectorAll('input[type="number"]');
    numberInputs.forEach.call(numberInputs, function (numberInput) {
        if (numberInput.closest('#hazardsForm')) {
            numberInput.value = '0';
        }
        else {
            numberInput.value = '1';
        }
    });
    var radioInputs = document.querySelectorAll('input[type="radio"]');
    radioInputs.forEach.call(radioInputs, function (radioInput) {
        if (radioInput.value != 'none') {
            radioInput.checked = false;
        }
        else {
            radioInput.checked = true;
        }
    });
    var units = document.querySelector('#unitsMenu .units.selected');
    units.textContent = 'Units';
    var hazards = document.querySelectorAll('.hazards-list .hazard');
    hazards.forEach.call(hazards, function (hazard) {
        if (hazard.classList.contains('selected')) {
            hazard.classList.remove('selected');
        }
    });
    var specificHazards = document.querySelectorAll('.specific-hazards .hazard');
    specificHazards.forEach.call(specificHazards, function (hazard) {
        if (hazard.classList.contains('selected')) {
            hazard.classList.remove('selected');
        }
    });
    currentLabel.diamond_hazard = null;
    var printableDoc = document.getElementById('printableDoc');
    printableDoc.innerHTML = '';
    updateCurrentLabel();
};
var addToPrintSheet = function (numberOfLabels) {
    var getCurrentLabel = document.getElementById('labelPreview');
    var labelHTML = getCurrentLabel.innerHTML;
    var getTarget = document.getElementById('printableDoc');
    for (var index = 0; index < numberOfLabels; index++) {
        var labelWrapper = document.createElement('div');
        labelWrapper.className = 'label-wrapper';
        var printLabel = document.createElement('div');
        printLabel.className = "chemical-label";
        printLabel.innerHTML = labelHTML;
        labelWrapper.appendChild(printLabel);
        getTarget.appendChild(labelWrapper);
    }
};
var updateCurrentLabel = function () {
    currentLabel.header = getChemical();
    currentLabel.generator = getGenerator();
    currentLabel.formula = getFormula();
    currentLabel.date = getDate();
    currentLabel.warning = getWarning();
    currentLabel.hazards = getHazardsList();
    currentLabel.diamond = getDiamondRatings();
    currentLabel.diamond_hazard = getDiamondHazard();
    setDiamondVisibility();
    updateLabelPreview();
};
var updateLabelPreview = function () {
    var labelPreview = document.querySelector('#labelPreview');
    var header = labelPreview.querySelector('.substance');
    header.innerText = currentLabel.header;
    var formula = labelPreview.querySelector('.formula .value');
    formula.innerHTML = currentLabel.formula;
    var generator = labelPreview.querySelector('.generator .value');
    generator.innerText = currentLabel.generator;
    var date = labelPreview.querySelector('.date .value');
    date.innerText = currentLabel.date;
    var warning = labelPreview.querySelector('.hazards .warning');
    warning.innerText = currentLabel.warning;
    var hazardsList = labelPreview.querySelector('.hazards .hazards-list');
    hazardsList.innerHTML = returnObjAsHTML(currentLabel.hazards);
    var diamondHealth = labelPreview.querySelector('.diamond-value.health');
    diamondHealth.textContent = currentLabel.diamond.health;
    var diamondFlammability = labelPreview.querySelector('.diamond-value.flammability');
    diamondFlammability.textContent = currentLabel.diamond.flammability;
    var diamondReactivity = labelPreview.querySelector('.diamond-value.reactivity');
    diamondReactivity.textContent = currentLabel.diamond.reactivity;
    var diamondHazard = labelPreview.querySelector('.diamond-value.hazard');
    diamondHazard.innerHTML = currentLabel.diamond_hazard;
    var diamond = labelPreview.querySelector('.diamond');
    diamond.className = currentLabel.diamond_visibility;
};
