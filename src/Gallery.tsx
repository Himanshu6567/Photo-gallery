import React from "react";

interface Photo {
  id: string;
  owner: string;
  secret: string;
  server: string;
  farm: number;
  title: string;
}

interface Props {
  data: Photo[];
}

export default function Gallery({ data }: Props): JSX.Element {
  return (
    <div className="m-auto flex justify-evenly flex-wrap">
      {data.map((image) => {
        return (
          <div key={image.id}>
            <img
              className="w-56 h-56 mt-6 border-2 border-gray-700"
              alt={image.title}
              src={`https://farm${image.farm}.staticflickr.com/${image.server}/${image.id}_${image.secret}_m.jpg`}
            />
          </div>
        );
      })}
    </div>
  );
}
