"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
	CalculatorIcon,
	ChartBarIcon,
	ArrowTrendingUpIcon,
	BanknotesIcon,
	BuildingOffice2Icon,
	UsersIcon,
	SparklesIcon,
	DocumentChartBarIcon,
	ExclamationTriangleIcon,
	CheckCircleIcon,
	LightBulbIcon,
} from "@heroicons/react/24/outline";
import { cn } from "@/lib/design-system";

interface BusinessMetrics {
	revenue: number;
	revenueGrowth: number;
	ebitda: number;
	ebitdaMargin: number;
	employees: number;
	customerCount: number;
	marketPosition: "leader" | "challenger" | "follower";
	industry: string;
	businessModel: string;
}

interface ValuationResult {
	primary: {
		method: string;
		value: number;
		multiple: number;
		confidence: number;
	};
	comparisons: {
		method: string;
		value: number;
		multiple?: number;
		description: string;
	}[];
	range: {
		min: number;
		max: number;
		recommended: number;
	};
	factors: {
		positive: string[];
		negative: string[];
		neutral: string[];
	};
	recommendations: {
		title: string;
		description: string;
		impact: string;
		priority: "high" | "medium" | "low";
	}[];
}

interface BusinessValuatorProps {
	businessMetrics?: BusinessMetrics;
	onValuate?: (metrics: BusinessMetrics) => void;
}

const mockMetrics: BusinessMetrics = {
	revenue: 1200000,
	revenueGrowth: 23,
	ebitda: 280000,
	ebitdaMargin: 23.3,
	employees: 12,
	customerCount: 450,
	marketPosition: "challenger",
	industry: "SaaS",
	businessModel: "Subscription",
};

const mockValuation: ValuationResult = {
	primary: {
		method: "Revenue Multiple",
		value: 2640000,
		multiple: 2.2,
		confidence: 94,
	},
	comparisons: [
		{
			method: "EBITDA Multiple",
			value: 2520000,
			multiple: 9.0,
			description: "Based on 9x EBITDA for profitable SaaS companies",
		},
		{
			method: "Discounted Cash Flow",
			value: 2785000,
			description: "10-year DCF with 12% discount rate",
		},
		{
			method: "Asset-Based",
			value: 450000,
			description: "Book value of tangible and intangible assets",
		},
		{
			method: "Market Comparable",
			value: 2750000,
			description: "Based on recent transactions of similar businesses",
		},
	],
	range: {
		min: 2400000,
		max: 2900000,
		recommended: 2650000,
	},
	factors: {
		positive: [
			"Strong revenue growth (23% YoY)",
			"Healthy EBITDA margin (23.3%)",
			"Recurring subscription model",
			"Growing market segment",
			"Experienced management team",
		],
		negative: [
			"Customer concentration risk",
			"Limited market presence",
			"Seasonal revenue patterns",
		],
		neutral: [
			"12 employees (appropriate for revenue)",
			"Challenger market position",
		],
	},
	recommendations: [
		{
			title: "Diversify Customer Base",
			description: "Reduce dependency on top customers to improve valuation multiple",
			impact: "+$150k valuation",
			priority: "high",
		},
		{
			title: "Improve Market Position",
			description: "Strategic partnerships or acquisitions to strengthen market position",
			impact: "+$200k valuation",
			priority: "medium",
		},
		{
			title: "Optimize Pricing Strategy",
			description: "Value-based pricing could improve margins by 3-5%",
			impact: "+$100k valuation",
			priority: "medium",
		},
	],
};

const methodColors = {
	"Revenue Multiple": "text-primary-600",
	"EBITDA Multiple": "text-secondary-600",
	"Discounted Cash Flow": "text-blue-600",
	"Asset-Based": "text-green-600",
	"Market Comparable": "text-purple-600",
};

