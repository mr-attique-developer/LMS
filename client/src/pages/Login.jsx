import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  useLoginUserMutation,
  useRegisterUserMutation,
} from "@/features/api/authApi";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import {  useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function Login() {
  const [loginInput, setLoginInput] = useState({ email: "", password: "" });
  const [signupInput, setSignupInput] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [activeTab, setActiveTab] = useState("login");
  const navigate = useNavigate()
  const [loginUser, { data: LoginUserData, isSuccess: LoginUserIsSuccess, isError: LoginUserIsError, error: LoginUserError,  isLoading: LoginUserIsLoading }] = useLoginUserMutation();
  const [registerUser, { data: RegisterUserData, isSuccess: RegisterUserIsSuccess, isError: RegisterUserIsError, error: RegisterUserError, isLoading: RegisterUserIsLoading }] = useRegisterUserMutation();

  const handleChange = (e, type) => {
    if (type === 'login') {
      setLoginInput({ ...loginInput, [e.target.name]: e.target.value });
    } else {
      setSignupInput({ ...signupInput, [e.target.name]: e.target.value });
    }
  };

  const handleRegistration = async (type) => {
    const inputDataResult = type === 'login' ? loginInput : signupInput;
    const action = type === 'login' ? loginUser : registerUser;
    await action(inputDataResult);
  };


  useEffect(() => {
    if (LoginUserIsSuccess) {
      toast.success(LoginUserData.message);
      setLoginInput({ email: "", password: "" });
      navigate("/")
    }
    if (registerUser && RegisterUserIsSuccess) {
      toast.success(RegisterUserData.message);
      setSignupInput({ username: "", email: "", password: "" });
      setActiveTab("login")
      
    }
    if (LoginUserIsError) {
      console.log('LoginUserIsError:', LoginUserError);
      const errorMessage = LoginUserError?.data?.message || 'Login Failed';
      toast.error(errorMessage);
    }
    if (RegisterUserIsError) {
      console.log('RegisterUserIsError:', RegisterUserError);
      const errorMessage = RegisterUserError?.data?.message || 'Signup Failed';
      toast.error(errorMessage);
    }
  }, [LoginUserIsError, RegisterUserIsError, LoginUserData, RegisterUserData, LoginUserIsSuccess, RegisterUserIsSuccess]);
  return (
    <div className="flex justify-center items-center h-screen">
      <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-[400px]" >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="signup">SignUp</TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <Card>
            <CardHeader>
              <CardTitle className="text-center text-xl ">Login</CardTitle>
              <CardDescription>
                Login to your account. Enter your email and password to continue
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="name">Email</Label>
                <Input
                  id="email"
                  value={loginInput.email}
                  onChange={(e) => handleChange(e, "login")}
                  name="email"
                  type="email"
                  required
                  placeholder="Jhon@gmail.com"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  placeholder="123..."
                  required
                  name="password"
                  value={loginInput.password}
                  onChange={(e) => handleChange(e, "login")}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button
              disabled={LoginUserIsLoading}
                className="w-full"
                onClick={() => handleRegistration("login")}
              >
                {LoginUserIsLoading ? (
                  <>
                  <Loader2 className="animate-spin w-4 h-4 ml-2" /> Wait Please
                  </>
                ) : (
                  "Login"
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="signup">
          <Card>
            <CardHeader>
              <CardTitle className="text-center text-xl ">SignUp</CardTitle>
              <CardDescription>
                Create a new account here. Click signup when you're done.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Jhon Doe"
                  name="username"
                  value={signupInput.username}
                  onChange={(e) => handleChange(e, "signup")}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Jhon@gmail.com"
                  name="email"
                  value={signupInput.email}
                  onChange={(e) => handleChange(e, "signup")}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="123"
                  name="password"
                  value={signupInput.password}
                  onChange={(e) => handleChange(e, "signup")}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button
              disabled={RegisterUserIsLoading}
                className="w-full"
                onClick={() => handleRegistration("signup")}
              >
                {RegisterUserIsLoading ? (
                  <>
                  <Loader2 className="animate-spin w-4 h-4 ml-2" /> Wait Please
                  </>
                ) : (
                  "Signup"
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
