import ProfilePage from "../../common/ProfilePage";

const fields = [
  { name: "name",     label: "שם מלא",       type: "text",     required: true },
  { name: "email",    label: "אימייל",        type: "email",    required: true },
  { name: "password", label: "סיסמה חדשה",   type: "password", required: false }
];

export default function AdminProfile() {
  return <ProfilePage fields={fields} />;
}
