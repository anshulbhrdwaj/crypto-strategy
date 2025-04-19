import { useState, useEffect, ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLocation, Link } from "react-router";
import { menuSlide, scale, slide } from "@/utils/Header/anim";
import { navbar } from "@/data";
import { IHamburgerProps, INavLinkProps } from "@/types";
import { LogoDark, LogoLight, LogoSymbolLight } from "@/assets/Logo";
import { useTheme } from "next-themes";

const Header = () => {
	const { resolvedTheme: theme } = useTheme();
	const [isActive, setIsActive] = useState<boolean>(false);

	return (
		<header id="navbar" className="absolute inset-0 text-background">
			<div className="flex-row-between padding z-40 sticky inset-0 screen-w-2xl">
				{theme === "dark" ? (
					<LogoLight className="h-10 w-60" />
				) : (
					<LogoDark className="h-10 w-60" />
				)}
				<HamburgerMenu isActive={isActive} setIsActive={setIsActive} />
			</div>
			<AnimatePresence>
				{isActive && (
					<Nav>
						<HamburgerMenu isActive={isActive} setIsActive={setIsActive} />
					</Nav>
				)}
			</AnimatePresence>
		</header>
	);
};

export default Header;

const HamburgerMenu = ({ isActive, setIsActive }: IHamburgerProps) => {
	return (
		<div
			id="hamburger-menu"
			onClick={() => setIsActive((active) => !active)}
			className="right-0 z-[9999] w-14 h-14 rounded-full cursor-pointer flex-row-center"
		>
			<motion.div
				id="hamburger"
				className={`w-full flex-col-center ${
					isActive ? "hamburger-active" : ""
				}`}
			>
				<motion.span
					className="relative h-px w-1/2 bg-gradient-layout"
					animate={{
						rotate: isActive ? 45 : 0,
						y: isActive ? 1 : -5.5,
						// background: isActive ? "var(--foreground)" : "var(--foreground)",
					}}
					transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
				/>
				<motion.span
					className="relative h-px w-1/2 bg-gradient-layout"
					animate={{
						rotate: isActive ? -45 : 0,
						y: isActive ? 0 : 5.5,
						// background: isActive ? "var(--foreground)" : "var(--foreground)",
					}}
					transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
				/>
			</motion.div>
		</div>
	);
};

const Nav = ({ children }: { children: ReactNode }) => {
	const location = useLocation();
	const pathname = location.pathname;
	const [selectedIndicator, setSelectedIndicator] = useState(pathname);

	return (
		<motion.nav
			className="h-screen w-full bg-gradient-layout fixed z-50 right-0 top-0 text-foreground backdrop-blur-3xl bg-background "
			variants={menuSlide}
			initial="initial"
			animate="enter"
			exit="exit"
		>
			<Curve />
			<div className="h-full padding flex-col-between screen-w-2xl bg-muted">
				<div className="flex flex-row-between w-full border-b">
					<p className="text-gradient uppercase text-sm z-10 relative top-0 w-60">
						Menu
					</p>
					<p className="text-gradient text-sm z-20 relative -bottom-6 -left-42 w-60">
						Tarun Soni
						<span className="block">Founder and CEO</span>
						<span className="block pt-2 text-zinc-400 text-xs">CryptoStrategy</span>
					</p>
					{children}
				</div>
				<div
					onMouseLeave={() => setSelectedIndicator(pathname)}
					className="flex flex-col text-6xl gap-8"
				>
					{navbar.links.map((navItem) => (
						<NavLink
							key={navItem.id}
							data={navItem}
							isActive={selectedIndicator === navItem.href}
							setSelectedIndicator={setSelectedIndicator}
						/>
					))}
				</div>
				<div className="flex-row-between text-gradient w-full text-sm gap-2 lg:gap-4">
					<p>CS - 2025 FY</p>
					<LogoSymbolLight className="w-10 h-16 "/>
				</div>
			</div>
		</motion.nav>
	);
};

const Curve = () => {
	const [height, setHeight] = useState(window.innerHeight);

	useEffect(() => {
		const handleResize = () => setHeight(window.innerHeight);
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	const initialPath = `M100 0 L100 ${height} Q-100 ${height / 2} 100 0`;
	const targetPath = `M100 0 L100 ${height} Q100 ${height / 2} 100 0`;

	const curve = {
		initial: { d: initialPath },
		enter: {
			d: targetPath,
			transition: { duration: 1, ease: [0.76, 0, 0.24, 1] },
		},
		exit: {
			d: initialPath,
			transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
		},
	};

	return (
		<svg className="absolute top-0 left-[-99px] w-[100px] h-full">
			<defs>
				<linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
					<stop
						offset="0%"
						style={{ stopColor: "var(--muted)", stopOpacity: 1 }}
					/>
					<stop
						offset="100%"
						style={{ stopColor: "var(--muted)", stopOpacity: 1 }}
					/>
				</linearGradient>
			</defs>
			<motion.path
				variants={curve}
				initial="initial"
				animate="enter"
				exit="exit"
				fill="url(#gradient)"
			/>
		</svg>
	);
};

const NavLink = ({ data, isActive, setSelectedIndicator }: INavLinkProps) => {
	const { title, href, id } = data;

	return (
		<motion.div
			className="relative flex items-center text-gradient "
			onMouseEnter={() => setSelectedIndicator(href)}
			custom={id}
			variants={slide}
			initial="initial"
			animate="enter"
			exit="exit"
		>
			<motion.div
				variants={scale}
				animate={isActive ? "open" : "closed"}
				className="w-2 h-2 bg-gradient-layout rounded-full absolute -left-7"
			/>
			<Link to={href}>{title}</Link>
			<div className="relative text-lg text-gradient left-2 -bottom-4">
				{id.toString().padStart(2, "0")}
			</div>
		</motion.div>
	);
};
