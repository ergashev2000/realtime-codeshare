const Client = ({ username }) => {
  return (
    <h4 className="text-[14px] h-5 px-2 rounded-sm bg-gray-700 font-light first-letter:uppercase  text-pretty">
      {username}
    </h4>
  );
};

export default Client;
