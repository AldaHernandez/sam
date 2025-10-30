import FlipClockCountdown from "@leenguyen/react-flip-clock-countdown";
import { Card, CardContent, Stack, Typography } from "@mui/material";
import "@leenguyen/react-flip-clock-countdown/dist/index.css";

export default function CuentaRegresiva() {
  // 🎉 Cambia esta fecha a la de tu próximo aniversario
  const anniversaryDate = new Date("2026-01-17T00:00:00").getTime();

  return (
    <Card className="max-w-lg mx-auto sm:my-20 my-10 text-center bg-background/50 rounded-2xl shadow-lg backdrop-blur-sm">
      <CardContent>
        <Stack gap={4}>
          <Typography
            variant="h4"
            className="!font-lora !font-[500] italic text-foreground"
          >
            Nuestro próximo aniversario
          </Typography>

          <FlipClockCountdown
            to={anniversaryDate}
            className="justify-center"
            duration={0.9} // controla la velocidad del flip
            labels={["Días", "Horas", "Minutos", "Segundos"]}
            labelStyle={{
              fontSize: 14,
              fontWeight: 400,
              textTransform: "capitalize",
              color: "#000",
            }}
            digitBlockStyle={{
              width: 45,
              height: 60,
              fontSize: 28,
              background: "#000000bb",
              color: "white",
              borderRadius: 12,
              boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
            }}
            dividerStyle={{ color: "transparent", width: 20 }}
            separatorStyle={{ color: "transparent" }}
          />

          <Typography variant="h6">
            Increíble lo rápido que pasa el tiempo {"<3"}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}
