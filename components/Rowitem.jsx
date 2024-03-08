import { MdClose , MdEdit } from "react-icons/md";
import Link from "next/link";

export default function Rowitem({
  _id,
  title,
  type,
  status,
  createdAt,
  deleteTodo,
}) {
  const color = (status) => {
    if (status === "Done") {
      return "text-success";
    } else if (status === "On Process") {
      return "text-primary";
    } else {
      return "text-error";
    }
  };

  const formatDate = (createdAt) => {
    const date = new Date(createdAt)
    const day = String(date.getDate()).padStart(2,'0')
    const month = String(date.getMonth()+1).padStart(2,'0')
    const year = date.getFullYear()
    return `${day} / ${month} / ${year}`
  }

  return (
    <tr>
      <td className="text-md font-bold border-y-2 border-neutral p-6">{title}</td>
      <td className="text-md font-bold border-y-2 border-neutral p-6">{type}</td>
      <td className={`text-md font-bold border-y-2 border-neutral p-6 ${color(status)}`}>
        {status}
      </td>
      <td className="text-md font-bold border-y-2 border-neutral p-6">
        {formatDate(createdAt)}
      </td>
      <td className="text-right text-md font-bold border-y-2 border-neutral p-6 whitespace-nowrap">
        <Link href={`/edit/${_id}`}>
          <button className="btn btn-accent">
            <MdEdit className="text-xl font-bold"/>
          </button>
        </Link>
        <button
          className="btn btn-primary text-xl font-bold ms-2"
          onClick={() => deleteTodo(_id)}
        >
          <MdClose className="text-xl font-bold"/>
        </button>
      </td>
    </tr>
  );
}
