import { formatedText } from "@/utils/formatedText";
import noImage from "@/features/administrar/image/noImage.png";

interface CardCategoryProps {
  id?: string;
  nombre: string;
  imagen?: string;
  getCategories?: () => void;
}

const CardCategoryInicio = ({ nombre, imagen }: CardCategoryProps) => {
  const imageUrl = imagen ? imagen : noImage;

  return (
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
  );
};

export default CardCategoryInicio;
