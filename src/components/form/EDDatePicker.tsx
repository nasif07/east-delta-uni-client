import { DatePicker, Form } from "antd";
import { Controller } from "react-hook-form";

type TEDInputDatePickerProps = {
  name: string;
  label?: string;
};

const EDDatePicker = ({  name, label }: TEDInputDatePickerProps) => {
  return (
    <div style={{ marginBottom: "16px" }}>
      <Controller
        name={name}
        render={({ field }) => (
          <Form.Item label={label}>
            <DatePicker {...field} size="large" style={{width: "100%"}}></DatePicker>
          </Form.Item>
        )}
      />
    </div>
  );
};

export default EDDatePicker;
