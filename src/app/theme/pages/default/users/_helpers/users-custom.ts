export class UsersCustom {

  static handleSignInFormSubmit() {
    $('#m_login_signin_submit').click((e) => {
      let form = $(e.target).closest('form');
      form.validate({
        rules: {
          name: {
            required: true,
          },
          subdomain: {
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

  static init() {
    UsersCustom.handleSignInFormSubmit();
  }
}
