import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";


import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Typography,
} from "@material-tailwind/react";


import { userImage } from "../../Api/userApi";
import { setUserDetails } from "../../Redux/UserSlice/userSlice";
  
  

  
  const ProfileCard = () => {
    const [images, setImages] = useState(null);

    const dispatch = useDispatch();
    const { id, name, email, mobile, image } = useSelector((state) => state.user);
  
  
    const handleUpdateImage = async () => {
      try {
        const response = await userImage(id, images);
        if (response.data.updated) {
          const { _id, name, email, image, mobile, is_admin } =
            response.data.data;
            console.log("hellloooo");
          dispatch(
            setUserDetails({
              id: _id,
              name: name,
              mobile: mobile,
              email: email,
              image: image,
              is_admin: is_admin,
            })
            );
        }
      } catch (error) {
        console.log(error.message);
      }
    };
  
    
    const cardImageStyle = {
      maxWidth: "100%", // Set the maximum width of the image
      maxHeight: "100%", // Set the maximum height of the image
      objectFit: "cover", // Maintain aspect ratio and cover the entire space
    };
  
    return (
        <div className="flex justify-center items-center text-start pt-5">
        <Card className="mt-6 w-auto">
          <CardHeader color="blue-gray" className="relative h-56">
            <img
              src={
                image
                  ? `/images/${image}`
                  : "https://th.bing.com/th/id/OIP.puMo9ITfruXP8iQx9cYcqwHaGJ?pid=ImgDet&rs=1"
              }
              alt="card-image"
              style={cardImageStyle}
            />
          </CardHeader>
          <CardBody>
            <Typography variant="h5" color="blue-gray" className="mb-2">
              Name : {name}
            </Typography>
            <Typography variant="h5" color="blue-gray" className="mb-2">
              Number : {mobile}
            </Typography>
            <Typography variant="h5" color="blue-gray" className="mb-2">
              Email : {email}
            </Typography>
          </CardBody>
          <CardFooter className="pt-0 flex flex-col gap-5">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImages(e.target.files[0])}
            />
            <div>
              <Button onClick={handleUpdateImage}>Submit</Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    );
  };
  
  export default ProfileCard;
  // {image ? `/images/${image}` : "https://th.bing.com/th/id/OIP.puMo9ITfruXP8iQx9cYcqwHaGJ?pid=ImgDet&rs=1"}
  