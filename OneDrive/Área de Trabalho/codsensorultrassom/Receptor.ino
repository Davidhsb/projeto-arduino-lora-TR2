#include <SPI.h>
#include <RH_RF95.h>

#define RFM95_CS 10
#define RFM95_INT 2
#define RFM95_RST 9

RH_RF95 rf95(RFM95_CS, RFM95_INT);

void setup() {
  Serial.begin(9600);
  while (!Serial);

  if (!rf95.init()) {
    Serial.println("LoRa initialization failed");
    while (1);
  } else {
    Serial.println("LoRa initialized successfully");
  }

  rf95.setFrequency(915.0);  // Configura a frequência do LoRa em MHz
  rf95.setTxPower(23, false);  // Configura a potência de transmissão em dBm (23 dBm neste exemplo)
}

void loop() {
  if (rf95.available()) {
    uint8_t buf[RH_RF95_MAX_MESSAGE_LEN];
    uint8_t len = sizeof(buf);

    if (rf95.recv(buf, &len)) {
      buf[len] = '\0';
      Serial.print("Dados recebidos: ");
      Serial.println((char *)buf);
    }
  }
}
