import { useEffect, useState } from "react";
import { Login } from "./AuthFunctions/authFunctions";
import { useLoaderData } from "react-router-dom";
import { countDown } from "./CountDown/countDown";
import { motion } from "framer-motion";
import ImageSlide from "./Components/ImageSlide";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function App() {
  const { user, Console } = useLoaderData();
  const [countDownText, setCountDownText] = useState("Loading...");
  const [showButtonLogin, setShowButtonLogin] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    let timeout = countDown(Console.end_register);
    if (user.infomation) {
      if (user.user.firstName) {
        navigate("/profile");
      } else {
        if (timeout.distance > 0) {
          navigate("/form");
        } else {
          Swal.fire({
            title: "แจ้งเตือน",
            text: "ไม่มีรายชื่อในฐานข้อมูล",
            icon: "error",
            confirmButtonText: "รับทราบ",
            confirmButtonColor: "#FF8C00",
          });
        }
      }
    }
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      let coundown = countDown(Console.start_register);
      if (coundown.distance > 0) {
        setShowButtonLogin(false);
        setCountDownText(coundown.time);
      } else {
        setShowButtonLogin(true);
      }
    }, 100);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-screen">
      <ImageSlide />
      <div className="bg-white shadow-md w-full h-full flex flex-col items-center justify-center">
        <motion.div
          className="flex flex-col items-center p-5 sm:rounded-xl rounded-none  w-full justify-center h-screen shadow-md z-[1]"
          initial={{ translateY: -300, opacity: 0 }}
          animate={{ translateY: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {countDown(Console.end_register).distance > 0 ? (
            <p className="mb-5 text-primary-400 font-bold text-xl">
              ลงทะเบียนเข้าร่วมงาน
            </p>
          ) : null}
          <p className="sm:text-7xl text-5xl font-bold bg-gradient-to-b from-primary-500 to-red-500 bg-clip-text text-transparent">
            BARCAMP 8
          </p>
          <p className="mb-5 text-primary-400 font-bold text-2xl">สงขลา</p>
          {/* Button */}
          <div className="mt-10">
            {showButtonLogin ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <button
                  className="duration-[0.2s] hover:shadow-sm hover:bg-primary-600 flex items-center justify-between bg-primary-500 text-white shadow-md p-4 space-x-5 rounded-full"
                  onClick={Login}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    width="100"
                    height="100"
                    viewBox="0 0 48 48"
                    className="w-6 h-6 bg-white p-1 rounded-full"
                  >
                    <path
                      fill="#fbc02d"
                      d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12	s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20	s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                    ></path>
                    <path
                      fill="#e53935"
                      d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039	l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                    ></path>
                    <path
                      fill="#4caf50"
                      d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36	c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                    ></path>
                    <path
                      fill="#1565c0"
                      d="M43.611,20.083L43.595,20L42,20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571	c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                    ></path>
                  </svg>
                  <p className="font-bold">
                    {countDown(Console.end_register).distance < 0
                      ? "เข้าสู่ระบบด้วย "
                      : "ลงทะเบียนด้วย "}{" "}
                    Google
                  </p>
                </button>
              </motion.div>
            ) : (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <p className="hover:shadow-sm text-center sm:text-lg text-sm bg-primary-500 w-fit text-white shadow-md p-4 rounded-full">
                  ลงทะเบียนในอีก {countDownText}
                </p>
              </motion.div>
            )}
            <div>
              <button
                className="text-white text-center w-full mt-5 underline"
                onClick={() => (window.location.href = "/")}
              >
                กลับไปยังหน้าหลัก
              </button>
            </div>
          </div>
        </motion.div>
      </div>
      <motion.div
        className="w-full pointer-events-none fixed -bottom-44 left-0 z-[1]"
        initial={{ translateY: 100, opacity: 0 }}
        animate={{ translateY: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <img className="w-full" src="timeline.png" />
      </motion.div>
    </div>
  );
}

export default App;
