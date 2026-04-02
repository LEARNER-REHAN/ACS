const handleLogin = async () => {
  try {
    const res = await fetch("http://localhost:5001/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: email,
        password,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || "Login failed");
    }

    console.log("LOGIN SUCCESS:", data);

    onLogin(data);
    navigate("/dashboard");
  } catch (err) {
    console.error(err);
    setError(err.message || "Server error. Try again.");
  }
};
