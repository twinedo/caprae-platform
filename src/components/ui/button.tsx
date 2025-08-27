"use client";

import * as React from "react";
import { cn, buttonVariants, type ButtonVariants } from "@/lib/design-system";
import { motion, type HTMLMotionProps } from "framer-motion";

export interface ButtonProps
	extends Omit<HTMLMotionProps<"button">, "children">,
		ButtonVariants {
	asChild?: boolean;
	loading?: boolean;
	leftIcon?: React.ReactNode;
	rightIcon?: React.ReactNode;
	children?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	(
		{
			className,
			variant,
			size,
			loading = false,
			leftIcon,
			rightIcon,
			children,
			disabled,
			...props
		},
		ref,
	) => {
		const isDisabled = disabled || loading;

		return (
			<motion.button
				className={cn(buttonVariants({ variant, size }), className)}
				ref={ref}
				disabled={isDisabled}
				whileHover={!isDisabled ? { scale: 1.02 } : undefined}
				whileTap={!isDisabled ? { scale: 0.98 } : undefined}
				transition={{ type: "spring", stiffness: 400, damping: 25 }}
				{...props}
			>
				{loading && (
					<motion.div
						className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.2 }}
					/>
				)}
				{!loading && leftIcon && (
					<motion.span
						className="mr-2"
						initial={{ x: -5, opacity: 0 }}
						animate={{ x: 0, opacity: 1 }}
						transition={{ duration: 0.2 }}
					>
						{leftIcon}
					</motion.span>
				)}
				<motion.span
					initial={{ opacity: loading ? 0 : 1 }}
					animate={{ opacity: loading ? 0.7 : 1 }}
					transition={{ duration: 0.2 }}
				>
					{children}
				</motion.span>
				{!loading && rightIcon && (
					<motion.span
						className="ml-2"
						initial={{ x: 5, opacity: 0 }}
						animate={{ x: 0, opacity: 1 }}
						transition={{ duration: 0.2 }}
					>
						{rightIcon}
					</motion.span>
				)}
			</motion.button>
		);
	},
);

Button.displayName = "Button";

export { Button };