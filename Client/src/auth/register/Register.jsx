"use client";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useAuth from "@/hooks/useAuth";

import { ArrowLeft } from "lucide-react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const navigate = useNavigate();
    const { userRegister, user } = useAuth();

    console.log("Current User:", user);

    const onSubmit = async (formData) => {
        const userData = {
            name: formData.name,
            number: formData.number,
            email: formData.email,
            password: formData.password,
        };

        try {
            const data = await userRegister(userData);

            if (data.success) {
                toast.success(data.message || "Registration successful!");
                navigate("/");
            } else {
                toast.error(data.message || "Something went wrong!");
            }
        } catch (error) {
            console.error(error);
            toast.error(
                error?.response?.data?.message || "Registration failed. Please try again."
            );
        }
    };

    return (
        <div className="w-11/12 md:w-10/12 mx-auto min-h-screen">
            {/* Back button */}
            <Link to={"/"}>
                <Button variant="ghost" className="md:mt-20 mt-3 flex items-center gap-2">
                    <ArrowLeft size={18} />
                    Back to Home
                </Button>
            </Link>

            <div className="flex items-center justify-center mt-5 md:mt-20 relative">
                <Card className="w-full max-w-md shadow-lg rounded-2xl">
                    <CardHeader>
                        <CardTitle className="text-center text-2xl font-bold">
                            Create Account
                        </CardTitle>
                        <p className="text-center text-gray-500 text-sm">
                            Register to get started
                        </p>
                    </CardHeader>

                    <CardContent>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                            {/* Name */}
                            <div>
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    id="name"
                                    type="text"
                                    placeholder="Enter your name"
                                    {...register("name", { required: "Name is required" })}
                                />
                                {errors.name && (
                                    <p className="text-sm text-red-500">{errors.name.message}</p>
                                )}
                            </div>

                            {/* Number */}
                            <div>
                                <Label htmlFor="number">Phone Number</Label>
                                <Input
                                    id="number"
                                    type="tel"
                                    placeholder="Enter your number"
                                    {...register("number", {
                                        required: "Phone number is required",
                                        minLength: {
                                            value: 10,
                                            message: "Number must be at least 10 digits",
                                        },
                                    })}
                                />
                                {errors.number && (
                                    <p className="text-sm text-red-500">{errors.number.message}</p>
                                )}
                            </div>

                            {/* Email */}
                            <div>
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="Enter your email"
                                    {...register("email", {
                                        required: "Email is required",
                                        pattern: {
                                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                            message: "Enter a valid email",
                                        },
                                    })}
                                />
                                {errors.email && (
                                    <p className="text-sm text-red-500">{errors.email.message}</p>
                                )}
                            </div>

                            {/* Password */}
                            <div>
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="Enter your password"
                                    {...register("password", {
                                        required: "Password is required",
                                        minLength: {
                                            value: 6,
                                            message: "Password must be at least 6 characters",
                                        },
                                    })}
                                />
                                {errors.password && (
                                    <p className="text-sm text-red-500">
                                        {errors.password.message}
                                    </p>
                                )}
                            </div>

                            {/* Submit Button */}
                            <Button type="submit" className="w-full">
                                Register
                            </Button>
                        </form>

                        {/* Divider */}
                        <div className="mt-4 flex items-center justify-center">
                            <div className="w-full border-t border-gray-300"></div>
                            <span className="px-2 text-sm text-gray-500">or</span>
                            <div className="w-full border-t border-gray-300"></div>
                        </div>
                    </CardContent>

                    <CardFooter>
                        <p className="text-center text-sm w-full">
                            Already have an account?{" "}
                            <Link
                                to="/login"
                                className="text-blue-500 font-medium hover:underline"
                            >
                                Login
                            </Link>
                        </p>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
};

export default Register;
