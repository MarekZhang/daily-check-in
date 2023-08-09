import { FormEvent } from "react";
import toast from "react-hot-toast";

export default function UserForm() {
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;

    const data = { leetCodeAccount: form.leetCodeAccount.value };

    const resp = await fetch("/api/user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const respData = await resp.json();

    if (respData.status === 200) {
      toast.success("You joined in the game! Keep moving!");
    } else {
      toast.error(respData.message);
    }
  };

  return (
    <>
      <form
        className="w-full flex space-x-2 justify-center py-4"
        onSubmit={handleSubmit}
      >
        <input
          placeholder="LeetCode Account"
          name="leetCodeAccount"
          className="outline-none w-1/2 rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-base sm:leading-6"
        />
        <input
          type="submit"
          className="whitespace-normal w-auto p-2 border border-green-300 rounded-md bg-green-400 hover:bg-emerald-400 font-semibold text-white cursor-pointer"
          value="Let's Go!"
        />
      </form>
    </>
  );
}
