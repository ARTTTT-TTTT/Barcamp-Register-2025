import { useNavigate } from "react-router-dom";
import { useState } from "react";
import clsx from "clsx";

import { Logout } from "../api/auth";

function AppBar() {
	const [openMenu, setOpenMenu] = useState(false);

	const navigate = useNavigate();

	return (
		<div className="fixed flex items-center justify-between px-5 top-0 z-[1] w-full bg-primary-500 p-2 shadow-md">
			<div className="flex items-center space-x-10 text-white text-lg">
				<img className="w-10 h-10" src="/logo.png" alt="Logo" />
				<p className="text-sm">BARCAMP SONGKHLA</p>
			</div>
			<div className="relative">
				<button
					onClick={() => setOpenMenu((prevState) => !prevState)}
					onBlur={() =>
						setTimeout(() => {
							setOpenMenu(false);
						}, 100)
					}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						fill="currentColor"
						className="w-6 h-6 fill-white"
					>
						<path
							fillRule="evenodd"
							d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
							clipRule="evenodd"
						/>
					</svg>
				</button>
				<div
					className={clsx(
						"p-4 rounded-lg shadow-md bg-white w-48 right-0 -bottom-2 absolute duration-[0.2s] ease-in-out",
						openMenu
							? "scale-100 translate-y-[100%] translate-x-0 opacity-100"
							: "scale-0 translate-y-[0%] translate-x-[45%] opacity-0"
					)}
				>
					<button
						onClick={() => navigate("/profile")}
						className="flex space-x-2 hover:bg-gray-100 p-2 w-full ease-in-out duration-[0.2s] rounded-lg"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							fill="currentColor"
							className="w-6 h-6 fill-primary-500"
						>
							<path
								fillRule="evenodd"
								d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
								clipRule="evenodd"
							/>
						</svg>

						<p>โปรไฟล์</p>
					</button>
					<button
						onClick={() => navigate("/form")}
						className="flex space-x-2 hover:bg-gray-100 p-2 w-full ease-in-out duration-[0.2s] rounded-lg"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							fill="currentColor"
							className="w-6 h-6 fill-primary-500"
						>
							<path
								fillRule="evenodd"
								d="M4.5 3.75a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V6.75a3 3 0 0 0-3-3h-15Zm4.125 3a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5Zm-3.873 8.703a4.126 4.126 0 0 1 7.746 0 .75.75 0 0 1-.351.92 7.47 7.47 0 0 1-3.522.877 7.47 7.47 0 0 1-3.522-.877.75.75 0 0 1-.351-.92ZM15 8.25a.75.75 0 0 0 0 1.5h3.75a.75.75 0 0 0 0-1.5H15ZM14.25 12a.75.75 0 0 1 .75-.75h3.75a.75.75 0 0 1 0 1.5H15a.75.75 0 0 1-.75-.75Zm.75 2.25a.75.75 0 0 0 0 1.5h3.75a.75.75 0 0 0 0-1.5H15Z"
								clipRule="evenodd"
							/>
						</svg>

						<p>ข้อมูลส่วนตัว</p>
					</button>
					<button
						onClick={Logout}
						className="flex space-x-2 hover:bg-gray-100 p-2 w-full ease-in-out duration-[0.2s] rounded-lg"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							fill="currentColor"
							className="w-6 h-6 fill-red-500"
						>
							<path
								fillRule="evenodd"
								d="M7.5 3.75A1.5 1.5 0 006 5.25v13.5a1.5 1.5 0 001.5 1.5h6a1.5 1.5 0 001.5-1.5V15a.75.75 0 011.5 0v3.75a3 3 0 01-3 3h-6a3 3 0 01-3-3V5.25a3 3 0 013-3h6a3 3 0 013 3V9A.75.75 0 0115 9V5.25a1.5 1.5 0 00-1.5-1.5h-6zm10.72 4.72a.75.75 0 011.06 0l3 3a.75.75 0 010 1.06l-3 3a.75.75 0 11-1.06-1.06l1.72-1.72H9a.75.75 0 010-1.5h10.94l-1.72-1.72a.75.75 0 010-1.06z"
								clipRule="evenodd"
							/>
						</svg>
						<p>ออกจากระบบ</p>
					</button>
				</div>
			</div>
		</div>
	);
}

export default AppBar;
