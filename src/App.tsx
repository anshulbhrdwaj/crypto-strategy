import Header from "./components/Header";
import HeroSection from "./pages/homepage/HeroSection";
import ThemeScrollWrapper from "./utils/ThemeTransitionWrapper";

function App() {
	return (
		<ThemeScrollWrapper>
			<div className="min-h-screen relative text-zinc-600 screen-w-2xl h-[120vh] bg-background ">
				<Header />
				<HeroSection />
			</div>
		</ThemeScrollWrapper>
	);
}

export default App;
