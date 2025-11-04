import { Form, Select } from "antd";
import { Controller } from "react-hook-form";

type TEDSelectProps = {
  label: string;
  name: string;
  options?: { value: string; label: string; disabled?: boolean }[];
};

const EDSelect = ({ label, name, options }: TEDSelectProps) => {
  return (
    <Controller
      name={name}
      render={({ field }) => (
        <Form.Item label={label}>
          <Select style={{ width: "100%" }} {...field} options={options} size="large" />
        </Form.Item>
      )}
    />
  );
};

export default EDSelect;
