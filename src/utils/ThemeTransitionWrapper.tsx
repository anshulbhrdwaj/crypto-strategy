import { useScroll, useSpring, motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeTransitionWrapper({
	children,
}: {
	children: React.ReactNode;
}) {
  const { setTheme } = useTheme();
	const { scrollYProgress } = useScroll();

	const smoothProgress = useSpring(scrollYProgress, {
		stiffness: 100,
		damping: 20,
		mass: 1,
	});

	// Interpolate scroll into light → dark
	// const bgLight = "oklch(1 0 0)";
	// const bgDark = "oklch(0.141 0.005 285.823)";

	// const fgLight = "oklch(0.141 0.005 285.823)";
	// const fgDark = "oklch(0.985 0 0)";

	const [styleVars, setStyleVars] = useState({});

	useEffect(() => {
		return smoothProgress.onChange((p) => {
			if (p > 0.5) {
				setTheme("dark");
			} else {
				setTheme("light");
			}

			// Use simple linear interpolation between two OKLCH colors
			const lerp = (start: number, end: number) => start + (end - start) * p;

			// Background (light to dark)
			const bg = `oklch(${lerp(1, 0.141)} 0.005 285.823)`;
			const fg = `oklch(${lerp(0.141, 0.985)} 0 0)`;

			setStyleVars({
				"--background": bg,
				"--foreground": fg,
			} as React.CSSProperties);
		});
	}, [smoothProgress, setTheme]);

	return <motion.div style={styleVars}>{children}</motion.div>;
}
