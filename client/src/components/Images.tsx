import { useEffect, useState } from "react";
import { ImageApi } from "../api/image.api";

export const Images = () => {
    const token = sessionStorage.getItem('token');
    const [images, setImages] = useState([{
        key: '',
        url: '',
        name: ''
    }]);
    const [selectedImageUrl, setSelectedImageUrl] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState<string>('');


    useEffect(() => {
        if (!token) return;

        ImageApi.get(token).then((response) => {
            setImages(response.data.urls);
        });
    }, []);

    const openImage = (url: string) => {
        setSelectedImageUrl(url);
    };

    const closeImage = () => {
        setSelectedImageUrl(null);
    };

    const filteredImages = images.filter(image => image.name.toLowerCase().includes(searchQuery.toLowerCase()));

    return (

        <div className="flex flex-col items-center mt-10 overflow-y-auto bg-zinc-900">
            <input
                type="text"
                placeholder="Search by image name"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="border border-gray-300 rounded-lg py-2 px-4 mb-4 focus:outline-none focus:border-blue-500"
            />
            <div className="flex flex-wrap justify-center mt-10 w-full">
                {filteredImages.map((image, index) => (
                    <div key={index} className=" p-2 flex justify-between flex-col items-center w-1/5 text-white overflow-hidden m-4  max-h-58">
                        <div>
                            <img
                                src={image.url}
                                className="h-auto rounded-lg w-full max-h-48 cursor-pointer"
                                alt={`Image ${index}`}
                                onClick={() => openImage(image.url)}
                            />
                        </div>
                        <div>{image.name}</div>
                    </div>
                ))}
            </div>
            {selectedImageUrl && (
                <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
                    <div className="max-w-full max-h-full">
                        <img
                            src={selectedImageUrl}
                            className="max-w-full max-h-full"
                            alt="Full size"
                            onClick={closeImage}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};
