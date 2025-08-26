"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
	HeartIcon, 
	ArrowRightIcon, 
	ArrowLeftIcon,
	CheckIcon,
	BuildingOfficeIcon,
	CurrencyDollarIcon,
	ClockIcon,
	MapPinIcon,
	UserGroupIcon,
	ChartBarIcon,
	LightBulbIcon
} from "@heroicons/react/24/outline";

interface BuyerProfile {
	// Basic Info
	firstName: string;
	lastName: string;
	company: string;
	title: string;
	experience: string;
	
	// Investment Profile
	budgetMin: string;
	budgetMax: string;
	timeframe: string;
	locations: string[];
	
	// Business Preferences
	industries: string[];
	businessSize: string;
	acquisitionType: string;
	
	// Personal Touch
	motivation: string;
	dealBreakers: string[];
	idealDeal: string;
}

const steps = [
	{ id: 1, title: "Welcome", icon: HeartIcon },
	{ id: 2, title: "About You", icon: UserGroupIcon },
	{ id: 3, title: "Investment Goals", icon: CurrencyDollarIcon },
	{ id: 4, title: "Business Preferences", icon: BuildingOfficeIcon },
	{ id: 5, title: "Your Story", icon: LightBulbIcon },
	{ id: 6, title: "Complete", icon: CheckIcon }
];

const industries = [
	"Technology", "Healthcare", "E-commerce", "Manufacturing", "Food & Beverage",
	"Professional Services", "Real Estate", "Finance", "Education", "Retail",
	"Construction", "Transportation", "Media & Entertainment", "Other"
];

const businessSizes = [
	{ value: "micro", label: "Micro Business", description: "1-9 employees, <$1M revenue" },
	{ value: "small", label: "Small Business", description: "10-49 employees, $1M-$10M revenue" },
	{ value: "medium", label: "Medium Business", description: "50-249 employees, $10M-$50M revenue" },
	{ value: "large", label: "Large Business", description: "250+ employees, $50M+ revenue" }
];

const acquisitionTypes = [
	{ value: "strategic", label: "Strategic Acquisition", description: "Expand existing business operations" },
	{ value: "financial", label: "Financial Investment", description: "Pure investment for returns" },
	{ value: "rollup", label: "Roll-up Strategy", description: "Consolidating similar businesses" },
	{ value: "turnaround", label: "Turnaround Opportunity", description: "Fixing underperforming businesses" }
];

