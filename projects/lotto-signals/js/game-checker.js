function chooseGames() {
	var delay = 0;
    var betForm = $('.bet-form');
    var countrySelect = betForm.find('.country-select select');

    // *********************
    // Register events
    // *********************
    betForm.find('.country-select, .states-select, .date-select, .game-select').on('refreshSelect', 'select', function () {
        $(this).trigger('beforeClearNext');
        $(this).trigger('clearNext');
		var cur = $(this);
		setTimeout(function () {
			cur.trigger('afterClearNext');
		}, delay);
	});

    countrySelect.on('beforeClearNext', function () {
        callBackChooseCountry($(this));
    });

    betForm.find('.country-select, .states-select, .date-select').on('clearNext', 'select', function () {
        var $nextSelect = getNextVisibleSelect($(this));
        clearMultiSelect($nextSelect);
        $nextSelect.trigger('clearNext');
        if (!isNotExistCheckedValueInMultiSelect($(this))) {
            enableMultiSelect($nextSelect);
        }
    });

    betForm.find('.game-select').on('clearNext', 'select', function () {
		$(this).closest('.bet-form').find('.choose-numbers').slideUp(delay, function () {
			$(this).closest('.bet-form').find('.choose-numbers .form-line').hide(0);
		});
    });

    betForm.find('.game-select').on('afterClearNext', 'select', function () {
        callBackChooseGame($(this));
		delay = 400;
    });

    betForm.find('.country-select select, .states-select select, .date-select select, .game-select select').multiselect({
        click: function (event, ui) {
            $(this).trigger('refreshSelect');
        }
    });

    // *********************
    // Select methods
    // *********************
    function callBackChooseCountry(countrySelect) {
        var stateSelectWrapper = countrySelect.closest('.selects').find('.states-select');
        stateSelectWrapper.hide();
        var stateSelect = stateSelectWrapper.find('select');
        stateSelect.empty();

        var $countryID = countrySelect.multiselect('getChecked').length ?
            countrySelect.multiselect('getChecked')[0].value : -1;
        var states = statesData($countryID);
        if (isEmptyArray(states) || isNotExistCheckedValueInMultiSelect(countrySelect)) {
            return;
        }

        for (stateId in states) {
            stateSelect.append($('<option>', {value: stateId, text: states[stateId]}, '<option/>'));
        }

        stateSelectWrapper.show(0);
		try {
			stateSelect.multiselect("refresh");
			stateSelect.multiselect("uncheckAll");
		} catch (error) {}
    }

    function callBackChooseGame($gameSelect) {
        var selectedOptionValue = $gameSelect.val();
        var gameArea = $gameSelect.closest('.bet-form').find('.choose-numbers');
        setTimeout(function () {
			gameArea.find('.' + selectedOptionValue).show(0);
			gameArea.closest('.bet-form').find('.choose-numbers').slideDown(delay);
        }, 100);
    }


    // *********************
    // Utils methods
    // *********************
    function isEmptyArray(obj) {
        for (var key in obj) {
            return false; // если цикл хоть раз сработал, то объект не пустой => false
        }
        // дошли до этой строки - значит цикл не нашёл ни одного свойства => true
        return true;
    }

    function isExist(obj) {
        return obj && obj.length;
    }

    function isNotExistCheckedValueInMultiSelect(selectElement) {
        try {
            if (selectElement.multiselect('getChecked').length == 0) {
                return true;
            }
        } catch (error) {
        }
        return false;
    }

    function getNextVisibleSelect($select) {
        var $nextSelectWrapper = betForm.find('.' + $select.closest('div').data('next-select'));
        var $nextSelect = $nextSelectWrapper.find('select');
        return $nextSelectWrapper.is(':hidden') ? getNextVisibleSelect($nextSelect) : $nextSelect;
    }

    function enableMultiSelect($select) {
        if (!isExist($select)) {
            return;
        }
        $select.multiselect('enable');
    }

    function clearMultiSelect($select) {
        if (!isExist($select)) {
            return;
        }
        $select.multiselect("uncheckAll");
        $select.multiselect('disable');
    }

    // *********************
    // Data from server
    // *********************
    function statesData(countryID) {
        if (countryID == 1) {
            return {
                "11": "Arizona",
                "12": "Arkansas",
                "13": "Texas",
                "14": "Florida",
                "15": "Tennessee",
                "16": "Pennsylvania"
            };
        }

        return {};
    }

    // *********************
    // Fire events
    // *********************
    countrySelect.trigger('refreshSelect');
}