import type { FieldValues, SubmitHandler } from "react-hook-form";
import EDForm from "../../../components/form/EDForm";
import EDInput from "../../../components/form/EDInput";
import { Button } from "antd";

const CreateAcademicSemester = () => {
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
  };
  return (
    <EDForm onSubmit={onSubmit}>
      <EDInput type="text" name="name" />
      <Button htmlType="submit" type="primary">
        Create Academic Semester
      </Button>
    </EDForm>
  );
};

export default CreateAcademicSemester;
