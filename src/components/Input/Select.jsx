import { FormFeedback, FormGroup, Input, Label } from "reactstrap";
import capitalize from "../../helper/capitalize";
import { COLORS } from "../../styles";
import { useTheme } from "../../context/theme";

function Select({
  id,
  value,
  handleChange,
  handleBlur,
  error,
  touched,
  label,
  options = []
}) {
  const { theme } = useTheme();

  return (
    <FormGroup style={{width: "100%"}}>
      <Label
        style={{ fontWeight: 600, color: COLORS[theme].gray.bold }}
      >
        { label }
      </Label>
      <Input
        id={id}
        type="select"
        name={id}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        invalid={error && touched}
        valid={!error && touched}
      >
        <option selected disabled value="">Elige uno</option>
        {
          options.map((option, index) => (
            <option value={option} key={index}>{capitalize(option)}</option>
          ))
        }
      </Input>
      {
        error && touched && (
          <FormFeedback>{ error }</FormFeedback>
        )
      }
    </FormGroup>
  );
}

export default Select;
