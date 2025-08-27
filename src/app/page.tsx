"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRightIcon, HeartIcon, ShieldCheckIcon, ArrowTrendingUpIcon, UsersIcon, BoltIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import Image from "next/image";

const features = [
	{
		icon: HeartIcon,
		title: "Seller-Initiated Matching",
		description: "Just like Bumble changed dating, we're flipping business acquisitions. Sellers make the first move, creating a more intentional marketplace.",
		color: "text-secondary-500",
	},
	{
		icon: BoltIcon,
		title: "AI-Powered Process",
		description: "Our AI analyzes documents, suggests deal structures, and identifies potential issues before they become problems.",
		color: "text-primary-500",
	},
	{
		icon: ShieldCheckIcon,
		title: "Streamlined Workflows",
		description: "Guided acquisition process with built-in tools, templates, and automated reminders to keep deals moving forward.",
		color: "text-success-500",
	},
	{
		icon: ArrowTrendingUpIcon,
		title: "Deal Success Analytics",
		description: "Data-driven insights to optimize your acquisition strategy and maximize deal completion rates.",
		color: "text-warning-500",
	},
];

const stats = [
	{ label: "Average Deal Completion Rate", value: "87%", description: "vs 23% industry average" },
	{ label: "Time to Close", value: "45 days", description: "vs 180 days traditional" },
	{ label: "Active Business Listings", value: "12,000+", description: "verified opportunities" },
	{ label: "Successful Matches", value: "2,800+", description: "and growing daily" },
];

