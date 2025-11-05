import z from "zod";
import { monthOptions } from "../constants/global";
export const academicSemesterSchema = z.object({
  name: z.string({ required_error: "Semester name is required" }),
  year: z.string({ required_error: "Semester name is required" }),
  startMonth: z.enum(
    monthOptions.map((option) => option.value) as [string, ...string[]]
  ),
  endMonth: z.enum(
    monthOptions.map((option) => option.value) as [string, ...string[]]
  ),
});
