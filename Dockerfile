FROM node:16.1-slim

#All Puppetter dependencies
# Source: https://github.com/Googlechrome/puppeteer/issues/290#issuecomment-322838700

RUN apt-get update \
    && apt-get install -y wget gnupg \
    && wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
    && apt-get update \
    && apt-get install -y google-chrome-stable fonts-ipafont-gothic fonts-wqy-zenhei fonts-thai-tlwg fonts-kacst fonts-freefont-ttf libxss1 \
      --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /usr/src/app
COPY package*.json ./


RUN npm install \
    # Add user so we don't need --no-sandbox.
    # same layer as npm install to keep re-chowned files from using up several hundred MBs more space
    && groupadd -r mudrauser && useradd -r -g mudrauser -G audio,video mudrauser \
    && mkdir -p /home/mudrauser/Downloads \
    && chown -R mudrauser:mudrauser /home/mudrauser \
    && chown -R mudrauser:mudrauser /usr/src/app/node_modules


COPY . .

USER mudrauser

EXPOSE 3000

CMD ["node", "app.js"]
