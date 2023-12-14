function validate(values, info) {
  const errors = {};

  // name
  if(!info.name) {
    if(!values.name) errors.name = "Este campo es obligatorio";
    if(!values.last_name) errors.last_name = "Este campo es obligatorio";
  }

  // phone
  if(!values.phone) {
    errors.phone = "Este campo es obligatorio";
  }else if((values.phone * 1).toString() === "NaN") {
    errors.phone = "Solo se aceptan números";
  }

  // pay type
  if(!values.payType) errors.payType = "Este campo es obligatorio";
  
  // amount
  if(!values.amount) {
    errors.amount = "Este campo es obligatorio";
  }else if((values.amount * 1).toString() === "NaN") {
    errors.amount = "Solo se aceptan números";
  }

  // months
  if(!values.months) {
    errors.months = "Este campo es obligatorio";
  }else if((values.months * 1).toString() === "NaN") {
    errors.months = "Solo se aceptan números"
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
