import type { FieldValues, SubmitHandler } from "react-hook-form";
import EDForm from "../../../components/form/EDForm";
import { Button, Col, Flex } from "antd";
import EDSelect from "../../../components/form/EDSelect";
import { semesterOptions } from "../../../constants/semester";
import { monthOptions } from "../../../constants/global";
import { zodResolver } from "@hookform/resolvers/zod";
import { academicSemesterSchema } from "../../../schemas/academicManagement.schema";
import { useAddAcademicSemesterMutation } from "../../../redux/features/admin/academicManagement.api";
import { toast } from "sonner";
import type { TResponse } from "../../../types/global";

const nameOptions = semesterOptions;

const currentYear = new Date().getFullYear();

const yearOptions = Array.from({ length: 5 }, (_, i) => {
  const year = currentYear + i;
  return { value: year.toString(), label: year.toString() };
});

const CreateAcademicSemester = () => {
  const [addAcademicSemester] = useAddAcademicSemesterMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating academic semester...");
    const name = nameOptions[Number(data.name - 1)].label;
    const semesterData = {
      name: name,
      code: data.name,
      year: data.year,
      startMonth: data.startMonth,
      endMonth: data.endMonth,
    };

    try {
      console.log(semesterData);
      const res = (await addAcademicSemester(semesterData)) as TResponse;
      // await addAcademicSemester(semesterData).unwrap();
      if (res.error) {
        toast.error(
          res?.error?.data?.message || "Failed to create academic semester",
          { id: toastId }
        );
      } else {
        toast.success("Academic semester created successfully", {
          id: toastId,
        });
      }
    } catch (error) {
      toast.error("Failed to create academic semester", { id: toastId });
    }
  };

  return (
    <Flex justify="center" align="middle">
      <Col span={6}>
        <EDForm
          onSubmit={onSubmit}
          resolver={zodResolver(academicSemesterSchema)}>
          <EDSelect label={"Name"} name={"name"} options={nameOptions} />
          <EDSelect label={"Year"} name={"year"} options={yearOptions} />
          <EDSelect
            label={"Start Month"}
            name={"startMonth"}
            options={monthOptions}
          />
          <EDSelect
            label={"End Month"}
            name={"endMonth"}
            options={monthOptions}
          />
          <Button htmlType="submit" type="primary">
            Create Academic Semester
          </Button>
        </EDForm>
      </Col>
    </Flex>
  );
};

export default CreateAcademicSemester;
