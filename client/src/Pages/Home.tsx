import { Images } from "../components/Images"
import { Navbar } from "../components/Navbar"
import { Upload } from "../components/Upload"

const Home = () => {
  return (
    <div className="bg-zinc-900 h-screen w-full">
        <Navbar />
        <Upload />
        <Images />
    </div>
  )
}

export default Home