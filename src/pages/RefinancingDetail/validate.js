function validate(values) {
  const errors = {};

  // pending amount
  if(!values.pending_amount) {
    errors.pending_amount = "Este campo es obligatorio";
  }else if((values.pending_amount * 1).toString() === "NaN") {
    errors.pending_amount = "Solo se aceptan números";
  }else if((values.amount - values.recovered) > values.pending_amount) {
    errors.pending_amount =  `Debe ser mayor o igual a ${values.amount - values.recovered}`;
  }

  // pay type
  if(!values.payType) errors.payType = "Este campo es obligatorio";

  // months
  if(!values.months) {
    errors.months = "Este campo es obligatorio";
  }else if((values.months * 1).toString() === "NaN") {
    errors.months = "Solo se aceptan números";
  }

  return errors;
}

export default validate;
