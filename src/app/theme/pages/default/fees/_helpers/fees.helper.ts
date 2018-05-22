export class FeesHelper {

  static selectedItem: any = {id:null};

  static handleSubmit() {
    $('#btn-submit').click((e) => {
      let form = $(e.target).closest('form');
      form.validate({
        rules: {
          description: {
            required: true,
          },
          type: {
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
}
