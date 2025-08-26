"use client";

import * as React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { HeartIcon } from "@heroicons/react/24/outline";

interface AuthLayoutProps {
	children: React.ReactNode;
	title: string;
	subtitle: string;
	showBackButton?: boolean;
}

export function AuthLayout({ 
	children, 
	title, 
	subtitle, 
	showBackButton = true 
}: AuthLayoutProps) {
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

						{showBackButton && (
							<Link 
								href="/" 
								className="text-neutral-600 hover:text-primary-600 transition-colors"
							>
								← Back to Home
							</Link>
						)}
					</div>
				</div>
			</nav>

			{/* Main Content */}
			<div className="flex min-h-[calc(100vh-4rem)]">
				{/* Left Side - Branding */}
				<div className="hidden lg:flex lg:w-1/2 relative">
					<div className="flex flex-col justify-center px-12 xl:px-20">
						<motion.div
							initial={{ opacity: 0, x: -30 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.8 }}
						>
							<h1 className="text-4xl xl:text-5xl font-bold text-neutral-900 mb-6">
								<span className="gradient-text">Transform</span>
								<br />
								Business Acquisitions
							</h1>
							<p className="text-xl text-neutral-600 mb-8 leading-relaxed">
								Join the platform where sellers make the first move, 
								AI streamlines processes, and deals close faster than ever.
							</p>
							
							{/* Feature highlights */}
							<div className="space-y-4">
								{[
									"87% average deal completion rate",
									"45 days average time to close",
									"AI-powered document analysis",
									"Seller-initiated matching system"
								].map((feature, index) => (
									<motion.div
										key={feature}
										className="flex items-center space-x-3"
										initial={{ opacity: 0, x: -20 }}
										animate={{ opacity: 1, x: 0 }}
										transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
									>
										<div className="w-2 h-2 rounded-full bg-primary-500" />
										<span className="text-neutral-700">{feature}</span>
									</motion.div>
								))}
							</div>
						</motion.div>
					</div>

					{/* Decorative gradient overlay */}
					<div className="absolute inset-0 bg-gradient-to-br from-primary-100/30 to-secondary-100/30" />
				</div>

				{/* Right Side - Form */}
				<div className="flex w-full lg:w-1/2 items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
					<motion.div
						className="w-full max-w-md space-y-8"
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, delay: 0.2 }}
					>
						{/* Header */}
						<div className="text-center">
							<h2 className="text-3xl font-bold text-neutral-900">{title}</h2>
							<p className="mt-2 text-neutral-600">{subtitle}</p>
						</div>

						{/* Form Content */}
						{children}
					</motion.div>
				</div>
			</div>
		</div>
	);
}