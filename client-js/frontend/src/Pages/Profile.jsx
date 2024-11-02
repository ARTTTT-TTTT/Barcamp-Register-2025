import React, { useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Qualified from "../Components/Qualified";
import Confirmed from "../Components/Confirmed";
import NotQualified from "../Components/NotQualified";
import Pending from "../Components/Pending";
import AppBar from "../Components/AppBar";

function Profile() {
  const { user, Console } = useLoaderData();
  const navigate = useNavigate();

  useEffect(() => {

    if (!user.infomation) {
      navigate("/");
    }

    if (!user.user.firstName) {
      navigate("/form");
    }
  }, []);

  const backToForm = () => {
    navigate("/form");
  };

  return (
    <React.Fragment>
      <AppBar />
      <div className="container mx-auto max-w-xl">
        <div className="flex flex-col items-center space-y-5 md:mt-24 pt-24 h-fit min-h-screen md:min-h-fit max-h-fit p-4 bg-white rounded-xl shadow-lg">
          <img
            src={user.infomation.photos[0].value}
            className="w-24 h-24 object-cover rounded-full shadow-md"
          />

          <p>
            {user.user.firstName} {user.user.lastName}
          </p>
          <p className="text-[12px]">{"(" + user.user.email + ")"}</p>

          <div className="w-full h-[1px] bg-primary-50" />

          {user.user.status === "QUALIFIED" ? (
            <Qualified user={user.user} />
          ) : user.user.status === "CONFIRMED" ? (
            <Confirmed user={user.user} />
          ) : user.user.status === "NOT_QUALIFIED" ? (
            <NotQualified />
          ) : (
            <Pending meta={user} />
          )}

          {user.editable && user.user.status === "PENDING" ? (
            <button
              onClick={backToForm}
              className="text-white bg-primary-500 p-2 rounded-lg w-full"
            >
              แก้ไขข้อมูลการสมัคร
            </button>
          ) : null}
        </div>
      </div>
    </React.Fragment>
  );
}

export default Profile;
