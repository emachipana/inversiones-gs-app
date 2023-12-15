import filterObjects from "../../helper/filterObjects";

function validate(values) {
  const errors = {};

  // pandero title
  if(!values.title) errors.title = "Este campo es obligatorio";

  // pandero type
  if(!values.panderoType) errors.panderoType = "Este campo es obligatorio";

  // initial date
  if(!values.initialDate) errors.initialDate = "Este campo es obligatorio";

  // persons
  const persons = filterObjects(values);
  for (let index = 0; index < persons.length; index++) {
    // dni
    if(!persons[index][`dni${index}`]) {
      errors[`dni${index}`] = "Este campo es obligatorio";
    }else if(persons[index][`dni${index}`].length > 8) {
      errors[`dni${index}`] = "Solo se aceptan 8 dígitos";
    }else if((persons[index][`dni${index}`] * 1).toString() === "NaN") {
      errors[`dni${index}`] = "Solo se aceptan números"; 
    }else if(persons[index][`dni${index}`].length < 8) {
      errors[`dni${index}`] = "El mínimo son 8 dígitos";
    }

    // name
    if(!persons[index][`name${index}`]) errors[`name${index}`] = "Este campo es obligatorio";
    // last name
    if(!persons[index][`last_name${index}`]) errors[`last_name${index}`] = "Este campo es obligatorio";

    // phone
    if(!persons[index][`phone${index}`]) {
      errors[`phone${index}`] = "Este campo es obligatorio";
    }else if((persons[index][`phone${index}`] * 1).toString() === "NaN") {
      errors[`phone${index}`] = "Solo se aceptan números";
    }

    // position
    if(!persons[index][`position${index}`]) {
      errors[`position${index}`] = "Este campo es obligatorio";
    }else if((persons[index][`position${index}`] * 1).toString() === "NaN") {
      errors[`position${index}`] = "Solo se aceptan números";
    }

  };

  return errors;
}

export default validate;
