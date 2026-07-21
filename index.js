body: [
  {
    name: "ping",
    description: "ทดสอบบอท"
  },
  {
    name: "register",
    description: "สร้างตัวละครในเมืองวาโลเรีย",
    options: [
      {
        name: "name",
        description: "ชื่อตัวละคร",
        type: 3,
        required: true
      },
      {
        name: "race",
        description: "เลือกเผ่าพันธุ์",
        type: 3,
        required: true,
        choices: [
          {
            name: "มนุษย์",
            value: "human"
          },
          {
            name: "เอลฟ์",
            value: "elf"
          },
          {
            name: "สัตว์อสูร",
            value: "beast"
          },
          {
            name: "ปีศาจ",
            value: "demon"
          }
        ]
      },
      {
        name: "job",
        description: "เลือกอาชีพ",
        type: 3,
        required: true,
        choices: [
          {
            name: "อัศวิน",
            value: "knight"
          },
          {
            name: "นักเวท",
            value: "mage"
          },
          {
            name: "พ่อค้า",
            value: "trader"
          },
          {
            name: "เชฟ",
            value: "chef"
          },
          {
            name: "บาร์เทนเดอร์",
            value: "bartender"
          }
        ]
      }
    ]
  }
]
