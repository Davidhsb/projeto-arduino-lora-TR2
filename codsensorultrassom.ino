#include <SPI.h>
#include <RH_RF95.h>

#define RFM95_CS 10
#define RFM95_INT 2
#define RFM95_RST 9

RH_RF95 rf95(RFM95_CS, RFM95_INT);

const int trigPin = 3;
const int echoPin = 2;

void setup() {
  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);

  Serial.begin(9600);
  while (!Serial);

  if (!rf95.init()) {
    Serial.println("LoRa initialization failed");
    while (1);
  } else {
    Serial.println("LoRa initialized successfully");
  }

  rf95.setTxPower(23, false);  // Configura a potência de transmissão em dBm (23 dBm neste exemplo)
}

void loop() {
  // Realiza a medição de distância com o sensor ultrassônico
  float distance = measureDistance();

  // Envia a distância via LoRa
  sendDistance(distance);

  delay(2000);  // Intervalo entre cada envio de dados
}

float measureDistance() {
  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);

  float duration = pulseIn(echoPin, HIGH);
  float distance = (duration * 0.0343) / 2;

  Serial.print("Distancia: ");
  Serial.print(distance);
  Serial.println(" cm");

  return distance;
}

void sendDistance(float distance) {
  // Prepara os dados para enviar
  String distanceStr = String(distance);
  uint8_t data[distanceStr.length() + 1];
  distanceStr.toCharArray((char *)data, distanceStr.length() + 1);

  // Envia os dados via LoRa
  rf95.send(data, sizeof(data));
  rf95.waitPacketSent();

  Serial.println("Dados enviados via LoRa");
}
