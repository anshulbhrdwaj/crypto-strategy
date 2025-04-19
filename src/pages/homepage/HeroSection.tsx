import { useTheme } from "next-themes";
import VideoLayout from "../../components/VideoLayout";
import { useRef } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";

const HeroSection = () => {
	const heroSectionRef = useRef<HTMLDivElement>(null);
	const { resolvedTheme, setTheme } = useTheme();

	const { scrollYProgress } = useScroll({
		target: heroSectionRef,
		offset: ["start start", "end end"], // when hero ends at top of screen
	});

	useMotionValueEvent(scrollYProgress, "change", (latest) => {
		if (latest > 0.2 && resolvedTheme !== "dark") {
			setTheme("dark");
		} else if (latest <= 0.2 && resolvedTheme !== "light") {
			setTheme("light");
		}
	});

	return (
		<section
			id="hero"
			ref={heroSectionRef}
			className="h-screen flex flex-col justify-center items-start padding gap-8 fixed w-full"
		>
			<h1
				className="text-4xl md:text-6xl font-bold text-gradient dark:text-end w-full"
				onClick={() => setTheme(prev => prev === "dark" ? "light" : "dark")}
			>
				Remarkable <span className="block">Mining Experience.</span>
			</h1>

			<VideoLayout />
		</section>
	);
};

export default HeroSection;
