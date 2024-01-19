const StatisticCard = ({title, amount,img}) => {
  return (
    <div id="card-item" className="bg-gray-800 p-8 rounded-lg">
      <div className="flex gap-x-4">
        <div className="rounded-full h-16 w-16 bg-white flex justify-center items-center">
          <img src={img} alt="" className="object-cover w-10 h-10" />
        </div>
        <div className="text-white">
          <p className="mb-2 text-lg font-medium text-gray-400">
            {title}
          </p>
          <p className="text-xl font-bold text-gray-200">{amount}</p>
        </div>
      </div>
    </div>
  );
};

export default StatisticCard;
