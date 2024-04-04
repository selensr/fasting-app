export const registerUser = async ({
  name,
  email,
  password,
}: {
  name: string;
  email: string;
  password: string;
}) => {
  const url = "https://fe-challange-24.me-f72.workers.dev/";

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer olzxoqpibrhq6lfjkkypy",
    },
    body: JSON.stringify({ name, email, password }),
  };

  try {
    const response = await fetch(url, requestOptions);
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("There was an error registering the user:", error);
    return { error };
  }
};
