export class RecoverCustom {

  static recoveryInit() {
    $('#m_login_signin_recover_submit').click((e) => {
      let btn = $(e.target);
      let form = $(e.target).closest('form');
      form.validate({
        rules: {
          password: {
            required: true,
            minlength: 5,
          },
          rpassword: {
            required: true,
            equalTo: "#registerpassword",
            minlength: 5,
          },
        },
        messages: {
          rpassword: {
            equalTo: "Confirmation password does not match.",
          },
        },
      });
      if (!form.valid()) {
        e.preventDefault();
        return;
      }
    });
    }

  static init() {
    RecoverCustom.recoveryInit();
  }
}
