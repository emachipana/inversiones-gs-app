function validate(values) {
  const errors = {};

  // name
  if(!values.name) errors.name = "Este campo es obligatorio";

  // capital
  if(!values.capital) {
    errors.capital = "Este campo es obligatorio";
  }else if((values.capital * 1).toString() === "NaN") {
    errors.capital = "Solo se aceptan números";
  }

  // password
  if(values.new_password) {
    // new password
    if(values.new_password.length < 6) {
      errors.new_password = "El mínimo son 6 carácteres";
    }
    
    // confirm password
    if(values.new_password !== values.confirm_password) {
      errors.confirm_password = "Las contraseñas no coinciden";
    }
  }

  return errors;
}

export default validate;
