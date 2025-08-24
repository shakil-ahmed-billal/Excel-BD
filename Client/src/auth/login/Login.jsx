import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import useAuth from "@/hooks/useAuth"
import { ArrowLeft } from "lucide-react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { Link, useNavigate } from "react-router-dom"

const Login = () => {

    const { register, handleSubmit, formState: { errors }, } = useForm()
    const { userLogin } = useAuth()
    const navigate = useNavigate()

    const onSubmit = async (e) => {
        console.log(e);
        try {
            const data = await userLogin(e)
            if (data.success) {
                toast.success(data.message);
                navigate("/")
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }

    };

    return (
        <div className="w-11/12 md:w-10/12 mx-auto  min-h-screen">
            <Link to={"/"}><Button variant={"ghost"} className={"md:mt-20 mt-3"}><ArrowLeft />Back to Home</Button></Link>
            <div className="flex items-center justify-center mt-5 md:mt-20 relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-20 blur-3xl rounded-full pointer-events-none" />
                <Card className="w-full max-w-md shadow-lg rounded-2xl bg-transparent">
                    <CardHeader>
                        <CardTitle className="text-center text-2xl font-bold">Welcome Back</CardTitle>
                        <p className="text-center text-gray-500 text-sm">Sign in to continue</p>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                            <div>
                                <Label htmlFor="number">Number</Label>
                                <Input
                                    {...register("number")}
                                    name="number"
                                    id="number"
                                    type="number"
                                    placeholder="Enter your Number"
                                    required
                                />
                            </div>
                            <div>
                                <Label htmlFor="pin">PIN</Label>
                                <Input
                                    {...register("pin")}
                                    name="pin"
                                    id="pin"
                                    type="password"
                                    placeholder="Enter your PIN"
                                    required
                                />
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <Link href="/forgot-password" className="text-blue-500 hover:underline">
                                    Forgot password?
                                </Link>
                                <Link href="/register" className="text-blue-500 hover:underline">
                                    Create an account
                                </Link>
                            </div>
                            <Button type="submit" className="w-full">
                                Sign In
                            </Button>
                        </form>
                        <div className="mt-4 flex items-center justify-center">
                            <div className="w-full border-t border-gray-300"></div>
                            <span className="px-2 text-sm text-gray-500">or</span>
                            <div className="w-full border-t border-gray-300"></div>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Label htmlFor="password">No have an account? <Link to="/register" className="text-blue-500 hover:underline">Register</Link></Label>
                    </CardFooter>
                </Card>
            </div>
        </div>
    )
}

export default Login