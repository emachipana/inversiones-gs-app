import { FormFeedback, Input, InputGroup, InputGroupText } from "reactstrap";

function InputForm({
  Icon,
  id,
  isDisabled,
  type,
  placeholder,
  value,
  handleChange,
  handleBlur,
  error,
  isTouched
}) {
  return (
    <InputGroup>
      <InputGroupText>
        <Icon />
      </InputGroupText>
      <Input 
        id={id}
        name={id}
        disabled={isDisabled}
        type={type || "text"}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        invalid={!!error && !!isTouched}
        valid={!error && isTouched}
      />
      {
        error && isTouched 
        && <FormFeedback>{ error }</FormFeedback> 
      }
    </InputGroup>
  );
}

export default InputForm;
