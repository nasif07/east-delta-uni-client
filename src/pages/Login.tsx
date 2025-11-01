import { Button } from "antd";
import { useForm } from "react-hook-form";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { useAppDispatch } from "../redux/hooks";
import { setUser } from "../redux/features/auth/authSlice";
import { verifyToken } from "../utils/verifyToken";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

type LoginFormInputs = {
  id: string;
  password: string;
};

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { register, handleSubmit } = useForm<LoginFormInputs>({
    defaultValues: {
      id: "0001",
      password: "admin12345",
    },
  });

  const [login] = useLoginMutation();
  const onsubmit = async (data: LoginFormInputs) => {
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
    <form onSubmit={handleSubmit(onsubmit)}>
      <div>
        <label htmlFor="id">ID: </label>
        <input type="text" id="id" {...register("id")} />
      </div>
      <div>
        <label htmlFor="id">Password: </label>
        <input type="text" id="password" {...register("password")} />
      </div>
      <Button htmlType="submit">Login</Button>
    </form>
  );
};

export default Login;
