import { darkVideo } from "@/assets";

const VideoLayout = () => {
	return (
		<div className="relative rounded-2xl overflow-hidden w-full h-[100vw] sm:h-[35vh] xl:h-[60vh]">
			{/* Video Background */}
			<video
				className="absolute inset-0 w-full h-full object-cover"
				autoPlay
				muted
				loop
				playsInline
				preload="auto"
				aria-hidden="true"
			>
				<source src={darkVideo} type="video/mp4" />
				Your browser does not support the video tag.
			</video>

			{/* Fallback Image */}
			<div className="absolute inset-0 z-[1] hidden video-fallback">
				<img
					alt="Background fallback"
					src="/images/fallback.jpg"
					className="object-cover w-full h-full absolute inset-0"
				/>
			</div>

			{/* Dark Overlay */}
			<div
				className="absolute inset-0 z-[2]"
				style={{ backgroundColor: "#000000", opacity: 0.25 }}
				aria-hidden="true"
			/>

			{/* Foreground Content Grid */}
			<div className="absolute inset-0 z-[3] flex w-full h-full rounded-2xl">
				<div className="hidden sm:grid grid-cols-3 xl:grid-cols-4 min-w-[66%] h-full ">
					<div className="col-span-2 border border-background-200 w-full h-full rounded-tl-2xl" />
					<div className="border border-background-200 w-full h-full" />
					<div className="border border-background-200 hidden xl:flex w-full h-full" />
					<div className="bg-background w-full h-full" />
					<div className="border border-background-200 w-full h-full" />
					<div className="border border-background-200 w-full h-full" />
					<div className="border border-background-200 hidden xl:flex w-full h-full" />
				</div>
				<div className="hidden sm:flex bg-background w-16 h-full" />
				<div className="grid grid-cols-2 w-full h-full">
					{/* First div: Move this to the right on small screens */}
					<div className="bg-background w-full h-full flex-row-center relative order-2 sm:order-1 rounded-tr-2xl sm:rounded-none">
						<p className="absolute w-4/5 font-bold left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-xs lg:text-sm 2xl:text-base text-gradient">
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas,
							placeat eum.
						</p>
					</div>

					{/* Second div */}
					<div className="border border-background-200 w-full h-full order-1 rounded-tl-2xl sm:order-2 sm:sm:rounded-tl-none sm:rounded-tr-2xl" />

					{/* Third div */}
					<div className="border border-background-200 w-full h-full order-3 rounded-bl-2xl sm:rounded-none" />

					{/* Fourth div */}
					<div className="sm:bg-background w-full h-full order-4 rounded-br-2xl" />
				</div>
			</div>
		</div>
	);
};

export default VideoLayout;
