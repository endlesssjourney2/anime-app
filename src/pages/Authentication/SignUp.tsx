import { useState } from "react";
import s from "./Authentication.module.css";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { supabase } from "../../db/supabase";

const SignUp = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    if (!email || !password) return toast.error("Please fill in all fields");

    if (password.length < 6)
      return toast.error("Password must be at least 6 characters long");
    setLoading(true);

    const { data, error } = await supabase.auth.signUp({
      email: email.trim(),
      password,
    });
    if (error) {
      setLoading(false);
      return toast.error(error.message);
    }
    if (data.user) {
      setLoading(false);
      toast.success("Signed up successfully");
      navigate("/");
    }
  };

  return (
    <div className={s.authentication}>
      <div className={s.content}>
        <div className={s.header}>
          <h1 className={s.title}>Create an account</h1>
        </div>

        <form
          className={s.form}
          onSubmit={(e) => {
            e.preventDefault();
            handleSignUp();
          }}
        >
          <div className={s.inputContainer}>
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={s.input}
              required
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={s.input}
              required
            />
          </div>

          <button type="submit" className={s.btn} disabled={loading}>
            <span>{loading ? "Creating account..." : "Sign Up"}</span>
          </button>
        </form>

        <div className={s.footer}>
          <span>Already have an account?</span>
          <Link className={s.link} to="/signin">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
