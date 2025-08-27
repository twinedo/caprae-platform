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
	DocumentTextIcon,
	UserGroupIcon,
	ChartBarIcon,
	SparklesIcon,
	RocketLaunchIcon
} from "@heroicons/react/24/outline";
import Image from "next/image";

interface SellerProfile {
	// Business Basics
	businessName: string;
	industry: string;
	founded: string;
	location: string;
	
	// Business Metrics
	revenue: string;
	employees: string;
	profitMargin: string;
	growth: string;
	
	// Sale Details
	askingPrice: string;
	reason: string;
	timeline: string;
	includesAssets: string[];
	
	// Business Story
	uniqueValue: string;
	challenges: string;
	futureOpportunities: string;
	idealBuyer: string;
}

const steps = [
	{ id: 1, title: "Welcome", icon: HeartIcon },
	{ id: 2, title: "Your Business", icon: BuildingOfficeIcon },
	{ id: 3, title: "The Numbers", icon: ChartBarIcon },
	{ id: 4, title: "Sale Details", icon: CurrencyDollarIcon },
	{ id: 5, title: "Your Story", icon: SparklesIcon },
	{ id: 6, title: "Launch", icon: RocketLaunchIcon }
];

const industries = [
	"Technology & Software", "E-commerce & Retail", "Healthcare & Medical", 
	"Professional Services", "Manufacturing", "Food & Beverage", "Real Estate",
	"Finance & Insurance", "Education & Training", "Media & Entertainment",
	"Construction", "Transportation & Logistics", "Beauty & Wellness", "Other"
];

const saleReasons = [
	{ value: "retirement", label: "Ready to Retire", icon: "🏖️" },
	{ value: "new-venture", label: "Starting New Venture", icon: "🚀" },
	{ value: "family", label: "Family Reasons", icon: "👨‍👩‍👧‍👦" },
	{ value: "health", label: "Health Considerations", icon: "❤️" },
	{ value: "partnership", label: "Seeking Strategic Partner", icon: "🤝" },
	{ value: "growth", label: "Need Capital for Growth", icon: "📈" },
	{ value: "burnout", label: "Ready for Change", icon: "🔄" },
	{ value: "other", label: "Other Reasons", icon: "💭" }
];

const assetOptions = [
	"Real Estate/Property", "Equipment & Machinery", "Inventory", 
	"Intellectual Property", "Customer Database", "Brand & Trademarks",
	"Contracts & Agreements", "Licenses & Permits"
];

