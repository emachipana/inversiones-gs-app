export const validate = (values) => {
  const errors = {};
  
  if(!values.amount) {
    errors.amount = "Este campo es obligatorio";
  }else if((values.amount * 1).toString() === "NaN") {
    errors.amount = "Solo se aceptan números";
  }

  if(!values.months) {
    errors.months = "Este campo es obligatorio";
  }else if((values.months * 1).toString() === "NaN") {
    errors.months = "Solo se aceptan números";
  }

  if(!values.payType) errors.payType = "Debes elegir uno";

  return errors;
}
