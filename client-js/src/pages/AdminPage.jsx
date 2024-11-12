import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Swal from "sweetalert2";

import { adminLogin } from "../api/admin";

function AdminPage() {
    const navigate = useNavigate();

    const submitFrom = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const formProps = Object.fromEntries(formData);

        let res = await adminLogin(formProps);

        if (res.error) {
            Swal.fire({
                title: "แจ้งเตือน",
                text: "ชื่อ หรือ รหัสไม่ถูกต้อง",
                icon: "error",
                confirmButtonText: "รับทราบ",
                confirmButtonColor: "#FF8C00",
            });
        } else {
            window.localStorage.setItem("access_token", res.access_token);
            navigate("/admin/control-panel");
        }
    };

    useEffect(() => {
        if (window.localStorage.getItem("access_token")) {
            navigate("/admin/control-panel");
        }
    }, [navigate]);

    return (
        <div className="container p-4 max-w-xl h-screen mx-auto flex items-center justify-center">
            <div className="space-y-10 w-full">
                <p className="font-bold text-2xl text-center">Admin Login</p>
                <form onSubmit={submitFrom} className="flex flex-col space-y-5 bg-white p-4 rounded-xl">
                    <span>Username</span>
                    <input name="username" required className="p-4 rounded-lg outline-none bg-gray-100" type="text" placeholder="username" />
                    <span>Password</span>
                    <input name="password" required className="p-4 rounded-lg outline-none bg-gray-100" type="password" placeholder="password" />
                    <button type="submit" className="text-white bg-primary-500 p-4 rounded-lg">
                        เข้าสู่ระบบ
                    </button>
                </form>
            </div>
        </div>
    );
}

export default AdminPage;
