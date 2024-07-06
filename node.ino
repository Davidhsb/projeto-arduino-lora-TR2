#include <SPI.h>
#include <LoRa.h>

// Define the pins used by the LoRa module
const int csPin = 10;     // LoRa radio chip select
const int resetPin = 9;  // LoRa radio reset
const int irqPin = 2;    // Must be a hardware interrupt pin

// Message counter
byte msgCount = 0;

const int trigPin = 3;
const int echoPin = 4;
const int nodeId = 1; // ID do nó

void setup() {

  Serial.begin(9600);
  while (!Serial);

  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);


  Serial.println("LoRa Sender");

  // Start LoRa module at local frequency
  // 433E6 for Asia
  // 866E6 for Europe
  // 915E6 for North America

  // Setup LoRa module
  LoRa.setPins(csPin, resetPin, irqPin);
  if (!LoRa.begin(915E6)) {
    Serial.println("Starting LoRa failed!");
    while (1);
  }
  Serial.println("Starting Lora sucessfuly");
}

void loop() {
  // Lê a distância do sensor ultrassônico
  float duration, distance;
  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);
  
  duration = pulseIn(echoPin, HIGH);
  distance = duration * 0.034 / 2;

  // Envia o ID do nó e a medida para o gateway
  LoRa.beginPacket();
  LoRa.print(nodeId);
  LoRa.print(",");
  LoRa.print(distance);
  LoRa.endPacket();

  Serial.print("Sending: \n");

  Serial.print("Id:");
  Serial.println(nodeId);

  Serial.print("Distance:");
  Serial.println(distance);

  msgCount++;
  Serial.print("Sending packet: ");
  Serial.println(msgCount);

  // Espera pela resposta do gateway para saber o tempo de sono
  long sleepTime = 0;
  while (true) {
    int packetSize = LoRa.parsePacket();
    if (packetSize) {
      String receivedData = "";
      while (LoRa.available()) {
        receivedData += (char)LoRa.read();
      }

      int separatorIndex = receivedData.indexOf(',');
      int receivedNodeId = receivedData.substring(0, separatorIndex).toInt();
      if (receivedNodeId == nodeId) {
        sleepTime = receivedData.substring(separatorIndex + 1).toInt();
        break;
      }
    }
  }

  Serial.print("Node sleeping for: ");
  Serial.println(sleepTime);
  Serial.print("\n");
  delay(sleepTime); // Coloca o nó para dormir
}
void loop() {
  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);

  duration = pulseIn(echoPin, HIGH);
  distance = (duration * 0.0343) / 2;

  Serial.print("Distancia: ");
  Serial.print(distance);
  Serial.println(" cm");

  // Prepara os dados para enviar
  String distanceStr = String(distance);
  uint8_t data[distanceStr.length() + 1];
  distanceStr.toCharArray((char *)data, distanceStr.length() + 1);

  // Envia os dados via LoRa
  rf95.send(data, sizeof(data));
  rf95.waitPacketSent();

  delay(2000);  // Intervalo entre cada envio de dados
}
