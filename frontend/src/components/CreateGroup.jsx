import { useState } from "react";
import { useChatStore } from "../store/useChatStore";

const CreateGroup = () => {
  const { users, createGroupChat, setSelectedChat, getMessages } = useChatStore();
  const [groupName, setGroupName] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);

  const toggleUser = (userId) => {
    setSelectedUsers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  const handleCreateGroup = async () => {
    if (!groupName || selectedUsers.length < 2) {
      alert("Group needs name + at least 2 users");
      return;
    }

    const group = await createGroupChat(groupName, selectedUsers);
    if (!group) return;

    setSelectedChat(group);
    getMessages(group._id);

    setGroupName("");
    setSelectedUsers([]);
  };

  return (
    <div className="p-4 border-b">
      <h3 className="font-semibold mb-2">Create Group</h3>

      <input
        type="text"
        placeholder="Group name"
        className="input input-bordered w-full mb-2"
        value={groupName}
        onChange={(e) => setGroupName(e.target.value)}
      />

      <div className="max-h-40 overflow-y-auto mb-2">
        {users.map((user) => (
          <label key={user._id} className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={selectedUsers.includes(user._id)}
              onChange={() => toggleUser(user._id)}
            />
            {user.fullName}
          </label>
        ))}
      </div>

      <button className="btn btn-primary w-full" onClick={handleCreateGroup}>
        Create Group
      </button>
    </div>
  );
};

export default CreateGroup;
