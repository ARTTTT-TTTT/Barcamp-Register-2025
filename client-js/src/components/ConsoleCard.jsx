import { useState } from "react";
import PropTypes from "prop-types";

function ConsoleCard({ Console }) {
    const [isVoteEnabled, setIsVoteEnabled] = useState(Console.vote); // Switch สำหรับ vote
    const [startDate, setStartDate] = useState(Console.start_register || new Date().toISOString().split("T")[0]); // Start Register
    const [endDate, setEndDate] = useState(Console.end_register || new Date().toISOString().split("T")[0]); // End Register

    const [prevStartDate, setPrevStartDate] = useState("");
    const [prevEndDate, setPrevEndDate] = useState("");
    const [prevIsVoteEnabled, setPrevIsVoteEnabled] = useState(false);

    const saveChanges = async () => {
        // บันทึกค่าเก่าไว้
        setPrevStartDate(startDate);
        setPrevEndDate(endDate);
        setPrevIsVoteEnabled(isVoteEnabled);

        // เตรียมข้อมูลที่ต้องการส่งไปยัง API
        const payload = {
            vote: isVoteEnabled,
            start_register: startDate,
            end_register: endDate,
        };

        try {
            // ทำการส่งข้อมูล POST ไปยัง API
            const response = await fetch("YOUR_API_ENDPOINT", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            // ตรวจสอบสถานะการตอบกลับจาก API
            if (!response.ok) {
                throw new Error("Failed to save changes");
            }

            const result = await response.json();
            console.log("Data saved successfully:", result);
        } catch (error) {
            console.error("Error saving changes:", error);
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
                        checked={isVoteEnabled} // สถานะเปิด/ปิด
                        onChange={() => {
                            setIsVoteEnabled((prev) => !prev);
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
