import { SignIn, SignOutButton, SignedIn, SignedOut, UserButton, useUser, useAuth } from "@clerk/clerk-react";
import ChatScreen from "./chatScreen/ChatScreen";
import { useEffect } from "react";

function App() {
  const { user } = useUser();
   const { getToken} = useAuth(); 

  useEffect(() => {
    if (user) {
      getToken().then((token) => {
        fetch("http://localhost:5000/api/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Pass the token
          },
          body: JSON.stringify({
            clerkId: user.id,
            email: user.primaryEmailAddress?.emailAddress,
            name: user.fullName,
            profilePic: user.imageUrl,
          }),
        });
      });
    }
  }, [user]);


  return (
    <div>
      <SignedIn>
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl">Welcome, {user?.fullName}!</h1>
        <div className="flex  gap-4 text-xl mt-4 items-center justify-center">
        <UserButton />
        <SignOutButton />
        </div>
        <ChatScreen />
      </div>
      </SignedIn>

      <SignedOut>
        <div className="flex flex-col items-center justify-center h-screen">
        <SignIn />
        </div>
      </SignedOut>
    </div>
  );
}

export default App;
