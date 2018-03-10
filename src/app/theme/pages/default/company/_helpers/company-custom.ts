export class CompanyCustom {

  static handleCreateSubmit() {
    $('#m_login_signin_submit').click((e) => {
      let form = $(e.target).closest('form');
      form.validate({
        rules: {
          companyName: {
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
    CompanyCustom.handleCreateSubmit();
  }
}
