import React, { useState } from "react";
import { useForm } from "react-hook-form";
import logo from "../../assets/logo2w.png";
import Swal from "sweetalert2";
import UseAuth from './../../hooks/UseAuth/UseAuth';
import UseAxiosCommon from './../../hooks/UseAxiosCommon/UseAxiosCommon';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const {
    register,
    handleSubmit,
     reset,
    formState: { errors },
  } = useForm();
  const navigate=useNavigate();
  const axiosCommon=UseAxiosCommon();
  const { signInWithGoogle,updateUserProfile,createUser,setUser}=UseAuth();

  const [imageData, setImageData] = useState(null);

  const onSubmit = async (data) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{7,}$/;
    const { name, email, password, confirmPassword } = data;

    if (password !== confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Password does not match",
      });
      reset();
      return;
    }

    if (password.length < 6) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Password must be at least 6 characters",
      });
      reset();
      return;
    }

    if (regex.test(password)) {
      // Proceed with user creation
      createUser(email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          updateUserProfile(name, imageData)
            .then(() => {
              setUser(user);
              const userInfo = {
                name: name,
                email: email,
                role: 'member',
                photo: imageData, // Save image data (base64 or URL)
              };

              axiosCommon.post('/users', userInfo)
                .then((res) => {
                  if (res.data.insertedId) {
                    Swal.fire({
                      icon: "success",
                      title: "Congratulations",
                      text: "Your account has been created successfully!",
                    });
                    reset();
                    navigate('/');
                  }
                });
            })
            .catch((error) => {
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.message,
              });
              reset();
              return;
            });
        });
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character!",
      });
      reset();
      return;
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImageData(reader.result); // Base64 image data
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };
  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then((userCredential) => {
        const user = userCredential.user;
        const userInfo = {
          name: user.displayName,
          email: user.email,
          role: 'member',
        };
  
        axiosCommon.post('/users', userInfo)
          .then((res) => {
            if (res.data.insertedId) {
              Swal.fire({
                icon: "success",
                title: "Congratulations",
                text: "Your account has been created successfully!",
              });
              reset();
              navigate(location?.state ? location.state : "/");
            }
          })
          .catch((error) => {
            console.error('Error creating user:', error);
          });
      })
      .catch((error) => {
        const errorMessage = error.message;
        reset();
        Swal.fire({
          icon: 'error',
          title: 'Login Failed',
          text: errorMessage,
        });
      });
  };
  
  return (
    <div className=" flex justify-between items-center  mx-1">
      <div className="max-w-7xl w-screen flex justify-center   mx-auto rounded-2xl  shadow-lg bg-[#1c2940]  ">
        <div
          className="hidden bg-cover lg:block lg:w-3/5 bg-center rounded-2xl"
          style={{
            backgroundImage:
              "url('https://i.ibb.co/1JkWSXn/5378405-removebg-preview.png')",
          }}
        ></div>

        <div className="flex items-center w-full max-w-3xl p-8 mx-auto lg:px-12 lg:w-3/5">
          <div className="w-full">
            <img src={logo} alt="" className="h-20 w-auto mx-auto" />
            <h1 className="text-xl font-semibold tracking-wider text-gray-800 capitalize dark:text-white">
              Get your free account now.
            </h1>

            <p className="mt-4 text-gray-500 dark:text-gray-400 text-sm">
              Let’s get you all set up so you can verify your personal account
              and begin setting up your profile.
            </p>
            <button onClick={handleGoogleSignIn} 
                        href="#"
                        className="flex items-center justify-center mt-1 text-gray-600 transition-colors duration-300 transform border rounded-lg dark:border-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 w-full"
                    >
                        <div  className="px-4 py-2 ">
                            <svg className="w-6 h-6" viewBox="0 0 40 40">
                                <path
                                    d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.045 27.2142 24.3525 30 20 30C14.4775 30 10 25.5225 10 20C10 14.4775 14.4775 9.99999 20 9.99999C22.5492 9.99999 24.8683 10.9617 26.6342 12.5325L31.3483 7.81833C28.3717 5.04416 24.39 3.33333 20 3.33333C10.7958 3.33333 3.33335 10.7958 3.33335 20C3.33335 29.2042 10.7958 36.6667 20 36.6667C29.2042 36.6667 36.6667 29.2042 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                                    fill="#FFC107"
                                />
                                <path
                                    d="M5.25497 12.2425L10.7308 16.2583C12.2125 12.59 15.8008 9.99999 20 9.99999C22.5491 9.99999 24.8683 10.9617 26.6341 12.5325L31.3483 7.81833C28.3716 5.04416 24.39 3.33333 20 3.33333C13.5983 3.33333 8.04663 6.94749 5.25497 12.2425Z"
                                    fill="#FF3D00"
                                />
                                <path
                                    d="M20 36.6667C24.305 36.6667 28.2167 35.0192 31.1742 32.34L26.0159 27.975C24.3425 29.2425 22.2625 30 20 30C15.665 30 11.9842 27.2359 10.5975 23.3784L5.16254 27.5659C7.92087 32.9634 13.5225 36.6667 20 36.6667Z"
                                    fill="#4CAF50"
                                />
                                <path
                                    d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.7592 25.1975 27.56 26.805 26.0133 27.9758C26.0142 27.975 26.015 27.975 26.0158 27.9742L31.1742 32.3392C30.8092 32.6708 36.6667 28.3333 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                                    fill="#1976D2"
                                />
                            </svg>
                        </div>

                        <span className="w-5/6 px-4 py-3 font-bold text-center">
                            Sign in with Google
                        </span>
                    </button>

            <form
              className="grid grid-cols-1 gap-2 mt-4 md:grid-cols-2"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="md:col-span-2">
                <label className="block mb-1 text-sm text-gray-600 dark:text-gray-200">
                  {" "}
                  Name
                </label>
                <input
                  type="text"
                  {...register("name", { required: true })}
                  placeholder="John show"
                  className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                />
                {errors.name && <span>This field is required</span>}
              </div>

              <div className="md:col-span-2">
                <label className="block mb-1 text-sm text-gray-600 dark:text-gray-200">
                  Email address
                </label>
                <input
                  type="email"
                  {...register("email", { required: true })}
                  placeholder="johnsnow@example.com"
                  className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                />
                {errors.email && <span>This field is required</span>}
              </div>

              <div className="md:col-span-2">
                <label className="block mb-1 text-sm text-gray-600 dark:text-gray-200">
                  Photo
                </label>
                <input
                  type="file"
                  {...register("photo", { required: true })}
                  id="photo"
                  
                  accept="image/*"
                  onChange={handleFileChange}
                  className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                />
                {errors.photo && <span>This field is required</span>}
              </div>

              <div>
                <label className="block mb-1 text-sm text-gray-600 dark:text-gray-200">
                  Password
                </label>
                <input
                  type="password"
                  {...register("password", { required: true })}
                  placeholder="Enter your password"
                  className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                />
                {errors.password && <span>This field is required</span>}
              </div>

              <div>
                <label className="block mb-1 text-sm text-gray-600 dark:text-gray-200">
                  Confirm password
                </label>
                <input
                  type="password"
                  {...register("confirmPassword", { required: true })}
                  placeholder="Enter your password"
                  className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                />
                {errors.confirmPassword && <span>This field is required</span>}
              </div>

              <div>
                <button
                  type="submit"
                  className="flex items-center justify-between w-full px-6 py-3 text-sm tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
                >
                  <span>Sign Up </span>

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 rtl:-scale-x-100"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
