# Gallery

This is a web application for uploading images to an Amazon S3 bucket and retrieving them using React.js, TypeScript, MongoDB, Express.js, and Node.js.

## Features

- Upload images to an Amazon S3 bucket.
- Store image metadata in a MongoDB database.
- Retrieve and display images from the S3 bucket.
- Search images by name.

## Technologies Used

- **Frontend**:
  - React.js
  - TypeScript
  - Tailwind CSS (for styling)
  - Axios (for HTTP requests)
- **Backend**:
  - Express.js
  - Node.js
  - MongoDB (for image metadata storage)
  - Amazon S3 (for image storage)
- **Others**:
  - Multer (for handling file uploads)
  - AWS SDK (for interacting with S3)
  - dotenv (for environment variable management)

## Getting Started

1. Clone this repository:

   ```bash
   git clone https://github.com/chirag0002/Chirag-Dobby
   ```

2. Set up environment variables:

   Create a `.env` file in the server/api directory and add the following environment variables:

   ```plaintext
   ACCESS_KEY=your_aws_access_key
   SECRET_ACCESS_KEY=your_aws_secret_access_key
   REGION=your_aws_region
   BUCKET=your_s3_bucket_name
   DB=your_mongodb_connection_uri
   PORT=your_server_port
   JWT_KEY=jwt_secret_key
   ```

3. Start the backend server:

   ```bash
   npm install
   npm run start
   ```

4. Start the frontend application:

   ```bash
   npm install
   npm run start
   ```

5. Open your browser and navigate to `http://localhost:5137` to view the application.

## Usage

- To upload an image, click on the "Upload" button and select the image file. Provide a name for the image and click "Upload".
- Uploaded images will be stored in the Amazon S3 bucket and their metadata will be saved in the MongoDB database.
- Images can be searched by name using the search bar.
- Click on an image to view it in full size.
