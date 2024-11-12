import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

import { checkSlip } from "../api/admin";

function UserCard({ user, update_status }) {
    const [collape, setCollape] = useState(false);
    const [openSlip, setOpenSlip] = useState(false);
    const [slipData, setSlipData] = useState(null);
    const [status, setStatus] = useState("");

    useEffect(() => {
        if (user.status === "PENDING") {
            setStatus("QUALIFIED");
        } else if (user.status === "QUALIFIED") {
            setStatus("CONFIRMED");
        } else if (user.status === "CONFIRMED") {
            setStatus("QUALIFIED");
        } else {
            setStatus("PENDING");
        }
    }, [user.status]);

    const handleViewSlip = async () => {
        const data = await checkSlip(user._id);
        if (typeof data === "string") {
            setSlipData({ imageUrl: data }); // กรณีที่เป็นรูปภาพ
        } else {
            setSlipData(data); // กรณีที่เป็น JSON
        }
        setOpenSlip(true);
    };

    return (
        <div className="p-4 bg-white w-full rounded-lg shadow-md relative">
            <p className={clsx("absolute top-4 right-4", user.slip ? "text-green-500" : "text-red-500")}>{user.slip ? "จ่ายแล้ว" : "ยังไม่จ่าย"}</p>
            <div>
                <p className="p-2 text-center">
                    {user.firstName} {user.lastName}
                </p>

                <p className="p-2 text-center font-bold">{user.status}</p>
                {user.slip ? (
                    <div className="text-center">
                        {openSlip ? (
                            <button onClick={() => setOpenSlip(false)} className="mb-2 text-red-700 underline">
                                ปิด
                            </button>
                        ) : (
                            <button onClick={handleViewSlip} className="mb-2 text-blue-500 underline">
                                ดูสลิปโอนเงิน
                            </button>
                        )}

                        {openSlip && (
                            <div className="modal">
                                <div className="modal-content">
                                    {slipData ? (
                                        <img src={slipData.imageUrl} alt="Slip" /> // ตรวจสอบให้แน่ใจว่า key ของรูปตรงกับ response ของคุณ
                                    ) : (
                                        <p>Loading...</p>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                ) : null}
                <div className={clsx("duration-[0.2s]", collape ? "h-80 overflow-y-auto p-2" : "h-0 overflow-hidden p-0")}>
                    <p>User ID : {user._id}</p>
                    <p>Email : {user.email}</p>
                    <p>Nickname : {user.nickName}</p>
                    <p>PhoneNumber : {user.phoneNumber}</p>
                    <p>Address : {user.address}</p>
                    <p>Size : {user.size}</p>
                    <p>Organization : {user.organization}</p>
                    <p>Speaking Topic : {user.speakingTopic}</p>
                    <p>Halal : {user.isHalal.toString()}</p>
                    <p>PDPA : {user.pdpa.toString()}</p>
                    <p>Allergic : {user.allergic}</p>
                    <p>Section : {user.section}</p>
                    <p>Frequent : {user.frequent}</p>
                    <p>Rating : {user.rating}</p>
                    <p>Topic Of Interest : {user.topics_of_interest}</p>
                </div>
                <div className="w-full flex items-center justify-center">
                    <button onClick={() => setCollape((pre) => !pre)}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className={clsx("w-6 h-6 duration-[0.2s]", collape ? "rotate-180" : "rotate-0")}
                        >
                            <path
                                fillRule="evenodd"
                                d="M12.53 16.28a.75.75 0 01-1.06 0l-7.5-7.5a.75.75 0 011.06-1.06L12 14.69l6.97-6.97a.75.75 0 111.06 1.06l-7.5 7.5z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </button>
                </div>
                <div className="mt-5 space-y-5">
                    <select onChange={(e) => setStatus(e.target.value)} className="p-2 bg-gray-100 w-full outline-none rounded-lg">
                        {user.status === "PENDING" && (
                            <>
                                <option value="QUALIFIED">QUALIFIED</option>
                                <option value="NOT_QUALIFIED">NOT_QUALIFIED</option>
                            </>
                        )}
                        {user.status === "QUALIFIED" && (
                            <>
                                <option value="CONFIRMED">CONFIRMED</option>
                                <option value="PENDING">PENDING</option>
                                <option value="NOT_QUALIFIED">NOT_QUALIFIED</option>
                            </>
                        )}
                        {user.status === "CONFIRMED" && (
                            <>
                                <option value="QUALIFIED">QUALIFIED</option>
                                <option value="PENDING">PENDING</option>
                            </>
                        )}
                        {user.status === "NOT_QUALIFIED" && (
                            <>
                                <option value="PENDING">PENDING</option>
                                <option value="QUALIFIED">QUALIFIED</option>
                            </>
                        )}
                    </select>
                    <button
                        onClick={() => update_status(user._id, status)}
                        className="text-white bg-primary-500 px-4 p-2 w-full rounded-lg font-bold"
                    >
                        SET STATUS
                    </button>
                </div>
            </div>
        </div>
    );
}

// Prop validation
UserCard.propTypes = {
    user: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        firstName: PropTypes.string.isRequired,
        lastName: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        nickName: PropTypes.string.isRequired,
        phoneNumber: PropTypes.string.isRequired,
        address: PropTypes.string.isRequired,
        size: PropTypes.string.isRequired,
        organization: PropTypes.string.isRequired,
        speakingTopic: PropTypes.string.isRequired,
        isHalal: PropTypes.bool.isRequired,
        pdpa: PropTypes.bool.isRequired,
        allergic: PropTypes.string.isRequired,
        section: PropTypes.string.isRequired,
        frequent: PropTypes.string.isRequired,
        rating: PropTypes.string.isRequired,
        topics_of_interest: PropTypes.string.isRequired,
        slip: PropTypes.string, // It can be null or a string (url)
        status: PropTypes.string,
    }).isRequired,
    update_status: PropTypes.func.isRequired,
};

export default UserCard;
