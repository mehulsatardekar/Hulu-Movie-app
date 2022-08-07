import { useState } from "react";
import { supabase } from "../supabaseClient";
import { useToast, useAuth } from "../contexts";

const useUserDetails = () => {
  const { notifyError } = useToast();
  const { currentUser } = useAuth();
  const [userDetails, setUserDetails] = useState([]);

  const getUserDetails = async () => {
    try {
      const { data, error } = await supabase
        .from("users_credentials")
        .select("*")
        .eq("id", currentUser?.user.id);

      setUserDetails(data);

      if (error) throw error;
    } catch (error) {
      console.error(error);
      notifyError(error.message);
    }
  };

  return { userDetails, getUserDetails };
};

export { useUserDetails };
