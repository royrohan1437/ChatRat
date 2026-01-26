import { useChatStore } from "../store/useChatStore";

import Sidebar from "../components/Sidebar";
import NoChatSelected from "../components/NoChatSelected";
import ChatContainer from "../components/ChatContainer";

const HomePage = () => {
  const { selectedUser } = useChatStore();

  return (
    <div className="h-screen bg-base-200">
      <div className="flex items-center justify-center pt-20 px-4">
        <div className="bg-base-100 w-screen h-[calc(100vh-5.5rem)] flex overflow-hidden">
          <div className="h-80vw w-screen flex overflow-auto bg-base-200">
            <Sidebar />

            <div className="flex-1 flex overflow-hidden">
          {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
        </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default HomePage;
