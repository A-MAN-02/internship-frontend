import api from "../api/axios";

const Register = () => {
  const handleRegister = async () => {
    try {
      const res = await api.post("/auth/register", {
        name: "Aman",
        email: "aman@test.com",
        password: "123456",
        role: "user", // or vendor
      });

      console.log(res.data);
      alert("Registered successfully");
    } catch (err) {
      console.error(err.response.data);
    }
  };

  return <button onClick={handleRegister}>Register</button>;
};

export default Register;
