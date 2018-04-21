//== Class definition
var Wizard = function () {
    //== Base elements
    var wizardEl = $('#m_wizard');
    var formEl = $('#m_form');
    var validator;
    var wizard;

    //== Private functions
    var initWizard = function () {
        //== Initialize form wizard
        wizard = wizardEl.mWizard({
            startStep: 1
        });

        formEl.find('[data-wizard-action="submit"]').on('click', function(e) {
            if (!validator.form()) {
                e.preventDefault();
            }
        });

        //== Validation before going to next page
        wizard.on('beforeNext', function(wizard) {
            if (validator.form() !== true) {
                return false;  // don't go to the next step
            }
        })

        //== Change event
        wizard.on('change', function(wizard) {
            mApp.scrollTop();
        });
    }

    var initValidation = function() {
        validator = formEl.validate({
            //== Validate only visible fields
            ignore: ":hidden",

            //== Validation rules
            rules: {
                //=== Client Information(step 1)
                //== Client details
                first_name: {
                    required: true
                },
                last_name: {
                    required: true
                },
                email: {
                    required: true,
                    email: true
                },
                phone: {
                    required: true,
                    phoneUS: true
                },
                address1: {
                    required: true
                },
                address2: {
                    required: true
                },
                city: {
                    required: true
                },
                state: {
                    required: true
                },
                zipcode: {
                    required: true
                },
                driverlic: {
                    required: true
                },

                //== Contractor information
                first_name_contractor: {
                    required: true
                },
                last_name_contractor: {
                    required: true
                },
                email_contractor: {
                    required: true,
                    email: true
                },
                phone_contractor: {
                    required: true,
                    phoneUS: true
                },
                address1_contractor: {
                    required: true
                },
                address2_contractor: {
                    required: true
                },
                city_contractor: {
                    required: true
                },
                state_contractor: {
                    required: true
                },
                zipcode_contractor: {
                    required: true
                },
                driverlic_contractor: {
                    required: true
                },

                //== Architect information
                first_name_architect: {
                    required: true
                },
                last_name_architect: {
                    required: true
                },
                email_architect: {
                    required: true,
                    email: true
                },
                phone_architect: {
                    required: true,
                    phoneUS: true
                },
                address1_architect: {
                    required: true
                },
                address2_architect: {
                    required: true
                },
                city_architect: {
                    required: true
                },
                state_architect: {
                    required: true
                },
                zipcode_architect: {
                    required: true
                },
                driverlic_architect: {
                    required: true
                },

                //=== Confirmation(step 4)
                accept: {
                    required: true
                }
            },

            //== Validation messages
            messages: {
                accept: {
                    required: "You must accept the Terms and Conditions agreement!"
                }
            },

            //== Display error
            invalidHandler: function(event, validator) {
                mApp.scrollTop();

                toastr.options = {
                    "closeButton": false,
                    "debug": false,
                    "newestOnTop": false,
                    "progressBar": true,
                    "positionClass": "toast-top-right",
                    "preventDuplicates": true,
                    "onclick": null,
                    "showDuration": "300",
                    "hideDuration": "1000",
                    "timeOut": "5000",
                    "extendedTimeOut": "1000",
                    "showEasing": "swing",
                    "hideEasing": "linear",
                    "showMethod": "fadeIn",
                    "hideMethod": "fadeOut"
                };

                toastr.error("There are invalid fields. Please correct them.");
            },

        });
    }

    return {
        // public functions
        init: function() {
            wizardEl = $('#m_wizard');
            formEl = $('#m_form');

            initWizard();
            initValidation();
        }
    };
}();

jQuery(document).ready(function() {
    Wizard.init();
});