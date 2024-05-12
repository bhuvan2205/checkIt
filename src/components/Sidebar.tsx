"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import TodoIcon from "./icons/TodoIcon";
import {
	LogoutLink,
	useKindeBrowserClient,
} from "@kinde-oss/kinde-auth-nextjs";
import Image from "next/image";

export default function Sidebar() {
	const pathname = usePathname();
	const { user, isLoading, isAuthenticated, getPermissions } =
		useKindeBrowserClient();
	const { permissions } = getPermissions();
	const links = [
		{
			src: "/",
			text: "Home",
		},
		{
			src: "/dashboard",
			text: "Dashboard",
			roles: ["add:todo"],
		},
		{
			src: "/admin",
			text: "Admin",
			roles: ["edit:todo"],
		},
	];
	return (
		<aside className="bg-gray-800 dark:bg-gray-950 p-6 border-r border-gray-200 dark:border-gray-700 flex flex-col min-w-[200px] w-full max-w-md justify-between">
			<div>
				<div className="flex items-center mb-6">
					<TodoIcon className="h-6 w-6 mr-2" />
					<span className="font-semibold text-lg">CheckIt</span>
				</div>
				<nav className="flex-1 space-y-2">
					{links.map((link, index) => {
						if (
							!link?.roles ||
							(link?.roles &&
								link?.roles?.every((role) => permissions?.includes(role)))
						) {
							return (
								<Link
									key={`link-${index}`}
									href={link.src}
									className={`flex items-center px-3 py-2 rounded-md text-gray-600 hover:bg-gray-200 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-900 dark:hover:text-gray-50 ${
										pathname === link.src
											? "bg-gray-200 text-gray-900 dark:bg-gray-900 dark:text-gray-50"
											: ""
									}`}>
									{link.text}
								</Link>
							);
						}

						return null;
					})}
				</nav>
			</div>
			<div className="flex justify-center items-center flex-col w-full">
				{isLoading && !(pathname === "/") && (
					<div className="animate-spin rounded-full h-7 w-7 border-b-2 mx-auto my-2 border-white/50"></div>
				)}

				{user?.picture && (
					<Image
						src={user.picture}
						alt="profile"
						width={50}
						height={50}
						className="rounded-full mx-auto my-2"
					/>
				)}

				{user && !user?.picture && (
					<div className="rounded-full h-10 bg-gray-800 w-10 text-xl flex justify-center items-center">
						{user?.given_name?.at(0)}
					</div>
				)}

				{user?.email && <p className="mb-3">Logged in as {user?.email}</p>}

				{isAuthenticated && (
					<LogoutLink className="btn btn-ghost btn-block">Logout</LogoutLink>
				)}
			</div>
		</aside>
	);
}
