"use client";
import React from "react";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";

export default function Contact() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const userData = JSON.stringify(watch(), null, 2);

  // Define a function to handle form submission
  const onSubmit = () => {
    // You can access the form data here
    console.log(userData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg w-96 p-6 scale-90">
        <h1 className="text-center text-xl font-bold text-red-500">
          Still in development!..
        </h1>
        <h2 className="text-2xl font-semibold mb-4">Write me</h2>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <TextField
              id="name"
              label="Name"
              variant="filled"
              fullWidth
              required
              {...register("name")} // Register the "name" field
            />
          </div>
          <div>
            <TextField
              id="email"
              label="E-Mail"
              variant="filled"
              fullWidth
              required
              {...register("email")} // Register the "email" field
            />
          </div>
          <div>
            <TextField
              id="subject"
              label="Subject"
              variant="filled"
              fullWidth
              required
              {...register("subject")} // Register the "subject" field
            />
          </div>
          <div>
            <TextField
              id="message"
              label="Message"
              variant="filled"
              multiline
              rows={6}
              fullWidth
              required
              {...register("message")} // Register the "message" field
            />
          </div>
          <div className="text-center">
            <Button variant="outlined" type="submit">
              Send
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
