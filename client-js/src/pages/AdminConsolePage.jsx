import { useEffect, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import clsx from "clsx";

import UserCard from "../components/UserCard";
import ConsoleCard from "../components/ConsoleCard";
import { adminUpdateStatus, adminGetAllUsers } from "../api/admin";

function AdminConsolePage() {
    const { Console } = useLoaderData();
    const [usersLst, setUsersLst] = useState([]);
    const [btnFilter, setBtnFilter] = useState("PENDING");
    const [filter, setFilter] = useState("");
    const [filterPay, setFilterPay] = useState(null);
    const navigate = useNavigate();

    // State to hold counts of users for each status
    const [userCounts, setUserCounts] = useState({
        NOT_QUALIFIED: 0,
        PENDING: 0,
        QUALIFIED: 0,
        CONFIRMED: 0,
    });

    // Fetch users and calculate user counts based on status
    const fetch_user = async () => {
        try {
            let users = await adminGetAllUsers();
            setUsersLst(users || []); // Ensure usersLst is always an array

            // Calculate counts by status
            const counts = {
                NOT_QUALIFIED: users.filter((user) => user.status === "NOT_QUALIFIED").length,
                PENDING: users.filter((user) => user.status === "PENDING").length,
                QUALIFIED: users.filter((user) => user.status === "QUALIFIED").length,
                CONFIRMED: users.filter((user) => user.status === "CONFIRMED").length,
            };
            setUserCounts(counts); // Update the counts
        } catch (error) {
            console.error("Error fetching users:", error);
            setUsersLst([]);
        }
    };

    // Update status of a user
    const update_status = async (id, status) => {
        try {
            await adminUpdateStatus({ _id: id, status });
            Swal.fire({
                title: "แจ้งเตือน",
                text: "Update Status เรียบร้อยแล้ว",
                icon: "success",
                confirmButtonText: "รับทราบ",
                confirmButtonColor: "#FF8C00",
            }).then(() => fetch_user());
        } catch (error) {
            Swal.fire({
                title: "แจ้งเตือน",
                text: error,
                icon: "error",
                confirmButtonText: "รับทราบ",
                confirmButtonColor: "#FF8C00",
            });
        }
    };

    useEffect(() => {
        if (!window.localStorage.getItem("access_token")) {
            navigate("/admin");
        }
        fetch_user();
    }, [navigate]);

    useEffect(() => {
        if (btnFilter !== "QUALIFIED") {
            setFilterPay(null);
        }
    }, [btnFilter]);

    const logout = () => {
        window.localStorage.clear();
        navigate("/admin");
    };

    return (
        <section>
            <div className="fixed top-0 left-0 flex w-full z-20 p-4 items-center bg-primary-500">
                {/* Display the count of users for each status */}
                <div className="md:text-xl text-base flex justify-center space-x-4 flex-grow">
                    <p className="text-white">| N_Q = {userCounts.NOT_QUALIFIED}</p>
                    <p className="text-white">| P = {userCounts.PENDING}</p>
                    <p className="text-white">| Q = {userCounts.QUALIFIED}</p>
                    <p className="text-white">| C = {userCounts.CONFIRMED} |</p>
                </div>
                <button aria-label="Logout" onClick={logout} className="ml-auto">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-6 h-6 stroke-white"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                        />
                    </svg>
                </button>
            </div>

            <div className="container max-w-lg mx-auto p-4 pt-24">
                <div className="fixed left-1/2 p-4 pb-0 top-16 -translate-x-1/2 max-w-lg w-full bg-secondary-500 z-10">
                    <input
                        className="bg-white shadow-md outline-none p-4 w-full rounded-lg"
                        placeholder="Search"
                        onChange={(e) => setFilter(e.target.value)}
                    />
                    <div>
                        <div className="flex items-center justify-around sm:text-sm text-[10px] pt-4">
                            <button
                                onClick={() => setBtnFilter("PENDING")}
                                className={clsx("p-2", btnFilter === "PENDING" ? "bg-primary-500 text-white rounded-md" : "p-2")}
                            >
                                PENDING
                            </button>
                            <button
                                onClick={() => setBtnFilter("QUALIFIED")}
                                className={clsx("p-2", btnFilter === "QUALIFIED" ? "bg-primary-500 text-white rounded-md" : "p-2")}
                            >
                                QUALIFIED
                            </button>
                            <button
                                onClick={() => setBtnFilter("CONFIRMED")}
                                className={clsx("p-2", btnFilter === "CONFIRMED" ? "bg-primary-500 text-white rounded-md" : "p-2")}
                            >
                                CONFIRMED
                            </button>
                            <button
                                onClick={() => setBtnFilter("NOT_QUALIFIED")}
                                className={clsx("p-2", btnFilter === "NOT_QUALIFIED" ? "bg-primary-500 text-white rounded-md" : "p-2")}
                            >
                                NOT_QUALIFIED
                            </button>
                            <button
                                onClick={() => setBtnFilter("CONSOLE")}
                                className={clsx("p-2", btnFilter === "CONSOLE" ? "bg-primary-500 text-white rounded-md" : "p-2")}
                            >
                                CONSOLE
                            </button>
                        </div>
                        {/* Filter Payment Options */}
                        {btnFilter === "QUALIFIED" && (
                            <div className="flex justify-around my-2">
                                <button
                                    onClick={() => setFilterPay(null)}
                                    className={clsx("p-2", filterPay === null ? "bg-primary-500 text-white rounded-md" : "p-2")}
                                >
                                    แสดงทั้งหมด
                                </button>
                                <button
                                    onClick={() => setFilterPay("PAID")}
                                    className={clsx("p-2", filterPay === "PAID" ? "bg-green-500 text-white rounded-md" : "p-2")}
                                >
                                    จ่ายแล้ว
                                </button>
                                <button
                                    onClick={() => setFilterPay("UNPAID")}
                                    className={clsx("p-2", filterPay === "UNPAID" ? "bg-red-500 text-white rounded-md" : "p-2")}
                                >
                                    ยังไม่จ่าย
                                </button>
                            </div>
                        )}
                        {btnFilter === "CONSOLE" && <ConsoleCard Console={Console} />}
                        <div className="space-y-5 mt-3 w-full">
                            {usersLst
                                .filter((user) => user.firstName !== "")
                                .filter((user) => user.status === btnFilter)
                                .filter((user) =>
                                    filter
                                        ? user.firstName.toLowerCase().includes(filter.toLowerCase()) ||
                                          user.lastName.toLowerCase().includes(filter.toLowerCase()) ||
                                          user.email.toLowerCase().includes(filter.toLowerCase()) ||
                                          user.phoneNumber.includes(filter)
                                        : user
                                )
                                .filter((user) => (filterPay === "PAID" ? user.slip !== "" : filterPay === "UNPAID" ? user.slip === "" : user))
                                .map((data, i) => (
                                    <UserCard user={data} key={i} update_status={update_status} />
                                ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default AdminConsolePage;
