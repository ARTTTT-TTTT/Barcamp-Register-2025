import React, { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { saveForm } from "../AuthFunctions/authFunctions";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import PDPA from "../PDPA/PDPA";
import { useNavigate } from "react-router-dom";
import AppBar from "../Components/AppBar";
import Swal from "sweetalert2";
import clsx from "clsx";
import { countDown } from "../CountDown/countDown";

const Schema = [
  Yup.object().shape({
    firstName: Yup.string().required("กรุณากรอกชื่อ"),
    lastName: Yup.string().required("กรุณากรอกนามสกุล"),
    nickName: Yup.string().required("กรุณากรอกชื่อเล่น"),
    phoneNumber: Yup.string()
      .min(10)
      .required("กรุณากรอกหมายเลขโทรศัพท์ให้ครบ 10 ตัว")
      .max(10)
      .required("กรุณากรอกหมายเลขโทรศัพท์ไม่เกิน 10 ตัว"),
    address: Yup.string().required("กรุณากรอกที่อยู่"),
    organization: Yup.string().required("กรุณากรอกชื่อองค์กร หรือ หน่วยงาน"),
    size: Yup.string().required("กรุณาเลือกไซต์เสื้อ"),
  }),
  Yup.object().shape({
    speakingTopic: Yup.string().required("กรุณากรอกหัวข้อที่จะนำเสนอ"),
    section: Yup.string().required("กรุณาเลือก Section ที่จะพูด"),
    frequent: Yup.string().required("กรุณาเลือกจำนวนครั้งที่เคยมาเข้าร่วม"),
    rating: Yup.string().required(
      "กรุณาเลือกระดับความสนใจในการเข้าร่วมเป็น Speaker"
    ),
    topics_of_interest: Yup.string().required(
      "กรุณากรอกหัวข้อ หรือ เทคโนโลยีที่สนใจในช่วงนี้"
    ),
  }),
  Yup.object().shape({
    allergic: Yup.string().required("กรุณากรอกอาหารที่แพ้ หากไม่มีให้ใส่ - "),
  }),
];

function FormPage() {
  const { user, Console } = useLoaderData();
  const [pdpa, setPdpa] = useState(user.user.pdpa || !user.editable);
  const [pdpaPopUp, setPdpaPopUp] = useState(true);
  const navigate = useNavigate();

  const validatePhoneNumber = (value) => {
    let errorMessage;
    const phoneRegex = /^[0-9]{10}$/; // Assuming a basic 10-digit phone number

    if (!value) {
      errorMessage = "กรุณากรอกหมายเลขโทรศัพท์";
    } else if (!phoneRegex.test(value)) {
      errorMessage =
        "หมายเลขโทรศัพท์ไม่ถูกต้อง กรุณากรอกหมายเลขโทรศัพท์ 10 หลัก";
    }

    return errorMessage;
  };

  useEffect(() => {
    let timeout = countDown(Console.end_register);
    if (!user.infomation || timeout.distance < 0) {
      navigate("/");
    }
  }, []);

  const pdpaConfirm = async () => {
    let pdpa_data = {
      email: user.infomation.emails[0].value,
      pdpa: true,
    };
    let res = await saveForm(pdpa_data);
    console.log(res);
    if (!res.error) {
      setPdpaPopUp(false);
    }
  };

  const closePDPA = () => {
    setPdpaPopUp(false);
  };

  const [initValue, setInitValue] = useState({
    firstName: user.user.firstName,
    lastName: user.user.lastName,
    nickName: user.user.nickName,
    phoneNumber: user.user.phoneNumber,
    address: user.user.address,
    size: user.user.size,
    organization: user.user.organization,
    speakingTopic: user.user.speakingTopic,
    isHalal: user.user.isHalal,
    allergic: user.user.allergic,
    section: user.user.section,
    frequent: user.user.frequent,
    rating: user.user.rating,
    topics_of_interest: user.user.topics_of_interest,
  });

  //informations
  const [section1, setSection1] = useState([
    {
      name: "firstName",
      label: "ชื่อ",
      type: "input",
    },
    {
      name: "lastName",
      label: "นามสกุล",
      type: "input",
    },
    {
      name: "nickName",
      label: "ชื่อเล่น",
      type: "input",
    },
    {
      name: "phoneNumber",
      label: "เบอร์โทร",
      type: "input",
      phone: true,
    },
    {
      name: "address",
      label: "ที่อยู่",
      type: "input",
    },
    {
      name: "organization",
      label: "องค์กร/หน่วยงาน",
      type: "input",
    },
    {
      name: "size",
      label: "ไซต์เสื้อ",
      type: "option",
      options: ["S", "M", "L", "XL", "2XL", "3XL"],
    },
  ]);

  //Topics
  const [section2, setSection2] = useState([
    {
      name: "speakingTopic",
      label: "หัวข้อที่จะนำเสนอ",
      type: "input",
    },
    {
      name: "section",
      label: "Section",
      type: "option",
      options: ["1 ชั่วโมง", "30 นาที", "ไม่มี"],
    },
    {
      name: "frequent",
      label: "เคยมางาน Barcamp สงขลา จำนวนกี่ครั้ง",
      type: "option",
      options: [
        "ครั้งแรก",
        "1 ครั้ง",
        "2 ครั้ง",
        "3 ครั้ง",
        "4 ครั้ง",
        "5 ครั้ง",
        "6 ครั้ง",
        "7 ครั้ง",
      ],
    },
    {
      name: "rating",
      label: "ระดับความสนใจในการเข้าร่วมเป็น Speaker",
      type: "option",
      options: ["มากที่สุด", "มาก", "ปานกลาง", "นิดหน่อย", "ไม่เลย"],
    },
    {
      name: "topics_of_interest",
      label: "หัวข้อที่สนใจ / เทคโนโลยี",
      type: "input",
    },
  ]);

  //Food
  const [section3, setSection3] = useState([
    {
      name: "isHalal",
      label: "อาหารฮาลาล",
      type: "checkbox",
    },
    {
      name: "allergic",
      label: "อาหารที่แพ้",
      type: "input",
    },
  ]);

  const [sectionName, setSectionName] = useState([
    "ข้อมูลส่วนตัว",
    "การเข้าร่วม",
    "อาหาร",
  ]);

  const [currentSection, setCurrentSection] = useState(0);

  const [formList, setFormList] = useState([section1, section2, section3]);

  const onSubmitFrom = async (data) => {
    if (currentSection !== formList.length - 1) {
      setCurrentSection((pre) => pre + 1);
      return;
    }

    let new_data = data;
    new_data["email"] = user.infomation.emails[0].value;

    let res = await saveForm(new_data);

    //PDPA
    if (res.error) {
      setPdpaPopUp(true);
      return;
    }

    Swal.fire({
      title: "แจ้งเตือน",
      text: " บันทึกข้อมูลสำเร็จ",
      icon: "success",
      confirmButtonText: "รับทราบ",
      confirmButtonColor: "#FF8C00",
    }).then(() => navigate("/profile"));
  };

  return (
    <React.Fragment>
      <AppBar />
      <div className="container mx-auto max-w-xl">
        {!pdpa && pdpaPopUp ? (
          <PDPA confirm={pdpaConfirm} close={closePDPA} />
        ) : (
          ""
        )}
        <Formik
          validationSchema={Schema[currentSection]}
          initialValues={initValue}
          onSubmit={(values) => {
            onSubmitFrom(values);
          }}
        >
          {({ errors, touched, is }) => (
            <Form className="p-4 w-full mx-auto flex flex-col rounded-xl space-y-3 sm:shadow-md mt-24 pb-4 bg-white">
              {/* {formList.map((data, i) => {
                if (data.type === "input") {
                  return (
                    <div key={i}>
                      <p className="mb-4">{data.label}</p>
                      <Field
                        disabled={
                          !(
                            user.editable &&
                            user.user.status === "PENDING"
                          )
                        }
                        className="p-2 bg-gray-100 w-full rounded-lg outline-none"
                        name={data.name}
                        placeholder={"กรุณากรอก " + data.label}
                      />
                      {errors[data.name] && touched[data.name] ? (
                        <p className="text-red-500 text-sm mt-2">
                          {errors[data.name]}
                        </p>
                      ) : null}
                    </div>
                  );
                }

                if (data.type === "checkbox") {
                  return (
                    <div key={i} className="flex items-center space-x-4">
                      <Field
                        id={data.label}
                        disabled={
                          !(
                            user.editable &&
                            user.user.status === "PENDING"
                          )
                        }
                        className="p-2 w-4 h-4"
                        name={data.name}
                        type="checkbox"
                      />
                      <label htmlFor={data.label}>{data.label}</label>
                    </div>
                  );
                }

                if (data.type === "option") {
                  return (
                    <div key={i}>
                      <p className="mb-4">{data.label}</p>
                      <Field
                        disabled={
                          !(
                            user.editable &&
                            user.user.status === "PENDING"
                          )
                        }
                        className="p-2 bg-gray-100 w-full outline-none"
                        name={data.name}
                        as="select"
                      >
                        {data.options.map((option, i) => (
                          <option value={option} key={i}>
                            {option}
                          </option>
                        ))}
                      </Field>
                    </div>
                  );
                }
              })} */}
              <p className="text-center font-bold text-primary-500 text-xl mb-5">
                {sectionName[currentSection]}
              </p>
              {formList[currentSection].map((data, i) => {
                if (data.type === "input") {
                  return (
                    <div key={i}>
                      <p className="mb-4">{data.label}</p>
                      <Field
                        validate={data.phone ? validatePhoneNumber : null}
                        disabled={
                          !(user.editable && user.user.status === "PENDING")
                        }
                        className={clsx(
                          "p-2 bg-gray-100 w-full rounded-lg outline-none",
                          errors[data.name]
                            ? "outline outline-red-500 outline-1"
                            : "outline-none"
                        )}
                        name={data.name}
                        placeholder={"กรุณากรอก " + data.label}
                      />
                      {errors[data.name] && touched[data.name] ? (
                        <p className="text-red-500 text-[10px] mt-2">
                          {errors[data.name]}
                        </p>
                      ) : null}
                    </div>
                  );
                }

                if (data.type === "checkbox") {
                  return (
                    <div key={i} className="flex items-center space-x-4">
                      <Field
                        id={data.label}
                        disabled={
                          !(user.editable && user.user.status === "PENDING")
                        }
                        className="p-2 w-4 h-4 accent-primary-500"
                        name={data.name}
                        type="checkbox"
                      />
                      <label htmlFor={data.label}>{data.label}</label>
                    </div>
                  );
                }

                if (data.type === "option") {
                  return (
                    <div key={i}>
                      <p className="mb-4">{data.label}</p>
                      {data.name === "size" ? 
                      <div className="w-full h-96 p-4">
                        <img className="w-full h-full object-contain" src="size.png" />
                      </div> : null}
                      <Field
                        disabled={
                          !(user.editable && user.user.status === "PENDING")
                        }
                        className="p-2 bg-gray-100 w-full outline-none rounded-lg"
                        name={data.name}
                        as="select"
                      >
                        {data.options.map((option, i) => (
                          <option value={option} key={i}>
                            {option}
                          </option>
                        ))}
                      </Field>
                    </div>
                  );
                }
              })}

              <div className="flex items-center justify-between p-4">
                <button
                  type="button"
                  disabled={currentSection <= 0}
                  className="flex items-center space-x-3 disabled:text-gray-500 outline-none"
                  onClick={() => setCurrentSection((pre) => pre - 1)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      fillRule="evenodd"
                      d="M11.03 3.97a.75.75 0 010 1.06l-6.22 6.22H21a.75.75 0 010 1.5H4.81l6.22 6.22a.75.75 0 11-1.06 1.06l-7.5-7.5a.75.75 0 010-1.06l7.5-7.5a.75.75 0 011.06 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <p>ก่อนหน้า</p>
                </button>
                <button
                  type="submit"
                  disabled={currentSection >= formList.length - 1}
                  className="flex items-center space-x-3 disabled:text-gray-500 outline-none"
                >
                  <p>ถัดไป</p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.97 3.97a.75.75 0 011.06 0l7.5 7.5a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 11-1.06-1.06l6.22-6.22H3a.75.75 0 010-1.5h16.19l-6.22-6.22a.75.75 0 010-1.06z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>

              {user.editable &&
              user.user.status === "PENDING" &&
              currentSection === formList.length - 1 ? (
                <button
                  className="text-white bg-primary-500 px-4 p-4 w-full rounded-lg font-bold"
                  type="submit"
                >
                  บันทึกข้อมูล
                </button>
              ) : null}
            </Form>
          )}
        </Formik>
      </div>
    </React.Fragment>
  );
}

export default FormPage;
