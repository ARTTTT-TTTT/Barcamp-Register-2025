import React, { useRef, useState } from "react";
import { uploadSlip } from "../AuthFunctions/authFunctions";
import config from "../../config";
import Swal from "sweetalert2";

function Qualified({ user }) {
  const [slip_file, setSlipFile] = useState(
    user.slip ? config.apiPrefix + "/" + user.slip : null
  );
  const fileRef = useRef(null);

  const inputFile = async (file) => {

    if (
      file.type === "image/png" ||
      file.type === "image/jpg" ||
      file.type === "image/jpeg"
    ) {
      const formData = new FormData();
      formData.append("id", user._id);
      formData.append("slip", file);

      uploadSlip(formData).then((res) => {
        if (!res.error || res.message === "Not Time To Edit information.") {
          Swal.fire({
            title: "แจ้งเตือน",
            text: " อัพโหลดสลิปสำเร็จ",
            icon: "success",
            confirmButtonText: "รับทราบ",
            confirmButtonColor: "#FF8C00",
          }).then(() => setSlipFile(URL.createObjectURL(file)))
        }
      });
    } else {
      Swal.fire({
        title: "แจ้งเตือน",
        text: "รองรับเฉพาะไฟล์ png jpg และ jpeg เท่านั้น",
        icon: "error",
        confirmButtonText: "รับทราบ",
        confirmButtonColor: "#FF8C00",
      });
      fileRef.current.value = null;
    }
  };

  return (
    <div>
      <div className="p-4 w-full text-center bg-white rounded-xl text-primary-500">
        <p>
          ได้รับการตรวจสอบเรียบร้อยแล้ว กรุณาโอนเงินมัดจำ และอัพโหลดหลักฐานการโอนเงิน
          เพื่อยืนยันการสมัคร 
        </p>
        <p className="mt-5 text-red-500 text-center text-[12px] mb-5">**เงินส่วนนี้จะได้รับคืนวันวันงาน**</p>
      </div>
      <div className="w-full h-80 mt-10 shadow-md rounded-xl">
        <img className="w-full h-full object-contain" src="QRCODE.jpg" />
      </div>
      {slip_file ? (
        <div className="w-full h-64 overflow-hidden mt-10 shadow-md rounded-xl">
          <img className="object-contain w-full h-full" src={slip_file} />
        </div>
      ) : null}
      <input
        className="hidden"
        ref={fileRef}
        onChange={(e) => {
          inputFile(e.target.files[0]);
        }}
        type="file"
        name="slip"
        accept="image/*"
      />
      <button
        onClick={() => fileRef.current.click()}
        className="text-white bg-primary-500 p-2 rounded-lg w-full mt-10 mb-5 outline-none"
      >
        อัพโหลดสลิป
      </button>
    </div>
  );
}

export default Qualified;
