"use client";
import Form from "@/components/Form";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Page() {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [status, setStatus] = useState("");
  const [detail, setDetail] = useState("");
  const [hasError, setHasError] = useState({
    target:'',
    message:'',
  });

  const router = useRouter();

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
      const response = await fetch("/api", {
        method: "POST",
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("create failed");
      }
      router.push("/");
    } catch (error) {
      console.log(error);
      throw new Error("create failed");
    }
  };

  return (
    <div className="container flex flex-col justify-center items-center h-screen">
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