export default function BuyerOnboardingPage() {
	const [currentStep, setCurrentStep] = useState(1);
	const [profile, setProfile] = useState<BuyerProfile>({
		firstName: "",
		lastName: "",
		company: "",
		title: "",
		experience: "",
		budgetMin: "",
		budgetMax: "",
		timeframe: "",
		locations: [],
		industries: [],
		businessSize: "",
		acquisitionType: "",
		motivation: "",
		dealBreakers: [],
		idealDeal: ""
	});

	const updateProfile = (updates: Partial<BuyerProfile>) => {
		setProfile(prev => ({ ...prev, ...updates }));
	};

	const nextStep = () => {
		if (currentStep < steps.length) {
			setCurrentStep(currentStep + 1);
		}
	};

	const prevStep = () => {
		if (currentStep > 1) {
			setCurrentStep(currentStep - 1);
		}
	};

	const completeOnboarding = () => {
		// In a real app, save profile and redirect to dashboard
		console.log("Buyer Profile:", profile);
		window.location.href = "/dashboard/buyer";
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50">
			{/* Navigation */}
			<nav className="border-b border-neutral-200/50 bg-white/80 backdrop-blur-sm">
				<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					<div className="flex h-16 items-center justify-between">
						<Link href="/" className="flex items-center space-x-2">
							<div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary-500 to-secondary-500">
								<HeartIcon className="h-5 w-5 text-white" />
							</div>
							<span className="text-xl font-bold gradient-text">Caprae</span>
						</Link>
						<div className="text-sm text-neutral-600">
							Step {currentStep} of {steps.length}
						</div>
					</div>
				</div>
			</nav>

			{/* Progress Bar */}
			<div className="bg-white border-b border-neutral-200">
				<div className="mx-auto max-w-4xl px-4 py-4">
					<div className="flex items-center justify-between mb-4">
						{steps.map((step, index) => {
							const Icon = step.icon;
							const isActive = currentStep === step.id;
							const isCompleted = currentStep > step.id;
							
							return (
								<div key={step.id} className="flex items-center">
									<div className={`
										flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300
										${isActive ? "border-primary-500 bg-primary-500 text-white" : 
										  isCompleted ? "border-success-500 bg-success-500 text-white" : 
										  "border-neutral-300 bg-white text-neutral-400"}
									`}>
										<Icon className="h-5 w-5" />
									</div>
									{index < steps.length - 1 && (
										<div className={`
											h-1 w-12 mx-2 transition-all duration-300
											${isCompleted ? "bg-success-500" : "bg-neutral-200"}
										`} />
									)}
								</div>
							);
						})}
					</div>
					<div className="text-center">
						<h2 className="text-xl font-semibold text-neutral-900">
							{steps[currentStep - 1].title}
						</h2>
					</div>
				</div>
			</div>

			{/* Main Content */}
			<div className="mx-auto max-w-3xl px-4 py-12">
				<AnimatePresence mode="wait">
					{/* Step 1: Welcome */}
					{currentStep === 1 && (
						<motion.div
							key="step1"
							initial={{ opacity: 0, x: 50 }}
							animate={{ opacity: 1, x: 0 }}
							exit={{ opacity: 0, x: -50 }}
							transition={{ duration: 0.5 }}
						>
							<Card className="text-center" padding="lg">
								<CardHeader>
									<div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-primary-500 to-secondary-500">
										<HeartIcon className="h-8 w-8 text-white" />
									</div>
									<CardTitle className="text-3xl mb-4">Welcome to Caprae!</CardTitle>
									<p className="text-xl text-neutral-600 leading-relaxed">
										We're excited to help you find the perfect business acquisition. 
										This quick setup will help us understand your goals and match you with ideal opportunities.
									</p>
								</CardHeader>
								<CardContent>
									<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
										<div className="flex flex-col items-center p-4 bg-neutral-50 rounded-lg">
											<ClockIcon className="h-8 w-8 text-primary-600 mb-2" />
											<h3 className="font-semibold">5 Minutes</h3>
											<p className="text-sm text-neutral-600 text-center">Quick setup process</p>
										</div>
										<div className="flex flex-col items-center p-4 bg-neutral-50 rounded-lg">
											<ChartBarIcon className="h-8 w-8 text-secondary-600 mb-2" />
											<h3 className="font-semibold">AI Matching</h3>
											<p className="text-sm text-neutral-600 text-center">Smart recommendations</p>
										</div>
										<div className="flex flex-col items-center p-4 bg-neutral-50 rounded-lg">
											<BuildingOfficeIcon className="h-8 w-8 text-success-600 mb-2" />
											<h3 className="font-semibold">Quality Deals</h3>
											<p className="text-sm text-neutral-600 text-center">Vetted opportunities</p>
										</div>
									</div>
									<Button size="lg" onClick={nextStep} rightIcon={<ArrowRightIcon className="h-5 w-5" />}>
										Let's Get Started
									</Button>
								</CardContent>
							</Card>
						</motion.div>
					)}

					{/* Step 2: About You */}
					{currentStep === 2 && (
						<motion.div
							key="step2"
							initial={{ opacity: 0, x: 50 }}
							animate={{ opacity: 1, x: 0 }}
							exit={{ opacity: 0, x: -50 }}
							transition={{ duration: 0.5 }}
						>
							<Card>
								<CardHeader>
									<CardTitle className="text-2xl">Tell us about yourself</CardTitle>
									<p className="text-neutral-600">Help us understand your background and experience.</p>
								</CardHeader>
								<CardContent className="space-y-6">
									<div className="grid grid-cols-2 gap-4">
										<Input
											label="First Name"
											value={profile.firstName}
											onChange={(e) => updateProfile({ firstName: e.target.value })}
											placeholder="John"
										/>
										<Input
											label="Last Name"
											value={profile.lastName}
											onChange={(e) => updateProfile({ lastName: e.target.value })}
											placeholder="Doe"
										/>
									</div>
									<Input
										label="Company (Optional)"
										value={profile.company}
										onChange={(e) => updateProfile({ company: e.target.value })}
										placeholder="Your current company"
									/>
									<Input
										label="Current Title"
										value={profile.title}
										onChange={(e) => updateProfile({ title: e.target.value })}
										placeholder="CEO, Investor, etc."
									/>
									<div>
										<label className="block text-sm font-medium text-neutral-700 mb-2">
											Experience with Business Acquisitions
										</label>
										<div className="space-y-2">
											{[
												{ value: "first-time", label: "First-time buyer" },
												{ value: "some", label: "1-3 previous acquisitions" },
												{ value: "experienced", label: "4+ acquisitions" },
												{ value: "serial", label: "Serial acquirer (10+ deals)" }
											].map((option) => (
												<label key={option.value} className="flex items-center">
													<input
														type="radio"
														name="experience"
														value={option.value}
														checked={profile.experience === option.value}
														onChange={(e) => updateProfile({ experience: e.target.value })}
														className="text-primary-600 focus:ring-primary-500"
													/>
													<span className="ml-2 text-neutral-700">{option.label}</span>
												</label>
											))}
										</div>
									</div>
								</CardContent>
							</Card>
						</motion.div>
					)}

					{/* Step 3: Investment Goals */}
					{currentStep === 3 && (
						<motion.div
							key="step3"
							initial={{ opacity: 0, x: 50 }}
							animate={{ opacity: 1, x: 0 }}
							exit={{ opacity: 0, x: -50 }}
							transition={{ duration: 0.5 }}
						>
							<Card>
								<CardHeader>
									<CardTitle className="text-2xl">Investment Parameters</CardTitle>
									<p className="text-neutral-600">Define your budget and timeline for acquisitions.</p>
								</CardHeader>
								<CardContent className="space-y-6">
									<div className="grid grid-cols-2 gap-4">
										<Input
											label="Minimum Budget"
											value={profile.budgetMin}
											onChange={(e) => updateProfile({ budgetMin: e.target.value })}
											placeholder="$100,000"
										/>
										<Input
											label="Maximum Budget"
											value={profile.budgetMax}
											onChange={(e) => updateProfile({ budgetMax: e.target.value })}
											placeholder="$5,000,000"
										/>
									</div>
									<div>
										<label className="block text-sm font-medium text-neutral-700 mb-2">
											Preferred Timeline
										</label>
										<div className="space-y-2">
											{[
												{ value: "immediate", label: "Ready to close within 30 days" },
												{ value: "soon", label: "Looking to close in 1-3 months" },
												{ value: "flexible", label: "Flexible, waiting for the right deal" },
												{ value: "exploring", label: "Just exploring opportunities" }
											].map((option) => (
												<label key={option.value} className="flex items-center">
													<input
														type="radio"
														name="timeframe"
														value={option.value}
														checked={profile.timeframe === option.value}
														onChange={(e) => updateProfile({ timeframe: e.target.value })}
														className="text-primary-600 focus:ring-primary-500"
													/>
													<span className="ml-2 text-neutral-700">{option.label}</span>
												</label>
											))}
										</div>
									</div>
									<div>
										<label className="block text-sm font-medium text-neutral-700 mb-2">
											Preferred Locations (Select all that apply)
										</label>
										<div className="grid grid-cols-2 gap-2">
											{[
												"United States", "Canada", "United Kingdom", "Europe", 
												"Asia Pacific", "Latin America", "Remote/Online Only", "No Preference"
											].map((location) => (
												<label key={location} className="flex items-center">
													<input
														type="checkbox"
														checked={profile.locations.includes(location)}
														onChange={(e) => {
															if (e.target.checked) {
																updateProfile({ locations: [...profile.locations, location] });
															} else {
																updateProfile({ locations: profile.locations.filter(l => l !== location) });
															}
														}}
														className="text-primary-600 focus:ring-primary-500"
													/>
													<span className="ml-2 text-sm text-neutral-700">{location}</span>
												</label>
											))}
										</div>
									</div>
								</CardContent>
							</Card>
						</motion.div>
					)}

					{/* Navigation Buttons */}
					<div className="flex justify-between mt-8">
						{currentStep > 1 && (
							<Button
								variant="outline"
								onClick={prevStep}
								leftIcon={<ArrowLeftIcon className="h-4 w-4" />}
							>
								Previous
							</Button>
						)}
						{currentStep < steps.length && (
							<Button
								onClick={currentStep === steps.length - 1 ? completeOnboarding : nextStep}
								rightIcon={currentStep === steps.length - 1 ? <CheckIcon className="h-4 w-4" /> : <ArrowRightIcon className="h-4 w-4" />}
								className="ml-auto"
							>
								{currentStep === steps.length - 1 ? "Complete Setup" : "Continue"}
							</Button>
						)}
					</div>
				</AnimatePresence>
			</div>
		</div>
	);
}