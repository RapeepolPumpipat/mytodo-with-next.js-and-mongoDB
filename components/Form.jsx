import Link from "next/link";
import { usePathname } from "next/navigation";
import { IoMdArrowRoundBack } from "react-icons/io";

export default function Form({
  handleForm,
  title,
  type,
  status,
  detail,
  setTitle,
  setType,
  setStatus,
  setDetail,
  hasError,
}) {
  const path = usePathname();
  const page = path.split("/")[1];
  return (
    <form
      onSubmit={handleForm}
      className="flex flex-col gap-4 border-2 border-neutral p-6 rounded-lg w-full"
    >
      <div className="flex flex-row items-center gap-2">
        <Link href="/">
          <IoMdArrowRoundBack className="text-4xl hover:text-white" />
        </Link>
        <header className="text-4xl font-bold">
          {page === "edit" ? "Let Update Your Pin" : "Let Pin Your Work"}
        </header>
      </div>
      <input
        type="text"
        className={`input input-bordered w-full border-2 ${hasError.target === 'title' ? 'border-error' : 'border-neutral'}`}
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      {hasError.target === 'title' && <p className="text-error">{hasError.message}</p>}
      <select
        className={`select select-bordered w-full border-2 ${hasError.target === 'type' ? 'border-error' : 'border-neutral'}`}
        value={type}
        onChange={(e) => setType(e.target.value)}
      >
        <option value="">-- Type --</option>
        <option value="FIX BUG">FIX BUG</option>
        <option value="STYLE">STYLE</option>
        <option value="NEW FUNCTION">NEW FUNCTION</option>
        <option value="PERMISSION">PERMISSION</option>
      </select>
      {hasError.target === 'type' && <p className="text-error">{hasError.message}</p>}
      <select
        className={`select select-bordered w-full border-2 ${hasError.target === 'status' ? 'border-error' : 'border-neutral'}`}
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        <option value="">-- Status --</option>
        <option value="Not Start">Not Start</option>
        <option value="On Process">On Process</option>
        <option value="Done">Done</option>
      </select>
      {hasError.target === 'status' && <p className="text-error">{hasError.message}</p>}
      <textarea
        cols="30"
        rows="10"
        className={`textarea textarea-bordered border-2 neutral`}
        placeholder="Detail Your Work"
        value={detail}
        onChange={(e) => setDetail(e.target.value)}
      ></textarea>
      <button className="btn btn-secondary">
        {page === "edit" ? "Update" : "Submit"}
      </button>
    </form>
  );
}
