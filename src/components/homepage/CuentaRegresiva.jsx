import FlipClockCountdown from "@leenguyen/react-flip-clock-countdown";
import { Card, CardContent, Stack, Typography } from "@mui/material";
import "@leenguyen/react-flip-clock-countdown/dist/index.css";

export default function CuentaRegresiva() {
  // fecha del evento deseado
  const anniversaryDate = new Date("2026-10-22T00:00:00").getTime();

  return (
    <div style={{
      display:"flex",
      alignItems: "center",
      justifyContent: "center",
      background: 'linear-gradient(180deg, #eaebd0 0%, #d4a5a5 50%, #af3e3e 100%)',
      padding: '80px 0'
    }}>
      <Card 
        className="max-w-lg sm:my-20 my-10 text-center md:mx-0 mx-[1rem] bg-background/50 rounded-2xl shadow-lg backdrop-blur-sm"
        style={{
          background: 'rgba(255, 255, 255, 0.30)',
          border: '1px solid rgba(255, 255, 255, 0.1)'
        }}
      >
        <CardContent>
          <Stack alignItems="center" gap={4}>
            <Typography
              variant="h4"
              className="!font-lora !font-[500] italic text-foreground"
            >
              Faltan:
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
                background: "#af3e3e",
                color: "#eaebd0",
                borderRadius: 12,
                boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
              }}
              dividerStyle={{ color: "transparent", width: 20 }}
              // separatorStyle={{ color: "transparent" }}
            />
            <Typography variant="h4" className="!font-lora !font-[500] italic text-foreground">
              ¡¡para el próximo día del vombátido!!
            </Typography>
            <img className="w-[10rem] rounded-xl" src="../src/assets/wembet.png" alt="wembet" />
            <Typography variant="caption">
              (Save the date)
            </Typography>
          </Stack>
        </CardContent>
      </Card>
    </div>
  );
}
