import FlipClockCountdown from '@leenguyen/react-flip-clock-countdown';
import { Card, CardContent, Typography } from '@mui/material';

export default function CuentaRegresiva() {
    // 🎉 Cambia esta fecha a la de tu próximo aniversario
    const anniversaryDate = new Date('2026-03-14T00:00:00').getTime();

    return (
        <Card className="max-w-lg mx-auto mt-10 text-center bg-background/50 rounded-2xl shadow-lg backdrop-blur-sm">
            <CardContent>
                <Typography
                    variant="h5"
                    className="!font-lora italic mb-4 text-foreground"
                >
                    💕 Próximo aniversario
                </Typography>

                <FlipClockCountdown
                    to={anniversaryDate}
                    className="justify-center"
                    duration={0.9} // controla la velocidad del flip
                    labels={['Días', 'Horas', 'Minutos', 'Segundos']}
                    labelStyle={{
                        fontSize: 14,
                        fontWeight: 400,
                        textTransform: 'capitalize',
                        color: 'rgba(255, 255, 255, 0.8)',
                    }}
                    digitBlockStyle={{
                        width: 45,
                        height: 60,
                        fontSize: 28,
                        background: '#000000bb',
                        color: 'white',
                        borderRadius: 12,
                        boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
                    }}
                    dividerStyle={{ color: 'transparent', width: 20 }}
                    separatorStyle={{ color: 'transparent' }}
                />

                <Typography variant="body2" className="mt-4 opacity-70">
                    Falta muy poco para celebrar juntos ❤️
                </Typography>
            </CardContent>
        </Card>
    );
}