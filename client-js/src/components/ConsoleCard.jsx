import { useState } from "react";
import PropTypes from "prop-types";
import Swal from "sweetalert2";

import { postConsole } from "../api/console";

const formatDate = (date) => {
    return new Date(date).toISOString().split("T")[0]; // แปลงเป็น YYYY-MM-DD
};

function ConsoleCard({ Console }) {
    const [isVoteEnabled, setIsVoteEnabled] = useState(Console.vote);
    const [startDate, setStartDate] = useState(Console.start_register ? formatDate(Console.start_register) : formatDate(new Date()));
    const [endDate, setEndDate] = useState(Console.end_register ? formatDate(Console.end_register) : formatDate(new Date()));

    const [prevStartDate, setPrevStartDate] = useState("");
    const [prevEndDate, setPrevEndDate] = useState("");
    const [prevIsVoteEnabled, setPrevIsVoteEnabled] = useState(false);

    

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

    return (
        <div className="p-4 mt-3 bg-white w-full rounded-lg shadow-md relative">
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
            <div className="flex justify-end space-x-4 mt-4">
                <button onClick={saveChanges} className="text-white bg-green-500 px-4 py-2 rounded-lg">
                    Save
                </button>
                <button onClick={cancelChanges} className="text-white bg-gray-500 px-4 py-2 rounded-lg">
                    Cancel
                </button>
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
