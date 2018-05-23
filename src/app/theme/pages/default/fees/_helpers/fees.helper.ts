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

  static handleCompanyFeesSubmit() {
    $('#btn-submit').click((e) => {
      let form = $(e.target).closest('form');
      form.validate({
        rules: {
          company: {
            required: true,
          },
          fees_category: {
            required: true,
          },
          valueFees: {
            required: true,
            //float: true,
            range:[0.0,99999999999]
          },
        },
        messages: {
          valueFees: {
            range: "The value must be a float value."
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
