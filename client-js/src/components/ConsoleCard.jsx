import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Swal from "sweetalert2";
import * as XLSX from "xlsx";

import { postConsole } from "../api/console";
import { adminGetAllUsers } from "../api/admin";

const formatDate = (date) => {
    return new Date(date).toISOString().split("T")[0]; // แปลงเป็น YYYY-MM-DD
};

function ConsoleCard({ Console }) {
    const [usersLst, setUsersLst] = useState([]);
    const [isVoteEnabled, setIsVoteEnabled] = useState(Console.vote);
    const [startDate, setStartDate] = useState(Console.start_register ? formatDate(Console.start_register) : formatDate(new Date()));
    const [endDate, setEndDate] = useState(Console.end_register ? formatDate(Console.end_register) : formatDate(new Date()));

    const [prevStartDate, setPrevStartDate] = useState("");
    const [prevEndDate, setPrevEndDate] = useState("");
    const [prevIsVoteEnabled, setPrevIsVoteEnabled] = useState(false);

    const fetch_user = async () => {
        try {
            let users = await adminGetAllUsers();
            setUsersLst(users); // Ensure usersLst is always an array
        } catch (error) {
            console.error("Error fetching users:", error);
            setUsersLst([]);
        }
    };

    const saveChanges = async () => {
        // เก็บข้อมูลก่อนหน้านี้เพื่อนำไปใช้หากกด Cancel
        setPrevStartDate(startDate);
        setPrevEndDate(endDate);
        setPrevIsVoteEnabled(isVoteEnabled);

        try {
            // ส่งข้อมูลไปยัง API เพื่ออัปเดตข้อมูล
            const response = await postConsole({
                start_register: startDate,
                end_register: endDate,
                vote: isVoteEnabled, // ส่งค่า vote ที่อัปเดต
            });

            // ตรวจสอบว่า response มาจาก API หรือไม่
            if (response && response.error) {
                console.log("API Error:", response.error); // หากเกิดข้อผิดพลาดจาก API
                // แสดง Swal เมื่อเกิดข้อผิดพลาด
                Swal.fire({
                    title: "แจ้งเตือน",
                    text: `เกิดข้อผิดพลาด: ${response.error}`,
                    icon: "error",
                    confirmButtonText: "รับทราบ",
                    confirmButtonColor: "#FF8C00",
                });
                return; // หยุดการทำงานของฟังก์ชันเมื่อมีข้อผิดพลาด
            }

            const formattedStartDate = formatDate(response.start_register);
            const formattedEndDate = formatDate(response.end_register);

            // แสดงข้อความแจ้งเตือนเมื่อข้อมูลอัปเดตสำเร็จ
            Swal.fire({
                title: "แจ้งเตือน",
                html: `
                <b>Vote Status:</b> ${response.vote ? "เปิด" : "ปิด"}<br>
                <b>Start Register:</b> ${formattedStartDate}<br>
                <b>End Register:</b> ${formattedEndDate}<br>
                `,
                text: "Update Status เรียบร้อยแล้ว",
                icon: "success",
                confirmButtonText: "รับทราบ",
                confirmButtonColor: "#FF8C00",
            });
        } catch (error) {
            // แสดงข้อความผิดพลาดหากเกิดข้อผิดพลาดในกระบวนการ
            Swal.fire({
                title: "แจ้งเตือน",
                text: `เกิดข้อผิดพลาด: ${error.message}`,
                icon: "error",
                confirmButtonText: "รับทราบ",
                confirmButtonColor: "#FF8C00",
            });
        }
    };

    const cancelChanges = () => {
        setStartDate(prevStartDate);
        setEndDate(prevEndDate);
        setIsVoteEnabled(prevIsVoteEnabled);
    };

    const saveToExcel = () => {
        // กำหนดคอลัมน์และข้อมูล
        const tableColumn = ["ชื่อ", "นามสกุล", "หัวข้อการพูด"];
        const tableRows = [];

        // เตรียมข้อมูลสำหรับตาราง
        usersLst
            .filter((user) => user.status !== "") // กรองเฉพาะผู้ใช้ที่ status ไม่ว่าง
            .forEach((user) => {
                const userData = [`${user.firstName}`, `${user.lastName}`, user.speakingTopic || "ไม่มีหัวข้อ"];
                tableRows.push(userData);
            });

        // สร้างแผ่นงาน Excel
        const ws = XLSX.utils.aoa_to_sheet([tableColumn, ...tableRows]); // aoa_to_sheet สร้างแผ่นงานจากอาเรย์ 2D
        const wb = XLSX.utils.book_new(); // สร้าง Workbook ใหม่
        XLSX.utils.book_append_sheet(wb, ws, "Users"); // เพิ่มแผ่นงานใน Workbook

        // บันทึกไฟล์ Excel
        XLSX.writeFile(wb, "register.xlsx");
    };
    useEffect(() => {
        fetch_user();
    }, []);

    return (
        <div className="p-4 mt-3 bg-white w-full rounded-lg shadow-md relative overflow-y-scroll max-h-[500px]">
            {/* Switch สำหรับ Vote */}
            <div className="flex justify-between items-center bg-gray-100 w-full rounded-lg p-2">
                <label htmlFor="voteSwitch" className="mr-2 ">
                    <b>Enable Vote</b> {isVoteEnabled ? <b className="text-green-500">เปิด</b> : <b className="text-red-500">ปิด</b>}
                </label>
                <div className="relative inline-block w-11 h-5">
                    <input
                        type="checkbox"
                        id="switch-component"
                        checked={isVoteEnabled} // ใช้ค่า isVoteEnabled อย่างถูกต้อง
                        onChange={() => {
                            setIsVoteEnabled((prev) => !prev); // สลับค่าจาก true เป็น false หรือ false เป็น true
                        }}
                        className="peer appearance-none w-11 h-5 bg-gray-200 rounded-full checked:bg-slate-800 cursor-pointer transition-colors duration-300"
                    />
                    <label
                        htmlFor="switch-component"
                        className="absolute top-0 left-0 w-5 h-5 bg-white rounded-full border border-slate-300 shadow-sm transition-transform duration-300 peer-checked:translate-x-6 peer-checked:border-slate-800 cursor-pointer"
                    ></label>
                </div>
            </div>

            {/* เมนูปรับวันที่ */}
            <div className="mt-4">
                <div className="mb-2">
                    <label htmlFor="startDate" className="block text-sm font-bold text-green-500">
                        Start Register
                    </label>
                    <input
                        id="startDate"
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="p-2 bg-gray-100 w-full rounded-lg"
                    />
                </div>

                <div className="mb-2">
                    <label htmlFor="endDate" className="block text-sm font-bold text-red-500">
                        End Register
                    </label>
                    <input
                        id="endDate"
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="p-2 bg-gray-100 w-full rounded-lg"
                    />
                </div>
            </div>

            {/* ปุ่ม Save และ Cancel */}
            <div className="flex mt-4 justify-between items-center">
                <div>
                    <button onClick={saveToExcel} className="text-white bg-red-500 px-4 py-2 rounded-lg">
                        Export Exel
                    </button>
                </div>
                <div className="flex space-x-4">
                    <button onClick={saveChanges} className="text-white bg-green-500 px-4 py-2 rounded-lg">
                        Save
                    </button>
                    <button onClick={cancelChanges} className="text-white bg-gray-500 px-4 py-2 rounded-lg">
                        Cancel
                    </button>
                </div>
            </div>

            {/* แสดง user ทุกคน */}
            <div className="overflow-x-auto overflow-y-auto max-h-[500px] mt-4">
                <table className="min-w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border border-gray-300 px-4 py-2 text-left">Name</th>
                            <th className="border border-gray-300 px-4 py-2 text-left">Speaking Topic</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usersLst.length > 0 ? (
                            usersLst
                                .filter((user) => user.status !== "")
                                .map((user, index) => (
                                    <tr key={index} className={`${index % 2 === 0 ? "bg-white" : "bg-gray-50"}`}>
                                        <td className="border border-gray-300 px-4 py-2">
                                            {user.firstName} {user.lastName}
                                        </td>
                                        <td className="border border-gray-300 px-4 py-2">{user.speakingTopic || "No Topic"}</td>
                                    </tr>
                                ))
                        ) : (
                            <tr>
                                <td colSpan="2" className="border border-gray-300 px-4 py-2 text-center text-gray-500">
                                    No users found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

ConsoleCard.propTypes = {
    Console: PropTypes.shape({
        vote: PropTypes.bool.isRequired,
        start_register: PropTypes.string.isRequired, // หรือ PropTypes.instanceOf(Date) ถ้าค่าคือ Date
        end_register: PropTypes.string.isRequired, // หรือ PropTypes.instanceOf(Date) ถ้าค่าคือ Date
    }).isRequired,
};

export default ConsoleCard;
