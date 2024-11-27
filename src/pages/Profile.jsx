import { useState, useEffect } from "react";
import { FaEdit } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { editProfileThunk } from "../redux/slice/profileSlice";
import { Link, useNavigate } from "react-router-dom";
import { STUDENT, TEACHER } from "../helpers/constants";
import Navbar from "../layouts/Navbar";
import { deleteAccountThunk } from "../redux/slice/userSlice";

function Profile() {
  const [fields, setFields] = useState({
    name: "",
    email: "",
    bio: "",
    grade: "",
    picture: null,
  });
  const [editField, setEditField] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // Fetch user data from Redux store
  const { auth,profileSlice } = useSelector((state) => state);
  const {user,profile,googleUserProfile} = auth;
  const {updatedProfile} =profileSlice
  const { role } = user;

  // Fetch profile when the component mounts
  useEffect(() => {
    setFields({
      name: profile.name || "",
      email: profile.email || "",
      bio: profile.bio || "",
      grade: profile.grade || "",
      picture: profile.picture || null,
    });

  }, [profile]);

  // Edit mode handler
  const handleEdit = (field) => {
    setEditField(field);
  };

  // Input change handler
  const handleInputChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "picture" && files?.[0]) {
      const uploadedImage = files[0];
      setFields({ ...fields, picture: uploadedImage });

      const fileReader = new FileReader();
      fileReader.readAsDataURL(uploadedImage);
     
    } else {
      setFields({ ...fields, [name]: value });
    }
  };

  // Save changes handler
  const handleProfileChange = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.keys(fields).forEach((key) => {
      if (fields[key] !== null) formData.append(key, fields[key]);
    });

    const response = await dispatch(editProfileThunk(formData));
    if (response.meta.requestStatus === "fulfilled") {
      setEditField(""); // Exit edit mode
    } else {
      console.error("Failed to update profile:", response.error.message);
    }
  };
 
  const deleteAccount = async ()=>{
    const res = await dispatch(deleteAccountThunk());
    console.log(res)
    if(res.payload.statusCode===200){
     navigate('/')
    }
  }

  return (
    <Navbar>
        <div className="min-h-screen bg-base-200 flex flex-col items-center p-6 gap-2 ">
      <div className="card w-full max-w-lg  shadow-xl  bg-gradient-to-r from-[#eddabe] via-[#ece3da] to-white">
        <div className="card-body items-center text-center">
          {/* Profile Picture */}
          <div className="relative">
            <figure>
              <img
                src={updatedProfile?.picture ||profile.picture|| googleUserProfile.picture||"https://via.placeholder.com/150"}
                alt="Profile"
                className="rounded-full w-32 h-32 border-4 border-primary"
              />
            </figure>
            <button
              className="btn btn-circle btn-sm absolute top-0 right-0"
              onClick={() => handleEdit("picture")}
            >
              <FaEdit />
            </button>
            {editField === "picture" && (
              <input
                type="file"
                name="picture"
                className="mt-2"
                onChange={handleInputChange}
              />
            )}
          </div>

          {/* Name */}
          <div className="flex items-center w-full mt-4">
            {<h2 className="text-xl font-bold">{ user.name}</h2>}
          </div>

          {/* Email */}
          <div className="flex items-center w-full mt-2">
            {<p className="text-gray-600">{ user.email}</p>}
          </div>

          {/* Bio */}
          <div className="flex items-center w-full mt-2">
            {editField === "bio" ? (
              <textarea
                name="bio"
                value={fields.bio}
                onChange={handleInputChange}
                className="textarea textarea-bordered textarea-primary w-full"
              />
            ) : (
              <p className="text-gray-600">{updatedProfile?.bio||profile.bio || "Add bio"}</p>
            )}
            <button
              className="btn btn-circle btn-sm ml-2"
              onClick={() => handleEdit("bio")}
            >
              <FaEdit />
            </button>
          </div>

          {/* Grade */}
          <div className="flex items-center w-full mt-2">
            {editField === "grade" ? (
              <input
                type="text"
                name="grade"
                value={fields.grade}
                onChange={handleInputChange}
                className="input input-bordered input-primary w-full"
              />
            ) : (
              <p className="text-gray-600">{updatedProfile?.grade||profile.grade||"ADD Class"}</p>
            )}
            <button
              className="btn btn-circle btn-sm ml-2"
              onClick={() => handleEdit("grade")}
            >
              <FaEdit />
            </button>
          </div>

          {/* Save Button */}
          {editField && (
            <button
              className="btn btn-primary mt-4"
              onClick={handleProfileChange}
            >
              Save Changes
            </button>
          )}
        </div>
      </div>

      <div className="card w-full max-w-lg  shadow-xl  bg-gradient-to-r from-[#eddabe] via-[#ece3da] to-white">
        <div className="card-body ">
          {role === STUDENT ? (
            <div className=" flex flex-col gap-3">
              <Link to="/report">
              <button className="w-full flex items-center justify-center gap-2 py-3 px-5 rounded-lg bg-gradient-to-r from-[#ffbd59] to-[#ff8a00] text-white font-semibold hover:shadow-lg transform hover:scale-105 transition duration-200 ease-in-out">
              <span>📚</span> My Quizzes
            </button>
              </Link>
              <Link to="/report">
              <button className="w-full flex items-center justify-center gap-2 py-3 px-5 rounded-lg bg-gradient-to-r from-[#6a9bd8] to-[#3b82f6] text-white font-semibold hover:shadow-lg transform hover:scale-105 transition duration-200 ease-in-out">
              <span>📊</span> My Result
            </button>
              </Link>
            </div>
          ) : (
            <div>
              <Link to={`/activity/${TEACHER}`}>
              <button className="w-full flex items-center justify-center gap-2 py-3 px-5 rounded-lg bg-gradient-to-r from-[#34d399] to-[#10b981] text-white font-semibold hover:shadow-lg transform hover:scale-105 transition duration-200 ease-in-out">
              <span>✍️</span> My Quizzes
            </button>
              </Link>
            </div>
          )}
        </div>
      </div>

      <div className="card w-full max-w-lg  shadow-xl  bg-gradient-to-r from-[#eddabe] via-[#ece3da] to-white">
        <div className="card-body ">
        <button 
        onClick={deleteAccount}
        className="w-full flex items-center justify-center gap-2 py-3 px-5 rounded-lg bg-red-500 text-white font-semibold hover:bg-red-600 hover:shadow-lg transform hover:scale-105 transition duration-200 ease-in-out">
        🗑️ Delete Account
      </button>
     
        </div>
      </div>
    </div>
    </Navbar>
  );
}

export default Profile;
