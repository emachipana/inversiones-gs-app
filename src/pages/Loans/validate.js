import { getInfo } from "../../services/reniec";

async function validate(values) {
  const errors = {};

  // dni
  if(!values.dni) {
    errors.dni = "Este campo es obligatorio";
  }else if((values.dni * 1).toString() === "NaN") {
    errors.dni = "Solo se aceptan números";
  }else if(values.dni.length > 8) {
    errors.dni = "Solo se aceptan 8 dígitos";
  }else if(values.dni.length === 8) {
    const info = await getInfo(values.dni);
    if(info.success) {
      values.name = info.nombres;
      values.last_name = `${info.apellidoPaterno} ${info.apellidoMaterno}`
    }
  }

  // name
  if(!values.name) errors.name = "Este campo es obligatorio";
  if(!values.last_name) errors.last_name = "Este campo es obligatorio";

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