export default function HomePage() {
	return (
		<div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50">
			{/* Navigation */}
			<nav className="border-b border-neutral-200/50 bg-white/80 backdrop-blur-sm">
				<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					<div className="flex h-16 items-center justify-between">
						<motion.div
							className="flex items-center space-x-2"
							initial={{ opacity: 0, x: -20 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.5 }}
						>
							<div className="flex h-8 w-8 items-center justify-center rounded-lg overflow-hidden">
								<Image src="/logo.png" alt="Caprae Logo" width={32} height={32} className="w-full h-full object-contain" />
							</div>
							<span className="text-xl font-bold gradient-text">Caprae</span>
						</motion.div>

						<motion.div
							className="hidden md:flex items-center space-x-8"
							initial={{ opacity: 0, y: -10 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: 0.2 }}
						>
							<Link href="#features" className="text-neutral-600 hover:text-primary-600 transition-colors">
								Features
							</Link>
							<Link href="#pricing" className="text-neutral-600 hover:text-primary-600 transition-colors">
								Pricing
							</Link>
							<Link href="#about" className="text-neutral-600 hover:text-primary-600 transition-colors">
								About
							</Link>
							<Link href="/profile" className="text-neutral-600 hover:text-primary-600 transition-colors">
								Profile
							</Link>
							<Link href="/settings" className="text-neutral-600 hover:text-primary-600 transition-colors">
								Settings
							</Link>
						</motion.div>

						<motion.div
							className="flex items-center space-x-4"
							initial={{ opacity: 0, x: 20 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.5, delay: 0.4 }}
						>
							<Link href="/auth/login">
								<Button variant="ghost">Sign In</Button>
							</Link>
							<Link href="/auth/signup">
								<Button rightIcon={<ArrowRightIcon className="h-4 w-4" />}>
									Get Started
								</Button>
							</Link>
						</motion.div>
					</div>
				</div>
			</nav>

			{/* Hero Section */}
			<section className="px-4 py-20 sm:px-6 lg:px-8">
				<div className="mx-auto max-w-7xl text-center">
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8 }}
					>
						<h1 className="text-5xl font-bold sm:text-6xl lg:text-7xl">
							<span className="gradient-text">Business Acquisitions</span>
							<br />
							Reimagined
						</h1>
						<p className="mx-auto mt-6 max-w-2xl text-xl text-neutral-600 leading-relaxed">
							Where sellers make the first move. Our AI-powered platform streamlines the acquisition process,
							making business deals feel less intimidating and more successful.
						</p>
					</motion.div>

					<motion.div
						className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, delay: 0.3 }}
					>
						<Link href="/dashboard/buyer">
							<Button size="lg" rightIcon={<UsersIcon className="h-5 w-5" />}>
								Buyer Dashboard
							</Button>
						</Link>
						<Link href="/dashboard/seller">
							<Button size="lg" variant="secondary" rightIcon={<ArrowTrendingUpIcon className="h-5 w-5" />}>
								Seller Dashboard
							</Button>
						</Link>
					</motion.div>

					{/* Stats */}
					<motion.div
						className="mt-20 grid grid-cols-2 gap-8 lg:grid-cols-4"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.8, delay: 0.6 }}
					>
						{stats.map((stat, index) => (
							<motion.div
								key={stat.label}
								className="text-center"
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
							>
								<div className="text-3xl font-bold text-primary-600">{stat.value}</div>
								<div className="text-sm font-medium text-neutral-900">{stat.label}</div>
								<div className="text-xs text-neutral-500">{stat.description}</div>
							</motion.div>
						))}
					</motion.div>
				</div>
			</section>

			{/* Features Section */}
			<section id="features" className="px-4 py-20 sm:px-6 lg:px-8">
				<div className="mx-auto max-w-7xl">
					<motion.div
						className="text-center mb-16"
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
						viewport={{ once: true }}
					>
						<h2 className="text-4xl font-bold text-neutral-900 mb-4">
							Why Choose Caprae?
						</h2>
						<p className="text-xl text-neutral-600 max-w-3xl mx-auto">
							We&apos;ve reimagined every step of the acquisition process to reduce friction, 
							increase transparency, and maximize deal success.
						</p>
					</motion.div>

					<div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
						{features.map((feature, index) => {
							const Icon = feature.icon;
							return (
								<motion.div
									key={feature.title}
									initial={{ opacity: 0, y: 30 }}
									whileInView={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.6, delay: index * 0.2 }}
									viewport={{ once: true }}
								>
									<Card variant="interactive" className="h-full">
										<CardHeader>
											<div className="flex items-center space-x-3">
												<div className={`p-2 rounded-lg bg-neutral-100 ${feature.color}`}>
													<Icon className="h-6 w-6" />
												</div>
												<CardTitle>{feature.title}</CardTitle>
											</div>
										</CardHeader>
										<CardContent>
											<CardDescription className="text-base leading-relaxed">
												{feature.description}
											</CardDescription>
										</CardContent>
									</Card>
								</motion.div>
							);
						})}
					</div>
				</div>
			</section>

			{/* CTA Section */}
			<section className="px-4 py-20 sm:px-6 lg:px-8">
				<div className="mx-auto max-w-4xl">
					<motion.div
						initial={{ opacity: 0, scale: 0.95 }}
						whileInView={{ opacity: 1, scale: 1 }}
						transition={{ duration: 0.6 }}
						viewport={{ once: true }}
					>
						<Card className="gradient-bg-primary text-white text-center" padding="lg">
							<CardHeader>
								<CardTitle className="text-3xl text-white mb-4">
									Ready to Transform Your Business Journey?
								</CardTitle>
								<CardDescription className="text-xl text-white/90">
									Join thousands of business owners who&apos;ve discovered a better way to buy and sell companies.
								</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="flex flex-col sm:flex-row gap-4 justify-center">
									<Link href="/auth/signup?type=buyer">
										<Button size="lg" variant="outline" className="bg-white text-primary-600 hover:bg-neutral-50">
											Start as Buyer
										</Button>
									</Link>
									<Link href="/auth/signup?type=seller">
										<Button size="lg" variant="outline" className="bg-white text-secondary-600 hover:bg-neutral-50">
											Start as Seller
										</Button>
									</Link>
								</div>
							</CardContent>
						</Card>
					</motion.div>
				</div>
			</section>

			{/* Footer */}
			<footer className="border-t border-neutral-200 bg-white">
				<div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
					<div className="flex flex-col md:flex-row justify-between items-center">
						<div className="flex items-center space-x-2 mb-4 md:mb-0">
							<div className="flex h-8 w-8 items-center justify-center rounded-lg overflow-hidden">
								<Image src="/logo.png" alt="Caprae Logo" width={32} height={32} className="w-full h-full object-contain" />
							</div>
							<span className="text-xl font-bold gradient-text">Caprae</span>
						</div>
						<div className="text-sm text-neutral-500">
							© 2025 Caprae. Making business acquisitions approachable.
						</div>
					</div>
				</div>
			</footer>
		</div>
	);
}
