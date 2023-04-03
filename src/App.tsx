import axios, { AxiosResponse } from "axios";
import { useState, ChangeEvent, FormEvent } from "react";
import Gallery from "./Gallery";

interface Photo {
  id: string;
  owner: string;
  secret: string;
  server: string;
  farm: number;
  title: string;
}

interface Photos {
  photo: Photo[];
}

interface FlickrResponse {
  photos: Photos;
}

const apiKey = "636e1481b4f3c446d26b8eb6ebfe7127";

export default function App(): JSX.Element {
  const [search, setSearch] = useState<string>("");
  const [imgData, setImgData] = useState<Photo[]>([]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setSearch(e.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    console.log(search);
    try {
      const response: AxiosResponse<FlickrResponse> = await axios.get(
        `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${search}&per_page=24&format=json&nojsoncallback=1`
      );
      setImgData(response.data.photos.photo);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex  items-center flex-col">
      <div className="text-4xl my-7 font-serif">Gallery Search</div>
      <form className="flex" onSubmit={handleSubmit}>
        <input
          className="border-2 px-3 border-indigo-600"
          placeholder="search.."
          value={search}
          onChange={handleChange}
          type="text"
        />
        <button
          className="bg-indigo-600 text-white px-3 py-1 rounded-sm"
          type="submit"
        >
          Submit
        </button>
      </form>
      <div>
        {imgData.length === 0 ? (
          <div className="text-2xl my-9  font-serif">
            No Data, Please search something...
          </div>
        ) : (
          <div className=" font-serif text-2xl my-4">{`${imgData.length} found images`}</div>
        )}
      </div>
      {imgData.length === 0 ? null : <Gallery data={imgData} />}
    </div>
  );
}
