"use client";

import * as React from "react";
import { cn, inputVariants, type InputVariants } from "@/lib/design-system";
import { motion, type HTMLMotionProps } from "framer-motion";

export interface InputProps
	extends Omit<HTMLMotionProps<"input">, "size">,
		InputVariants {
	label?: string;
	error?: string;
	hint?: string;
	leftIcon?: React.ReactNode;
	rightIcon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
	(
		{
			className,
			variant,
			size,
			type,
			label,
			error,
			hint,
			leftIcon,
			rightIcon,
			...props
		},
		ref,
	) => {
		const [isFocused, setIsFocused] = React.useState(false);
		const inputVariant = error ? "error" : variant;

		return (
			<div className="space-y-2">
				{label && (
					<motion.label
						className="text-sm font-medium text-neutral-700"
						initial={{ opacity: 0, y: -5 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.2 }}
					>
						{label}
					</motion.label>
				)}
				<div className="relative">
					{leftIcon && (
						<div className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400">
							{leftIcon}
						</div>
					)}
					<motion.input
						type={type}
						className={cn(
							inputVariants({ variant: inputVariant, size }),
							leftIcon && "pl-10",
							rightIcon && "pr-10",
							className,
						)}
						ref={ref}
						onFocus={(e) => {
							setIsFocused(true);
							props.onFocus?.(e);
						}}
						onBlur={(e) => {
							setIsFocused(false);
							props.onBlur?.(e);
						}}
						animate={{
							scale: isFocused ? 1.01 : 1,
						}}
						transition={{
							type: "spring",
							stiffness: 300,
							damping: 30,
						}}
						{...props}
					/>
					{rightIcon && (
						<div className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400">
							{rightIcon}
						</div>
					)}
				</div>
				{error && (
					<motion.p
						className="text-sm text-error-600"
						initial={{ opacity: 0, y: -5 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -5 }}
						transition={{ duration: 0.2 }}
					>
						{error}
					</motion.p>
				)}
				{hint && !error && (
					<motion.p
						className="text-sm text-neutral-500"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.2 }}
					>
						{hint}
					</motion.p>
				)}
			</div>
		);
	},
);

Input.displayName = "Input";

export { Input };