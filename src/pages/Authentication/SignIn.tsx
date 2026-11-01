import { useState } from "react";
import s from "./Authentication.module.css";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { supabase } from "../../db/supabase";

const SignIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    if (!email || !password) return;

    setLoading(true);

    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });
    if (error) {
      toast.error(error.message);
      setLoading(false);
      return;
    }
    if (data.user) {
      setLoading(false);
      toast.success("Signed in successfully");
      navigate("/");
    }
  };

  return (
    <div className={s.authentication}>
      <div className={s.content}>
        <div className={s.header}>
          <h1 className={s.title}>Sign In</h1>
        </div>

        <form
          className={s.form}
          onSubmit={(e) => {
            e.preventDefault();
            handleSignIn();
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
            <span>{loading ? "Signing in..." : "Sign In"}</span>
          </button>
        </form>

        <div className={s.footer}>
          <span>Don't have an account?</span>
          <Link className={s.link} to="/signup">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
