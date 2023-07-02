import { useState, useRef } from "react";
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  Button,
  TextField,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
} from "@mui/material";
import {
  useForm,
  Controller,
  FieldValues,
  SubmitHandler,
} from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { Alerta } from "@/components";

const steps = [
  "Método de verificación",
  "Código de verificación",
  "Nueva contraseña",
];

const StepsForgotPassword = () => {
  const [activeStep, setActiveStep] = useState(0);
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const password = useRef({});
  password.current = watch("newPassword", "");
  const verificationMethod = watch("verificationMethod");
  const navigate = useNavigate();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleHome = () => {
    navigate("/login");
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
    handleNext();
  };

  const renderStepContent = (step: any) => {
    switch (step) {
      case 0:
        return (
          <div>
            <Controller
              control={control}
              name="verificationMethod"
              defaultValue="email"
              render={({ field }) => (
                <RadioGroup {...field} row>
                  <FormControlLabel
                    value="email"
                    control={<Radio />}
                    label="Correo Electrónico"
                  />
                  <FormControlLabel
                    value="phone"
                    control={<Radio />}
                    label="Teléfono Celular"
                  />
                </RadioGroup>
              )}
            />
            {verificationMethod === "email" || !verificationMethod ? (
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
            ) : (
              <Controller
                control={control}
                name="celular"
                rules={{ required: true }}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    fullWidth
                    {...field}
                    type="number"
                    label="Teléfono Celular"
                    error={!!errors.celular}
                    helperText={errors.celular ? "Teléfono requerido" : ""}
                  />
                )}
              />
            )}
          </div>
        );
      case 1:
        return (
          <div>
            <Typography variant="subtitle1" gutterBottom>
              Código de Verificación
            </Typography>
            <div style={{ display: "flex" }}>
              {[0, 1, 2, 3, 4, 5].map((index: number) => (
                <div key={index} style={{ marginRight: "10px" }}>
                  <Controller
                    control={control}
                    name={`verificationCode[${index}]`}
                    rules={{
                      required: true,
                      validate: (value) => value >= 0,
                    }}
                    defaultValue=""
                    render={({ field }) => (
                      <TextField
                        {...field}
                        type="number"
                        inputProps={{ maxLength: 1 }}
                        error={!!errors.verificationCode}
                        helperText={
                          errors.verificationCode ? "Código requerido" : ""
                        }
                      />
                    )}
                  />
                </div>
              ))}
            </div>
          </div>
        );
      case 2:
        return (
          <div>
            <Controller
              control={control}
              name="newPassword"
              rules={{ required: true }}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  fullWidth
                  {...field}
                  type="password"
                  label="Nueva Contraseña"
                  error={!!errors.newPassword}
                  helperText={errors.newPassword ? "Contraseña requerida" : ""}
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
          </div>
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
                <Button variant="contained" color="primary" type="submit">
                  {activeStep === 2 ? "Cambiar Contraseña" : "Siguiente"}
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
