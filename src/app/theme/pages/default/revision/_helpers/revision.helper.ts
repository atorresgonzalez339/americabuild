export class RevisionHelper {

  static handleSubmit() {
    $('#btn-submit').click((e) => {
      let form = $(e.target).closest('form');
      form.validate({
        rules: {
          type: {
            required: true,
          },
          revision: {
            required: true,
          },
        },
        messages: {
          type: {
            required: "This field is required."
          },
          revision: {
            required: "This field is required."
          }
        }
      });
      if (!form.valid()) {
        e.preventDefault();
        return;
      }
    });
  }
}