export function BusinessValuator({
	businessMetrics = mockMetrics,
	onValuate,
}: BusinessValuatorProps) {
	const [valuation] = useState<ValuationResult>(mockValuation);
	const [activeMethod, setActiveMethod] = useState(valuation.primary.method);

	const formatCurrency = (amount: number) => {
		return new Intl.NumberFormat("en-US", {
			style: "currency",
			currency: "USD",
			minimumFractionDigits: 0,
			maximumFractionDigits: 0,
		}).format(amount);
	};

	const formatPercent = (value: number) => {
		return `${value >= 0 ? "+" : ""}${value.toFixed(1)}%`;
	};

	return (
		<div className="space-y-6">
			{/* Valuation Header */}
			<Card className="bg-gradient-to-br from-primary-500 to-secondary-500">
				<CardHeader>
					<CardTitle className="text-white flex items-center space-x-2">
						<CalculatorIcon className="h-6 w-6" />
						<span>AI Business Valuation</span>
						<div className="ml-auto">
							<span className="text-primary-100 text-sm">
								Confidence: {valuation.primary.confidence}%
							</span>
						</div>
					</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
						<div className="text-center">
							<div className="text-3xl font-bold text-white mb-1">
								{formatCurrency(valuation.range.recommended)}
							</div>
							<div className="text-primary-100 text-sm">Recommended Value</div>
						</div>
						<div className="text-center">
							<div className="text-xl font-semibold text-white mb-1">
								{formatCurrency(valuation.range.min)} - {formatCurrency(valuation.range.max)}
							</div>
							<div className="text-primary-100 text-sm">Valuation Range</div>
						</div>
						<div className="text-center">
							<div className="text-xl font-semibold text-white mb-1">
								{valuation.primary.multiple}x {valuation.primary.method.includes("Revenue") ? "Revenue" : "EBITDA"}
							</div>
							<div className="text-primary-100 text-sm">Primary Multiple</div>
						</div>
					</div>
				</CardContent>
			</Card>

			{/* Business Metrics Overview */}
			<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
				<Card>
					<CardContent className="p-4 text-center">
						<BanknotesIcon className="h-8 w-8 mx-auto text-primary-500 mb-2" />
						<div className="text-2xl font-bold text-neutral-900">
							{formatCurrency(businessMetrics.revenue)}
						</div>
						<div className="text-sm text-neutral-600">Annual Revenue</div>
						<div className="text-xs text-success-600 mt-1">
							{formatPercent(businessMetrics.revenueGrowth)} YoY
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardContent className="p-4 text-center">
						<ChartBarIcon className="h-8 w-8 mx-auto text-secondary-500 mb-2" />
						<div className="text-2xl font-bold text-neutral-900">
							{formatCurrency(businessMetrics.ebitda)}
						</div>
						<div className="text-sm text-neutral-600">EBITDA</div>
						<div className="text-xs text-primary-600 mt-1">
							{businessMetrics.ebitdaMargin.toFixed(1)}% margin
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardContent className="p-4 text-center">
						<UsersIcon className="h-8 w-8 mx-auto text-blue-500 mb-2" />
						<div className="text-2xl font-bold text-neutral-900">
							{businessMetrics.employees}
						</div>
						<div className="text-sm text-neutral-600">Employees</div>
						<div className="text-xs text-neutral-500 mt-1">
							{Math.round(businessMetrics.revenue / businessMetrics.employees / 1000)}k rev/employee
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardContent className="p-4 text-center">
						<BuildingOffice2Icon className="h-8 w-8 mx-auto text-green-500 mb-2" />
						<div className="text-2xl font-bold text-neutral-900">
							{businessMetrics.customerCount}
						</div>
						<div className="text-sm text-neutral-600">Customers</div>
						<div className="text-xs text-neutral-500 mt-1">
							{Math.round(businessMetrics.revenue / businessMetrics.customerCount)} avg revenue
						</div>
					</CardContent>
				</Card>
			</div>

			{/* Valuation Methods */}
			<Card>
				<CardHeader>
					<CardTitle className="flex items-center space-x-2">
						<DocumentChartBarIcon className="h-5 w-5 text-primary-500" />
						<span>Valuation Methods</span>
					</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
						{/* Method List */}
						<div className="space-y-3">
							{[valuation.primary, ...valuation.comparisons.map(comp => ({
								method: comp.method,
								value: comp.value,
								multiple: comp.multiple,
								confidence: comp.method === valuation.primary.method ? valuation.primary.confidence : 85,
							}))].map((method, index) => (
								<motion.div
									key={method.method}
									initial={{ opacity: 0, x: -20 }}
									animate={{ opacity: 1, x: 0 }}
									transition={{ delay: index * 0.1 }}
									className={cn(
										"p-4 rounded-lg border-2 cursor-pointer transition-all",
										activeMethod === method.method
											? "border-primary-500 bg-primary-50"
											: "border-neutral-200 hover:border-neutral-300",
									)}
									onClick={() => setActiveMethod(method.method)}
								>
									<div className="flex items-center justify-between">
										<div>
											<h4 className="font-semibold text-neutral-900">
												{method.method}
											</h4>
											{method.multiple && (
												<p className="text-sm text-neutral-600">
													{method.multiple}x multiple
												</p>
											)}
										</div>
										<div className="text-right">
											<div className="font-bold text-lg text-neutral-900">
												{formatCurrency(method.value)}
											</div>
											<div className="text-xs text-neutral-500">
												{method.confidence}% confidence
											</div>
										</div>
									</div>
								</motion.div>
							))}
						</div>

						{/* Method Description */}
						<div className="bg-neutral-50 rounded-lg p-6">
							<h4 className="font-semibold text-neutral-900 mb-3">
								{activeMethod}
							</h4>
							{activeMethod === valuation.primary.method ? (
								<div className="space-y-3">
									<p className="text-sm text-neutral-600">
										Primary valuation method based on industry standards and business characteristics.
									</p>
									<div className="bg-white rounded-lg p-3">
										<div className="text-sm text-neutral-700">
											<strong>Calculation:</strong><br />
											{businessMetrics.businessModel === "Subscription" 
												? `Annual Revenue × ${valuation.primary.multiple} multiple`
												: `EBITDA × ${valuation.primary.multiple} multiple`
											}
										</div>
									</div>
									<div className="flex items-center space-x-2">
										<CheckCircleIcon className="h-4 w-4 text-success-500" />
										<span className="text-sm text-success-600">Recommended Method</span>
									</div>
								</div>
							) : (
								<div className="space-y-3">
									{valuation.comparisons.find(c => c.method === activeMethod)?.description && (
										<p className="text-sm text-neutral-600">
											{valuation.comparisons.find(c => c.method === activeMethod)?.description}
										</p>
									)}
									<div className="text-xs text-neutral-500">
										Used for validation and cross-checking primary valuation
									</div>
								</div>
							)}
						</div>
					</div>
				</CardContent>
			</Card>

			{/* Valuation Factors */}
			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
				{/* Positive Factors */}
				<Card>
					<CardHeader>
						<CardTitle className="flex items-center space-x-2 text-success-600">
							<CheckCircleIcon className="h-5 w-5" />
							<span>Positive Factors</span>
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="space-y-2">
							{valuation.factors.positive.map((factor, index) => (
								<div key={index} className="flex items-start space-x-2">
									<div className="w-1.5 h-1.5 bg-success-500 rounded-full mt-2 flex-shrink-0" />
									<span className="text-sm text-neutral-700">{factor}</span>
								</div>
							))}
						</div>
					</CardContent>
				</Card>

				{/* Risk Factors */}
				<Card>
					<CardHeader>
						<CardTitle className="flex items-center space-x-2 text-warning-600">
							<ExclamationTriangleIcon className="h-5 w-5" />
							<span>Risk Factors</span>
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="space-y-2">
							{valuation.factors.negative.map((factor, index) => (
								<div key={index} className="flex items-start space-x-2">
									<div className="w-1.5 h-1.5 bg-warning-500 rounded-full mt-2 flex-shrink-0" />
									<span className="text-sm text-neutral-700">{factor}</span>
								</div>
							))}
						</div>
					</CardContent>
				</Card>

				{/* Neutral Factors */}
				<Card>
					<CardHeader>
						<CardTitle className="flex items-center space-x-2 text-neutral-600">
							<SparklesIcon className="h-5 w-5" />
							<span>Neutral Factors</span>
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="space-y-2">
							{valuation.factors.neutral.map((factor, index) => (
								<div key={index} className="flex items-start space-x-2">
									<div className="w-1.5 h-1.5 bg-neutral-400 rounded-full mt-2 flex-shrink-0" />
									<span className="text-sm text-neutral-700">{factor}</span>
								</div>
							))}
						</div>
					</CardContent>
				</Card>
			</div>

			{/* Value Enhancement Recommendations */}
			<Card>
				<CardHeader>
					<CardTitle className="flex items-center space-x-2">
						<LightBulbIcon className="h-5 w-5 text-primary-500" />
						<span>Value Enhancement Recommendations</span>
					</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="space-y-4">
						{valuation.recommendations.map((rec, index) => (
							<motion.div
								key={index}
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: index * 0.1 }}
								className="p-4 border border-neutral-200 rounded-lg"
							>
								<div className="flex items-start justify-between mb-2">
									<h4 className="font-semibold text-neutral-900">{rec.title}</h4>
									<span className={cn(
										"px-2 py-1 rounded-full text-xs font-medium",
										rec.priority === "high" ? "bg-error-100 text-error-700" :
										rec.priority === "medium" ? "bg-warning-100 text-warning-700" :
										"bg-success-100 text-success-700"
									)}>
										{rec.priority} priority
									</span>
								</div>
								<p className="text-sm text-neutral-600 mb-2">{rec.description}</p>
								<div className="text-sm font-medium text-success-600">
									Potential Impact: {rec.impact}
								</div>
							</motion.div>
						))}
					</div>
				</CardContent>
			</Card>

			{/* Action Buttons */}
			<div className="flex justify-between">
				<Button
					variant="outline"
					leftIcon={<ArrowTrendingUpIcon className="h-4 w-4" />}
				>
					Export Valuation Report
				</Button>
				<Button
					onClick={() => onValuate?.(businessMetrics)}
					leftIcon={<SparklesIcon className="h-4 w-4" />}
				>
					Recalculate Valuation
				</Button>
			</div>
		</div>
	);
}