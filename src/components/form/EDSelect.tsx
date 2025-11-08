import { Form, Select } from "antd";
import { Controller } from "react-hook-form";

type TEDSelectProps = {
  label: string;
  name: string;
  disabled?: boolean;
  options?: { value: string; label: string; disabled?: boolean }[];
};

const EDSelect = ({ label, name, options, disabled }: TEDSelectProps) => {
  return (
    <Controller
      name={name}
      render={({ field, fieldState: { error } }) => (
        <Form.Item label={label}>
          <Select
            style={{ width: "100%" }}
            {...field}
            options={options}
            size="large"
            disabled={disabled}
          />
          {error && <p style={{ color: "red" }}>{error.message}</p>}
        </Form.Item>
      )}
    />
  );
};

export default EDSelect;
