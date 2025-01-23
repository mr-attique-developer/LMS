import React, { useEffect } from "react";
import { Button } from "./ui/button";
import { useCreateCheckoutSessionMutation } from "@/features/api/coursePurchaseApi";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

const BuyCourseButton = ({ courseId }) => {
  const [
    createCheckoutSession,
    { data, isLoading, isError, isSuccess, error },
  ] = useCreateCheckoutSessionMutation();

  const handleCheckout = async () => {
    await createCheckoutSession(courseId);
  };

  useEffect(()=>{
if(isSuccess){
  if(data?.url){
    window.location.href(data.url)
  }else{
    toast.error("Something went wrong")
  }
}
  if(isError){
    toast.error(error.data.message)
  }
  },[ isLoading, isError, isSuccess, error])
  return (
    <Button disabled={isLoading} onClick={handleCheckout} className="w-full p-2 rounded-lg">
      {isLoading ? (
        <>
          <Loader2 className="animate-spin" size={20} />
          Please Wait
        </>
      ) : (
        "Purchase Course"
      )}
    </Button>
  );
};

export default BuyCourseButton;
