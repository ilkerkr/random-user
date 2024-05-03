import { BsPersonCircle } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import { GiAges } from "react-icons/gi";
import { FaMapMarkedAlt } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { MdDelete } from "react-icons/md";
import { useEffect, useState } from "react";

const Main = () => {
  const [user, setUser] = useState("");
  const [value, setValue] = useState("");
  const [title, setTitle] = useState("");
  const [addUser, setAddUser] = useState([]);

  const getUser = async () => {
    const res = await fetch("https://randomuser.me/api/");
    const data = await res.json();
    const userData = data.results[0];
    setUser(userData);
    setValue(`${userData?.name?.first} ${userData?.name?.last}`);
    setTitle("name");
  };

  const handleAddUser = () => {
    if (addUser.includes(user)) {
      alert("This user is already added");
    }else{
      setAddUser([...addUser, user]);
    }
  }

  const handleDelete = (userEmail) => {
    const newList = addUser.filter((item)=> item.email !== userEmail)
    setAddUser(newList);
  }

  useEffect(() => {
    const timerId = setInterval(getUser, 55000);
    getUser();
    return () => {
      clearInterval(timerId);
    };
  }, []);

  return (
    <main className="p-2">
      <div className="text-center">
        <img
          src={user.picture.large}
          alt=""
          className="rounded-circle img-thumbnail m-1 mt-3"
        />
        <p className="mt-5 text-light">My {title} is</p>
        <h3 className="text-light">{value}</h3>
        <div className="icons">
          <BsPersonCircle
            className="icon"
            onMouseOver={() => {
              setValue(`${user.name.first} ${user.name.last}`);
              setTitle("Name");
            }}
          />
          <MdEmail
            className="icon"
            onMouseOver={() => {
              setValue(`${user.email}`);
              setTitle("Email");
            }}
          />
          <GiAges
            className="icon"
            onMouseOver={() => {
              setValue(`${user.dob.age}`);
              setTitle("Age");
            }}
          />
          <FaMapMarkedAlt
            className="icon"
            onMouseOver={() => {
              setValue(`${user.location.street.name} ${user.location.street.number}`);
              setTitle("Location");
            }}
          />
          <FaPhoneAlt
            className="icon"
            onMouseOver={() => {
              setValue(`${user.phone}`);
              setTitle("Phone");
            }}
          />
          <RiLockPasswordFill
            className="icon"
            onMouseOver={() => {
              setValue(`${user.login.password}`);
              setTitle("Password");
            }}
          />
        </div>
        <div className="d-flex justify-content-around mt-5">
          <button className="btn btn-light fw-semibold" onClick={getUser}>
            NEW USER
          </button>
          <button className="btn btn-light fw-semibold" onClick={handleAddUser}>ADD USER</button>
        </div>

        <table className="table table-dark table-bordered border-danger mt-4 table-hover">
          <thead>
            <tr>
              <th>Firstname</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Age</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {addUser.map((user) => (
              <tr>
                <td>{user.name.first}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>{user.dob.age}</td>
                <td onClick={()=> handleDelete(user.email)}><MdDelete className="text-danger delete" /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
};

export default Main;
