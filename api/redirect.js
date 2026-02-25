export default function handler(req, res) {
  const { to } = req.query;

  if (!to) {
    return res.status(400).send("Missing 'to' parameter");
  }

  const delay = 15; // countdown seconds

  res.setHeader("Content-Type", "text/html");

  res.send(`
  <!DOCTYPE html>
  <html>
  <head>
    <title>Angel Redirect</title>
    <style>
      body {
        margin: 0;
        padding: 0;
        height: 100vh;
        overflow: hidden;
        font-family: Arial, sans-serif;
        background: linear-gradient(to bottom, #6ec6ff, #ffffff);
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
      }

      .box {
        text-align: center;
        background: rgba(255,255,255,0.9);
        padding: 50px;
        border-radius: 25px;
        box-shadow: 0 0 40px rgba(0,0,0,0.2);
        z-index: 10;
        animation: fadeIn 1s ease-in-out;
      }

      /* Center Image */
      .angel-img {
        width: 150px;
        border-radius: 20px;
        animation: float 3s ease-in-out infinite;
        display: block;
        margin: 0 auto;
      }

      h1 {
        margin: 10px 0;
        color: #444;
      }

      #timer {
        font-size: 60px;
        color: #0077ff;
        font-weight: bold;
      }

      /* Clouds */
      .cloud {
        position: absolute;
        background: white;
        width: 200px;
        height: 60px;
        border-radius: 50px;
        opacity: 0.6;
        animation: moveCloud 30s linear infinite;
      }

      .cloud::before,
      .cloud::after {
        content: "";
        position: absolute;
        background: white;
        border-radius: 50%;
      }

      .cloud::before {
        width: 80px;
        height: 80px;
        top: -40px;
        left: 20px;
      }

      .cloud::after {
        width: 100px;
        height: 100px;
        top: -50px;
        right: 20px;
      }

      /* Sparkles */
      .sparkle {
        position: absolute;
        width: 5px;
        height: 5px;
        background: white;
        border-radius: 50%;
        animation: sparkle 3s infinite;
      }

      /* Animations */
      @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-15px); }
      }

      @keyframes moveCloud {
        from { transform: translateX(-300px); }
        to { transform: translateX(120vw); }
      }

      @keyframes sparkle {
        0% { opacity: 0; transform: scale(0.5); }
        50% { opacity: 1; transform: scale(1); }
        100% { opacity: 0; transform: scale(0.5); }
      }

      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
    </style>
  </head>

  <body>

    <!-- Clouds -->
    <div class="cloud" style="top:10%; left:-200px;"></div>
    <div class="cloud" style="top:30%; left:-400px; animation-delay:10s;"></div>
    <div class="cloud" style="top:60%; left:-600px; animation-delay:20s;"></div>

    <!-- Sparkles -->
    ${Array.from({length: 20}).map(() => `
      <div class="sparkle" style="
        top:${Math.random()*100}%;
        left:${Math.random()*100}%;
        animation-delay:${Math.random()*3}s;
      "></div>
    `).join("")}

    <!-- Main Box -->
    <div class="box">
      <img id="angel-img" src="https://cdn.discordapp.com/attachments/1475714943033802906/1476164609319768094/5C7558E7-2E1A-4F6B-9F19-464672F9D6D7.png?ex=69a020ec&is=699ecf6c&hm=3d06e0de9d30b55d16c71ac8c1b0947456f57eb55e20a9d8137631217a16c291&" class="angel-img">
      <h1>🪽 Avoiding getting detected </h1>
      <p>⏱️ Please wait while we prepare your link</p>
      <div id="timer">${delay}</div>
    </div>

    <script>
      // Countdown timer
      let timeLeft = ${delay};
      const timer = document.getElementById('timer');

      const countdown = setInterval(() => {
        timeLeft--;
        timer.innerText = timeLeft;

        if (timeLeft <= 0) {
          clearInterval(countdown);
          window.location.href = "${to}";
        }
      }, 1000);
    </script>

  </body>
  </html>
  `);
}