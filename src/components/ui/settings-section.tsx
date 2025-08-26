"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/design-system";

interface SettingsSectionProps {
	title: string;
	description?: string;
	icon?: React.ReactNode;
	children: React.ReactNode;
	className?: string;
	headerActions?: React.ReactNode;
}

export function SettingsSection({ 
	title, 
	description, 
	icon, 
	children, 
	className,
	headerActions 
}: SettingsSectionProps) {
	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.3 }}
			className={cn("mb-6", className)}
		>
			<Card>
				<CardHeader>
					<div className="flex items-center justify-between">
						<CardTitle className="flex items-center space-x-3">
							{icon && (
								<div className="p-2 bg-primary-100 rounded-lg">
									{icon}
								</div>
							)}
							<div>
								<h3 className="text-lg font-semibold text-neutral-900">{title}</h3>
								{description && (
									<p className="text-sm text-neutral-600 font-normal mt-1">{description}</p>
								)}
							</div>
						</CardTitle>
						{headerActions && (
							<div className="flex items-center space-x-2">
								{headerActions}
							</div>
						)}
					</div>
				</CardHeader>
				<CardContent className="space-y-4">
					{children}
				</CardContent>
			</Card>
		</motion.div>
	);
}