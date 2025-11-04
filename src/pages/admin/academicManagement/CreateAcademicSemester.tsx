import type { FieldValues, SubmitHandler } from "react-hook-form";
import EDForm from "../../../components/form/EDForm";
import { Button, Col, Flex } from "antd";
import EDSelect from "../../../components/form/EDSelect";
import { semesterOptions } from "../../../constants/semester";
import { monthOptions } from "../../../constants/global";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";

const nameOptions = semesterOptions;

const currentYear = new Date().getFullYear();

const yearOptions = Array.from({ length: 5 }, (_, i) => {
  const year = currentYear + i;
  return { value: year.toString(), label: year.toString() };
});

const CreateAcademicSemester = () => {
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const name = nameOptions[Number(data.name - 1)].label;
    const semesterData = {
      name: name,
      code: data.name,
      year: data.year,
      startMonth: data.startMonth,
      endMonth: data.endMonth,
    };
    console.log(semesterData);
  };

  const academicSemesterSchema = z.object({
    name: z.enum(
      nameOptions.map((option) => option.value) as [string, ...string[]]
    ),
    year: z.string().refine((val) => {
      return yearOptions.some((option) => option.value === val);
    }),
    startMonth: z.enum(
      monthOptions.map((option) => option.value) as [string, ...string[ ]]
    ),
    endMonth: z.enum(
      monthOptions.map((option) => option.value) as [string, ...string[]]
    ),
  });
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
