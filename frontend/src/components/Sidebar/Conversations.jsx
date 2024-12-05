import useGetConversation from "../../hooks/useGetConversation";
import getRandomEmoji from "../../utils/generateEmoji";
import COnversation from "./COnversation";
const Conversations = () => {
  const { loading, conversations } = useGetConversation();

  // console.log("Conversations updated:", conversations); // Log when
  // console.log(getRandomEmoji());
  return (
    <div className="py-2 flex flex-col overflow-auto ">
      {conversations.map((conversation, idx) => (
        <COnversation
          key={conversation._id}
          conversation={conversation}
          emoji={getRandomEmoji()}
          lastIdx={idx === conversations.length - 1}
        />
      ))}
      {loading ? (
        <span className="loading loading-spinner mx-auto"></span>
      ) : null}
    </div>
  );
};

export default Conversations;
