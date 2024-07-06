#include <SPI.h>
#include <LoRa.h>

// Define the pins used by the LoRa module
const int csPin = 10;     // LoRa radio chip select
const int resetPin = 9;  // LoRa radio reset
const int irqPin = 2;    // Must be a hardware interrupt pin

const long sleepDuration = 6000; // 1 minuto em milissegundos

long totalTime = 0; // Tempo total de transmissão dos nós

void setup() {

  Serial.begin(9600);
  while (!Serial);

  Serial.println("LoRa Receiver");

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

  // Try to parse packet
  int packetSize = LoRa.parsePacket();

  // Received a packet
  if (packetSize) {

    String receivedData = "";

    // Read packet
    while (LoRa.available()) {
      receivedData += (char)LoRa.read();
    }

    Serial.print("Received packet: ");
    Serial.println(receivedData);

    // Print RSSI of packet
    Serial.print("With RSSI: ");
    Serial.println(LoRa.packetRssi());  

     // Extrai o ID e a medida do nó
    int separatorIndex = receivedData.indexOf(',');
    String nodeIdStr = receivedData.substring(0, separatorIndex);
    String distanceStr = receivedData.substring(separatorIndex + 1);

    int nodeId = nodeIdStr.toInt();
    float distance = distanceStr.toFloat();

    Serial.print("Node ID: ");
    Serial.print(nodeId);
    Serial.print("\n");
    Serial.print("Distance: ");
    Serial.println(distance);

    // Calcula o tempo de sono para o nó
    long nodeSleepTime = sleepDuration - totalTime;
    totalTime += nodeSleepTime;

    // Envia o ACK com o comando de sono para o nó
    LoRa.beginPacket();
    LoRa.print(nodeId);
    LoRa.print(",");
    LoRa.print(nodeSleepTime);
    LoRa.endPacket();

    // Clear contents
    receivedData = "";
  }

  // Verifica se o tempo total é maior que o tempo de sono
  if (totalTime >= sleepDuration) {
    Serial.println("Gateway into sleep mode...");
    Serial.println("\n");
    delay(sleepDuration - totalTime);
    totalTime = 0;
  }
}