import { useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

import config from "../services/config";

function UserCard({ user, update_status }) {
    const [collape, setCollape] = useState(false);
    const [status, setStatus] = useState("PENDING");
    const [openSlip, setOpenSlip] = useState(false);

    return (
        <div className="p-4 bg-white w-full rounded-lg shadow-md relative">
            <div
                className={clsx(
                    "left-0 fixed p-4 top-0 z-30 duration-[0.2s] w-full h-screen bg-black/50 flex items-center justify-center",
                    openSlip ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                )}
            >
                <div className="max-w-md">
                    <div className="w-full flex justify-end py-2 relative">
                        <button className="absolute top-4 right-2 z-10" onClick={() => setOpenSlip(false)}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="w-6 h-6 fill-red-500 bg-white rounded-full"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </button>
                        <img
                            className={clsx("w-full duration-[0.2s] rounded-md", openSlip ? "scale-100" : "scale-0")}
                            src={user.slip ? config.apiPrefix + "/" + user.slip : null}
                        />
                    </div>
                </div>
            </div>
            <p className={clsx("absolute top-4 right-4", user.slip ? "text-green-500" : "text-red-500")}>{user.slip ? "จ่ายแล้ว" : "ยังไม่จ่าย"}</p>
            <div>
                <p className="p-2 text-center">
                    {user.firstName} {user.lastName}
                </p>

                <p className="p-2 text-center font-bold">{user.status}</p>
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
                    {user.slip ? (
                        <button onClick={() => setOpenSlip(true)} className="text-blue-500 underline">
                            ดูสลิปโอนเงิน
                        </button>
                    ) : null}
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
                        <option value="PENDING">PENDING</option>
                        <option value="QUALIFIED">QUALIFIED</option>
                        <option value="CONFIRMED">CONFIRMED</option>
                        <option value="NOT_QUALIFIED">NOT_QUALIFIED</option>
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
