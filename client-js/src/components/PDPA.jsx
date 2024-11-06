import { useState } from "react";
import { motion } from "framer-motion";
import PropTypes from "prop-types";

function PDPA({ confirm, close }) {
    const [service] = useState("Barcamp");
    const [description] = useState("ระบบลงทะเบียน");
    const [list_data] = useState(["ชื่อ นามสกุล", "ที่อยู่", "เบอร์โทร", "ชื่อเล่น", "องค์กร"]);

    return (
        <div className="bg-black bg-opacity-70 fixed top-0 left-0 w-full h-screen p-5 py-20 z-10">
            <motion.div className="w-full h-full" initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }}>
                <div className=" max-w-lg h-full mx-auto bg-white relative rounded-lg overflow-hidden">
                    <div className="overflow-y-scroll h-full absolute left-0 top-0">
                        <p className="p-4 shadow-md text-white bg-primary-500">ยินยอมให้ใช้ข้อมูลส่วนบุคคล</p>
                        <div className="px-8 py-4">
                            <p className="font-bold">นิยามข้อมูลส่วนบุคคล</p>
                            <p>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ข้อมูลส่วนบุคคล หมายถึง ข้อมูลเกี่ยวกับบุคคลซึ่งทำให้สามารถระบุตัวบุคคลนั้นได้
                                ไม่ว่าทางตรงหรือทางอ้อม{" "}
                            </p>
                            <br />
                            <p className="font-bold">ข้อมูลส่วนบุคคลที่เก็บรวบรวม</p>
                            <p>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{service}{" "}
                                จะใช้วิธีการที่ชอบด้วยกฏหมายและเป็นธรรมในการเก็บรวบรวมข้อมูลส่วนบุคคลอย่างจำกัดเพียงเท่าที่จำเป็น
                                ภายใต้วัตถุประสงค์การทำงานของ {service} ที่เป็น {description} โดยจะเก็บรวบรวมข้อมูลส่วนบุคคลของท่าน ดังนี้
                            </p>
                            <ul>
                                {list_data.map((e, i) => (
                                    <li key={i}>{e}</li>
                                ))}
                            </ul>
                            <p>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ทั้งนี้ข้อมูลส่วนบุคคลดังกล่าวเป็นข้อมูลที่จำเป็นสำหรับการทำงานของ {service} นี้
                                หากไม่มีข้อมูลดังกล่าว ระบบจะไม่สามารถทำงานโดยสมบูรณ์ ผู้ใช้เป็นผู้เลือกได้ว่าจะบันทึกข้อมูลส่วนบุคคลอื่นใด
                                และยินดีจะเปิดเผยข้อมูลดังกล่าวกับบุคคลหรือหน่วยงานอื่นหรือไม่
                            </p>
                            <br />
                            <p className="font-bold">แหล่งที่มาของข้อมูลส่วนบุคคล</p>
                            <p>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{service} ได้รับข้อมูลส่วนบุคคล ด้วยความสมัครใจของผู้ใช้เท่านั้น
                                โดยการลงทะเบียนใช้ {service} จะถือ เป็นการยอมรับเงื่อนไขการใช้งานและอนุญาติให้ระบบจัดเก็บ ใช้
                                และเปิดเผยข้อมูลเหล่านั้นได้ตามวัตถุประสงค์
                            </p>
                            <br />
                            <p className="font-bold">วัตถุประสงค์ในการเก็บรวบรวมข้อมูลส่วนบุคคล</p>
                            <p>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{service} จะเก็บรวบรวมข้อมูลส่วนบุคคลของท่านเพื่อนำไปใช้หรือเปิดเผยเท่าที่จำเป็น
                                ภายใต้วัตถุประสงค์ในการใช้บริการ
                            </p>
                            <p>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{service} จะไม่ดำเนินการอื่นใดแตกต่างจากที่ระบุในวัตถุประสงค์ เว้นแต่
                                มีกฏหมายบัญญัติให้กระทำ หรือมีหนังสือร้องขอที่สามารถปฏิบัติได้ตามกฏหมาย เช่น
                                เพื่อความจำเป็นในการป้องกันด้านสุขภาพและโรคติดต่ออันตราย{" "}
                            </p>
                            <br />
                            <p className="font-bold">การเก็บรวบรวม ใช้ หรือเปิดเผยข้อมูลส่วนบุคคล</p>
                            <p>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{service} จะดำเนินการกับข้อมูลส่วนบุคคลของท่าน ในการเก็บรวบรวม ใช้ และ
                                เปิดเผยข้อมูลส่วนบุคคล เมื่อได้รับความยินยอมจากท่านตามวัตถุประสงค์ที่ระบุไว้เท่านั้น นอกจากนี้ {service}
                                อาจจำเป็นต้องเปิดเผยข้อมูลส่วนบุคคลของท่านให้กับเจ้าหน้าที่หรือหน่วยงานที่มีอำนาจหน้าที่ตามกฏหมาย เช่น
                                การพิจารณาคดีของศาลและการดำเนินงานของเจ้าหน้าที่ในกระบวนการพิจารณาคดี
                            </p>
                            <br />
                            <p className="font-bold">การเก็บรักษาและระยะเวลาในการเก็บรักษาข้อมูลส่วนบุคคล</p>
                            <p>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{service} ตระหนักถึงความสำคัญของการรักษาความปลอดภัยของข้อมูลส่วนบุคคลของท่าน{" "}
                                {service}
                                จึงกำหนดให้มีมาตรการในการรักษาความมั่นคงปลอดภัยของข้อมูลส่วนบุคคลอย่างเหมาะสมและสอดคล้องกับการรักษาความลับ
                                และป้องกันการเข้าถึง ทำลาย ใช้ แปลง แก้ไข หรือเปิดเผยข้อมูลส่วนบุคคล โดยไม่มีสิทธิหรือโดยไม่ชอบด้วยกฏหมาย
                            </p>
                            <p>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;โดยมีระยะเวลาการจัดเก็บข้อมูลส่วนบุคคลตลอดระยะเวลาการใช้งาน {service}{" "}
                                เพื่อให้ระบบทำงานได้โดยสมบูรณ์ ทั้งนี้เมื่อพ้นระยะเวลาการเก็บรักษา
                                และไม่มีเหตุให้ต้องเก็บรักษาข้อมูลส่วนบุคคลนั้นต่อไป บริษัทฯ จะลบหรือทำลายข้อมูลส่วนบุคคลของท่าน
                            </p>
                            <br />
                            <p className="font-bold">สิทธิของเจ้าของข้อมูล</p>
                            <p>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ท่านมีสิทธิในการดำเนินการ ได้แก่ สิทธิในการเพิกถอนความยินยอม,
                                สิทธิในการเข้าถึงข้อมูลส่วนบุคคล, สิทธิในการคัดค้านการเก็บรวบรวม ใช้ หรือเปิดเผยข้อมูลส่วนบุคคล,
                                สิทธิในการลบและแก้ไขข้อมูลส่วนบุคคล เว้นแต่มีข้อจำกัดสิทธิโดยกฏหมาย
                            </p>
                            <p>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ท่านสามารถติดต่อ {service} เพื่อให้ดำเนินการตามสิทธิข้างต้นได้
                                โดยไม่มีค่าใช้จ่ายใดๆ และจะแจ้งผลตามคำร้อง ภายใน 30 วัน
                            </p>
                            <p>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;หากพบการรั่วไหลของข้อมูล ทาง {service} จะดำเนินการแจ้งให้ท่านทราบภายใน 72 ชั่วโมง
                            </p>
                            <br />
                            <p className="font-bold">ผู้ควบคุมข้อมูลส่วนบุคคล</p>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Facebook Page :{" "}
                            <a className="underline" href="https://www.facebook.com/BarcampSongkhla/">
                                BarcampSongkhla
                            </a>
                            <br />
                            <p>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Generated by{" "}
                                <a className="underline" href="https://github.com/iamapinan/PDPA-Consent">
                                    PDPA Consent
                                </a>
                            </p>
                        </div>
                        <div className="w-full flex items-center justify-end p-8 space-x-5">
                            <button onClick={confirm} className="text-white bg-green-600 px-4 py-2 shadow-md rounded-lg">
                                ยินยอม
                            </button>
                            <button onClick={close} className="text-white bg-red-600 px-4 py-2 shadow-md rounded-lg">
                                ยกเลิก
                            </button>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}


PDPA.propTypes = {
  confirm: PropTypes.func.isRequired,
  close: PropTypes.func.isRequired,
};

// eslint-disable-next-line react-refresh/only-export-components
export default PDPA;
