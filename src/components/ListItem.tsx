type Props = {
  superHost: boolean;
  title: string;
  rating: number;
  type: string;
  beds?: number | null;
  photo: string;
};

const ListItem = (props: Props) => {
  const { superHost, rating, title, beds, photo, type } = props;

  return (
    <div className="space-y-3 pt-3 pb-3">
      <div className="w-[22rem] mini:w-[23rem] esm:w-[24.3rem] md:w-[22rem] super:w-[25rem] xl:w-[23.5rem] rounded-2xl overflow-hidden cursor-pointer">
        <img
          src={photo}
          alt=""
          className="hover:scale-150 transition-transform duration-500 ease-in-out"
        />
      </div>
      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {superHost && (
              <div className="rounded-2xl text-xs text-[#4f4f4f] border-2 p-2 border-[#4f4f4f] font-bold">
                SUPER HOST
              </div>
            )}
            <div className="font-medium text-sm text-[#828282] space-x-1">
              <span>{type} </span> {beds && <span> {beds} beds</span>}
            </div>
          </div>
          <div className="flex items-center space-x-0.5">
            <span className="material-symbols-rounded text-[#eb5757]">
              grade
            </span>
            <span className="text-[#4f4f4f] font-medium">{rating}</span>
          </div>
        </div>

        <h3 className="font-semibold text-base">{title}</h3>
      </div>
    </div>
  );
};

export default ListItem;
