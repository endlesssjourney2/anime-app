import { useState } from "react";
import s from "./Authentication.module.css";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { supabase } from "../../db/supabase";
import { IconAt, IconLockPassword, IconMail } from "@tabler/icons-react";

const SignUp = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    if (loading) return;

    if (!email.trim() || !password) return toast.error("Please fill in all fields");

    if (password.length < 6)
      return toast.error("Password must be at least 6 characters long");

    const normalizedUsername = username.trim().toLowerCase();

    if (!/^[a-z0-9_]{3,20}$/.test(normalizedUsername)) {
      toast.error("Username must be 3–20 characters. Using only (a-z, 0-9, _)");
      return;
    }

    setLoading(true);

    try {
      const { data: existingProfile, error: checkError } = await supabase
        .from("profiles")
        .select("id")
        .eq("username", normalizedUsername)
        .maybeSingle();

      if (checkError) throw checkError;

      if (existingProfile) {
        toast.error("Username is already taken");
        return;
      }

      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: {
          data: {
            username: normalizedUsername,
          },
        },
      });

      if (error) throw error;

      if (data.user) {
        toast.success("Signed up successfully");
        navigate("/");
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to sign up");
    } finally {
      setLoading(false);
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
            <div className={s.inputWrapper}>
              <IconAt className={s.inputIcon} size={20} />
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className={s.input}
                required
              />
            </div>
            <div className={s.inputWrapper}>
              <IconMail className={s.inputIcon} size={20} />
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={s.input}
                required
              />
            </div>
            <div className={s.inputWrapper}>
              <IconLockPassword className={s.inputIcon} size={20} />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={s.input}
                required
              />
            </div>
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
