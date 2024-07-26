import { signIn } from "@/auth";

export default function Page() {
  return (
    <form
      action={async (formData) => {
        "use server";
        await signIn("credentials", formData);
      }}
    >
      <label>
        Email
        <input name="email" type="email" defaultValue={"nigga@nigga.nigga"} />
      </label>
      <label>
        Password
        <input name="password" type="password" defaultValue={"31"} />
      </label>
      <button>Sign In</button>
    </form>
  );
}
