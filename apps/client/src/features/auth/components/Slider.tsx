import { Box } from "@mui/material";
import Carousel from "react-material-ui-carousel";
import slider1 from "../assets/slider1.jpg";
import slider2 from "../assets/slider2.jpg";
import slider3 from "../assets/slider3.jpg";

const Slider = () => {
  const slidersImg = [slider1, slider2, slider3];

  return (
    <>
      <Carousel
        indicators={false}
        navButtonsAlwaysVisible={true}
        navButtonsProps={{
          style: {
            backgroundColor: "#3A53EE",
          },
        }}
        duration={600}
      >
        {slidersImg.map((img, index) => (
          <Box key={index}>
            <img
              src={img}
              alt="slider"
              style={{ height: "97vh", width: "100%" }}
            />
          </Box>
        ))}
      </Carousel>
    </>
  );
}

export default Slider