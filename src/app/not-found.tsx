"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
	HomeIcon,
	MagnifyingGlassIcon,
	ArrowLeftIcon,
	ExclamationTriangleIcon,
	HeartIcon,
	ChartBarIcon,
	UserIcon,
	CogIcon
} from "@heroicons/react/24/outline";

export default function NotFound() {
	const quickLinks = [
		{
			name: "Dashboard",
			href: "/dashboard",
			icon: HomeIcon,
			description: "Go to your main dashboard"
		},
		{
			name: "Buyer Dashboard", 
			href: "/dashboard/buyer",
			icon: UserIcon,
			description: "Browse business opportunities"
		},
		{
			name: "Seller Dashboard",
			href: "/dashboard/seller", 
			icon: ChartBarIcon,
			description: "Manage your business listing"
		},
		{
			name: "Profile",
			href: "/profile",
			icon: UserIcon,
			description: "View and edit your profile"
		},
		{
			name: "Settings",
			href: "/settings",
			icon: CogIcon,
			description: "Account and preferences"
		}
	];

	return (
		<div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 flex items-center justify-center px-4">
			<div className="max-w-4xl w-full">
				{/* Header with Logo */}
				<motion.div
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
					className="text-center mb-8"
				>
					<Link href="/" className="inline-flex items-center space-x-3 mb-6">
						<div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center">
							<HeartIcon className="h-6 w-6 text-white" />
						</div>
						<span className="text-2xl font-bold text-neutral-900">Caprae</span>
					</Link>
				</motion.div>

				{/* Main 404 Content */}
				<motion.div
					initial={{ opacity: 0, scale: 0.95 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ duration: 0.6, delay: 0.2 }}
				>
					<Card className="mb-8 overflow-hidden">
						<CardContent className="p-12 text-center">
							{/* 404 Illustration */}
							<motion.div
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.6, delay: 0.4 }}
								className="mb-8"
							>
								<div className="relative">
									<div className="text-8xl md:text-9xl font-bold text-primary-100 select-none">
										404
									</div>
									<div className="absolute inset-0 flex items-center justify-center">
										<div className="p-4 bg-error-100 rounded-full">
											<ExclamationTriangleIcon className="h-12 w-12 text-error-600" />
										</div>
									</div>
								</div>
							</motion.div>

							{/* Error Message */}
							<motion.div
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.6, delay: 0.6 }}
								className="mb-8"
							>
								<h1 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
									Page Not Found
								</h1>
								<p className="text-lg text-neutral-600 max-w-2xl mx-auto leading-relaxed">
									We couldn't find the page you're looking for. It might have been moved, deleted, 
									or you entered the wrong URL. Don't worry, let's get you back on track!
								</p>
							</motion.div>

							{/* Action Buttons */}
							<motion.div
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.6, delay: 0.8 }}
								className="flex flex-col sm:flex-row gap-4 justify-center mb-8"
							>
								<Button 
									size="lg"
									onClick={() => window.history.back()}
									leftIcon={<ArrowLeftIcon className="h-5 w-5" />}
									variant="outline"
								>
									Go Back
								</Button>
								<Link href="/">
									<Button size="lg" leftIcon={<HomeIcon className="h-5 w-5" />}>
										Go Home
									</Button>
								</Link>
								<Link href="/dashboard">
									<Button size="lg" leftIcon={<ChartBarIcon className="h-5 w-5" />} variant="secondary">
										Dashboard
									</Button>
								</Link>
							</motion.div>
						</CardContent>
					</Card>
				</motion.div>

				{/* Quick Navigation Links */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 1.0 }}
				>
					<Card>
						<CardContent className="p-8">
							<div className="text-center mb-6">
								<h2 className="text-xl font-semibold text-neutral-900 mb-2">
									Quick Navigation
								</h2>
								<p className="text-neutral-600">
									Popular pages you might be looking for
								</p>
							</div>
							
							<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
								{quickLinks.map((link, index) => {
									const Icon = link.icon;
									return (
										<motion.div
											key={link.name}
											initial={{ opacity: 0, y: 20 }}
											animate={{ opacity: 1, y: 0 }}
											transition={{ duration: 0.4, delay: 1.2 + index * 0.1 }}
										>
											<Link href={link.href}>
												<div className="group p-4 border border-neutral-200 rounded-lg hover:border-primary-300 hover:shadow-md transition-all duration-200 cursor-pointer">
													<div className="flex items-start space-x-3">
														<div className="p-2 bg-primary-100 rounded-lg group-hover:bg-primary-200 transition-colors">
															<Icon className="h-5 w-5 text-primary-600" />
														</div>
														<div className="flex-1 min-w-0">
															<h3 className="font-medium text-neutral-900 group-hover:text-primary-700 transition-colors">
																{link.name}
															</h3>
															<p className="text-sm text-neutral-500 mt-1">
																{link.description}
															</p>
														</div>
													</div>
												</div>
											</Link>
										</motion.div>
									);
								})}
							</div>
						</CardContent>
					</Card>
				</motion.div>

				{/* Help Section */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 1.4 }}
					className="mt-8 text-center"
				>
					<Card className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white border-none">
						<CardContent className="p-8">
							<div className="flex flex-col md:flex-row items-center justify-between">
								<div className="text-left mb-4 md:mb-0">
									<h3 className="text-xl font-semibold mb-2">Still Need Help?</h3>
									<p className="text-white/90">
										Our support team is here to help you navigate the platform
									</p>
								</div>
								<div className="flex space-x-3">
									<Button variant="outline" className="bg-white text-primary-600 hover:bg-neutral-50">
										Contact Support
									</Button>
									<Button 
										variant="outline" 
										className="bg-white text-primary-600 hover:bg-neutral-50"
										leftIcon={<MagnifyingGlassIcon className="h-4 w-4" />}
									>
										Search Help
									</Button>
								</div>
							</div>
						</CardContent>
					</Card>
				</motion.div>

				{/* Footer */}
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.6, delay: 1.6 }}
					className="mt-8 text-center text-sm text-neutral-500"
				>
					<p>© 2025 Caprae. Making business acquisitions approachable.</p>
				</motion.div>
			</div>
		</div>
	);
}