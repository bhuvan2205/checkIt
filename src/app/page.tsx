import {
	LoginLink,
	RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/components";

export default function Home() {
	return (
		<main className="container mx-auto px-4 py-8 md:px-6 md:py-12">
			<div className="max-w-2xl mx-auto space-y-6">
				<h1 className="text-3xl font-bold mb-4">Welcome to CheckIt</h1>
				<p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-8">
					CheckIt is a leading provider of innovative solutions for businesses
					of all sizes. Our team of experts is dedicated to helping you achieve
					your goals and reach new heights. Whether youre looking to streamline
					your operations, enhance your customer experience, or drive growth, we
					have the tools and expertise to help you succeed.
				</p>
				<div className="flex gap-4">
					<LoginLink className="btn btn-active">Login</LoginLink>
					<RegisterLink className="btn btn-outline">Register</RegisterLink>
				</div>
			</div>
		</main>
	);
}
