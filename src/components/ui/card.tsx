"use client";

import * as React from "react";
import { cn, cardVariants, type CardVariants } from "@/lib/design-system";
import { motion, type HTMLMotionProps } from "framer-motion";

export interface CardProps
	extends Omit<HTMLMotionProps<"div">, "children">,
		CardVariants {
	children: React.ReactNode;
	hover?: boolean;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
	({ className, variant, padding, hover = true, children, ...props }, ref) => {
		const isInteractive = variant === "interactive";

		return (
			<motion.div
				ref={ref}
				className={cn(cardVariants({ variant, padding }), className)}
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				whileHover={
					hover && isInteractive
						? { y: -2, scale: 1.005 }
						: hover
							? { scale: 1.01 }
							: undefined
				}
				transition={{
					type: "spring",
					stiffness: 300,
					damping: 30,
				}}
				{...props}
			>
				{children}
			</motion.div>
		);
	},
);

Card.displayName = "Card";

const CardHeader = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
	<div
		ref={ref}
		className={cn("flex flex-col space-y-1.5 pb-6", className)}
		{...props}
	/>
));

CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
	<h3
		ref={ref}
		className={cn("text-xl font-semibold leading-none tracking-tight", className)}
		{...props}
	/>
));

CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
	<p
		ref={ref}
		className={cn("text-sm text-neutral-600", className)}
		{...props}
	/>
));

CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
	<div ref={ref} className={cn("pt-0", className)} {...props} />
));

CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
	<div
		ref={ref}
		className={cn("flex items-center pt-6", className)}
		{...props}
	/>
));

CardFooter.displayName = "CardFooter";

export {
	Card,
	CardHeader,
	CardFooter,
	CardTitle,
	CardDescription,
	CardContent,
};