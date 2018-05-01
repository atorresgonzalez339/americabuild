
var bootstrapSelectpicker = function () {
    return {
        initSelects: function (idSelect) {
            $(idSelect).selectpicker();
        },
        refreshSelectpicker: function(idSelect)
        {
            $(idSelect).selectpicker('refresh');
        }

    };
}();