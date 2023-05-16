import { FC, useRef, useState } from "react";

import ClickAwayListener from "../ClickAwayListener";
import Spin from "react-cssfx-loading/src/Spin";
import configs from "../../shared/configs";
import { useFetch } from "../../hooks/useFetch";

interface GifPickerProps {
  setIsOpened: (value: boolean) => void;
  onSelect: (gif: any) => void;
}

const GifPicker: FC<GifPickerProps> = ({ setIsOpened, onSelect }) => {
  const [searchInputValue, setSearchInputValue] = useState("");

  const timeOutRef = useRef<any>(null);

  // data file GIF using API
  const { data, loading, error } = useFetch(`giphy-${searchInputValue}`, () =>
    fetch(
      searchInputValue.trim()
        ? `https://api.giphy.com/v1/gifs/search?api_key=${
            configs.giphyAPIKey
          }&q=${encodeURIComponent(searchInputValue.trim())}`
        : `https://api.giphy.com/v1/gifs/trending?api_key=${configs.giphyAPIKey}`
    ).then((res) => res.json())
  );

  return (
    <ClickAwayListener onClickAway={() => setIsOpened(false)}>
      {(ref) => (
        <div
          ref={ref}
          className="border-lighten bg-light absolute left-[-92px] bottom-full flex h-96 w-96 flex-col items-stretch rounded-lg border-2 p-4 shadow-2xl"
        >
          <div className="relative">
            <input
              onChange={(e) => {
                if (timeOutRef.current) clearTimeout(timeOutRef.current);
                timeOutRef.current = setTimeout(() => {
                  setSearchInputValue(e.target.value);
                }, 500);
              }}
              type="text"
              className="bg-lighten text-dark-lighten w-full rounded-full py-2 pl-10 pr-4 outline-none"
              placeholder="Search Gif..."
            />
            <i className="bx bx-search text-primary absolute top-1/2 left-3 -translate-y-1/2 text-xl"></i>
          </div>
          {/* ktra dung luong file GIF */}
          {loading ? (
            <div className="flex flex-grow items-center justify-center">
              <Spin />
            </div>
          ) : error ? (
            <div className="flex flex-grow flex-col items-center justify-center">
              <p className="text-center">
                Sorry...Giphy has limited the request
              </p>
            </div>
          ) : (
            // Chon thanh cong file GIF
            <div className="mt-3 flex flex-grow flex-wrap gap-2 overflow-y-auto">
              {(data as any).data.map((item: any) => (
                <img
                  key={item.id}
                  onClick={() => {
                    onSelect(item?.images?.original?.url);
                    setIsOpened(false);
                  }}
                  className="h-[100px] flex-1 cursor-pointer rounded object-cover"
                  src={item?.images?.original?.url}
                  alt=""
                />
              ))}
            </div>
          )}
        </div>
      )}
    </ClickAwayListener>
  );
};

export default GifPicker;
