import { FormGroup, Label, Input, FormFeedback } from "reactstrap";
import { COLORS } from "../../styles";
import { useTheme } from "../../context/theme";

function InputLabel({
  id,
  disabled,
  label,
  placeholder,
  type,
  value,
  handleChange,
  handleBlur,
  error,
  touched
}) {
  const { theme } = useTheme();

  return (
    <FormGroup style={{width: "100%"}}>
      <Label
        style={{ fontWeight: 600, color: COLORS[theme].gray.bold }}
        htmlFor={id}
      >
        { label }
      </Label>
      <Input
        id={id}
        name={id}
        disabled={disabled}
        type={type || "text"}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        invalid={error && touched}
        valid={!error && touched}
      />
      {
        error && touched && (
          <FormFeedback>{ error }</FormFeedback>
        )
      }
    </FormGroup>
  );
}

export default InputLabel;
