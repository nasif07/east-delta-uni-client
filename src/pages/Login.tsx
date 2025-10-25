import { Button } from "antd";
import { useForm } from "react-hook-form";
import { useLoginMutation } from "../redux/features/auth/authApi";

type LoginFormInputs = {
  id: string;
  password: string;
};

const Login = () => {
  const { register, handleSubmit } = useForm<LoginFormInputs>();

  const [login, { data, error }] = useLoginMutation();

  console.log("this is data", data);
  console.log("this is error", error);

  const onsubmit = (data: LoginFormInputs) => {
    const userinfo = {
      id: data.id,
      password: data.password,
    };

    login(userinfo);
    console.log(data);
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