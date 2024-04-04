import { ChangeEvent, FC, FormEvent, useState } from "react";
import Layout from "../../components/Layout/Layout";
import styles from "./SignUp.module.scss";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import { useAuth } from "../../contexts/AuthContext";

export const SignUp: FC = () => {
  const { register } = useAuth();

  const [formData, setFormData] = useState({
    id: "",
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    register(formData);
  };
  return (
    <Layout>
      <form className={styles.signupContainer} onSubmit={handleSubmit}>
        <h1 className={styles.title}>Create New Profile</h1>
        <p className={styles.subtitle}>Start Your Fasting Journey</p>
        <Input
          className={styles.input}
          placeholder="Name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          name="name"
          required
        />
        <Input
          className={styles.input}
          placeholder="E-Mail"
          type="email"
          value={formData.email}
          onChange={handleChange}
          name="email"
          required
        />
        <Input
          className={styles.input}
          placeholder="Password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          name="password"
          required
        />
        <Button type="submit" className={styles.signUpButton}>
          Register
        </Button>
      </form>
    </Layout>
  );
};
