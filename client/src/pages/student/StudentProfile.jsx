import ProfilePage from "../../common/ProfilePage";

const fields = [
  { name: "name",     label: "שם מלא",    type: "text",     required: true },
  { name: "password", label: "סיסמה חדשה", type: "password", required: false }
];

export default function StudentProfile() {
  return <ProfilePage fields={fields} />;
}