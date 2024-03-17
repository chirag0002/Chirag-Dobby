import { ChangeEvent, useState } from 'react';
import { ImageApi } from '../api/image.api';

export const Upload = () => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [imageName, setImageName] = useState<string>('');
    const [isUploadSectionVisible, setIsUploadSectionVisible] = useState<boolean>(false);
    const token = sessionStorage.getItem('token');

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setSelectedFile(e.target.files[0]);
        }
    };

    const handleUpload = async () => {
        if (selectedFile && token && imageName ){
            const form = new FormData();
            form.append('image', selectedFile);
            form.append('name', imageName);
            const response = await ImageApi.upload(form, token)
            if (response.status === 200) {
                alert(response.data.message);
                window.location.reload();
            } else {
                alert('Failed to upload image');
            }
        } else {
            alert('please provide image/name');
        }
    };

    const toggleUploadSection = () => {
        setIsUploadSectionVisible(!isUploadSectionVisible);
        setSelectedFile(null);
        setImageName("");
    };

    return (
        <div>
            <div className='flex flex-row justify-end mr-8'>
                <button onClick={toggleUploadSection} className="mt-4 bg-indigo-800 hover:bg-indigo-900 text-white font-bold py-2 px-4 rounded-lg shadow-lg focus:outline-none focus:shadow-outline">
                    Upload New Image
                </button>
            </div>
            <div className='overflow-hidden flex flex-col items-center justify-center'>
                {selectedFile && <img className="w-48 mt-4 rounded-3xl" src={URL.createObjectURL(selectedFile)} alt="" />}
            </div>
            {isUploadSectionVisible && (
                <div className="mt-4 flex flex-col items-center">
                    <input
                        type="file"
                        onChange={handleFileChange}
                        accept="image/*"
                        className="hidden"
                        id="fileInput"
                    />
                    <label htmlFor="fileInput" className="cursor-pointer bg-indigo-800 hover:bg-indigo-900 text-white font-bold py-2 px-4 rounded-lg shadow-lg mb-4">
                        Choose Image
                    </label>
                    {selectedFile && (
                        <p className="mb-4">{imageName}</p>
                    )}
                    <input
                        type="text"
                        value={imageName}
                        onChange={(e) => setImageName(e.target.value)}
                        className="border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:border-blue-500 mb-4"
                        placeholder="Enter Image Name"
                    />
                    <button
                        onClick={handleUpload}
                        className="bg-indigo-800 hover:bg-indigo-900 text-white font-bold py-2 px-4 rounded-lg shadow-lg focus:outline-none focus:shadow-outline"
                    >
                        Upload
                    </button>
                </div>
            )}
        </div>
    );

}
