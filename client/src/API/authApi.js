const BASE_URL = import.meta.env.VITE_API_URL;
export const login = async (email, password) => {
    const response = await fetch(`${BASE_URL}/auth/login`, {

        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
    });

    return await response.json();
};


export const logout = () => {
    localStorage.removeItem("token");
};
//צריך לבדוק מה עם הצפנת סיסמה בקונטרולר
