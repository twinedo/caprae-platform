"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { AuthLayout } from "@/components/auth/auth-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

export default function LoginPage() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);
		setErrors({});

		// Basic validation
		const newErrors: { email?: string; password?: string } = {};
		if (!email) newErrors.email = "Email is required";
		if (!email.includes("@")) newErrors.email = "Please enter a valid email";
		if (!password) newErrors.password = "Password is required";

		if (Object.keys(newErrors).length > 0) {
			setErrors(newErrors);
			setIsLoading(false);
			return;
		}

		// Simulate login process
		await new Promise(resolve => setTimeout(resolve, 1500));
		
		// Redirect directly to buyer dashboard
		window.location.href = "/dashboard/buyer";
	};

	return (
		<AuthLayout
			title="Welcome Back"
			subtitle="Sign in to continue your business journey"
		>
			<Card>
				<CardContent className="space-y-6">
					<form onSubmit={handleSubmit} className="space-y-6">
						<Input
							label="Email Address"
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							placeholder="Enter your email"
							error={errors.email}
							required
						/>

						<Input
							label="Password"
							type={showPassword ? "text" : "password"}
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							placeholder="Enter your password"
							error={errors.password}
							rightIcon={
								<button
									type="button"
									onClick={() => setShowPassword(!showPassword)}
									className="hover:text-neutral-600 transition-colors"
								>
									{showPassword ? (
										<EyeSlashIcon className="h-4 w-4" />
									) : (
										<EyeIcon className="h-4 w-4" />
									)}
								</button>
							}
							required
						/>

						<div className="flex items-center justify-between">
							<label className="flex items-center">
								<input
									type="checkbox"
									className="rounded border-neutral-300 text-primary-600 focus:ring-primary-500"
								/>
								<span className="ml-2 text-sm text-neutral-600">Remember me</span>
							</label>
							<Link 
								href="/auth/forgot-password" 
								className="text-sm text-primary-600 hover:text-primary-500 transition-colors"
							>
								Forgot password?
							</Link>
						</div>

						<Button
							type="submit"
							size="lg"
							className="w-full"
							loading={isLoading}
						>
							{isLoading ? "Signing in..." : "Sign In"}
						</Button>
					</form>

					{/* Divider */}
					<div className="relative">
						<div className="absolute inset-0 flex items-center">
							<div className="w-full border-t border-neutral-200" />
						</div>
						<div className="relative flex justify-center text-sm">
							<span className="bg-white px-4 text-neutral-500">Or continue with</span>
						</div>
					</div>

					{/* Social Login */}
					<div className="grid grid-cols-1 gap-3">
						<Button 
							variant="outline" 
							className="w-full flex items-center justify-center"
							onClick={async () => {
								setIsLoading(true);
								// Simulate Google OAuth flow
								await new Promise(resolve => setTimeout(resolve, 1500));
								window.location.href = "/dashboard/buyer";
							}}
							disabled={isLoading}
						>
							<svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
								<path
									fill="currentColor"
									d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
								/>
								<path
									fill="currentColor"
									d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
								/>
								<path
									fill="currentColor"
									d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
								/>
								<path
									fill="currentColor"
									d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
								/>
							</svg>
						</Button>
					</div>

					{/* Sign up link */}
					<div className="text-center">
						<p className="text-sm text-neutral-600">
							Don't have an account?{" "}
							<Link 
								href="/auth/signup" 
								className="text-primary-600 hover:text-primary-500 font-medium transition-colors"
							>
								Sign up here
							</Link>
						</p>
					</div>
				</CardContent>
			</Card>
		</AuthLayout>
	);
}