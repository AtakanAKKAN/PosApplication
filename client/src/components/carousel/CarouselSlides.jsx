

const CarouselSlides = ({img, title, content}) => {
  return (
    <div className="mb-10 !flex justify-center items-center flex-col" key={title}>
      <img
        src={img}
        alt=""
        className="w-[500px] h-[400px] "
      />
      <h3 className="text-4xl text-white text-center font-bold">{title}</h3>
      <p className="mt-5 text-2xl text-white text-center">
        {content}
      </p>
    </div>
  );
};

export default CarouselSlides;
