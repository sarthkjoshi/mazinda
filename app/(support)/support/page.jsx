"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";

const Support = () => {
  const { toast } = useToast();
  const [message, setMessage] = useState("");
  const [messageSending, setMessageSending] = useState(false);

  return (
    <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
      <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">
        Contact Us
      </h2>
      <p className="mb-8 lg:mb-16 font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl">
        Need help? Got a technical issue? Want to send feedback or describe an
        issue? Let us know.
      </p>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          console.log("here");
          setMessageSending(true);
          try {
            const { data } = await axios.post("/api/email/get-help", {
              message,
            });
            console.log(data);
            if (data.success) {
              toast({
                title: "Message sent successfully",
                description: "Our team will respond to you very soon !",
              });
            } else {
              toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: "There was a problem sending your message.",
              });
            }
          } catch (err) {
            console.log(err);
          } finally {
            setMessageSending(false);
          }
        }}
        className="space-y-8"
      >
        <div className="sm:col-span-2">
          <label
            htmlFor="message"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
          >
            Your message
          </label>
          <textarea
            id="message"
            rows="6"
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type message here..."
          ></textarea>
        </div>
        {messageSending ? (
          <Button disabled>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Please wait
          </Button>
        ) : (
          <Button
            className="bg-[#f17e13] hover:bg-[#f17e1390]"
            disabled={!message.length}
          >
            Send Message
          </Button>
        )}
      </form>
    </div>
  );
};

export default Support;
