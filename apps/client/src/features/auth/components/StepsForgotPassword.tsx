import {
  Box,
  Stepper,
  Step,
  StepLabel,
  Button,
  TextField,
} from "@mui/material";
import { Controller } from "react-hook-form";
import { Link } from "react-router-dom";
import { Alerta, Loader } from "@/components";
import { useStepsForgotPassword } from "@/features/auth/hook";

const steps = [
  "Método de verificación",
  "Código de verificación",
  "Nueva contraseña",
];

const StepsForgotPassword = () => {
  const {
    control,
    handleSubmit,
    errors,
    password,
    onSubmit,
    handleBack,
    handleHome,
    activeStep,
    loading,
  } = useStepsForgotPassword();

  const renderStepContent = (step: any) => {
    switch (step) {
      case 0:
        return (
          <Box sx={{ mt: 3 }}>
            <Controller
              control={control}
              name="email"
              rules={{ required: true }}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  fullWidth
                  {...field}
                  label="Correo Electrónico"
                  error={!!errors.email}
                  helperText={errors.email ? "Correo requerido" : ""}
                />
              )}
            />
          </Box>
        );
      case 1:
        return (
          <Box sx={{ mt: 3 }}>
            <div style={{ display: "flex" }}>
              {[0, 1, 2, 3, 4, 5].map((index: number) => (
                <div key={index} style={{ marginRight: "10px" }}>
                  <Controller
                    control={control}
                    name={`codigo[${index}]`}
                    rules={{
                      required: true,
                      validate: (value) => value >= 0,
                    }}
                    defaultValue=""
                    render={({ field }) => (
                      <TextField
                        {...field}
                        type="text"
                        inputProps={{ maxLength: 1, inputMode: "numeric" }}
                        error={!!errors.codigo}
                        helperText={errors.codigo ? "Código requerido" : ""}
                      />
                    )}
                  />
                </div>
              ))}
            </div>
          </Box>
        );
      case 2:
        return (
          <Box sx={{ mt: 3 }}>
            <Controller
              control={control}
              name="clave"
              rules={{ required: true }}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  fullWidth
                  {...field}
                  type="password"
                  label="Nueva Contraseña"
                  error={!!errors.clave}
                  helperText={errors.clave ? "Contraseña requerida" : ""}
                />
              )}
            />
            <Controller
              name="confirmPassword"
              control={control}
              rules={{
                required: true,
                validate: (value) => value === password.current,
              }}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  sx={{ mt: 2 }}
                  fullWidth
                  {...field}
                  type="password"
                  label="Confirmar contraseña"
                  error={!!errors.confirmPassword}
                  helperText={
                    errors.confirmPassword ? "Las contraseñas no coinciden" : ""
                  }
                />
              )}
            />
          </Box>
        );
      default:
        return null;
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Link to="/login">
        <Button variant="contained" sx={{ mb: 3 }}>
          Volver
        </Button>
      </Link>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label, index) => (
          <Step key={index}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          {activeStep === 3 ? (
            <div
              style={{
                marginTop: "10px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Alerta
                type="info"
                titulo="Contraseña actualizada correctamente"
              />
              <Button
                variant="contained"
                sx={{ mt: "10px" }}
                onClick={handleHome}
              >
                Inicio
              </Button>
            </div>
          ) : (
            <div style={{ marginTop: "10px" }}>
              {renderStepContent(activeStep)}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "10px",
                }}
              >
                <Button disabled={activeStep === 0} onClick={handleBack}>
                  Atrás
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? (
                    <Loader />
                  ) : activeStep === steps.length - 1 ? (
                    "Actualizar"
                  ) : (
                    "Siguiente"
                  )}
                </Button>
              </div>
            </div>
          )}
        </div>
      </form>
    </Box>
  );
};

export default StepsForgotPassword;
