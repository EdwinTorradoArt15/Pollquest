import { Box } from "@mui/material";
import { formatedText } from "@/utils/formatedText";
import { DropDownCat } from "@/features/administrar/components";
import noImage from "@/features/administrar/image/noImage.png";

interface CardCategoryProps {
  id: string;
  nombre: string;
  imagen?: string;
  getCategories: () => void;
  handleOpenModalAdministrar: () => void;
}

const CardCategory = ({
  id,
  nombre,
  imagen,
  getCategories,
  handleOpenModalAdministrar,
}: CardCategoryProps) => {
  const imageUrl = imagen ? imagen : noImage;

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}
    >
      <DropDownCat
        id={id}
        getCategories={getCategories}
        handleOpenModalAdministrar={handleOpenModalAdministrar}
      />
      <div
        style={{
          backgroundImage: `url(${imageUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
        className="card"
      >
        <div
          style={{
            fontWeight: "600",
            fontSize: "1.125rem",
            lineHeight: "1.75rem",
            paddingLeft: "0.75rem",
            paddingRight: "0.75rem",
            paddingTop: "0.5rem",
            paddingBottom: "0.5rem",
          }}
          className="btn btn-categoria"
        >
          <p>{formatedText(nombre)}</p>
        </div>
      </div>
    </Box>
  );
};

export default CardCategory;
