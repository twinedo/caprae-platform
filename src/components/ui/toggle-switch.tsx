"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/design-system";

interface ToggleSwitchProps {
	enabled: boolean;
	onChange: (enabled: boolean) => void;
	label?: string;
	description?: string;
	disabled?: boolean;
	size?: "sm" | "default" | "lg";
	className?: string;
}

export function ToggleSwitch({ 
	enabled, 
	onChange, 
	label, 
	description, 
	disabled = false,
	size = "default",
	className 
}: ToggleSwitchProps) {
	const sizes = {
		sm: {
			container: "h-4 w-7",
			thumb: "h-3 w-3",
			translateX: { off: 2, on: 16 }
		},
		default: {
			container: "h-6 w-11",
			thumb: "h-4 w-4",
			translateX: { off: 4, on: 24 }
		},
		lg: {
			container: "h-8 w-14",
			thumb: "h-6 w-6",
			translateX: { off: 4, on: 32 }
		}
	};

	const sizeConfig = sizes[size];

	const toggle = () => {
		if (!disabled) {
			onChange(!enabled);
		}
	};

	if (label) {
		return (
			<div className={cn("flex items-center justify-between", className)}>
				<div className="flex-1">
					<p className="font-medium text-neutral-900">{label}</p>
					{description && (
						<p className="text-sm text-neutral-600">{description}</p>
					)}
				</div>
				<ToggleSwitch
					enabled={enabled}
					onChange={onChange}
					disabled={disabled}
					size={size}
				/>
			</div>
		);
	}

	return (
		<motion.button
			className={cn(
				"relative inline-flex items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2",
				sizeConfig.container,
				enabled 
					? "bg-primary-500" 
					: "bg-neutral-300",
				disabled && "opacity-50 cursor-not-allowed",
				className
			)}
			onClick={toggle}
			disabled={disabled}
			whileTap={disabled ? undefined : { scale: 0.95 }}
			role="switch"
			aria-checked={enabled}
		>
			<motion.span
				className={cn(
					"inline-block rounded-full bg-white shadow-lg transition-transform",
					sizeConfig.thumb
				)}
				animate={{
					x: enabled ? sizeConfig.translateX.on : sizeConfig.translateX.off,
				}}
				transition={{ type: "spring", stiffness: 500, damping: 30 }}
			/>
		</motion.button>
	);
}