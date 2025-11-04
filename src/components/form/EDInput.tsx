import { Input } from "antd";
import { Controller } from "react-hook-form";

type TEDInputProps = {
  type: string;
  name: string;
  label?: string;
};

const EDInput = ({ type, name, label }: TEDInputProps) => {
  return (
    <div style={{ marginBottom: "16px" }}>
      {label ? label : null}
      <Controller
        name={name}
        render={({ field }) => <Input {...field} type={type} id={name} />}
      />
    </div>
  );
};

export default EDInput;
