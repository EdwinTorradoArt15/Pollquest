import { useContext } from "react";
import { UserContext } from "@/features/user/context/UserContext";

const useModalImagesUser = (setOpen: (open: boolean) => void) => {
  const { image, setImage, loading, updateImage } = useContext(UserContext);

  const handleChange = (e: any) => {
    const img = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],
    };
    setImage(img);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = () => {
    updateImage(image);
    handleClose();
  };

  return {
    image,
    setImage,
    loading,
    handleChange,
    handleClose,
    onSubmit,
  };
};

export default useModalImagesUser;
