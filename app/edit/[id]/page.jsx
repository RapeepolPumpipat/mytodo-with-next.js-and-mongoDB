"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import Form from "@/components/Form";

export default function Page({ params }) {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [status, setStatus] = useState("");
  const [detail, setDetail] = useState("");
  const [hasError, setHasError] = useState({
    target:'',
    message:'',
  });

  const router = useRouter();

  const getTodo = async () => {
    try {
      const response = await fetch(`/api/${params.id}`);
      if (!response.ok) {
        throw new Error("fetch error");
      }
      return await response.json();
    } catch (error) {
      console.log(error);
      throw new Error("fetch error");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await getTodo();
      setTitle(data.title);
      setType(data.type);
      setStatus(data.status);
      setDetail(data.detail);
    };
    fetchData();
  }, []);

  const handleForm = async (e) => {
    e.preventDefault();
    if (!title) {
      return setHasError({
        target:"title",
        message:"Please insert your title",
      })
    } else if (!type) {
      return setHasError({
        target:"type",
        message:"Please select your type",
      })
    } else if (!status) {
      return setHasError({
        target:"status",
        message:"Please select your status",
      })
    } 
    const data = {
      title,
      type,
      status,
      detail,
    };
    try {
      await fetch(`/api/${params.id}`, {
        method: "PUT",
        body: JSON.stringify(data),
      });
      router.push("/");
    } catch (error) {
      console.log(error);
      throw new Error("fetch error");
    }
  };

  return (
    <div className="container mx-auto flex flex-col w-screen justify-center items-center h-screen">
      <Form
        handleForm={handleForm}
        title={title}
        type={type}
        status={status}
        detail={detail}
        setTitle={setTitle}
        setType={setType}
        setStatus={setStatus}
        setDetail={setDetail}
        hasError={hasError}
      />
    </div>
  );
}
