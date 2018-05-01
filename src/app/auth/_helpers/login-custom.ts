export class LoginCustom {

  static handleSignInFormSubmit() {
    $('#m_login_signin_submit').click((e) => {
      let form = $(e.target).closest('form');
      form.validate({
        rules: {
          email: {
            required: true,
            email: true,
          },
          password: {
            required: true,
          },
        },
      });
      if (!form.valid()) {
        e.preventDefault();
        return;
      }
    });
  }

  static displaySignUpForm() {
    let login = $('#m_login');
    login.removeClass('m-login--forget-password');
    login.removeClass('m-login--signin');

    login.addClass('m-login--signup');
  }

  static displaySignInForm() {
    let login = $('#m_login');
    login.removeClass('m-login--forget-password');
    login.removeClass('m-login--signup');
    try {
      $('form').data('validator').resetForm();
    } catch (e) {
    }

    login.addClass('m-login--signin');
  }

  static displayForgetPasswordForm() {
    let login = $('#m_login');
    login.removeClass('m-login--signin');
    login.removeClass('m-login--signup');

    login.addClass('m-login--forget-password');
  }

  static handleFormSwitch() {
    $('#m_login_forget_password').click((e) => {
      e.preventDefault();
      LoginCustom.displayForgetPasswordForm();
    });

    $('#m_login_forget_password_cancel').click((e) => {
      e.preventDefault();
      LoginCustom.displaySignInForm();
    });

    $('#m_login_signup').click((e) => {
      e.preventDefault();
      LoginCustom.displaySignUpForm();
    });

    $('#m_login_signup_cancel').click((e) => {
      e.preventDefault();
      LoginCustom.displaySignInForm();
    });
  }

  static handleSignUpFormSubmit() {
    $('#m_login_signup_submit').click((e) => {
      let btn = $(e.target);
      let form = $(e.target).closest('form');
      form.validate({
        rules: {
          fullname: {
            required: true,
          },
          email: {
            required: true,
            email: true,
          },
          password: {
            required: true,
            minlength: 5,
          },
          rpassword: {
            required: true,
            equalTo: "#registerpassword",
            minlength: 5,
          },
          userType:
          {
            required: true
          },
          agree: {
            required: true,
          },
        },
        messages:{
          rpassword: {
            equalTo: "Confirmation password does not match.",
          },
          userType:
          {
            required: "Please select the user type."
          },
          agree: {
            required: "Please indicate that you accept the Terms and Conditions."
          },
        }
      });
      if (!form.valid()) {
        e.preventDefault();
        return;
      }
    });
  }

  static handleForgetPasswordFormSubmit() {
    $('#m_login_forget_password_submit').click((e) => {
      let btn = $(e.target);
      let form = $(e.target).closest('form');
      form.validate({
        rules: {
          email: {
            required: true,
            email: true,
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
    LoginCustom.handleFormSwitch();
    LoginCustom.handleSignInFormSubmit();
    LoginCustom.handleSignUpFormSubmit();
    LoginCustom.handleForgetPasswordFormSubmit();
  }
}
