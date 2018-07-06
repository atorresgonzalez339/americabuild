export class PermitHelper {

  static selectedItem: any = {id:null};

  static handleSubmit() {
    $('#btn-submit').click((e) => {
      let form = $(e.target).closest('form');

      form.validate({
        rules: {
          description: {
            required: true,
          },
          name: {
            required: true,
          },
        },
      });
      console.log(form.valid());
      if (!form.valid()) {
        e.preventDefault();
        return;
      }
    });
  }
}
