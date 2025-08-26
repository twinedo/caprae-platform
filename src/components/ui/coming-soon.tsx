"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PageLayout } from "@/components/layout/page-layout";
import {
	WrenchScrewdriverIcon,
	BellAlertIcon,
	HomeIcon,
	ArrowRightIcon,
	SparklesIcon
} from "@heroicons/react/24/outline";

interface ComingSoonProps {
	title: string;
	description: string;
	icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
	expectedFeatures: string[];
	expectedDate?: string;
	notifyInterest?: boolean;
}

export function ComingSoon({
	title,
	description,
	icon: Icon,
	expectedFeatures,
	expectedDate = "Q2 2025",
	notifyInterest = true
}: ComingSoonProps) {
	return (
		<PageLayout>
			<div className="bg-gradient-to-br from-primary-50 via-white to-secondary-50 min-h-screen flex items-center justify-center px-4">
				<div className="max-w-4xl w-full">
					{/* Main Content */}
					<motion.div
						initial={{ opacity: 0, scale: 0.95 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ duration: 0.6 }}
					>
						<Card className="overflow-hidden">
							<CardContent className="p-12 text-center">
								{/* Icon */}
								<motion.div
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.6, delay: 0.2 }}
									className="mb-8"
								>
									<div className="relative">
										<div className="w-24 h-24 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
											<Icon className="h-12 w-12 text-primary-500" />
										</div>
										<div className="absolute -top-2 -right-2 w-8 h-8 bg-warning-100 rounded-full flex items-center justify-center">
											<WrenchScrewdriverIcon className="h-4 w-4 text-warning-600" />
										</div>
									</div>
								</motion.div>

								{/* Title and Description */}
								<motion.div
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.6, delay: 0.4 }}
									className="mb-8"
								>
									<h1 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-4">
										{title}
									</h1>
									<h2 className="text-xl text-warning-600 font-semibold mb-4">
										Coming Soon
									</h2>
									<p className="text-lg text-neutral-600 max-w-2xl mx-auto leading-relaxed">
										{description}
									</p>
								</motion.div>

								{/* Expected Date */}
								<motion.div
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.6, delay: 0.6 }}
									className="mb-8"
								>
									<div className="inline-flex items-center space-x-2 px-4 py-2 bg-primary-100 text-primary-700 rounded-full">
										<SparklesIcon className="h-5 w-5" />
										<span className="font-medium">Expected Launch: {expectedDate}</span>
									</div>
								</motion.div>

								{/* Expected Features */}
								<motion.div
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.6, delay: 0.8 }}
									className="mb-8"
								>
									<h3 className="text-xl font-semibold text-neutral-900 mb-4">
										What to Expect
									</h3>
									<div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
										{expectedFeatures.map((feature, index) => (
											<motion.div
												key={index}
												initial={{ opacity: 0, x: -20 }}
												animate={{ opacity: 1, x: 0 }}
												transition={{ duration: 0.4, delay: 1.0 + index * 0.1 }}
												className="flex items-start space-x-3 text-left p-3 bg-neutral-50 rounded-lg"
											>
												<div className="w-2 h-2 rounded-full bg-primary-500 mt-2 flex-shrink-0" />
												<span className="text-neutral-700">{feature}</span>
											</motion.div>
										))}
									</div>
								</motion.div>

								{/* Action Buttons */}
								<motion.div
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.6, delay: 1.2 }}
									className="flex flex-col sm:flex-row gap-4 justify-center mb-8"
								>
									<Link href="/dashboard">
										<Button size="lg" leftIcon={<HomeIcon className="h-5 w-5" />}>
											Back to Dashboard
										</Button>
									</Link>
									{notifyInterest && (
										<Button 
											size="lg" 
											variant="outline"
											leftIcon={<BellAlertIcon className="h-5 w-5" />}
										>
											Notify Me When Available
										</Button>
									)}
								</motion.div>
							</CardContent>
						</Card>
					</motion.div>

					{/* Additional Navigation */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 1.4 }}
						className="mt-8"
					>
						<Card>
							<CardContent className="p-6">
								<div className="text-center mb-4">
									<h3 className="text-lg font-semibold text-neutral-900 mb-2">
										Explore Available Features
									</h3>
									<p className="text-neutral-600">
										While we're building this feature, check out what's already available
									</p>
								</div>
								
								<div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
									<Link href="/deals">
										<div className="group p-4 border border-neutral-200 rounded-lg hover:border-primary-300 hover:shadow-md transition-all duration-200 cursor-pointer">
											<div className="text-center">
												<div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-2 group-hover:bg-primary-200 transition-colors">
													<HomeIcon className="h-4 w-4 text-primary-600" />
												</div>
												<span className="text-sm font-medium text-neutral-900 group-hover:text-primary-700 transition-colors">
													Deal Management
												</span>
											</div>
										</div>
									</Link>
									
									<Link href="/browse">
										<div className="group p-4 border border-neutral-200 rounded-lg hover:border-primary-300 hover:shadow-md transition-all duration-200 cursor-pointer">
											<div className="text-center">
												<div className="w-8 h-8 bg-secondary-100 rounded-lg flex items-center justify-center mx-auto mb-2 group-hover:bg-secondary-200 transition-colors">
													<SparklesIcon className="h-4 w-4 text-secondary-600" />
												</div>
												<span className="text-sm font-medium text-neutral-900 group-hover:text-secondary-700 transition-colors">
													Browse Businesses
												</span>
											</div>
										</div>
									</Link>
									
									<Link href="/companies">
										<div className="group p-4 border border-neutral-200 rounded-lg hover:border-primary-300 hover:shadow-md transition-all duration-200 cursor-pointer">
											<div className="text-center">
												<div className="w-8 h-8 bg-success-100 rounded-lg flex items-center justify-center mx-auto mb-2 group-hover:bg-success-200 transition-colors">
													<ArrowRightIcon className="h-4 w-4 text-success-600" />
												</div>
												<span className="text-sm font-medium text-neutral-900 group-hover:text-success-700 transition-colors">
													Company Directory
												</span>
											</div>
										</div>
									</Link>
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
		</PageLayout>
	);
}