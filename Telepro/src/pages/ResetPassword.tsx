import { sendPasswordResetEmail } from "firebase/auth";
import React, { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Alert from "../components/Alert";
import { auth } from "../shared/firebase";

function ResetPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [isAlertOpened, setIsAlertOpened] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent) => {
    setMessage("");
    e.preventDefault();
    sendPasswordResetEmail(auth, email)
      .then(() => {
        alert("Mã Rest Password đã được gửi đên Email của bạn");
        navigate("/login");
      })
      .catch(() => setError("Email không được tìm thấy"));
  };
  return (
    <div
      className=" flex h-screen flex-1 justify-center text-black "
      style={{ backgroundImage: "url(/quenmk.png)" }}
    >
      <div className="w-full max-w-[500px]">
        <div className="flex justify-center">
          <div className=" mt-9 flex items-center gap-2 rounded-lg p-2">
            <img className="h-8 w-8" src="/icon.svg" alt="" />
            <span className="text-5xl text-white">Telepro</span>
          </div>
        </div>
        <div className="flex items-center  justify-center gap-2 rounded-lg pt-3 ">
          <span className="text-xl text-black">Telepro Password Recovery</span>
        </div>
        <div className="flex items-center  justify-center gap-2 rounded-lg ">
          <span className="text-xl text-black">
            {" "}
            to connect to the Telepro Web application
          </span>
        </div>
        <div className="flex flex-col-reverse gap-10 md:mt-2 md:flex-row md:gap-5 lg:mt-10">
          <div
            className=" bg-lighten  flex flex-1 flex-col items-center "
            style={{ height: "300px", width: "150px", borderRadius: "10px" }}
          >
            <span
              className=" flex justify-between"
              style={{
                fontSize: "26px",
                color: "black",
                fontWeight: "bold",
                paddingTop: "30px",
              }}
            >
              Reset Password
            </span>
            <div className="p-3">
              {error && <div className="auth__error">{error}</div>}
              <div className="flex items-center justify-center gap-4">
                <form>
                  <span>Enter your email to receive the verification code</span>
                  <div className="flex justify-center">
                    <div className="auth">
                      <hr
                        style={{
                          marginBottom: 20,
                        }}
                      ></hr>
                      {message && (
                        <Alert
                          isOpened={isAlertOpened}
                          setIsOpened={setIsAlertOpened}
                          text={message}
                          isError
                        />
                      )}

                      {error && <div className="auth__error">{error}</div>}
                      <form onSubmit={handleSubmit} className="justify-between">
                        <input
                          className="form-control  bg-light text-dark-lighten h-full w-full rounded-lg border px-3 outline-none transition duration-300 focus:border-gray-300"
                          style={{
                            width: "250px",
                            height: "40px",
                            borderRadius: "5px",
                            marginRight: "10px",
                          }}
                          type="email"
                          value={email}
                          required
                          placeholder="Your Email"
                          onChange={(e) => setEmail(e.target.value)}
                        />
                        <button
                          style={{
                            color: "#FFFFFF",
                            backgroundColor: "#0068FF",
                            height: "40px",
                            width: "80px",
                            borderRadius: "5px",
                          }}
                          className="button-form"
                          type="submit"
                        >
                          Confirm
                        </button>
                      </form>
                    </div>
                  </div>
                </form>
              </div>
              <div className="flex flex-col items-center justify-center gap-4 p-5">
                <span>
                  You have an account?
                  <Link
                    style={{ color: "#0068FF", textDecoration: "none" }}
                    to="/sign-in"
                  >
                    Sign In
                  </Link>
                </span>
              </div>
              <p className="flex flex-col items-center justify-center gap-4 p-5">
                <Link
                  style={{ color: "#0068FF", textDecoration: "underline" }}
                  to="/login"
                >
                  Back to login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
