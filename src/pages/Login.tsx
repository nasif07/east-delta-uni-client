import { Button, Row } from "antd";
import { useForm, useFormContext } from "react-hook-form";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { useAppDispatch } from "../redux/hooks";
import { setUser } from "../redux/features/auth/authSlice";
import { verifyToken } from "../utils/verifyToken";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import EDForm from "../components/form/EDForm";
import EDInput from "../components/form/EDInput";

type LoginFormInputs = {
  id: string;
  password: string;
};

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();


  const defaultValues = {
    id: "0001",
    password: "admin12345",
  };

  const [login] = useLoginMutation();
  const onsubmit = async (data: LoginFormInputs) => {
    console.log(data);
    const toastId = toast.loading("Logging in... ");
    try {
      const userinfo = {
        id: data.id,
        password: data.password,
      };

      const res = await login(userinfo).unwrap();
      const user = verifyToken(res.data.accessToken);
      console.log(user);
      dispatch(setUser({ user: user, token: res.data.accessToken }));
      navigate(`/`);
      toast.success("Login successful", { id: toastId, duration: 2000 });
    } catch (error) {
      toast.error("Login failed", { id: toastId, duration: 2000 });
      console.log(error);
    }
  };
  return (
    <Row justify={"center"} align={"middle"} style={{ height: "100vh" }}>
      <EDForm onSubmit={onsubmit} defaultValues={defaultValues}>
          <EDInput type={"text"} name="id" label="Id" />
          <EDInput type={"password"} name="password" label="Password" />
        <Button htmlType="submit">Login</Button>
      </EDForm>
    </Row>
  );
};

export default Login;
