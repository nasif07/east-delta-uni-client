import {
  Controller,
  type FieldValues,
  type SubmitHandler,
} from "react-hook-form";
import EDForm from "../../../components/form/EDForm";
import EDInput from "../../../components/form/EDInput";
import { Button, Col, Divider, Form, Input, Row } from "antd";
import EDSelect from "../../../components/form/EDSelect";
import { bloodGroupOptions, genderOptions } from "../../../constants/global";
import EDDatePicker from "../../../components/form/EDDatePicker";
import { useGetAllSemesterQuery } from "../../../redux/features/admin/academicManagement.api";
import { useAddStudentMutation } from "../../../redux/features/admin/userManagement.api";

const studentData = {
  password: "student123",
  student: {
    name: {
      firstName: "I am ",
      middleName: "Student",
      lastName: "Number 1",
    },
    gender: "male",
    bloogGroup: "A+",

    email: "student2@gmail.com",
    contactNo: "1235678",
    emergencyContactNo: "987-654-3210",
    presentAddress: "123 Main St, Cityville",
    permanentAddress: "456 Oak St, Townsville",

    guardian: {
      fatherName: "James Doe",
      fatherOccupation: "Engineer",
      fatherContactNo: "111-222-3333",
      motherName: "Mary Doe",
      motherOccupation: "Teacher",
      motherContactNo: "444-555-6666",
    },

    localGuardian: {
      name: "Alice Johnson",
      occupation: "Doctor",
      contactNo: "777-888-9999",
      address: "789 Pine St, Villageton",
    },

    // admissionSemester: "65b0104110b74fcbd7a25d92",
    academicDepartment: "test",
  },
};

const studentDefaultValues = {
  ...studentData.student,
};

const CreateStudent = () => {
  const [addStudent, { data, error }] = useAddStudentMutation();

  console.log({ data, error });
  const { data: sData, isLoading: sIsLoading } =
    useGetAllSemesterQuery(undefined);

  const semesterOptions = sData?.data?.map((semester) => ({
    label: `${semester.name} ${semester.year}`,
    value: semester._id,
  }));
  const academicDepartmentOption = sData?.data?.map((semester) => ({
    label: `${semester.name} ${semester.year}`,
    value: semester._id,
  }));

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const studentData = {
      student: data,
      password: "student123",
    };
    const formData = new FormData();
    formData.append("data", JSON.stringify(studentData));
    formData.append("file", data.image);
    // addStudent(formData);
    console.log(studentData);

    // !this if for development just for checking
    // console.log(Object.fromEntries(formData));
  };

  return (
    <Row>
      <Col span={24}>
        <EDForm onSubmit={onSubmit} defaultValues={studentDefaultValues}>
          <Divider>Personal Info</Divider>
          <Row gutter={8}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <EDInput type="text" name="name.firstName" label="First Name" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <EDInput type="text" name="name.middleName" label="Middle Name" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <EDInput type="text" name="name.lastName" label="Last Name" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <EDSelect
                label="Gender"
                name="gender"
                options={genderOptions}></EDSelect>
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <EDDatePicker name="dateOfBirth" label="Date Of Birth" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <EDSelect
                options={bloodGroupOptions}
                name="bloogGroup"
                label="Blood Group"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <Controller
                name="image"
                render={({ field: { onChange, value, ...field } }) => (
                  <Form.Item label={"Picture"}>
                    <Input
                      type="file"
                      {...field}
                      value={value?.fileName}
                      onChange={(e) => onChange(e.target.files?.[0])}
                    />
                  </Form.Item>
                )}
              />
            </Col>
            <Divider>Contact Info</Divider>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <EDInput type="email" name="email" label="Email" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <EDInput type="text" name="contactNo" label="Contact No" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <EDInput
                type="text"
                name="emergencyContactNo"
                label="Emergency Contact No"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <EDInput
                type="text"
                name="presentAddress"
                label="Present Address"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <EDInput
                type="text"
                name="permanentAddress"
                label="Permanent Address"
              />
            </Col>
            <Divider>Guardian Info</Divider>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <EDInput
                type="text"
                name="guardian.fatherName"
                label="Father Name"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <EDInput
                type="text"
                name="guardian.fatherOccupation"
                label="Father Occupation"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <EDInput
                type="text"
                name="guardian.fatherContactNo"
                label="Father Contact No"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <EDInput
                type="text"
                name="guardian.motherName"
                label="Mother Name"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <EDInput
                type="text"
                name="guardian.motherOccupation"
                label="Mother Occupation"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <EDInput
                type="text"
                name="guardian.motherContactNo"
                label="Mother Contact No"
              />
            </Col>
            <Divider>Local Guardian Info</Divider>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <EDInput type="text" name="localGuardian.name" label="Name" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <EDInput
                type="text"
                name="localGuardian.occupation"
                label="Occupation"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <EDInput
                type="text"
                name="localGuardian.contactNo"
                label="Contact No"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <EDInput
                type="text"
                name="localGuardian.address"
                label="Address"
              />
            </Col>
            <Divider>Academic Info</Divider>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <EDSelect
                disabled={sIsLoading}
                options={semesterOptions}
                name="admissionSemester"
                label="Admission Semester"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <EDSelect
                options={academicDepartmentOption}
                name="academicDepartment"
                label="Academic Department"
              />
            </Col>
          </Row>
          <Button htmlType="submit">Submit</Button>
        </EDForm>
      </Col>
    </Row>
  );
};

export default CreateStudent;
