"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { AuthLayout } from "@/components/auth/auth-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EyeIcon, EyeSlashIcon, UsersIcon, ArrowTrendingUpIcon } from "@heroicons/react/24/outline";

export default function SignupPage() {
	const searchParams = useSearchParams();
	const [userType, setUserType] = useState<"buyer" | "seller" | null>(
		(searchParams?.get("type") as "buyer" | "seller") || null
	);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [errors, setErrors] = useState<Record<string, string>>({});

	const handleUserTypeSelect = (type: "buyer" | "seller") => {
		setUserType(type);
		// Update URL without refresh
		const url = new URL(window.location.href);
		url.searchParams.set("type", type);
		window.history.replaceState({}, "", url.toString());
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);
		setErrors({});

		// Validation
		const newErrors: Record<string, string> = {};
		if (!firstName) newErrors.firstName = "First name is required";
		if (!lastName) newErrors.lastName = "Last name is required";
		if (!email) newErrors.email = "Email is required";
		if (!email.includes("@")) newErrors.email = "Please enter a valid email";
		if (!password) newErrors.password = "Password is required";
		if (password.length < 8) newErrors.password = "Password must be at least 8 characters";
		if (password !== confirmPassword) newErrors.confirmPassword = "Passwords don't match";

		if (Object.keys(newErrors).length > 0) {
			setErrors(newErrors);
			setIsLoading(false);
			return;
		}

		// Simulate signup process
		await new Promise(resolve => setTimeout(resolve, 2000));
		
		// Redirect to appropriate onboarding
		window.location.href = `/onboarding/${userType}`;
	};

	// If no user type selected, show selection screen
	if (!userType) {
		return (
			<AuthLayout
				title="Join Caprae"
				subtitle="Choose your role to get started"
				showBackButton={true}
			>
				<div className="space-y-6">
					<motion.div
						className="grid gap-4"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
					>
						<Card
							variant="interactive"
							className="cursor-pointer border-2 hover:border-primary-300"
							onClick={() => handleUserTypeSelect("buyer")}
						>
							<CardHeader className="text-center">
								<div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary-100">
									<UsersIcon className="h-6 w-6 text-primary-600" />
								</div>
								<CardTitle className="text-xl">I&apos;m a Buyer</CardTitle>
								<p className="text-neutral-600">
									Looking to acquire businesses and grow my portfolio
								</p>
							</CardHeader>
						</Card>

						<Card
							variant="interactive"
							className="cursor-pointer border-2 hover:border-secondary-300"
							onClick={() => handleUserTypeSelect("seller")}
						>
							<CardHeader className="text-center">
								<div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-secondary-100">
									<ArrowTrendingUpIcon className="h-6 w-6 text-secondary-600" />
								</div>
								<CardTitle className="text-xl">I&apos;m a Seller</CardTitle>
								<p className="text-neutral-600">
									Ready to sell my business and find the right buyer
								</p>
							</CardHeader>
						</Card>
					</motion.div>

					<div className="text-center">
						<p className="text-sm text-neutral-600">
							Already have an account?{" "}
							<Link 
								href="/auth/login" 
								className="text-primary-600 hover:text-primary-500 font-medium transition-colors"
							>
								Sign in here
							</Link>
						</p>
					</div>
				</div>
			</AuthLayout>
		);
	}

	return (
		<AuthLayout
			title={`Join as ${userType === "buyer" ? "Buyer" : "Seller"}`}
			subtitle={`Create your ${userType} account to get started`}
		>
			<Card>
				<CardContent className="space-y-6">
					{/* User type indicator */}
					<div className="flex items-center justify-center space-x-2 p-3 bg-neutral-50 rounded-lg">
						{userType === "buyer" ? (
							<UsersIcon className="h-5 w-5 text-primary-600" />
						) : (
							<ArrowTrendingUpIcon className="h-5 w-5 text-secondary-600" />
						)}
						<span className="text-sm font-medium text-neutral-700">
							Signing up as {userType === "buyer" ? "Buyer" : "Seller"}
						</span>
						<button
							onClick={() => setUserType(null)}
							className="text-xs text-primary-600 hover:text-primary-500 underline"
						>
							Change
						</button>
					</div>

					<form onSubmit={handleSubmit} className="space-y-6">
						<div className="grid grid-cols-2 gap-4">
							<Input
								label="First Name"
								value={firstName}
								onChange={(e) => setFirstName(e.target.value)}
								placeholder="John"
								error={errors.firstName}
								required
							/>
							<Input
								label="Last Name"
								value={lastName}
								onChange={(e) => setLastName(e.target.value)}
								placeholder="Doe"
								error={errors.lastName}
								required
							/>
						</div>

						<Input
							label="Email Address"
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							placeholder="john@example.com"
							error={errors.email}
							required
						/>

						<Input
							label="Password"
							type={showPassword ? "text" : "password"}
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							placeholder="Create a strong password"
							error={errors.password}
							hint="At least 8 characters"
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

						<Input
							label="Confirm Password"
							type={showConfirmPassword ? "text" : "password"}
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
							placeholder="Confirm your password"
							error={errors.confirmPassword}
							rightIcon={
								<button
									type="button"
									onClick={() => setShowConfirmPassword(!showConfirmPassword)}
									className="hover:text-neutral-600 transition-colors"
								>
									{showConfirmPassword ? (
										<EyeSlashIcon className="h-4 w-4" />
									) : (
										<EyeIcon className="h-4 w-4" />
									)}
								</button>
							}
							required
						/>

						<div className="flex items-start">
							<input
								type="checkbox"
								className="mt-1 rounded border-neutral-300 text-primary-600 focus:ring-primary-500"
								required
							/>
							<span className="ml-2 text-sm text-neutral-600">
								I agree to the{" "}
								<Link href="/terms" className="text-primary-600 hover:text-primary-500">
									Terms of Service
								</Link>{" "}
								and{" "}
								<Link href="/privacy" className="text-primary-600 hover:text-primary-500">
									Privacy Policy
								</Link>
							</span>
						</div>

						<Button
							type="submit"
							size="lg"
							className="w-full"
							loading={isLoading}
						>
							{isLoading ? "Creating Account..." : "Create Account"}
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

					{/* Social Signup */}
					<Button variant="outline" className="w-full">
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

					{/* Sign in link */}
					<div className="text-center">
						<p className="text-sm text-neutral-600">
							Already have an account?{" "}
							<Link 
								href="/auth/login" 
								className="text-primary-600 hover:text-primary-500 font-medium transition-colors"
							>
								Sign in here
							</Link>
						</p>
					</div>
				</CardContent>
			</Card>
		</AuthLayout>
	);
}