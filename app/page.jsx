"use client";
import { BsFillPinAngleFill } from "react-icons/bs";
import { MdArrowDownward, MdArrowUpward } from "react-icons/md";
import Rowitem from "@/components/Rowitem";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [titleSort, setTitleSort] = useState("")
  const [typeSort, setTypeSort] = useState("")
  const [statusSort, setStatusSort] = useState("")
  const [dateSort, setDateSort] = useState("")

  const getTodos = async () => {
    try {
      const res = await fetch("/api");
      if (!res.ok) {
        throw new Error("fetch error");
      }
      const data = await res.json();
      return data;
    } catch (error) {
      console.log(error);
      throw new Error("fetch error");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(!isLoading);
        const data = await getTodos();
        setTodoList(data);
        setIsLoading(!isLoading);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const deleteTodo = async (id) => {
    try {
      const response = await fetch(`/api/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("fetch failed");
      }
      const res = await response.json();
      setTodoList(res);
      return { message: "deleted" };
    } catch (error) {
      console.log(error);
      throw new Error("delete failed");
    }
  };

  const ascSort = (a, b, col) => {
    console.log(a[col],b[col])
    return a[col] > b[col] ? 1 : a[col] < b[col] ? -1 : 0;
  };
  
  const descSort = (a, b, col) => {
    console.log(a[col],b[col])
    return a[col] < b[col] ? 1 : a[col] > b[col] ? -1 : 0;
  };

  const sorting = (sortLabel, key, setState) => {
    if (sortLabel === 'asc') {
      const desc = todoList.sort((a, b) => descSort(a, b, key));
      setTodoList(desc);
      setTitleSort('');
      setTypeSort('');
      setStatusSort('');
      setDateSort('')
      setState('desc');
    } else {
      const asc = todoList.sort((a, b) => ascSort(a, b, key));
      setTodoList(asc);
      setTitleSort('');
      setTypeSort('');
      setStatusSort('');
      setDateSort('')
      setState('asc');
    }
  }

  const dateSorting = () => {
    if (dateSort === 'asc') {
      const desc = todoList.sort((a, b) => {
        const dateA = new Date(a.createdAt)
        const dateB = new Date(b.createdAt)
        return dateA > dateB ? 1 : dateA < dateB ? -1 : 0;
      });
      setTodoList(desc);
      setTitleSort('');
      setTypeSort('');
      setStatusSort('');
      setDateSort('')
      setDateSort('desc');
    } else {
      const asc = todoList.sort((a, b) => {
        const dateA = new Date(a.createdAt)
        const dateB = new Date(b.createdAt)
        return dateA < dateB ? 1 : dateA > dateB ? -1 : 0;
      });
      setTodoList(asc);
      setTitleSort('');
      setTypeSort('');
      setStatusSort('');
      setDateSort('')
      setDateSort('asc');
    }
  }

  const showSortIcon = (state) => {
    if (state === 'desc') {
      return <MdArrowUpward className="text-white" />
    } else if (state === 'asc') {
      return <MdArrowDownward className="text-white" />
    } else {
      return <MdArrowDownward />
    }
  }

  return (
    <div className="py-8 h-screen container">
      <div className="border-2 border-neutral rounded-lg p-6 flex flex-col gap-4 h-full w-full">
        <div className="flex flex-row justify-between items-center">
          <h1 className="text-3xl font-bold">Just Pin Your Work...</h1>
          <Link href="/create">
            <button className="btn btn-secondary self-end text-xl font-bold">
              <BsFillPinAngleFill className="me-2" />
              <p>Pin It!</p>
            </button>
          </Link>
        </div>
        <div className="border-2 border-neutral rounded-lg p-6 h-full w-full overflow-auto">
          <table className="w-full">
            <thead>
              <tr>
                <td className="p-6">
                  <div className="text-lg font-bold flex flex-row items-center">
                    <span className="whitespace-nowrap">Title Work</span>
                    <div className={`ms-2 text-2xl hover:cursor-pointer hover:text-white`} onClick={() => {sorting(titleSort, 'title', setTitleSort)}}>
                      {showSortIcon(titleSort)}
                    </div>
                  </div>
                </td>
                <td className="p-6">
                  <div className="text-lg font-bold flex flex-row items-center">
                    <span className="whitespace-nowrap">Type</span>
                    <div className={`ms-2 text-2xl hover:cursor-pointer hover:text-white`} onClick={() => {sorting(typeSort, 'type', setTypeSort)}}>
                      {showSortIcon(typeSort)}
                    </div>
                  </div>
                </td>
                <td className="p-6">
                  <div className="text-lg font-bold flex flex-row items-center">
                    <span className="whitespace-nowrap">Status</span>
                    <div className={`ms-2 text-2xl hover:cursor-pointer hover:text-white`} onClick={() => {sorting(statusSort, 'status', setStatusSort)}}>
                      {showSortIcon(statusSort)}
                    </div>
                  </div>
                </td>
                <td className="p-6">
                  <div className="text-lg font-bold flex flex-row items-center">
                    <span className="whitespace-nowrap">Create At</span>
                    <div className={`ms-2 text-2xl hover:cursor-pointer hover:text-white`} onClick={dateSorting}>
                      {showSortIcon(dateSort)}
                    </div>
                  </div>
                </td>
                <td className="p-6"></td>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr className="h-[30rem]">
                    <td colSpan={4} className="text-center"><div className="loading loading-dots loading-lg"></div></td>
                </tr>
                ) : (
                  todoList.map((todo) => (
                    <Rowitem key={todo._id} {...todo} deleteTodo={deleteTodo} />
                  ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
