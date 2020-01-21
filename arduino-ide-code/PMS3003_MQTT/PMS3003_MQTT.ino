#include <ESP8266WiFi.h>
#include <PubSubClient.h>
#include <SoftwareSerial.h>
#define WIFI_STA_NAME "Sethanant’s iPhone"
#define WIFI_STA_PASS "123456777"
#define MQTT_SERVER "172.20.10.2"
#define MQTT_PORT 1883
#define MQTT_USERNAME ""
#define MQTT_PASSWORD ""
#define MQTT_NAME "esp8266"
SoftwareSerial mySerial(D2, D3); // RX, TX
unsigned int pm1 = 0;
unsigned int pm2_5 = 0;
unsigned int pm10 = 0;
WiFiClient client;
PubSubClient mqtt(client);
int num = 0;
void callback(char *topic, byte *payload, unsigned int length)
{
    Serial.print("Message arrived [");
    Serial.print(topic);
    Serial.print("] ");
    for (int i = 0; i < length; i++)
    {
        Serial.print((char)payload[i]);
    }
}
void setup()
{
    Serial.begin(115200);
    WiFi.mode(WIFI_STA);
    while (!Serial)
        ;
    mySerial.begin(9600);
    delay(250);
    Serial.println(WIFI_STA_NAME);
    Serial.println("WIFI Connecting");
    WiFi.begin(WIFI_STA_NAME, WIFI_STA_PASS); //เชื่อมต่อ wifi
    while (num < 20)
    {
        delay(500);
        Serial.print(".");
        num++;
    }
    if (WiFi.status() == WL_CONNECTED)
    {
        Serial.print("\n WiFi Connected. \n");
    }
    else
    {
        Serial.print("\n WIFI Connect fail. ");
    }
    mqtt.setServer(MQTT_SERVER, MQTT_PORT);
    mqtt.setCallback(callback);
}
void loop()
{
    int index = 0;
    char value;
    char previousValue;

    while (mySerial.available())
    {
        value = mySerial.read();
        if ((index == 0 && value != 0x42) || (index == 1 && value != 0x4d))
        {
            Serial.println("Cannot find the data header.");
            break;
        }

        if (index == 4 || index == 6 || index == 8 || index == 10 || index == 12 || index == 14)
        {
            previousValue = value;
        }
        else if (index == 5)
        {
            pm1 = 256 * previousValue + value;
            Serial.print("{ ");
            Serial.print("\"pm1\": ");
            Serial.print(pm1);
            Serial.print(" ug/m3");
            Serial.print(", ");
        }
        else if (index == 7)
        {
            pm2_5 = 256 * previousValue + value;
            Serial.print("\"pm2_5\": ");
            Serial.print(pm2_5);
            Serial.print(" ug/m3");
            Serial.print(", ");
        }
        else if (index == 9)
        {
            pm10 = 256 * previousValue + value;
            Serial.print("\"pm10\": ");
            Serial.print(pm10);
            Serial.print(" ug/m3");
        }
        else if (index > 15)
        {
            break;
        }

        if (mqtt.connect(MQTT_NAME, MQTT_USERNAME, MQTT_PASSWORD)){ 
          Serial.print("\n Publish message: ");
          char payload[100];
          sprintf(payload, "%u %u %u", pm1, pm2_5, pm10); 
          if (mqtt.publish("SENSOR/PMS3003", payload) == true)
            {
              //ส่งข้อความ "Arduino Test MQTT" ใน Topic = "TEST/MQTT"
              Serial.println("Success sending");
            }
          else
          {
            Serial.println("Fail sending");
          }
        }


        index++;
    }
    while (mySerial.available())
        mySerial.read();
    Serial.println(" }");
    delay(10000);
}
