function validate(values) {
  const errors = {};

  // phone
  if(!values.phone) {
    errors.phone = "Este campo es obligatorio";
  }else if((values.phone * 1).toString() === "NaN") {
    errors.phone = "Solo se aceptan números";
  }

  // account
  if(!values.account) {
    errors.account = "Este campo es obligatorio";
  }else if((values.account * 1).toString() === "NaN") {
    errors.account = "Solo se aceptan números";
  }

  // cci
  if(!values.cci) {
    errors.cci = "Este campo es obligatorio";
  }else if((values.cci * 1).toString() === "NaN") {
    errors.cci = "Solo se aceptan números";
  }

  return errors;
}

export default validate;
