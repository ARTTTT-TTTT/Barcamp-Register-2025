import React from "react";

function Pending({meta}) {

  const DateTime = new Date(meta.console_lst.end_register)

  const date = DateTime.toLocaleDateString('th-TH', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  const time = DateTime.toLocaleTimeString('th-TH' , {
    hour : '2-digit',
    minute : '2-digit'
  })

  return (
    <div className="w-full text-center bg-white rounded-xl text-primary-500 flex flex-col items-center justify-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-10 h-10"
      >
        <path
          fillRule="evenodd"
          d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 000-1.5h-3.75V6z"
          clipRule="evenodd"
        />
      </svg>

      <p className="p-4">กำลังตรวจสอบข้อมูลการสมัคร</p>
      <p className="text-[10px] text-red-500 mt-5">**สามารถแก้ไขข้อมูลได้ถึงวันที่ {date} เวลา {time}**</p>
    </div>
  );
}

export default Pending;