export default function SellerOnboardingPage() {
	const [currentStep, setCurrentStep] = useState(1);
	const [profile, setProfile] = useState<SellerProfile>({
		businessName: "",
		industry: "",
		founded: "",
		location: "",
		revenue: "",
		employees: "",
		profitMargin: "",
		growth: "",
		askingPrice: "",
		reason: "",
		timeline: "",
		includesAssets: [],
		uniqueValue: "",
		challenges: "",
		futureOpportunities: "",
		idealBuyer: ""
	});

	const updateProfile = (updates: Partial<SellerProfile>) => {
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
		console.log("Seller Profile:", profile);
		window.location.href = "/dashboard/seller";
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-secondary-50 via-white to-primary-50">
			{/* Navigation */}
			<nav className="border-b border-neutral-200/50 bg-white/80 backdrop-blur-sm">
				<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					<div className="flex h-16 items-center justify-between">
						<Link href="/" className="flex items-center space-x-2">
							<div className="w-8 h-8 rounded-lg overflow-hidden">
								<Image src="/logo.png" alt="Caprae Logo" width={32} height={32} className="w-full h-full object-contain" />
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
										${isActive ? "border-secondary-500 bg-secondary-500 text-white" : 
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
									<div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-secondary-500 to-primary-500">
										<RocketLaunchIcon className="h-8 w-8 text-white" />
									</div>
									<CardTitle className="text-3xl mb-4">Ready to Sell Your Business?</CardTitle>
									<p className="text-xl text-neutral-600 leading-relaxed">
										Congratulations on building something valuable! Let&apos;s create a compelling profile 
										that attracts the right buyers and tells your business story authentically.
									</p>
								</CardHeader>
								<CardContent>
									<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
										<div className="flex flex-col items-center p-4 bg-gradient-to-br from-secondary-50 to-secondary-100 rounded-lg">
											<DocumentTextIcon className="h-8 w-8 text-secondary-600 mb-2" />
											<h3 className="font-semibold">Your Story</h3>
											<p className="text-sm text-neutral-600 text-center">Tell buyers what makes you special</p>
										</div>
										<div className="flex flex-col items-center p-4 bg-gradient-to-br from-primary-50 to-primary-100 rounded-lg">
											<ChartBarIcon className="h-8 w-8 text-primary-600 mb-2" />
											<h3 className="font-semibold">Fair Valuation</h3>
											<p className="text-sm text-neutral-600 text-center">AI-assisted pricing guidance</p>
										</div>
										<div className="flex flex-col items-center p-4 bg-gradient-to-br from-success-50 to-success-100 rounded-lg">
											<UserGroupIcon className="h-8 w-8 text-success-600 mb-2" />
											<h3 className="font-semibold">Quality Buyers</h3>
											<p className="text-sm text-neutral-600 text-center">Pre-vetted, serious inquiries</p>
										</div>
									</div>
									<Button size="lg" onClick={nextStep} rightIcon={<ArrowRightIcon className="h-5 w-5" />}>
										Start Your Journey
									</Button>
								</CardContent>
							</Card>
						</motion.div>
					)}

					{/* Step 2: Your Business */}
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
									<CardTitle className="text-2xl">Tell us about your business</CardTitle>
									<p className="text-neutral-600">The basics that buyers want to know first.</p>
								</CardHeader>
								<CardContent className="space-y-6">
									<Input
										label="Business Name"
										value={profile.businessName}
										onChange={(e) => updateProfile({ businessName: e.target.value })}
										placeholder="Acme Software Solutions"
										hint="The legal or trading name of your business"
									/>
									
									<div>
										<label className="block text-sm font-medium text-neutral-700 mb-2">
											Industry
										</label>
										<select
											value={profile.industry}
											onChange={(e) => updateProfile({ industry: e.target.value })}
											className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-secondary-500 focus:border-secondary-500"
										>
											<option value="">Select your industry</option>
											{industries.map((industry) => (
												<option key={industry} value={industry}>{industry}</option>
											))}
										</select>
									</div>

									<div className="grid grid-cols-2 gap-4">
										<Input
											label="Year Founded"
											value={profile.founded}
											onChange={(e) => updateProfile({ founded: e.target.value })}
											placeholder="2018"
										/>
										<Input
											label="Primary Location"
											value={profile.location}
											onChange={(e) => updateProfile({ location: e.target.value })}
											placeholder="San Francisco, CA"
										/>
									</div>

									<div className="bg-secondary-50 p-4 rounded-lg">
										<h4 className="font-medium text-secondary-800 mb-2">💡 Pro Tip</h4>
										<p className="text-sm text-secondary-700">
											Be honest and accurate. Buyers appreciate transparency, and it builds trust 
											from the very first impression.
										</p>
									</div>
								</CardContent>
							</Card>
						</motion.div>
					)}

					{/* Step 3: The Numbers */}
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
									<CardTitle className="text-2xl">Business Performance</CardTitle>
									<p className="text-neutral-600">Financial metrics that matter to buyers.</p>
								</CardHeader>
								<CardContent className="space-y-6">
									<div className="grid grid-cols-2 gap-4">
										<Input
											label="Annual Revenue"
											value={profile.revenue}
											onChange={(e) => updateProfile({ revenue: e.target.value })}
											placeholder="$2,500,000"
											hint="Gross revenue for last 12 months"
										/>
										<Input
											label="Number of Employees"
											value={profile.employees}
											onChange={(e) => updateProfile({ employees: e.target.value })}
											placeholder="15"
											hint="Full-time equivalent employees"
										/>
									</div>

									<div className="grid grid-cols-2 gap-4">
										<Input
											label="Profit Margin"
											value={profile.profitMargin}
											onChange={(e) => updateProfile({ profitMargin: e.target.value })}
											placeholder="25%"
											hint="Net profit margin percentage"
										/>
										<div>
											<label className="block text-sm font-medium text-neutral-700 mb-2">
												Revenue Growth Trend
											</label>
											<select
												value={profile.growth}
												onChange={(e) => updateProfile({ growth: e.target.value })}
												className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-secondary-500 focus:border-secondary-500"
											>
												<option value="">Select growth trend</option>
												<option value="rapid">Rapid Growth (25%+ annually)</option>
												<option value="steady">Steady Growth (10-25% annually)</option>
												<option value="moderate">Moderate Growth (5-10% annually)</option>
												<option value="stable">Stable (0-5% annually)</option>
												<option value="declining">Declining</option>
											</select>
										</div>
									</div>

									<div className="bg-primary-50 p-4 rounded-lg">
										<h4 className="font-medium text-primary-800 mb-2">🔒 Privacy First</h4>
										<p className="text-sm text-primary-700">
											Your financial details are encrypted and only shared with verified, 
											qualified buyers who sign NDAs.
										</p>
									</div>
								</CardContent>
							</Card>
						</motion.div>
					)}

					{/* Step 4: Sale Details */}
					{currentStep === 4 && (
						<motion.div
							key="step4"
							initial={{ opacity: 0, x: 50 }}
							animate={{ opacity: 1, x: 0 }}
							exit={{ opacity: 0, x: -50 }}
							transition={{ duration: 0.5 }}
						>
							<Card>
								<CardHeader>
									<CardTitle className="text-2xl">Sale Preferences</CardTitle>
									<p className="text-neutral-600">Your expectations and what&apos;s included.</p>
								</CardHeader>
								<CardContent className="space-y-6">
									<Input
										label="Asking Price"
										value={profile.askingPrice}
										onChange={(e) => updateProfile({ askingPrice: e.target.value })}
										placeholder="$8,500,000"
										hint="Your target sale price (this can be adjusted)"
									/>

									<div>
										<label className="block text-sm font-medium text-neutral-700 mb-3">
											Primary Reason for Selling
										</label>
										<div className="grid grid-cols-2 gap-3">
											{saleReasons.map((reason) => (
												<label 
													key={reason.value} 
													className={`
														flex items-center p-3 border-2 rounded-lg cursor-pointer transition-all
														${profile.reason === reason.value 
															? "border-secondary-500 bg-secondary-50" 
															: "border-neutral-200 hover:border-neutral-300"}
													`}
												>
													<input
														type="radio"
														name="reason"
														value={reason.value}
														checked={profile.reason === reason.value}
														onChange={(e) => updateProfile({ reason: e.target.value })}
														className="sr-only"
													/>
													<span className="text-lg mr-2">{reason.icon}</span>
													<span className="text-sm font-medium">{reason.label}</span>
												</label>
											))}
										</div>
									</div>

									<div>
										<label className="block text-sm font-medium text-neutral-700 mb-2">
											Ideal Timeline
										</label>
										<select
											value={profile.timeline}
											onChange={(e) => updateProfile({ timeline: e.target.value })}
											className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-secondary-500 focus:border-secondary-500"
										>
											<option value="">Select your timeline</option>
											<option value="asap">ASAP - Ready to close quickly</option>
											<option value="3months">Within 3 months</option>
											<option value="6months">3-6 months</option>
											<option value="year">6-12 months</option>
											<option value="flexible">Flexible - waiting for right offer</option>
										</select>
									</div>

									<div>
										<label className="block text-sm font-medium text-neutral-700 mb-3">
											What&apos;s Included in the Sale?
										</label>
										<div className="grid grid-cols-2 gap-2">
											{assetOptions.map((asset) => (
												<label key={asset} className="flex items-center">
													<input
														type="checkbox"
														checked={profile.includesAssets.includes(asset)}
														onChange={(e) => {
															if (e.target.checked) {
																updateProfile({ includesAssets: [...profile.includesAssets, asset] });
															} else {
																updateProfile({ includesAssets: profile.includesAssets.filter(a => a !== asset) });
															}
														}}
														className="text-secondary-600 focus:ring-secondary-500"
													/>
													<span className="ml-2 text-sm text-neutral-700">{asset}</span>
												</label>
											))}
										</div>
									</div>
								</CardContent>
							</Card>
						</motion.div>
					)}

					{/* Step 5: Your Story */}
					{currentStep === 5 && (
						<motion.div
							key="step5"
							initial={{ opacity: 0, x: 50 }}
							animate={{ opacity: 1, x: 0 }}
							exit={{ opacity: 0, x: -50 }}
							transition={{ duration: 0.5 }}
						>
							<Card>
								<CardHeader>
									<CardTitle className="text-2xl">Tell Your Story</CardTitle>
									<p className="text-neutral-600">Help buyers understand what makes your business special.</p>
								</CardHeader>
								<CardContent className="space-y-6">
									<div>
										<label className="block text-sm font-medium text-neutral-700 mb-2">
											What makes your business unique?
										</label>
										<textarea
											value={profile.uniqueValue}
											onChange={(e) => updateProfile({ uniqueValue: e.target.value })}
											placeholder="Our proprietary technology, loyal customer base, strategic partnerships..."
											className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-secondary-500 focus:border-secondary-500 h-24 resize-none"
										/>
									</div>

									<div>
										<label className="block text-sm font-medium text-neutral-700 mb-2">
											What challenges should buyers be aware of?
										</label>
										<textarea
											value={profile.challenges}
											onChange={(e) => updateProfile({ challenges: e.target.value })}
											placeholder="Seasonal fluctuations, key employee dependencies, market competition..."
											className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-secondary-500 focus:border-secondary-500 h-24 resize-none"
										/>
									</div>

									<div>
										<label className="block text-sm font-medium text-neutral-700 mb-2">
											What future opportunities do you see?
										</label>
										<textarea
											value={profile.futureOpportunities}
											onChange={(e) => updateProfile({ futureOpportunities: e.target.value })}
											placeholder="Expansion markets, new product lines, scalability potential..."
											className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-secondary-500 focus:border-secondary-500 h-24 resize-none"
										/>
									</div>

									<div>
										<label className="block text-sm font-medium text-neutral-700 mb-2">
											Describe your ideal buyer
										</label>
										<textarea
											value={profile.idealBuyer}
											onChange={(e) => updateProfile({ idealBuyer: e.target.value })}
											placeholder="Someone who values our culture, has experience in our industry, wants to grow the business..."
											className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-secondary-500 focus:border-secondary-500 h-24 resize-none"
										/>
									</div>

									<div className="bg-gradient-to-r from-secondary-50 to-primary-50 p-4 rounded-lg">
										<h4 className="font-medium text-neutral-800 mb-2">✨ The Power of Story</h4>
										<p className="text-sm text-neutral-700">
											Great stories connect emotionally with buyers. Share your passion, 
											vision, and the legacy you want to continue.
										</p>
									</div>
								</CardContent>
							</Card>
						</motion.div>
					)}

					{/* Step 6: Complete */}
					{currentStep === 6 && (
						<motion.div
							key="step6"
							initial={{ opacity: 0, scale: 0.95 }}
							animate={{ opacity: 1, scale: 1 }}
							exit={{ opacity: 0, scale: 0.95 }}
							transition={{ duration: 0.5 }}
						>
							<Card className="text-center" padding="lg">
								<CardHeader>
									<div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-success-500 to-secondary-500">
										<CheckIcon className="h-8 w-8 text-white" />
									</div>
									<CardTitle className="text-3xl mb-4">You&apos;re All Set! 🎉</CardTitle>
									<p className="text-xl text-neutral-600 leading-relaxed">
										Your business profile is complete and ready to attract qualified buyers. 
										Now you can start receiving and reviewing buyer profiles.
									</p>
								</CardHeader>
								<CardContent>
									<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
										<div className="flex flex-col items-center p-4 bg-success-50 rounded-lg">
											<UserGroupIcon className="h-8 w-8 text-success-600 mb-2" />
											<h3 className="font-semibold">Browse Buyers</h3>
											<p className="text-sm text-neutral-600 text-center">Review interested buyer profiles</p>
										</div>
										<div className="flex flex-col items-center p-4 bg-primary-50 rounded-lg">
											<SparklesIcon className="h-8 w-8 text-primary-600 mb-2" />
											<h3 className="font-semibold">AI Matching</h3>
											<p className="text-sm text-neutral-600 text-center">Get smart buyer recommendations</p>
										</div>
										<div className="flex flex-col items-center p-4 bg-secondary-50 rounded-lg">
											<DocumentTextIcon className="h-8 w-8 text-secondary-600 mb-2" />
											<h3 className="font-semibold">Manage Deals</h3>
											<p className="text-sm text-neutral-600 text-center">Track negotiations and progress</p>
										</div>
									</div>
									<Button size="lg" onClick={completeOnboarding} rightIcon={<RocketLaunchIcon className="h-5 w-5" />}>
										Enter Your Dashboard
									</Button>
								</CardContent>
							</Card>
						</motion.div>
					)}

					{/* Navigation Buttons */}
					{currentStep < 6 && (
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
							<Button
								onClick={nextStep}
								rightIcon={<ArrowRightIcon className="h-4 w-4" />}
								className="ml-auto"
							>
								Continue
							</Button>
						</div>
					)}
				</AnimatePresence>
			</div>
		</div>
	);
}