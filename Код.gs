function onSubmit(e) {
  updatePatientNameDropdownInForm();
}

function updatePatientNameDropdownInForm() {
    var sheetName = 'Список партнеров';
    var sheet = SpreadsheetApp
        .getActiveSpreadsheet()
        .getSheetByName(sheetName);

    var checkNumberRowsToSelect = sheet.getRange("G1:G1").getValue();
    if (checkNumberRowsToSelect != 'Кол-во заполненных') {
        throw new Error('there in no number for calculating filled data');
    }

    var patientNames = getUniquePatientNames(sheet);
    refreshDataOnForm(patientNames);
    Logger.log('patients dropdown was filled for the payment form');
}

//private
function refreshDataOnForm(patientNames) {
    var form = FormApp.openById("1FTrWAZkFVO9IGfx6lzVfTLSc3v5wRWuKw4h0aDfHuz8");
    var patientNamesDropdownId = '1432265844';
  
    var namesList = form.getItemById(patientNamesDropdownId).asListItem();
    namesList.setChoiceValues(patientNames);
}

//private
function getUniquePatientNames(sheet) {
    var numberRowsToSelect = sheet.getRange("H1:H1").getValue();

    return sheet
        .getRange(2, 2, numberRowsToSelect)
        .getValues()
        .map(function (element) {
            return element.toString();
        })
        .filter(function (element, pos, arr) {
            return arr.indexOf(element) === pos;
        })
        .filter(function(element){
            return element != '';
        });
}