import type { TAcademicSemester } from "./academicManagement.type";

export type TStudent = {
  _id: string;
  id: string;
  name: TName;
  gender: string;
  dateOfBirth: string;
  bloogGroup: string;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  presentAddress: string;
  permanentAddress: string;
  guardian: TGuardian;
  localGuardian: TLocalGuardian;
  profileImg: string;
  admissionSemester: TAcademicSemester;
  academicDepartment: string;
  fullName: string;
};

export type TName = {
  firstName: string;
  middleName: string;
  lastName: string;
};

export type TGuardian = {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNo: string;
  motherName: string;
  motherOccupation: string;
  motherContactNo: string;
  _id?: string;
};

export type TLocalGuardian = {
  name: string;
  occupation: string;
  contactNo: string;
  address: string;
};
